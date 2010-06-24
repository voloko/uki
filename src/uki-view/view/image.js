/**
 * Image
 *
 * @author voloko
 * @name uki.view.Image
 * @class
 * @extends uki.view.Base
 */
uki.view.declare('uki.view.Image', uki.view.Base, function() {
    this.typeName = function() { return 'uki.view.Image'; };
    
    /**
     * @function
     * @name uki.view.Image#src
     */
    uki.delegateProp(this, 'src', '_dom');
    
    this._createDom = function() {
        this._dom = uki.createElement('img', this.defaultCss);
        this._initClassName();
    };
});
