export default class Pos2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static init(reference: Pos2): Pos2 {
        return new Pos2(reference.x, reference.y);
    }
}