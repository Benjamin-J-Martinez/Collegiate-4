export class Player {
    constructor(id, character) {
        this._id = id;
        this._character = character;

        if(id === 1)
            this._status = true;
        else
            this._status = false;

    }
}