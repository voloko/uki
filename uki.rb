require 'sinatra/base'
require 'haml'
require 'json'
require 'base64'
require 'fileutils'
require 'tempfile'

class Uki < Sinatra::Base
  def optimize_png(data)
    f = Tempfile.new(['opt_png', '.png'])
    f.write(data)
    f.close()
    p = f.path
    variants = ['.opti', '.crush', '.crush.opti', '.opti.crush']

    `optipng -q -nc -o7 #{p} -out #{p}.opti`
  	`pngcrush -q -rem alla -brute #{p} #{p}.crush`
  	`optipng -q -nc -o7 -i0 #{p}.crush -out #{p}.crush.opti`
  	`pngcrush -q -rem alla -brute #{p}.opti #{p}.opti.crush`
    suffix = variants.max { |a, b| File.size(p + a) <=> File.size(p + b) }
    FileUtils.rm(p)
    FileUtils.mv(p + suffix, p)
    variants.each { |v| FileUtils.rm(p + v) rescue nil }
    return File.read(p)
  end
  
  def optimize_gif(data)
    f = Tempfile.new(['opt_gif', '.png'])
    f.write(data)
    f.close()
    p = f.path
    
    `convert #{p} #{p}.gif`
    return File.read("#{p}.gif")
  end
  
  def encode64(str)
    Base64.encode64(str).gsub("\n", '')
  end
  
  def process_path(path, included = {})
    code = File.read(path)
    base = File.dirname(path)
    code.gsub(%r{\n?\s*include\s*\(\s*['"]([^"']+)["']\s*\)\s*;?\s*\n?}) {
      include_path = File.expand_path(File.join(base, $1))
      unless included[include_path]
        included[include_path] = true
        process_path(include_path, included)
      else
        "\n"
      end
    }
  end
  
  get %r{^/(app|src)/.*\.cjs$} do
    path = request.path.sub(/\.cjs$/, '.js')
    response.header['Content-type'] = 'application/x-javascript; charset=UTF-8'
    process_path(File.join(File.dirname(__FILE__), path))
  end
  
  get %r{^/app/.*} do
    path = request.path
    response.header['Content-type'] = 'image/png' if path.match(/\.png$/)
    response.header['Content-type'] = 'text/css' if path.match(/\.css$/)
    response.header['Content-type'] = 'image/jpeg' if path.match(/\.jpg$/)
    response.header['Content-type'] = 'text/javascript;charset=utf-8' if path.match(/\.js$/)
    response.header['Content-Encoding'] = 'gzip' if path.match(/\.gz/)
    
    File.read File.join(File.dirname(__FILE__), path)
  end
  
  # Expects json: [ 
  #   { name: 'file-name.png', data: 'png data' },
  #   { name: 'file-name.gif', data: 'gif data' },
  #   ...
  # ]
  # returns json: {
  #   optimized: [
  #     { name: 'file-name.png', data: 'png data' },
  #     { name: 'file-name.gif', data: 'gif data' },
  #     ...
  #   ],
  #   url: 'path-to-zip-file'
  # }
  post '/imageCutter' do
    items = JSON.load(params['json'])
    optimized = []
    FileUtils.rm_r Dir.glob('tmp/*')
    items.each do |row|
      data = Base64.decode64(row['data'])
      data = row['name'].match(/\.gif$/) ? optimize_gif(data) : optimize_png(data)
      File.open(File.join('tmp', row['name']), 'w') { |f| f.write(data) }
      optimized << { 'name' => row['name'], 'data' => encode64(data) }
    end
    `zip tmp.zip tmp/*`
    FileUtils.mv 'tmp.zip', 'tmp/tmp.zip'
    response.header['Content-Type'] = 'application/x-javascript'
    { 'url' => '/tmp/tmp.zip', 'optimized' => optimized }.to_json
  end
  
  get %r{^/tmp/.*\.zip} do
    response.header['Content-Type'] = 'application/x-zip-compressed'
    response.header['Content-Disposition'] = 'attachment; filename=tmp.zip'
    File.read(request.path.sub(%r{^/}, ''))
  end
  
  get %r{^/.*$} do
    response.header['Content-type'] = 'text/html; charset=UTF-8'
    haml request.path.sub(%r{^/}, '').to_sym
  end
  
  get '/' do
    haml :index
  end
end