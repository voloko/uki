load('spec/support/env.rhino.js');
window.location = 'spec/fixtures/test.html';
load('/opt/local/lib/ruby/gems/1.8/gems/jspec-3.1.3/lib/jspec.js')
load('/opt/local/lib/ruby/gems/1.8/gems/jspec-3.1.3/lib/jspec.xhr.js')
load('http://127.0.0.1:21119/src/uki.cjs')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/selector.spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()