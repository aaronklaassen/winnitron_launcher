var $ = require("jquery");
var child = require("child_process");

var KEYS = {
  UP:     38,
  DOWN:   40,
  LEFT:   37,
  RIGHT:  39,
  ENTER:  13
};

var currentMenuSelection = 1;
var GAMES;

function handleKeyPress(keycode) {
  switch(keycode) {
    case KEYS.UP:
      selectGame(-1);
      break;
    case KEYS.DOWN:
      selectGame(1);
      break;
    case KEYS.ENTER:
      launchGame();
      break;
  }
}

function launchGame() {
  filename = GAMES[currentMenuSelection - 1].exec;
  console.log("LAUNCHING: " + filename);

  var game = child.exec(filename, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('Child Process STDOUT: '+stdout);
    console.log('Child Process STDERR: '+stderr);
  });

  game.on('exit', function (code) {
    console.log('Child process exited with exit code '+code);
  });
}

function selectGame(direction) {
  currentMenuSelection += direction

  if (currentMenuSelection < 1)
    currentMenuSelection = GAMES.length;

  if (currentMenuSelection > GAMES.length)
    currentMenuSelection = 1;

  $("#gamelist li").removeClass("selected");
  $("#gamelist li:nth-child(" + currentMenuSelection + ")").addClass("selected");
}

function loadGames() {

  GAMES = [
            {
              "name": "Calculator",
              "exec": "/Applications/Calculator.app/Contents/MacOS/Calculator"
            },
            {
              "name": "Calendar",
              "exec": "/Applications/Calendar.app/Contents/MacOS/Calendar"
            },
            {
              "name": "Safari",
              "exec": "/Applications/Safari.app/Contents/MacOS/Safari"
            }
          ];

  GAMES.forEach(function(game) {
    var li = "<li>" + game.name + "</li>";
    $("#gamelist").append(li);
  });
  $("#gamelist li:nth-child(1)").addClass("selected");

}


$(function() {

  loadGames();

  $("body").keydown(function(e) {
    handleKeyPress(e.which);
  });
})