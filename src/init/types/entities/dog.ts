import Swal from "sweetalert2";
import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance, RenderableObject } from "../interfaces";
import Pos2 from "../pos2";
import Slime from "./slime";
import Wood from "./wood";
import Sword from "./sword";

import SlamWood from "../../../audio/wood_slam.mp3";
import SlimeDied from "../../../audio/slime_died.mp3";
import EquipSword from "../../../audio/sword.mp3";
import { levelDatas } from "../../..";
import Hunter from "./hunter";

const blockPer = 6;
var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

export default class Dog extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    sword: boolean = false;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
    }

    static init = (reference: Dog) => new Dog(reference.level, Pos2.init(reference), reference.rotation);

    walk(forward: boolean): void {
        const add = forward ? 1 : -1;
        const NextPos = Pos2.init(this);
        if (this.rotation === 0) {
            NextPos.x += add;
        } else if (this.rotation === 90) {
            NextPos.y += add;
        } else if (this.rotation === 180) {
            NextPos.x -= add;
        } else if (this.rotation === 270) {
            NextPos.y -= add;
        }
        if (NextPos.x < 0 || NextPos.x >= blockPer || NextPos.y < 0 || NextPos.y >= blockPer) {
            console.warn('[Dog] Wak out of bound');
            return;
        }
        const cachePos = structuredClone(this);
        /*
        this.x = PosCopy.x;
        this.y = PosCopy.y;
        */
        const findEntity = this.level.entities.find((entity: Pos2 extends RenderableObject ? Pos2 : RenderableObject) => {
            if (entity instanceof Pos2 && !(entity instanceof Dog)) {
                return entity.x === NextPos.x && entity.y === NextPos.y;
            }
            return false;
        });
        if (findEntity instanceof Slime) {
            console.info('[Dog] Walk into slime');
            var snd = new Audio(SlimeDied); // buffers automatically when created
            snd.play();
            this.level.entities.splice(this.level.entities.indexOf(findEntity), 1);
            var isFindSlime = this.level.entities.find((entity: Pos2 extends RenderableObject ? Pos2 : RenderableObject) => {
                return entity instanceof Slime;
            });
            if (!isFindSlime) {
                const urlParams = new URLSearchParams(location.search);
                const pageLevel = parseInt(urlParams.get('level') || '1');
                if (levelDatas[pageLevel] == undefined) {
                    Swal.fire({
                        title: 'You passed all of the level!',
                        icon: 'success',
                    });
                    return;
                }
                Swal.fire({
                    title: 'You passed the level!',
                    icon: 'success',
                    confirmButtonText: 'Next Level',
                    cancelButtonText: 'Replay',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.dismiss) return;
                    window.location.href = `?level=${pageLevel + 1}`;
                });
            }
        } else if (findEntity instanceof Wood) {
            console.warn('[Dog] Walk into wood');
            if (this.sword) {
                findEntity.remain -= 1;
            }
            var snd = new Audio(SlamWood); // buffers automatically when created
            snd.play();
            return;
        } else if (findEntity instanceof Hunter) {
            console.info('[Dog] Walk into hunter');
            return;
        } else if (findEntity instanceof Sword) {
            console.info('[Dog] Walk into sword');
            this.sword = true;
            this.level.entities.splice(this.level.entities.indexOf(findEntity), 1);
            var snd = new Audio(EquipSword); // buffers automatically when created
            snd.play();
        } else {
        }
        this.x = NextPos.x;
        this.y = NextPos.y;
        this.level.clearCache();
        this.level.render();
    }

    render(): void {
        const dogCell = findCell(this!.y, this!.x);
        if (this.sword) {
            dogCell!.classList.add('dog_sword');
        } else {
            dogCell!.classList.add('dog');
        }
        const modRotate = mod(this!.rotation, 360);
        var rotatedSet = `rotate(${mod(modRotate, 180)}deg)`;
        rotatedSet += modRotate >= 180 ? ' rotateY(180deg)' : '';
        dogCell!.style.setProperty('transform', rotatedSet);
    }

    clear(posClear: Pos2 | null): void {
        var dogCell = findCell(this!.y, this!.x);
        if (posClear != null) {
            dogCell = findCell(posClear.y, posClear.x);
        }
        if (dogCell == null) return;
        dogCell!.style.removeProperty('transform');
        dogCell!.classList.remove('dog');
    }
}