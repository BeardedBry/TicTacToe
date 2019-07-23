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

     let Xrow = check(boardArray,'x');
     let Orow = check(boardArray,'o');

     let Xvert = checkCols('x');
     let Overt = checkCols('o');

     let Xcross = checkAcross('x');


     console.log('X accross: ' + Xcross);
     console.log('X vert: ' + Xvert);
     console.log('X row: ' + Xrow);



      function check(array, letter){
        
        return array.some((row)=>{ // 'some' works like forEach but looks until it finds a true value.
          return row.every(function(currentValue){
            return currentValue == letter;
          });
        });

      }

      function checkCols(letter){
        // TODO: Convert boardArray intro three arrays from each position in the original. (making the verticle columns). 
        // [ [0,1,2], [0,1,2], [0,1,2]]  :  [ [0,0,0], [1,1,1], [2,2,2] ]
        var vert = [[],[],[]];

        // convert array to be verticle.
        boardArray.forEach((row)=>{
          for(let i = 0; i < row.length; i++){
            vert[i].push(row[i]);
            }
        });
        // check for match, just like in horizontal.
        return check(vert,letter);
      }


        function checkAcross(letter){
          // convert array to match diagonal.
        var diag = [[],[]];

        for(let j = 0, i = boardArray.length-1; j < boardArray.length; j++){
          diag[0].push(boardArray[j][j]);
          diag[1].push(boardArray[i][j]);
          i--;
        }
        return check(diag,letter);
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