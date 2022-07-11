import {Player} from './player.js';
import {Board} from './board.js';

export class Game {
    constructor(player1, player2) {
        this._player1 = player1;
        this._player2 = player2;
        this._status = 0;
        this._board = new Board();
    }
}