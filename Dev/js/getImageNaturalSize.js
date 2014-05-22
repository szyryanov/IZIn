
function getImageNaturalSize($imgElement) {
    var width = 10;
    var height = 10;
    //
    var imgElement = $imgElement[0];
    if (imgElement.naturalWidth !== undefined) {
        width = imgElement.naturalWidth;
        height = imgElement.naturalHeight;
    } else {
        var i = new Image();
        i.src = imgElement.src;
        width = i.width;
        height = i.height;
    }
    //
    return { width: width, height: height, toString: function () { return width + "x" + height; } };
}
