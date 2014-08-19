var $ = require("jquery");

var KEYS = {
  UP:     38,
  DOWN:   40,
  LEFT:   37,
  RIGHT:  39,
  ENTER:  13
};

var totalMenuOptions = 4;
var currentMenuSelection = 1;

function handleKeyPress(keycode) {
  switch(keycode) {
    case KEYS.UP:
      selectGame(-1);
      break;
    case KEYS.DOWN:
      selectGame(1);
      break;
  }
}

function selectGame(direction) {
  currentMenuSelection += direction

  if (currentMenuSelection < 1)
    currentMenuSelection = totalMenuOptions;

  if (currentMenuSelection > totalMenuOptions)
    currentMenuSelection = 1;

  $("#gamelist li").removeClass("selected");
  $("#gamelist li:nth-child(" + currentMenuSelection + ")").addClass("selected");
}


$(function() {
  $("body").keydown(function(e) {
    handleKeyPress(e.which);
  });
})