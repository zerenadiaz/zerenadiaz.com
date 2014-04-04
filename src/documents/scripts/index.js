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
});

function resize () {
  $("img.lazy").attr("width", window.innerWidth * 0.40);
}