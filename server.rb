SERVER_ROOT = File.expand_path(File.dirname(__FILE__))
DEVELOPMENT = ENV['RACK_ENV'] != 'production'

def get_example_page(path)
  name = File.basename(path)
  html_path = File.join(path, name + '.html')
  if(File.exist?(html_path))
    File.read(html_path)
  else
    nil
  end
end

def list_examples(path)
  result = []
  Dir.new(path).each { |name| 
    if File.exist?(File.join(path, name, name + '.js'))
      result << name
    elsif !name.start_with?('.') && File.directory?(File.join(path, name))
      result += list_examples(File.join(path, name)).map do |subname|
        File.join(name, subname)
      end
    end 
  }
  result
end

def replace_src_paths(html, version_info)
  version = version_info['version']
  html.gsub(%r{src\s*=\s*["']/src/(.*?)\.cjs['"]}, "src='http://static.ukijs.org/pkg/#{version}/\\1.js'")
end

def extract_example_info path, &block
  name = File.basename(path)
  js_path = File.join(path, name + '.js')
  js_contents = File.read(js_path)
  yield js_contents
end

def extract_example_html(path)
  extract_example_info(path) { |js_contents|
    js_contents.match(%r{@example_html((.|[\n\r])*?)\*/})[1] rescue 'No html'
  }
end

def extract_example_title(path)
  extract_example_info(path) { |js_contents|
    js_contents.match(%r{@example_title(.*?)(\*/|$)})[1] rescue 'Untitled'
  }
end

def extract_example_order(path)
  extract_example_info(path) { |js_contents|
    js_contents.match(%r{@example_order(.*?)(\*/|$)})[1].to_i rescue 9e6
  }
end

def encode64(str)
  Base64.encode64(str).gsub("\n", '')
end

set :views, File.join(SERVER_ROOT, 'examples', 'views')
set :public, File.join(SERVER_ROOT, 'examples')

get '/' do
  path = File.join(SERVER_ROOT, 'examples')
  exampleList = list_examples(path).map do |name|
    { 
      :path => name + '/', 
      :title => extract_example_title(File.join(path, name)),
      :order => extract_example_order(File.join(path, name)) 
    }
  end.sort { |e1, e2| e1[:order] <=> e2[:order] }.select { |e| e[:order] > 0 }
  haml :exampleList, :locals => { :exampleList => exampleList }
end

get '/:type/:example/' do
  path = File.join(SERVER_ROOT, 'examples', params[:type], params[:example])
  page = get_example_page(path)
  page || haml(:example, :locals => {
      :html => extract_example_html(path), 
      :title => extract_example_title(path)}
    )
end
