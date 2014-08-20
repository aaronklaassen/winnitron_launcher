var $ = require("jquery");
var child = require("child_process");
var gui = global.window.nwDispatcher.requireNwGui();


var KEYS = {
  UP:     38,
  DOWN:   40,
  LEFT:   37,
  RIGHT:  39,
  ENTER:  13,
  ESC:    27
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
    case KEYS.ESC:
      gui.App.quit();
      break;
    default:
      console.log(keycode);
      break;
  }

}

function launchGame() {
  filename = GAMES[currentMenuSelection - 1].exec;
  console.log("LAUNCHING: " + filename);

  /*
  var game = child.execFile(filename, [], { cwd: "C:/GOG/Wing Commander IV/" }, function (error, stdout, stderr) {
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
  */

  gui.Shell.openItem(filename);
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
              "exec": "C:/windows/system32/calc.exe"
            },
            {
              "name": "WC4",
              "exec": "C:/GOG/Wing Commander IV/Launch Wing Commander IV.lnk"
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

  gui.Window.get().enterFullscreen(); // For some reason Windows needs this.

  loadGames();

  $("body").keydown(function(e) {
    handleKeyPress(e.which);
  });
})