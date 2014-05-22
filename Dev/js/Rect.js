
// -------------------------------------------
//                 constructor:
// -------------------------------------------

function Rect(left, top, width, height) {
    //
    if (left instanceof Rect) {
        var rect = left;
        //
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    } else {
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
    }
}

// -------------------------------------------
//            static functions:
// -------------------------------------------

Rect.getElementRect = function (element) {
    var $element = $(element);
    var offset = $element.offset();
    var width = $element.width();
    var height = $element.height();
    //
    return new Rect(offset.left, offset.top, width, height);
};

Rect.getWindowRect = function () {
    var $window = $(window);
    //
    var top = $window.scrollTop();
    var width = $window.width();
    var height = $window.height();
    //
    return new Rect(0, top, width, height);
};

Rect.getCenteredRect = function (width, height, windowRect) {
    if (!windowRect) windowRect = Rect.getWindowRect();
    //
    var left = windowRect.left + (windowRect.width - width) / 2;
    var top = windowRect.top + (windowRect.height - height) / 2;
    //
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    //
    return new Rect(left, top, width, height);
};


// -------------------------------------------
//            member functions:
// -------------------------------------------

/*
Rect.prototype.applyTo = function (element) {
    var $element = $(element);
    //
    $element.css("top", this.top);
    $element.css("left", this.left);
    $element.width(this.width);
    $element.height(this.height);
}

Rect.prototype.animateTo = function (element, duration, callback) {
    var $element = $(element);
    //
    return $element.animate({
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
    }, duration, callback);
}

*/