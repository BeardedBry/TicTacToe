/* jshint esversion: 6 */
"use strict";

class Game {
    
    constructor(table, display){
      this.table = table;
      this.count = 0;
      this.turn = null;
      this.display = display;
      this.winner = 'nobody';
    }
  
    click(target){
        //console.dir(target);
        //console.log(this.turn.letter);
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


    checkForWinner(boardArray) {
      if(this.count < 5){
        return;
      }
      console.log("checking for winner");

     let Xrow = checkRows('x');
     let Orow = checkRows('o');

     var row1,row2,row3;
    [row1, row2, row3] = boardArray;

     let Xvert = checkCols('x');
     console.log(Xvert);


      function checkRows(player){
        return boardArray.some(function(row){

          for(let i=0; i<row.length; i++){
            if(row[i] !== player){
              return false;
            }
          }
          return true;
          });
      }

      function checkCols(player){
        for(let i = 0; i < 3; i++){
          if(row1[i] == 'x' && row2[i] == 'x' && row3[i] == 'x')
            return true;
        }
        return false;
      }

    }

    winner(player){
      console.log("Player " + player + " is the winner!");
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
        let gridColumn = 0;

        for( let i = 0; i < cellContents.length; i++ ){
          if( i < 3 ){
            this.grid[0][gridColumn] = cellContents[i];
          }
          else if( i < 6 ){
            this.grid[1][gridColumn] = cellContents[i];
          }else{
            this.grid[2][gridColumn] = cellContents[i];
          }
          gridColumn++;
          if(gridColumn > 2){gridColumn = 0;}
        }

      }

  }
  
  
  // Instantiate Game
  const game = new Game(document.querySelector('TABLE'),document.querySelector('.player'));
  const board = new Board(document.querySelectorAll('TD'));
  const player1 = new Player('x');
  const player2 = new Player('o');

  //board.populateGrid(game.table);
  game.turn = player1;

  //Pretty much the game loop
  game.table.addEventListener('click',function(e){
      if(e.target.nodeName == 'TD' && e.target.textContent == ""){
        game.click(e.target);
        board.populateGrid();
        game.checkForWinner(board.grid);
      }
    });