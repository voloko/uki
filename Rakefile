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

