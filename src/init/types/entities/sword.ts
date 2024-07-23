import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";

var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

export default class Sword extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
    }

    static init = (reference: Sword) => new Sword(reference.level, Pos2.init(reference), reference.rotation);

    render(): void {
        const swordCell = findCell(this!.y, this!.x);
        swordCell!.classList.add('sword');
        const modRotate = mod(this!.rotation, 360);
        var rotatedSet = `rotate(${mod(modRotate, 180)}deg)`;
        rotatedSet += modRotate >= 180 ? ' rotateY(180deg)' : '';
        swordCell!.style.setProperty('transform', rotatedSet);
    }

    clear(): void {
        const swordCell = findCell(this!.y, this!.x);
        if (swordCell == null) return;
        swordCell!.style.removeProperty('transform');
        swordCell!.classList.remove('sword');
    }
}