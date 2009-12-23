require 'fileutils'
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

desc "Run thin"
task :start do
  sh "sudo thin -s 1 -C thin.yaml -R uki.ru start"
end

desc "Run thin"
task :restart do
  sh "sudo thin -s 1 -C thin.yaml -R uki.ru restart"
end

desc "Stop thin"
task :stop do
  sh "sudo thin -s 1 -C thin.yaml -R uki.ru stop"
end

desc "Build scripts"
task :build_scripts do
  base = File.dirname(__FILE__)
  compiler_path = File.join(base, 'pkg', 'compiler.jar')
  
  ['uki.js', 'uki-theamless.js', 'airport.js'].each do |name|
    src = File.join(base, 'app', name)
    target = File.join(base, 'pkg', name)
    File.open(target, 'w') { |f| f.write process_path(src) }
    `java -jar #{compiler_path} --js #{target} > #{target.sub('.js', '.shrinked.js')}`
    `gzip -c #{target.sub('.js', '.shrinked.js')} > #{target}.gz`
    # FileUtils.rm target.sub('.js', '.shrinked.js')
  end
  
end