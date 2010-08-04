include('../view.js');
include('../const.js');

// Scroll implementation based on iScroll, http://cubiq.org/iscroll (by Matteo Spinelli)
// uki-adapted by rsaccon

(function() {
    var uid = 0,
        scrollWidth = 0,
        widthIncludesScrollBar = false;

    function initScrollWidth () {
        if (!scrollWidth) {
            uki.dom.probe(
                uki.createElement(
                    'div',
                    'position:absolute;left:-99em;width:100px;height:100px;overflow:scroll;',
                    '<div style="position:absolute;left:0;width:100%;"></div>'
                ),
                function( probe ) {
                    scrollWidth = probe.offsetWidth - probe.clientWidth;
                    widthIncludesScrollBar = probe.firstChild.offsetWidth == 100;
                }
            );
        }
        return scrollWidth;
    }

    // webkit touch browsers do not have "overflow:scroll" CSS style property,
    // we need to paint out own scrollbar

    var TouchScrollBar = function (dir, parent, fade, shrink) {
        this.dir = dir;
        this.fade = fade;
        this.shrink = shrink;
        this.uid = ++uid;

        // Create main scrollbar
        this.bar = document.createElement('div');

        var style = 'position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:100;background:rgba(0,0,0,0.5);' +
            '-webkit-transform:' + cssTranslateOpen + '0,0' + cssTranslateClose + ';' +
            (dir == 'horizontal' ? '-webkit-border-radius:3px 2px;min-width:6px;min-height:5px' : '-webkit-border-radius:2px 3px;min-width:5px;min-height:6px'),
            size, ctx;

        this.bar.setAttribute('style', style);

        // Create scrollbar wrapper
        this.wrapper = document.createElement('div');
        style = '-webkit-mask:-webkit-canvas(scrollbar' + this.uid + this.dir + ');position:absolute;z-index:100;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:' + (fade ? '300ms' : '0') + ';-webkit-transition-delay:0;-webkit-transition-property:opacity;' +
            (this.dir == 'horizontal' ? 'bottom:2px;left:1px;right:7px;height:5px' : 'top:1px;right:2px;bottom:7px;width:5px;');
        this.wrapper.setAttribute('style', style);

        // Add scrollbar to the DOM
        this.wrapper.appendChild(this.bar);
        parent.appendChild(this.wrapper);
    };

    TouchScrollBar.prototype = {
        init: function (scroll, size) {
            var ctx, sbSize;

            // Create scrollbar mask
            if (this.dir == 'horizontal') {
                sbSize = this.wrapper.offsetWidth;
                ctx = document.getCSSCanvasContext("2d", "scrollbar" + this.uid + this.dir, sbSize, 5);
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.beginPath();
                ctx.arc(2.5, 2.5, 2.5, Math.PI/2, -Math.PI/2, false);
                ctx.lineTo(sbSize-2.5, 0);
                ctx.arc(sbSize-2.5, 2.5, 2.5, -Math.PI/2, Math.PI/2, false);
                ctx.closePath();
                ctx.fill();
            } else {
                sbSize = this.wrapper.offsetHeight;
                ctx = document.getCSSCanvasContext("2d", "scrollbar" + this.uid + this.dir, 5, sbSize);
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.beginPath();
                ctx.arc(2.5, 2.5, 2.5, Math.PI, 0, false);
                ctx.lineTo(5, sbSize-2.5);
                ctx.arc(2.5, sbSize-2.5, 2.5, 0, Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }

            this.maxSize = this.dir == 'horizontal' ? this.wrapper.clientWidth : this.wrapper.clientHeight;
            this.size = Math.round(this.maxSize * this.maxSize / size);
            this.maxScroll = this.maxSize - this.size;
            this.toWrapperProp = this.maxScroll / (scroll - size);
            this.bar.style[this.dir == 'horizontal' ? 'width' : 'height'] = this.size + 'px';
        },

        setPosition: function (pos, hidden) {
            var p1 = pos;
            if (!hidden && this.wrapper.style.opacity != '1') {
                this.show();
            }

            pos = this.toWrapperProp * pos;

            if (pos < 0) {
                pos = this.shrink ? pos + pos*3 : 0;
                if (this.size + pos < 5) {
                    pos = -this.size+5;
                }
            } else if (pos > this.maxScroll) {
                pos = this.shrink ? pos + (pos-this.maxScroll)*3 : this.maxScroll;
                if (this.size + this.maxScroll - pos < 5) {
                    pos = this.size + this.maxScroll - 5;
                }
            }

            pos = this.dir == 'horizontal'
                ? cssTranslateOpen + Math.round(pos) + 'px,0' + cssTranslateClose
                : cssTranslateOpen + '0,' + Math.round(pos) + 'px' + cssTranslateClose;

            this.bar.style.webkitTransform = pos;
        },

        show: function () {
            if (cssHas3d) {
                this.wrapper.style.webkitTransitionDelay = '0';
            }
            this.wrapper.style.opacity = '1';
        },

        hide: function () {
            if (cssHas3d) {
                this.wrapper.style.webkitTransitionDelay = '200ms';
            }
            this.wrapper.style.opacity = '0';
        },

        remove: function () {
            this.wrapper.parentNode.removeChild(this.wrapper);
            return null;
        }
    };


    /**
    * Touch scroll pane.
    * Optimized for webkit browsers.
    *
    * @author voloko, rsaccon
    * @name uki.touch.view.TouchScrollPane
    * @class
    * @extends uki.view.Container
    */
    uki.view.declare('uki.touch.view.TouchScrollPane', uki.view.Container, function(Base) {
        this.typeName = function() {
            return 'uki.touch.view.ScrollPane';
        };

        uki.extend(this, {
            _scrollableV: true,
            _scrollableH: false,
            _scrollV: false,
            _scrollH: false,
            _sbV: false,
            _sbH: false,
            _touchEmulate: true
        });

        this._setup = function() {
            Base._setup.call(this);

            this._clientRect = this.rect().clone();
            this._rectForChild = this.rect().clone();

            // touch properties
            this._bounce = cssHas3d;
            this._momentum = cssHas3d;
            this._hScrollbar = cssHas3d;
            this._vScrollbar = cssHas3d;
            this._fadeScrollBar = isIphone || isIpad || !isTouch;
            this._shrinkScrollBar = isIphone || isIpad;
        };

        /**
        * Enable vertical scrolling
        *
        * @function
        * @param {Boolean}
        * @name uki.view.ScrollPane#scrollableV
        */
        /**
        * Enable horizontal scrolling
        *
        * @function
        * @param {Boolean}
        * @name uki.view.ScrollPane#scrollableH
        */
        /**
        * Always show vertical scrollbar
        *
        * @function
        * @param {Boolean}
        * @name uki.view.ScrollPane#scrollH
        */
        /**
        * Always show horizonatl scrollbar
        *
        * @function
        * @param {Boolean}
        * @name uki.view.ScrollPane#scrollV
        */
        /**
        * Emulate touch scrolling and scrollbar on non-touch browsers
        *
        * @function
        * @param {Boolean}
        * @name uki.view.TouchScrollPane#touchEmulate
        */
        uki.addProps(this, ['scrollableV', 'scrollableH', 'scrollH', 'scrollV', 'touchEmulate']);

        this.rectForChild = function() { return this._rectForChild; };
        this.clientRect = function() { return this._clientRect; };

        /**
        * @function
        * @param {Number} dx
        * @param {Number} dy
        * @name uki.view.ScrollPane#scroll
        */
        this.scroll = function(dx, dy, runtime) {
            if (!isTouch && !this._touchEmulate) {
                if (dx) this.scrollLeft(this.scrollLeft() + dx);
                if (dy) this.scrollTop(this.scrollTop() + dy);
            } else {
                this._scrollTo(dx, dy, runtime);
            }
        };

        /**
        * @function
        * @name uki.view.ScrollPane#scrollTop
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollLeft
        */
        uki.each(['scrollTop', 'scrollLeft'], function(i, name) {
            this[name] = function(v) {
                if (!isTouch && !this._touchEmulate) {
                    if (v === undefined) return this._dom[name];
                    this._dom[name] = v;
                    this.trigger('scroll', { source: this });
                    return this;
                } else {
                    if (v === undefined) return ((name == 'scrollLeft') ? this._x : this._y) || 0;
                    this._scrollTo((name == 'scrollTop') ? v : 0, (name == 'scrollLeft') ? v : 0);
                    this.trigger('scroll', { source: this });
                    return this;
                }
            };
        }, this);

        /**
        * @function
        * @return {uki.geometry.Rect}
        * @name uki.view.ScrollPane#visibleRect
        */
        this.visibleRect = function() {
            var tmpRect = this._clientRect.clone();
            tmpRect.x = this.rect().x + this.scrollLeft();
            tmpRect.y = this.rect().y + this.scrollTop();
            return tmpRect;
        };

        this.rect = function(newRect) {
            if (newRect === undefined) return this._rect;

            newRect = Rect.create(newRect);
            var oldRect = this._rect;
            this._parentRect = newRect;
            if (!this._resizeSelf(newRect)) return this;
            this._updateClientRects();
            this._needsLayout = true;
            this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
            return this;
        };

        this._createDom = function() {
            Base._createDom.call(this);
            if (ua.indexOf('Gecko/') > -1) this._dom.tabIndex = '-1';

            if (isTouch || this._touchEmulate) {
                this._scroller = uki.createElement("div", 'height:100%;z-index:100;-moz-user-focus:none;');
                this._scroller.style.webkitTransitionProperty = '-webkit-transform';
                this._scroller.style.webkitTransitionTimingFunction = 'cubic-bezier(0,0,0.25,1)';
                this._scroller.style.webkitTransitionDuration = '0';
                this._scroller.style.webkitTransform = cssTranslateOpen + '0,0' + cssTranslateClose;
                this._dom.appendChild(this._scroller);

                uki.dom.bind(this._scroller, touchStart, uki.proxy(this._onTouchStart, this));
                uki.dom.bind(this._scroller, touchMove, uki.proxy(this._onTouchMove, this));
                uki.dom.bind(this._scroller, touchEnd, uki.proxy(this._onTouchEnd, this));

                if (!isTouch) {
                    uki.dom.bind(this._scroller, 'click', function(e) {
                        if (!e._fake) e.stopPropagation();
                    });
                }
            }
        };

        this.domForChild = function(child) {
            return (isTouch || this._touchEmulate) ? this._scroller : this._dom;
        };

        this._recalcClientRects = function() {
            var noTouch = !isTouch && !this._touchEmulate;
            if (noTouch) initScrollWidth();

            var cw = this.contentsWidth(),
                ch = this.contentsHeight(),
                sh = (this._scrollableH && noTouch) ? cw > this._rect.width : false,
                sv = (this._scrollableV && noTouch) ? ch > this._rect.height : false;

            this._sbH = sh || this._scrollH;
            this._sbV = sv || this._scrollV;
            this._clientRect = new Rect( this._rect.width +  (sv ? -1 : 0) * scrollWidth,
                                         this._rect.height + (sh ? -1 : 0) * scrollWidth );
            this._rectForChild = new Rect( this._rect.width +  ((sv && !widthIncludesScrollBar) ? -1 : 0) * scrollWidth,
                                           this._rect.height + ((sh && !widthIncludesScrollBar) ? -1 : 0) * scrollWidth );
        };

        this._updateClientRects = function() {
            var oldClientRect = this._clientRect;
            this._recalcClientRects();

            if (oldClientRect.width != this._clientRect.width || oldClientRect.height != this._clientRect.height) {
                this._resizeChildViews(oldClientRect);
            }
        };

        this._resizeChildViews = function(oldClientRect) {
            for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
                childViews[i].parentResized(oldClientRect, this._clientRect);
            };
        };

        this._layoutChildViews = function() {
            for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
                if (childViews[i]._needsLayout && childViews[i].visible()) {
                    childViews[i].layout();
                }
            };
        };

        this._layoutDom = function(rect) {
            this._updateClientRects();

            if (!isTouch && !this._touchEmulate) {
                if (this._layoutScrollH !== this._sbH) {
                    this._dom.style.overflowX = this._sbH ? 'scroll' : 'hidden';
                    this._layoutScrollH = this._sbH;
                }
                if (this._layoutScrollV !== this._sbV) {
                    this._dom.style.overflowY = this._sbV ? 'scroll' : 'hidden';
                    this._layoutScrollV = this._sbV;
                }
            } else {
                this._dom.style.overflowX = this._dom.style.overflowY = 'hidden';
            }

            Base._layoutDom.call(this, rect);

            if (isTouch || this._touchEmulate) {
                this._refresh();
            }
        };

        this.childResized = function() {
            this._needsLayout = true;
            uki.after(uki.proxy(this.layoutIfNeeded, this));
        };

        this._contentChanged = this.childResized;

        this._onTouchStart = function(e) {
             var matrix;

             this._isScrolling = true;

             e.preventDefault();
             e.stopPropagation();

             this._touchMoved = false;
             this._touchDist = 0;

             this._setTransitionTime('0');

             // Check if the scroller is really where it should be
             if (this._momentum) {
                 matrix = new WebKitCSSMatrix(window.getComputedStyle(this._scroller).webkitTransform);
                 if (matrix.e != this._x || matrix.f != this._y) {
                     uki.dom.unbind(this._scroller, 'webkitTransitionEnd', this._onTransitionEnd);
                     this._setPosition(matrix.e, matrix.f);
                     this._touchMoved = true;
                 }
             }

             this._touchStartX = isTouch ? e.changedTouches[0].pageX : e.pageX;
             this._scrollStartX = this._x;

             this._touchStartY = isTouch ? e.changedTouches[0].pageY : e.pageY;
             this._scrollStartY = this._y;

             this._scrollStartTime = e.timeStamp;
         };

         this._onTouchMove = function(e) {
             var pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,
                 pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,
                 leftDelta = this._scrollX ? pageX - this._touchStartX : 0,
                 topDelta = this._scrollY ? pageY - this._touchStartY: 0,
                 newX = this._x + leftDelta,
                 newY = this._y + topDelta;

             if (!this._isScrolling) {
                 return;
             }

             this._touchDist+= Math.abs(this._touchStartX - pageX) + Math.abs(this._touchStartY - pageY);

             this._touchStartX = pageX;
             this._touchStartY = pageY;

             // Slow down if outside of the boundaries
             if (newX > 0 || newX < this._maxScrollX) {
                 newX = this._bounce ? Math.round(this._x + leftDelta / 3) : newX >= 0 ? 0 : this._maxScrollX;
             }
             if (newY > 0 || newY < this._maxScrollY) {
                 newY = this._bounce ? Math.round(this._y + topDelta / 3) : newY >= 0 ? 0 : this._maxScrollY;
             }

             if (this._touchDist > 5) {            // 5 pixels threshold is needed on Android, but also on iPhone looks more natural
                 this._setPosition(newX, newY);
                 this._touchMoved = true;
             }
         };

         this._onTouchEnd = function(e) {
             var time = e.timeStamp - this._scrollStartTime,
                 target, ev,
                 momentumX, momentumY, newDuration, newPositionX, newPositionY;

             if (!this._isScrolling) {
                 return;
             }

             this._isScrolling = false;

             if (!this._touchMoved) {
                 this._resetPosition();

                 // Find the last touched element
                 target = isTouch ? e.changedTouches[0].target : e.target;
                 while (target.nodeType != 1) {
                     target = target.parentNode;
                 }

                 // Create the fake event
                 ev = document.createEvent('Event');
                 ev.initEvent('focus', true, true);
                 target.dispatchEvent(ev);

                 ev = document.createEvent('MouseEvents');
                 ev.initMouseEvent("click", true, true, e.view, 1,
                     target.screenX, target.screenY, target.clientX, target.clientY,
                     e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                     0, null);
                 ev._fake = true;
                 target.dispatchEvent(ev);

                 return;
             }

             if (!this._momentum || time > 250) {           // Prevent slingshot effetct
                 this._resetPosition();
                 return;
             }

             momentumX = this._scrollX === true
                 ? this._calcMomentum(this._x - this._scrollStartX,
                                 time,
                                 this._bounce ? -this._x + this._scrollWidth/5 : -this._x,
                                 this._bounce ? this._x + this._scrollerWidth - this._scrollWidth + this._scrollWidth/5 : this._x + this._scrollerWidth - this._scrollWidth)
                 : { dist: 0, time: 0 };

             momentumY = this._scrollY === true
                 ? this._calcMomentum(this._y - this._scrollStartY,
                                 time,
                                 this._bounce ? -this._y + this._scrollHeight/5 : -this._y,
                                 this._bounce ? (this._maxScrollY < 0 ? this._y + this._scrollerHeight - this._scrollHeight : 0) + this._scrollHeight/5 : this._y + this._scrollerHeight - this._scrollHeight)
                 : { dist: 0, time: 0 };

             if (!momentumX.dist && !momentumY.dist) {
                 this._resetPosition();
                 return false;
             }

             newDuration = Math.max(Math.max(momentumX.time, momentumY.time), 1);        // The minimum animation length must be 1ms
             newPositionX = this._x + momentumX.dist;
             newPositionY = this._y + momentumY.dist;

             this._scrollTo(newPositionX, newPositionY, newDuration + 'ms');
         };

         this._onTransitionEnd = function () {
             uki.dom.unbind(this._scroller, 'webkitTransitionEnd', this._onTransitionEnd);
             this._resetPosition();
         };

         this._refresh = function () {
             var resetX = this._x, resetY = this._y;

             this._scrollWidth = this._rect.width;
             this._scrollHeight = this._rect.height;
             this._scrollerWidth = this.contentsWidth();
             this._scrollerHeight = this.contentsHeight();
             this._maxScrollX = this._scrollWidth - this._scrollerWidth;
             this._maxScrollY = this._scrollHeight - this._scrollerHeight;

             if (this._scrollX) {
                 if (this._maxScrollX >= 0) {
                     resetX = 0;
                 } else if (this._x < this._maxScrollX) {
                     resetX = this._maxScrollX;
                 }
             }
             if (this._scrollY) {
                 if (this._maxScrollY >= 0) {
                     resetY = 0;
                 } else if (this._y < this._maxScrollY) {
                     resetY = this._maxScrollY;
                 }
             }
             if (resetX!=this._x || resetY!=this._y) {
                 this._setTransitionTime('0');
                 this._setPosition(resetX, resetY, true);
             }

             this._scrollX = this._scrollerWidth > this._scrollWidth;
             this._scrollY = !this._scrollX || this._scrollerHeight > this.scrollHeight;

             // Update horizontal scrollbar
             if (this._hScrollbar && this._scrollX) {
                 this._touchScrollBarH = (this._touchScrollBarH instanceof TouchScrollBar)
                     ? this._touchScrollBarH
                     : new TouchScrollBar('horizontal', this._dom, this._fadeScrollBar, this._shrinkScrollBar);
                 this._touchScrollBarH.init(this._scrollWidth, this._scrollerWidth);
             } else if (this._touchScrollBarH) {
                 this._touchScrollBarH = this._touchScrollBarH.remove();
             }

             // Update vertical scrollbar
             if (this._vScrollbar && this._scrollY && this._scrollerHeight > this._scrollHeight) {
                 this._touchScrollBarV = (this._touchScrollBarV instanceof TouchScrollBar)
                     ? this._touchScrollBarV
                     : new TouchScrollBar('vertical', this._dom, this._fadeScrollBar, this._shrinkScrollBar);
                 this._touchScrollBarV.init(this._scrollHeight, this._scrollerHeight);
             } else if (this._touchScrollBarV) {
                 this._touchScrollBarV = this._touchScrollBarV.remove();
             }
         };

         this._setPosition = function (x, y, hideScrollBars) {
             this._x = x;
             this._y = y;

             this._scroller.style.webkitTransform = cssTranslateOpen + this._x + 'px,' + this._y + 'px' + cssTranslateClose;

             // Move the scrollbars
             if (!hideScrollBars) {
                 if (this._touchScrollBarH) {
                     this._touchScrollBarH.setPosition(this._x);
                 }
                 if (this._touchScrollBarV) {
                     this._touchScrollBarV.setPosition(this._y);
                 }
             }
         };

         this._setTransitionTime = function(time) {
             time = time || '0';
             this._scroller.style.webkitTransitionDuration = time;

             if (this._touchScrollBarH) {
                 this._touchScrollBarH.bar.style.webkitTransitionDuration = time;
                 this._touchScrollBarH.wrapper.style.webkitTransitionDuration = cssHas3d && this._fadeScrollBar ? '300ms' : '0';
             }
             if (this._touchScrollBarV) {
                 this._touchScrollBarV.bar.style.webkitTransitionDuration = time;
                 this._touchScrollBarV.wrapper.style.webkitTransitionDuration = cssHas3d && this._fadeScrollBar ? '300ms' : '0';
             }
         };

         this._resetPosition = function (time) {
             var resetX = this._x,
                 resetY = this._y,
                 time = time || '500ms';

             if (this._x >= 0) {
                 resetX = 0;
             } else if (this._x < this._maxScrollX) {
                 resetX = this._maxScrollX;
             }

             if (this._y >= 0 || this._maxScrollY > 0) {
                 resetY = 0;
             } else if (this._y < this._maxScrollY) {
                 resetY = this._maxScrollY;
             }

             if (resetX != this._x || resetY !=this._y) {
                 this._scrollTo (resetX, resetY, time);
             } else if (this._touchScrollBarH) {
                 this._touchScrollBarH.hide();
             } else if (this._touchScrollBarV) {
                 this._touchScrollBarV.hide();
             }
         };

         this._scrollTo = function (destX, destY, runtime) {
             this._setTransitionTime(runtime || '450ms');
             this._setPosition(destX, destY);

             if (runtime==='0' || runtime=='0s' || runtime=='0ms') {
                 this._resetPosition();
             } else {
                 uki.dom.bind(this._scroller, 'webkitTransitionEnd', uki.proxy(this._onTransitionEnd, this));
             }
         };

         this._calcMomentum = function (dist, time, maxDistUpper, maxDistLower) {
             var friction = 2.5,
             deceleration = 1.2,
             speed = Math.abs(dist) / time * 1000,
             newDist = speed * speed / friction / 1000,
             newTime = 0;

             // Proportinally reduce speed if we are outside of the boundaries
             if (dist > 0 && newDist > maxDistUpper) {
                 speed = speed * maxDistUpper / newDist / friction;
                 newDist = maxDistUpper;
             } else if (dist < 0 && newDist > maxDistLower) {
                 speed = speed * maxDistLower / newDist / friction;
                 newDist = maxDistLower;
             }

             newDist = newDist * (dist < 0 ? -1 : 1);
             newTime = speed / deceleration;

             return { dist: Math.round(newDist), time: Math.round(newTime) };
        };
    });

    uki.view.ScrollPane.initScrollWidth = initScrollWidth;
})();

uki.Collection.addAttrs(['scrollTop', 'scrollLeft']);
uki.fn.scroll = function(dx, dy, runtime) {
    this.each(function() {
        this.scroll(dx, dy, runtime);
    });
};