
function ZoomPopup() {
    this._init();
}


(function () {

    // -------------------------------------------
    //                 Public:
    // -------------------------------------------

    ZoomPopup.prototype.startHide = function () {
        this._startHide();
    };

    ZoomPopup.prototype.startShow = function ($thumb) {
        this._startShow($thumb);
    };

    ZoomPopup.prototype.startShowError = function () {
        this._startShowError();
    };

    ZoomPopup.prototype.startShowImage = function () {
        this._startShowImage();
    };

    // -------------------------------------------
    //                 Constants:
    // -------------------------------------------

    var DURATION_ZOOM_IN_LOADING = 500;
    var DURATION_ZOOM_IN_SHOW = 300;
    var DURATION_ZOOM_OUT = 400;

    var MIN_WIDTH = 200;
    var MIN_HEIGHT = 150;
    var BORDER = 5;
    var INDENT = 30;

    // -------------------------------------------
    //                 _init():
    // -------------------------------------------

    ZoomPopup.prototype._init = function () {

        var that = this;

        function getPopupHtml() {
            var html = '';
            //
            html += '<div class="img-zoom-popup img-zoom-hidden cursor-zoom-out"> \r\n';
            html += '    <img class="img-zoom-loading" src="img/image-loading.gif"  /> \r\n';
            html += '    <a href="#" target="_blank" class="img-zoom-a-big"><img class="img-zoom-large" /></a> \r\n';
            html += '    <p class="img-zoom-error"> \r\n';
            html += '        <span>Error loading image:</span><br /> \r\n';
            html += '        <a href="img/normal1.gif">http://xxxxx.gif</a> \r\n';
            html += '    </p> \r\n';
            html += '</div> \r\n';
            //
            return html;
        }

        function createElements(html) {
            that.$div = $(html);
            that.$imgLoading = $(".img-zoom-loading", that.$div);
            that.$imgLarge = $(".img-zoom-large", that.$div);
            that.$aBig = $(".img-zoom-a-big", that.$div);
            that.$pError = $(".img-zoom-error", that.$div);
            that.$aError = $(".img-zoom-error a", that.$div);
        }

        function createMemberVariables() {
            that.$thumb = null;
            //
            that.fullSize = null;
            that.handleResizeActive = false;
            that.useMinRect = false;
        }

        function addBigLinkClickHandler() {
            that.$aBig.click(function (evt) {
                if (!that._isBigLinkEnabled()) {
                    evt.preventDefault();
                }
            });
        }

        function addWindowResizeHandler() {
            $(window).resize(_debounce(function () {
                if (that.handleResizeActive) that._resizePopup();
            }, 150));
        }

        function addPopupToPageBody() {
            $("body").append(that.$div);
        }

        createElements(getPopupHtml());
        createMemberVariables();
        addBigLinkClickHandler();
        addWindowResizeHandler();
        addPopupToPageBody();

    };

    // -------------------------------------------
    //                 _setView():
    // -------------------------------------------

    var VIEW_HIDDEN = 0;
    var VIEW_LOADING = 1;
    var VIEW_ERROR = 2;
    var VIEW_IMAGE = 3;

    ZoomPopup.prototype._setView = function (view) {

        function setVisible($element, visible) {
            if (visible) $element.show(); else $element.hide();
        }

        if (view == VIEW_HIDDEN) this.$div.addClass("img-zoom-hidden");
        //
        setVisible(this.$imgLoading, view === VIEW_LOADING);
        setVisible(this.$imgLarge, view === VIEW_IMAGE);
        setVisible(this.$pError, view === VIEW_ERROR);
        //
        if (view === VIEW_ERROR) {
            this.$aError.prop("href", this.$imgLarge.prop("src"));
            this.$aError.text(this.$imgLarge.prop("src"));
        }
        //
        if (view != VIEW_HIDDEN) this.$div.removeClass("img-zoom-hidden");
    };

    // -------------------------------------------
    //                BigLink:
    // -------------------------------------------

    ZoomPopup.prototype._enableBigLink = function () {
        this.$aBig.prop("href", this.$imgLarge.prop("src"));
        //
        this.$imgLarge.removeClass("cursor-zoom-out");
        this.$imgLarge.addClass("cursor-zoom-in");
    };

    ZoomPopup.prototype._disableBigLink = function () {
        this.$aBig.prop("href", "#");
        //
        this.$imgLarge.removeClass("cursor-zoom-in");
        this.$imgLarge.addClass("cursor-zoom-out");
    };

    ZoomPopup.prototype._isBigLinkEnabled = function () {
        return this.$imgLarge.hasClass("cursor-zoom-in");
    };

    // -------------------------------------------
    //                utilites:
    // -------------------------------------------

    function calcPopupRect(width, height, windowRect) {
        if (!windowRect) windowRect = Rect.getWindowRect();
        //
        var left = (windowRect.width - width) / 2;
        var top = (windowRect.height - height) / 2;
        //
        if (left < INDENT) left = INDENT;
        if (top < INDENT) top = INDENT;
        //
        return new Rect(windowRect.left + left, windowRect.top + top, width, height);
    }

    function calcPopupMinRect() {
        var windowRect = Rect.getWindowRect();
        var minRect = calcPopupRect(MIN_WIDTH, MIN_HEIGHT, windowRect);
        return minRect;
    }

    function calcPopupLoadTargetRect() {
        var windowRect = Rect.getWindowRect();
        var popupRect = calcPopupRect(windowRect.width / 2, windowRect.height / 2, windowRect);
        return popupRect;
    }

    // -------------------------------------------
    //                _animatePopup():
    // -------------------------------------------

    // _animatePopup(rect, duration, opacity, callback = undefined)
    // _animatePopup(rect, duration, callback = undefined)
    ZoomPopup.prototype._animatePopup = function (rect, duration, opacity, callback) {
        if (typeof (opacity) == "function") {
            callback = opacity;
            opacity = 1;
        }
        //
        if (opacity === undefined) opacity = 1;
        //
        this.$div.animate({
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            opacity: opacity
        }, duration, callback);
    };

    // -------------------------------------------
    //                _resizePopup():
    // -------------------------------------------

    ZoomPopup.prototype._resizePopup = function () {
        if (this.useMinRect) {
            this._animatePopup(calcPopupMinRect(), DURATION_ZOOM_IN_SHOW);
            return;
        }
        //
        var windowRect = Rect.getWindowRect();
        //
        var space = (INDENT + BORDER) * 2;
        var useFullSize = (this.fullSize.width <= MIN_WIDTH) || ((this.fullSize.width + space) <= windowRect.width);
        if (useFullSize) {
            var largeRect = calcPopupRect(this.fullSize.width, this.fullSize.height, windowRect);
            this._animatePopup(largeRect, DURATION_ZOOM_IN_SHOW);
            //
            this.$imgLarge.width("");
            //
            this._disableBigLink();
        } else {
            var popup_width = windowRect.width - space;
            var popup_height = calcResizedHeight(this.fullSize, popup_width);
            //
            var resizedRect = calcPopupRect(popup_width, popup_height, windowRect);
            //
            if (this.$imgLarge.width() < popup_width) {
                this.$imgLarge.width(popup_width);
                this._animatePopup(resizedRect, DURATION_ZOOM_IN_SHOW);
            } else {
                var that = this;
                this._animatePopup(resizedRect, DURATION_ZOOM_IN_SHOW, function () {
                    that.$imgLarge.width(popup_width);
                });
            }
            //
            this._enableBigLink();
        }
    };

    // -------------------------------------------
    //                Public implementation:
    // -------------------------------------------

    ZoomPopup.prototype._startHide = function () {
        var that = this;
        this.handleResizeActive = false;
        var thumbRect = Rect.getElementRect(this.$thumb);
        this._animatePopup(thumbRect, DURATION_ZOOM_OUT, 0.3, function () {
            that._setView(VIEW_HIDDEN);
        });
    };


    ZoomPopup.prototype._startShow = function ($thumb) {
        this.$thumb = $thumb;
        //
        var thumbRect = Rect.getElementRect($thumb);
        this._animatePopup(thumbRect, 0, 0.3);
        //
        this._setView(VIEW_LOADING);
        this.$imgLarge.width("");
        //
        var popupRect = calcPopupLoadTargetRect();
        this._animatePopup(popupRect, DURATION_ZOOM_IN_LOADING);
        //
        this._disableBigLink();
    };

    ZoomPopup.prototype._startShowError = function () {
        this.$div.stop();
        //
        this.useMinRect = true;
        this.fullSize = { width: MIN_WIDTH, height: MIN_HEIGHT };
        this._animatePopup(calcPopupMinRect(), DURATION_ZOOM_IN_SHOW);
        this._setView(VIEW_ERROR);
        //
        this.handleResizeActive = true;
    };

    ZoomPopup.prototype._startShowImage = function () {
        this.$div.stop();
        //
        this._setView(VIEW_IMAGE);
        //
        var largeSize = getImageNaturalSize(this.$imgLarge);
        this.fullSize = largeSize;
        //
        var largeIsSmall = ((largeSize.width < MIN_WIDTH) && (largeSize.height < MIN_HEIGHT));
        if (largeIsSmall) {
            this.useMinRect = true;
            this.$imgLarge.addClass("img-zoom-large-low");
            this._animatePopup(calcPopupMinRect(), DURATION_ZOOM_IN_SHOW);
        } else {
            this.useMinRect = false;
            this.$imgLarge.removeClass("img-zoom-large-low");
            //
            this._resizePopup();
        }
        //
        this.handleResizeActive = true;
    };


}());



