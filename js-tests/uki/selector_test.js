require('../test_helper.js');
include('uki/builder.js');
include('uki/selector.js');
include('uki/component/Base.js');
include('uki/component/Label.js');

var Selector = uki.Selector,
    Base     = uki.component.Base,
    Label    = uki.component.Label;

var tree = uki.build([{
    view: new Base(),
    rect: '0 0 1000 1000',
    name: 'top',
    children: [{
        view: new Base(),
        rect: '0 0 1000 1000',
        name: 'base',
        children: [
            {
                view: new Label(),
                rect: '10 10 100 100',
                name: 'label1',
            
                children: [
                    {
                        view: new Base(),
                        rect: '10 10 100 100',
                        name: 'sub base'
                    }
                ]
            },
            {
                view: new Label(),
                rect: '200 10 100 100',
                name: 'label2'
            }
        ]
    }]
}]);

QUnit.test("should tokenize expression", function() {
    var tokens = Selector.tokenize('label > * > project.components.CustomView Label[name^="wow"]')[0];
    QUnit.same(tokens, ['label', '>', '*', '>', 'project.components.CustomView', 'Label[name^="wow"]']);
});

QUnit.test("should filter * name", function() {
    var elements = Selector.find('*', tree);
    QUnit.equals(elements.length, 4);
    QUnit.equals(uki.attr(elements[0], 'name'), 'base');
    QUnit.equals(uki.attr(elements[1], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[2], 'name'), 'sub base');
    QUnit.equals(uki.attr(elements[3], 'name'), 'label2');
});

QUnit.test("should filter * * name", function() {
    var elements = Selector.find('* *', tree);
    QUnit.equals(elements.length, 3);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[1], 'name'), 'sub base');
    QUnit.equals(uki.attr(elements[2], 'name'), 'label2');
});


QUnit.test("should filter by full typeName", function() {
    var elements = Selector.find('uki.component.Label', tree);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[1], 'name'), 'label2');
});

QUnit.test("should filter by contracted typeName", function() {
    var elements = Selector.find('Base', tree);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'base');
    QUnit.equals(uki.attr(elements[1], 'name'), 'sub base');
});

QUnit.test("should filter by attribute", function() {
    var elements = Selector.find('[name=base]', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'base');
});

QUnit.test("should filter by attribute", function() {
    var elements = Selector.find('Base[name=base]', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'base');
});


QUnit.test("should filter by '' attribute", function() {
    var elements = Selector.find('[name="base"]', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'base');
});

QUnit.test("should filter by ^= attribute", function() {
    var elements = Selector.find('[name^="label"]', tree);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[1], 'name'), 'label2');
});

QUnit.test("should filter by $= attribute", function() {
    var elements = Selector.find('*[name$="bel1"]', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
});

QUnit.test("should filter by ~= attribute", function() {
    var elements = Selector.find('[name ~= "base"]', tree);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'base');
    QUnit.equals(uki.attr(elements[1], 'name'), 'sub base');
});

QUnit.test("should filter by > ", function() {
    var elements = Selector.find('>', [tree[0].children()[0]]);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[1], 'name'), 'label2');
});

QUnit.test("should filter by > *", function() {
    var elements = Selector.find('> *', [tree[0].children()[0]]);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[1], 'name'), 'label2');
});

QUnit.test("should filter by compound filter", function() {
    var elements = Selector.find('Base > Label', tree);
    QUnit.equals(elements.length, 2);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label1');
    QUnit.equals(uki.attr(elements[1], 'name'), 'label2');
});

QUnit.test("should filter by pos eq", function() {
    var elements = Selector.find('Base:eq(1)', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'sub base');
});

QUnit.test("should filter parent by pos eq", function() {
    var elements = Selector.find('Base:eq(0) > Label:eq(1)', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'label2');
});

QUnit.test("should filter by pos gt", function() {
    var elements = Selector.find('Base:gt(0)', tree);
    QUnit.equals(elements.length, 1);
    QUnit.equals(uki.attr(elements[0], 'name'), 'sub base');
});

QUnit.test("should copy find to uki", function() {
    QUnit.ok(uki.find);
});
