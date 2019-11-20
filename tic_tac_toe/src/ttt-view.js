class View {
  constructor(game, $el) {
    this.game = game;
    this.$fig = $el;
    this.setupBoard();
    this.bindEvents();

  }

  bindEvents() {
    this.$fig.on("click", 'li', (ele) => {
      let $li = $(ele.target);
      this.makeMove($li);
    });
  }

  makeMove($square) {
    let pos = $square.attr('id').split(",").map((char) => parseInt(char));
    console.log(pos);
    try { 
      this.game.playMove(pos);
     } catch (e) {
      alert("Invalid move!");
      this.game.playMove(pos);
    }
    $square.text(this.game.currentPlayer);
    $square.removeClass("unplayed");
    $square.addClass("played");
    if(this.game.isOver()) {
      this.showWinner();
      this.$fig.off("click");
    }

  }

  showWinner() {
    const winnerMark = this.game.winner();
    let $lis = $('li');
    $lis.each((i, ele) => {
      if(!$(ele).text()) {
        $(ele).removeClass("unplayed");
        $(ele).addClass("played");
      }
    });
    if(!winnerMark) {
      $lis.each((i, ele) => {
        $(ele).removeClass("played");
        $(ele).addClass("draw");
      });
      this.$fig.append("<p>Draw...</p>");
    } else {
      $lis.each((i, ele) => {
        if ($(ele).text() !== winnerMark && $(ele).text()) {
          $(ele).removeClass("played");
          $(ele).addClass("win");
        }
      });
      $('section').append(`<p>${winnerMark} is the winner...</p>`);
    }
  }

  setupBoard() {
    this.$fig.append('<ul>');
    let $ul = this.$fig.find('ul');
    $ul.addClass('board');
    let row;
    let col = 0;
    for(let i = 0; i < 9; i++) {
      row = i % 3;

      $ul.append('<li>');
      $('li').last().attr('id', `${col}, ${row}`);
      $('li').last().addClass('unplayed');
      if (row === 2) {
        col = (col + 1) % 3;
      }
    }
  }
}

module.exports = View;
