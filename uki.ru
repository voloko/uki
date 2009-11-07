require 'uki'
require 'rack/reloader'

use Rack::Reloader, 1
run Uki