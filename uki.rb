require 'sinatra/base'

class Uki < Sinatra::Base
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
  
  get %r{^/(src)/.*\.cjs$} do
    path = request.path.sub(/\.cjs$/, '.js')
    response.header['Content-type'] = 'application/x-javascript; charset=UTF-8'
    process_path(File.join(File.dirname(__FILE__), path))
  end
  
  get %r{^/(src|tmp)/.*} do
    path = request.path
    response.header['Content-type'] = 'image/png' if path.match(/\.png$/)
    response.header['Content-type'] = 'text/css' if path.match(/\.css$/)
    response.header['Content-type'] = 'image/jpeg' if path.match(/\.jpg$/)
    response.header['Content-type'] = 'text/javascript;charset=utf-8' if path.match(/\.js$/)
    response.header['Content-Encoding'] = 'gzip' if path.match(/\.gz/)
    if path.match(/.zip$/)
      response.header['Content-Type'] = 'application/x-zip-compressed'
      response.header['Content-Disposition'] = 'attachment; filename=tmp.zip'
    end
    
    File.read File.join(File.dirname(__FILE__), path)
  end
end