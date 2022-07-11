export class Character {
    constructor(name, college, info) {
        this._name = name;
        this._collge = college;
        this._info = info;
    }

    get name() { return this._name; }
    get college() { return this._collge; }
    get info() { return this._info; }
}

export const character = [new Character('Scrappy', 'University of North Texas', 'Scrappy is the mascot of the University of North Texas. The name Scrappy wsa chosen by students in 1995.')];