/* jshint esversion: 6 */

class Game {
    
    constructor(table, display){
      this.table = table;
      this.count = 0;
      this.turn = null;
      this.display = display;
    }
  
    checkForWinner(boardArray) {
      if(this.count < 5){
        return;
      }
      console.log("checking for winner");
    }
  
    click(target){
        //console.dir(target);
        console.log(this.turn.letter);
        this.count++;
        target.textContent = this.turn.letter;

        if(this.turn == player1){
            this.turn = player2;
            this.display.textContent = player2.letter;
        }else{
            this.turn = player1;
            this.display.textContent = player1.letter;
        }
    }
  
  }
  
  class Player {
    
    constructor(letter){
      this.letter = letter;
    }
  }
  
  
  class Board {

      constructor(cells){
        this.grid = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ];
        this.cells = Array.prototype.slice.call(cells);
      }

      populateGrid(){
        let cellContents = this.cells.map((cell)=>cell.textContent);

      }

  }
  
  
  // Instantiate Game
  const game = new Game(document.querySelector('TABLE'),document.querySelector('.player'));
  const board = new Board(document.querySelectorAll('TD'));
  const player1 = new Player('x');
  const player2 = new Player('o');

  //board.populateGrid(game.table);
  game.turn = player1;

  game.table.addEventListener('click',function(e){
      if(e.target.nodeName == 'TD' && e.target.textContent == ""){
        game.click(e.target);
        board.populateGrid();
        game.checkForWinner(board.grid);
      }
    });