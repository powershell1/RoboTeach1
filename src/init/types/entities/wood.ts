import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance, RenderableObject } from "../interfaces";
import Pos2 from "../pos2";

import woodDestroy from "../../../audio/wood_explode.mp3";
import breakingProgress0 from "../../../images/breaking/breaking-0.png";
import breakingProgress1 from "../../../images/breaking/breaking-1.png";
import breakingProgress2 from "../../../images/breaking/breaking-2.png";
import breakingProgress3 from "../../../images/breaking/breaking-3.png";
import breakingProgress4 from "../../../images/breaking/breaking-4.png";
import breakingProgress5 from "../../../images/breaking/breaking-5.png";
import breakingProgress6 from "../../../images/breaking/breaking-6.png";
import breakingProgress7 from "../../../images/breaking/breaking-7.png";
import breakingProgress8 from "../../../images/breaking/breaking-8.png";
import breakingProgress9 from "../../../images/breaking/breaking-9.png";

const breakingProgress = [
    breakingProgress0,
    breakingProgress1,
    breakingProgress2,
    breakingProgress3,
    breakingProgress4,
    breakingProgress5,
    breakingProgress6,
    breakingProgress7,
    breakingProgress8,
    breakingProgress9,
];

var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

export default class Wood extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    remain: number = 3;
    cache: any = null;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
        this.cache = structuredClone(this);
    }

    static init = (reference: Wood) => new Wood(reference.level, Pos2.init(reference), reference.rotation);

    render(): void {
        if (this.remain <= 0) {
            var snd = new Audio(woodDestroy); // buffers automatically when created
            snd.play();
            var index = this.level.entities.indexOf(this);
            this.level.entities.splice(index, 1);
            this.clear();
            return;
        }
        const max = this.cache.remain;
        const progress = 8-Math.floor(this.remain/max*9);
        const woodCell = findCell(this!.y, this!.x);
        woodCell!.classList.add('wood');
        if (progress >= 0) {
            const breakingDOM = document.createElement('img');
            breakingDOM.src = breakingProgress[progress];
            breakingDOM.style.width = '100%';
            breakingDOM.style.height = '100%';
            breakingDOM.style.position = 'absolute';
            woodCell!.appendChild(breakingDOM);
        }
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
        woodCell!.innerHTML = '';
    }
}