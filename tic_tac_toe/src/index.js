const Game = require("../node_logic/game");
const game = new Game();

$(() => {
  const View = require("./ttt-view");
  $board = $('.ttt');
  const view = new View(game, $board);
  // view.setupBoard();
  // view.bindEvents();

});


