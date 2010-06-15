include('../view.js');

uki.view.declare('uki.more.view.HTile', uki.view.VFlow, function(Base) {

    function getTileGrid(childViews, maxWidth) {
        var ti = {};

        ti.width = uki.reduce(0, childViews, function(max, e) {
            return (e.visible() && e.width() > max) ? e.width() : max
        });

        ti.height = uki.reduce(0, childViews, function(max, e) {
            return (e.visible() && e.height() > max) ? e.height() : max
        });

        ti.across = Math.floor(maxWidth / ti.width);
        if (ti.across <= 0 && ti.width >= 0) {
            ti.across = 1
        }

        ti.down = Math.ceil(childViews.length / ti.across);

        return ti;
    }

    this.contentsSize = function() {
        var ti = getTileGrid(this._childViews, this.parent().width());
        return new Size(this.contentsWidth(), ti.height * ti.down);
    };

    this._resizeChildViews = function(oldRect) {
        var row = 0, col = 0;
        var ti = getTileGrid(this._childViews, this.parent().width());
        var view;

        for (var i = 0, childViews = this.childViews(); i < childViews.length; i++) {
            view = childViews[i];

            view.parentResized(oldRect, this._rect);

            view.rect().x = col * ti.width;
            view.rect().y = row * ti.height;

            if (view.visible()) {
                if (this._hidePartlyVisible) {
                    view.visible(view._rect.width + ti.width <= this._rect.width);
                }
                col++;
                if (col >= ti.across) {
                    col = 0;
                    row++;
                }
            }
        }
        this.rect().width = col * ti.width;
        this.rect().height = row * ti.height
    };

});
