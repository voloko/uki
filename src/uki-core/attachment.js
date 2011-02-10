uki.view.declare('uki.Attachment', uki.view.Container, function(STATIC, Base) {

    /* Class methods */

    STATIC.attach = function(dom, view) {
        dom = dom || doc.body;
        var id = dom[expando] = dom[expando] || uki.guid++;
        if (!STATIC._instances || !STATIC._instances[id]) {
            STATIC._register(new uki.Attachment({ dom: dom }));
        }
        return STATIC._instances[id].appendChild(view);
    };

    STATIC._instances = null;

    STATIC._register = function(a) {
        if (!STATIC._instances) {
            STATIC._instances = {};
            var timeout = false;

            uki.dom.addListener(root, 'resize', function() {
                if (!timeout) {
                    timeout = true;
                    setTimeout(function(i,len) {
                        uki.after.start();

                        timeout = false;
                        uki.forEach(STATIC._instances, function(a) {
                           a.resized();
                        });

                        uki.after.stop();
                    }, 1);
                }
            });
        }
        var el = a.dom(),
            id = el[expando] = el[expando] || uki.guid++;

        return (STATIC._instances[id] = a);
    };

    /* used by selectors */
    uki.top = function() {
        var atts = [];
        uki.forEach(STATIC._instances || {}, function(a) {
            atts.push(a);
        });
        return atts;
    };

    /* Instance methods */

    this._setup = function(initArgs) {
        this._dom = initArgs.dom;
        Base._setup.call(this, initArgs);
    };

    this._createDom = uki.FS;

    this.parent = function() {
        return null;
    };


});
