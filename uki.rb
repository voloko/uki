require 'sinatra/base'
require 'haml'

class Uki < Sinatra::Base
  def process_path(path, included = {})
    code = File.read(path)
    base = File.dirname(path)
    code.gsub(%r{include\s*\(\s*['"]([^"']+)["']\s*\)\s*;?}) {
      include_path = File.expand_path(File.join(base, $1))
      unless included[include_path]
        included[include_path] = true
        process_path(include_path, included)
      else
        ''
      end
    }
  end
  
  get %r{^/app/.*\.cjs$} do
    path = request.path.sub(/\.cjs$/, '.js')
    response.header['Content-type'] = 'application/x-javascript; charset=UTF-8'
    process_path(File.join(File.dirname(__FILE__), path))
  end
  
  get %r{^/functional/.*$} do
    response.header['Content-type'] = 'text/html; charset=UTF-8'
    haml request.path.sub(%r{^/}, '').to_sym
  end
  
  get %r{^/app/.*} do
    path = request.path
    response.header['Content-type'] = 'image/png' if path.match(/\.png$/)
    File.read File.join(File.dirname(__FILE__), path)
  end
  
  get '/' do
    haml :index
  end
end