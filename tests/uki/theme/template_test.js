require('../../test_helper.js');
include('uki-core/theme/template.js');

QUnit.test("simple case", function() {
    var t = new uki.theme.Template('<code>${value}</code>');
    QUnit.equals(t.render({value: '111'}), '<code>111</code>');
});


QUnit.test("left end case", function() {
    var t = new uki.theme.Template('${before}<code>${value}</code>');
    QUnit.equals(t.render({before: '000', value: '111'}), '000<code>111</code>');
});


QUnit.test("right end case", function() {
    var t = new uki.theme.Template('<code>${value}</code>${after}');
    QUnit.equals(t.render({value: '111', after: '222'}), '<code>111</code>222');
});


QUnit.test("mutliple case", function() {
    var t = new uki.theme.Template('<code>${value} ${value}</code>');
    QUnit.equals(t.render({value: '111'}), '<code>111 111</code>');
});

QUnit.test("adjacent case", function() {
    var t = new uki.theme.Template('<code>${a}${b}</code>');
    QUnit.equals(t.render({a: '111', b: '222'}), '<code>111222</code>');
});
