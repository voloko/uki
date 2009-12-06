require 'base64'
require 'fileutils'
require 'tempfile'

def optimized_png_path(data)
  f = Tempfile.new(['opt_png', '.png'])
  f.write(Base64.urlsafe_decode64(data))
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
  return p
end

data = File.read(ARGV[0])
data = Base64.urlsafe_encode64(data)
FileUtils.mv optimized_png_path(data), '../tmp'
