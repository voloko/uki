require "test_helper"
require "rack/test"
require "#{File.dirname(__FILE__)}/../uki.rb"

class UkiTest < Test::Unit::TestCase
  include Rack::Test::Methods
  
  def app
    Uki
  end
  
  def test_should_merge_included_files
    get '/app/uki/view/base.cjs'
  end
  
end
