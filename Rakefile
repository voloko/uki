require 'fileutils'
require 'rubygems'
require 'yaml'

def process_path(path, included = {})
  code = File.read(path)
  base = File.dirname(path)
  code.gsub(%r{include\s*\(\s*['"]([^"']+)["']\s*\)\s*;?\s*\n?}) {
    include_path = File.expand_path(File.join(base, $1))
    unless included[include_path]
      included[include_path] = true
      process_path(include_path, included)
    else
      ''
    end
  }
end

def read_version
  base = File.dirname(__FILE__)
  File.read(File.join(base, 'src', 'uki-core', 'uki.js')).match(%r{uki.version\s*=\s*'([^']+)'})[1]
end

desc "Run thin"
task :start do
  sh "thin -s 1 -C thin.yaml -R uki.ru start"
end

desc "Run thin"
task :restart do
  sh "thin -s 1 -C thin.yaml -R uki.ru restart"
end

desc "Stop thin"
task :stop do
  sh "thin -s 1 -C thin.yaml -R uki.ru stop"
end

desc "Build scripts"
task :build_scripts do
  base = File.dirname(__FILE__)
  version = read_version
  compiler_path = File.join(base, 'compiler.jar')
  FileUtils.rm_rf('pkg')
  FileUtils.mkdir('pkg')
  
  ['uki.js', 'uki-theamless.js', 'uki-more.js', 'airport.js'].each do |name|
    src = File.join(base, 'src', name)
    target = File.join(base, 'pkg', name).sub(/.js$/, '.dev.js')
    File.open(target, 'w') { |f| f.write process_path(src).sub('/src/uki-theme/airport/i/', "http://static.ukijs.org/pkg/#{version}/uki-theme/airport/i/") }
    `java -jar #{compiler_path} --js #{target} > #{target.sub('.dev.js', '.shrinked.js')}`
    `gzip -c #{target.sub('.dev.js', '.shrinked.js')} > #{target.sub('.dev.js', '.gz.js')}`
    FileUtils.rm target.sub('.dev.js', '.shrinked.js')
  end
  
  FileUtils.cp_r(File.join(base, 'src', 'uki-theme'), File.join(base, 'pkg', 'uki-theme'))
end

desc "Push version"
task :push_version do
  require 'aws/s3'
  include AWS::S3
  
  base = File.dirname(__FILE__)
  config = YAML.load(File.read File.join(base, '..', 'config.yaml'))
  version = read_version
  Base.establish_connection!(
    :access_key_id => config['access_key_id'], 
    :secret_access_key => config['secret_access_key']
  ) unless Base.connected?
  Dir.glob(File.join(base, 'pkg', '*.js')).each do |path|
    filename = File.basename(path)
    targetPath = "/pkg/#{version}/#{filename}"
    options = {:context_type => 'text/javascript', :access => :public_read, 'Cache-Control' => 'max-age=315360000'}
    if filename.match(/\.gz.js/)
      options['Content-Encoding'] = 'gzip' 
      targetPath.sub!('.gz.js', '.js')
    end
    p "#{path} -> #{targetPath}"
    S3Object.store(targetPath, File.read(path), config['bucket_name'], options)
  end
  
  Dir.glob(File.join(base, 'pkg', 'uki-theme', '**', '*')).each do |path|
    next if File.directory?(path)
    filename = File.basename(path)
    targetPath = "pkg/#{version}/uki-theme/#{path.sub(/.*uki-theme\//, '')}"
    p "#{path} -> #{targetPath}"
    S3Object.store(
      targetPath, File.read(path), config['bucket_name'],
      :access => :public_read, 'Cache-Control' => 'max-age=315360000'
    )
  end
end

# ['width', 'height', 'minX', 'maxX', 'minY', 'maxY', 'left', 'top'].each { |name|
#     print "/** @function
#     @name uki.view.Base##{name} */
#     "
# }