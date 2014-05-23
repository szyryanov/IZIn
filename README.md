IZIn - html Images Zoom In/out feature
======================================

This JavaScript-based package allows you to add "image zoom in/out" feature to your HTML pages;
version 1.0.1

How it looks
-----------

When a user moves a mouse over a thumb image, the mouse cursor becomes "zoom-in" one:

![zoom in cursor over a thumb image](http://szyryanov.github.io/Portfolio/IZIn/readme-images/thumb-mouse-over.gif)

When a user clicks the thumb image, a popup animates to show a zoomed in image:

![zoomed in image](http://szyryanov.github.io/Portfolio/IZIn/readme-images/zoomed-in-image.gif)

If the full image size is larger than the browser window, then clicking the image again opens a new browser tab with full sized image. If the image with margins fits the browser window, then the second click closes the popup. Clicking the margin (between browser and popup boundaries) always closes the popup.

Demo
-----------

Click [here](http://szyryanov.github.io/Portfolio/IZIn/index.html) to see it in action.

Dependencies:
-------------

The package requires [jQuery](http://jquery.com) library.

How to use:
-----------

1. Download the [minified package](http://szyryanov.github.io/Portfolio/IZIn/files/izin.min.zip). Also, you can download the [uncompressed package](http://szyryanov.github.io/Portfolio/IZIn/files/izin.dev.zip), or the [full package](http://szyryanov.github.io/Portfolio/IZIn/files/izin.zip) containing both versions.
2. Unzip the package into a directory on your website, e.g. /lib/izin
3. Add the jQuery library reference on the page, if not added yet
4. Add the izin.min.js (or izin.js) script reference on the page (the css file will be loaded by the script, you don't need to add it)

Now the package is set, and you need to specify the images involved in the zooming feature.
Add `data-izin="image-url"` attribute to the thumb image tag. If you useone image file for both thumb and larger images, then just add an empty `data-izin` attribute.

The resulting HTML code can looks like the following:

    	<img src="img/thumb1.gif" data-izin="img/image1.jpg" />    
		
		<img src="img/image2.jpg" width="200" data-izin /> 

    	<script src="lib/jquery/jquery-1.10.2.min.js"></script>
    	<script src="lib/izin/izin.min.js"></script>

	   </body>
	</html>

License:
--------

This projected is licensed under the terms of the MIT license.