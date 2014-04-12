var $ = jQuery = require('jquery');
require('laziestloader/jquery.laziestloader');
require('salvattore');

$(function() {
  window.onresize = resize;
  resize();

  $(".images img.lazy").laziestloader({
    threshold : 200,
  }, function () {
    this.style.opacity = 1;
  });
});

function resize () {
  var width = window.innerWidth * 0.40;
  $(".images > .column > .item").removeAttr("height");
  $(".images img.lazy").attr("width", width);
};