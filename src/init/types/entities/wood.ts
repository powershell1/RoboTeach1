import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";

var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

export default class Wood extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    remain: number = 3;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
    }

    static init = (reference: Wood) => new Wood(reference.level, Pos2.init(reference), reference.rotation);

    render(): void {
        if (this.remain <= 0) return;
        const woodCell = findCell(this!.y, this!.x);
        woodCell!.classList.add('wood');
        const modRotate = mod(this!.rotation, 360);
        var rotatedSet = `rotate(${mod(modRotate, 180)}deg)`;
        rotatedSet += modRotate >= 180 ? ' rotateY(180deg)' : '';
        woodCell!.style.setProperty('transform', rotatedSet);
    }

    clear(): void {
        const woodCell = findCell(this!.y, this!.x);
        if (woodCell == null) return;
        woodCell!.style.removeProperty('transform');
        woodCell!.classList.remove('wood');
    }
}