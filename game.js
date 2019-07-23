/* jshint esversion: 6 */
"use strict";

class Game {
    
    constructor(table, display, players){
      this.table = table;
      this.count = 0;
      this.players = players;
      this.display = display;
      this.winner = 'nobody';
    }
  
    click(target){

        this.count++;
        let currentIndex = this.players.findIndex((player)=>player.turn == true);
        let otherIndex = this.players.findIndex((player)=>player.turn !== true);
        target.textContent = this.players[currentIndex].letter;

        this.players[currentIndex].turn = false;
        this.players[otherIndex].turn = true;
    }


    checkForWinner(boardArray) {
      console.log("checking for winner");

     let Xrow = check(boardArray,'x');
     let Orow = check(boardArray,'o');
     let Xvert = checkCols('x');
     let Overt = checkCols('o');
     let Xcross = checkAcross('x');
     let Ocross = checkAcross('o');



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
      this.turn = false;
    }
  }
  
  
  class Board {

      constructor(cells){
        this.grid = [];
        this.cells = Array.prototype.slice.call(cells);
      }

      populateGrid(){
        this.grid.length = 0;
        this.grid = [[],[],[]];
        let cellContents = this.cells.map((cell)=>cell.textContent);

        for( let i = 0, j=0; i < cellContents.length; i++ ){
          this.grid[j].push(cellContents[i]);
          if( (i+1)%3 === 0 ){
            j++;
          }
        }
        //console.log(this.grid);
      }

  }
  
  
  // Instantiate Game
  const player1 = new Player('x');
  const player2 = new Player('o');
  const game = new Game(document.querySelector('TABLE'),document.querySelector('.player'), [player1,player2]);
  const board = new Board(document.querySelectorAll('TD'));
 
  player1.turn = true;

  //Pretty much the game loop
  game.table.addEventListener('click',function(e){
      if(e.target.nodeName == 'TD' && e.target.textContent == ""){
        game.click(e.target);
        
        if(game.count > 4){  
          board.populateGrid();
          game.checkForWinner(board.grid);
        }
      }
    });