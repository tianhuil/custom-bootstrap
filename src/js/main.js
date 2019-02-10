var setHeight = function(){
  $('.header').height($(window).height());
}

$(document).ready(setHeight)
window.onresize(setHeight)
