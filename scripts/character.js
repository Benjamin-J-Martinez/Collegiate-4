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