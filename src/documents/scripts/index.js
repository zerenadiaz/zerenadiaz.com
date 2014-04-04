var Modernizr = require('./vendor/modernizr');

var $ = jQuery = require('jquery');
require('laziestloader/jquery.laziestloader');

$(function() {
  window.onresize = resize;
  resize();

  $("img.lazy").laziestloader({
    threshold : 200,
  }, function () {
    this.style.opacity = 1;
  });

  // load the first few images in each column
  $(".left.column img.lazy").slice(0,2).trigger("laziestloader");
  $(".right.column img.lazy").slice(0,2).trigger("laziestloader");
});

function resize () {
  $("img.lazy").removeAttr("height");
  $("img.lazy").attr("width", window.innerWidth * 0.40);
}