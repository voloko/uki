
/**
 * Image view which opens given link in new window.
 *
 *
 * @author damian kolakowski
 * @name uki.view.LinkImage
 * @class
 * @extends uki.view.Base
 */
uki.view.declare('uki.view.LinkImage', uki.view.Base, function() {
    
    this.typeName = function() { return 'uki.view.LinkImage'; };        
    
    /**
     * Read or write redirect url.
     * @function
     * @name uki.view.Image#href
     */     
    uki.delegateProp(this, 'href', '_a')
    
    /**
     * Read or write image's source.
     * @function
     * @name uki.view.Image#src
     */
    uki.delegateProp(this, 'src', '_img')

    this._createDom = function() { 
         // <a target='_blank' href="this._href"><img style='width:100%;height:100%;' src="this._src"/></a>
         this._a            = uki.createElement('a', this.defaultCss);
         this._a.setAttribute('target','_blank'); 
         this._a.href       = this._href;                 
         this._img          = uki.createElement('img', this.defaultCss);
         this._img.src      = this._src; 
         this._img.style.cssText += 'width:100%;height:100%;'                 
         this._a.appendChild(this._img); 
         this._dom = this._a;                  
     };
});
