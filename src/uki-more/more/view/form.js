include('../view.js');

uki.view.declare('uki.more.view.Form', uki.view.Container, function(Base) {
    
    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _method: 'GET',
            _action: ''
        });
    };
    
    this.action = uki.newProp('_action', function(action) {
      this._dom.action = this._action = action;
    });
    this.method = uki.newProp('_method', function(method) {
      this._dom.method = this._method = method;
    });
    
    this.submit = function() { this._dom.submit(); }
    this.reset = function() { this._dom.reset(); }
    
    this._createDom = function() {
        this._dom = uki.createElement('form', Base.defaultCss);
        this._initClassName();
        this._dom.action = this._action;
        this._dom.method = this._method;
    };
   
});