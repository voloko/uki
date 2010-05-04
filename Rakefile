require 'fileutils'
require 'rubygems'
require 'yaml'

def read_version
  base = File.dirname(__FILE__)
  File.read(File.join(base, 'src', 'uki-core', 'uki.js')).match(%r{uki.version\s*=\s*'([^']+)'})[1]
end

desc "Build scripts"
task :build_scripts do
  require 'uki/include_js'
  
  version = read_version
  FileUtils.rm_rf('pkg')
  FileUtils.mkdir('pkg')
  
  files = ['uki.js', 'uki-theamless.js', 'uki-more.js', 'airport.js']
  paths = files.map { |f| File.join('src', f) }
  `../uki-tools/bin/uki build -o pkg -C #{paths.join(' ')}`
  files.each do |name|
    original = File.join('pkg', name)
    target = File.join('pkg', name.sub(/\.js$/, '.dev.js'))
    File.open( target, 'w' ) do |f|
      code = File.read( original )
      code = code.sub('/src/uki-theme/airport/i/', "http://static.ukijs.org/pkg/#{version}/uki-theme/airport/i/")
      f.write( code )
    end
    FileUtils.rm original
  end
  
  `../uki-tools/bin/uki build -o pkg #{paths.join(' ')}`
  files.each do |name| 
    original = File.join('pkg', name)
    tmp = File.join('pkg', name.sub(/\.js$/, '.tmp.js'))
    target = File.join('pkg', name.sub(/\.js$/, '.gz.js'))
    File.open( tmp, 'w' ) do |f|
      code = File.read( original )
      code = code.sub('/src/uki-theme/airport/i/', "http://static.ukijs.org/pkg/#{version}/uki-theme/airport/i/")
      f.write( code )
    end
    `gzip -c #{tmp} > #{target}`
    FileUtils.rm tmp
    FileUtils.rm original
  end
  
  FileUtils.cp_r(File.join('src', 'uki-theme'), File.join('pkg', 'uki-theme'))
end

desc "Merge file"
task :merge do
  code = process_path(ENV['file'])
  File.open(ENV['target'], 'w') { |f| f.write code }
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