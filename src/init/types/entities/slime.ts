import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";

var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

export default class Slime extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
    }

    static init = (reference: Slime) => new Slime(reference.level, Pos2.init(reference), reference.rotation);

    render(): void {
        const slimeCell = findCell(this!.y, this!.x);
        slimeCell!.classList.add('slime');
        const modRotate = mod(this!.rotation, 360);
        var rotatedSet = `rotate(${mod(modRotate, 180)}deg)`;
        rotatedSet += modRotate >= 180 ? ' rotateY(180deg)' : '';
        slimeCell!.style.setProperty('transform', rotatedSet);
    }

    clear(): void {
        const slimeCell = findCell(this!.y, this!.x);
        if (slimeCell == null) return;
        slimeCell!.style.removeProperty('transform');
        slimeCell!.classList.remove('slime');
    }
}