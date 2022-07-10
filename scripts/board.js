export class Board {
    constructor() {
        this._board = [[0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0]];
        this._status = 0; //game is still going.
    }

    //This method places player tile on the board given a tile at the next open row
    placeTile(col, player) {

        if(this._board[0][col])
            return null;

        for(let i = 1; i < this._board.length; i++) {
            if(this._board[i][col])
                this._board[i-1][col] = player;
        }
    }

    //This method checks the board for a connect 4 if one has occured.
    getStatus() {
        let p1 = 0;
        let p2 = 0;

        //checks this._board.length for a connect 4
        for(let i = this._board.length-1; i >= 0; i--) {
            for(let j = 0; j < this._board[0].length; j++) {
                if(this._board[i][j] === 1) {
                    p1++;
                    p2 = 0;
                } else if(this._board[i][j] === 2) {
                    p2++;
                    p1 = 0;
                } else {
                    p1 = 0;
                    p2 = 0;
                }

                if(p1 === 4)
                    return 1;
                
                if(p2 === 4)
                    return 2;
            }

            p1 = 0;
            p2 = 0;
        }

        //checks columns for a connect 4
        for(let j = 0; j < this._board[0].length; j++) {
            for(let i = this._board.length; i >= 0; i--) {
                if(this._board[i][j] === 1) {
                    p1++;
                    p2 = 0;
                } else if(this._board[i][j] === 2) {
                    p2++;
                    p1 = 0;
                } else {
                    p1 = 0;
                    p2 = 0;
                }

                if(p1 === 4)
                    return 1;
                
                if(p2 === 4)
                    return 2;
            }

            p1 = 0;
            p2 = 0;
        }

        //checks diagnol for a connect 4 (bottom left to top right)
        for(let line = 1; line <= (this._board.length + this._board[0].length - 1); line++)
        {
            let start_col =  (0 > line - this._board.length) ? 0 : line - this._board.length;

            let temp = (line < (this._board[0].length - start_col)) ? line : (this._board[0].length - start_col);
            let count = (temp < this._board.length) ? temp : this._board.length;

            for(let j = 0; j < count; j++) {
                let minu = (this._board.length < line) ? this._board.length : line;

                if(this._board[minu - j - 1][start_col + j] == 1) {
                    p1++;
                    p2 = 0;
                } else if(this._board[minu - j - 1][start_col + j] == 2) {
                    p2++;
                    p1 = 0;
                } else {
                    p1 = 0;
                    p2 = 0;
                }
                
                if(p1 == 4)
                    return 1;
                
                if(p2 == 4)
                    return 2;
            }

            p1 = 0;
            p2 = 0;
        }

        //first half of diagnol (top left to bottom right)
        for(let rowStart = 0; rowStart < this._board.length - 3; rowStart++) {
            let row;
            let col;
            
            for(row = rowStart, col = 0; row < this._board.length && col < this._board[0].length; row++, col++ ) {
                if(this._board[row][col] == 1) {
                    p1++;
                    p2 = 0;
                } else if(this._board[row][col] == 2) {
                    p2++;
                    p1 = 0;
                } else {
                    p1 = 0;
                    p2 = 0;
                }
                
                if(p1 == 4)
                    return 1;
                
                if(p2 == 4)
                    return 2;
            }

            p1 = 0;
            p2 = 0;
        }

        //second half of diagnol (top left to bottom right)
        for(let colStart = 1; colStart < this._board[0].length - 3; colStart++) {
            let row, col;
            for(row = 0, col = colStart; row < this._board.length && col < this._board[0].length; row++, col++ ) {
                if(this._board[row][col] == 1) {
                    p1++;
                    p2 = 0;
                } else if(this._board[row][col] == 2) {
                    p2++;
                    p1 = 0;
                } else {
                    p1 = 0;
                    p2 = 0;
                }
                
                if(p1 == 4)
                    return 1;
                
                if(p2 == 4)
                    return 2;
            }

            p1 = 0;
            p2 = 0;
        }

        return 0;
    }

    
}

    