import Swal from "sweetalert2";
import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance, RenderableObject } from "../interfaces";
import Pos2 from "../pos2";
import Slime from "./slime";

const blockPer = 6;
var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

export default class Dog extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
    }

    static init = (reference: Dog) => new Dog(reference.level, Pos2.init(reference), reference.rotation);

    walk(forward: boolean): void {
        const add = forward ? 1 : -1;
        const PosCopy = Pos2.init(this);
        if (this.rotation === 0) {
            PosCopy.x += add;
        } else if (this.rotation === 90) {
            PosCopy.y += add;
        } else if (this.rotation === 180) {
            PosCopy.x -= add;
        } else if (this.rotation === 270) {
            PosCopy.y -= add;
        }
        if (PosCopy.x < 0 || PosCopy.x >= blockPer || PosCopy.y < 0 || PosCopy.y >= blockPer) {
            console.warn('[Dog] Wak out of bound');
            return;
        }
        this.x = PosCopy.x;
        this.y = PosCopy.y;

        const findSlime = this.level.entities.find((entity: Pos2 extends RenderableObject ? Pos2 : RenderableObject) => {
            if (entity instanceof Slime) {
                return entity.x === this.x && entity.y === this.y;
            }
            return false;
        });
        if (findSlime) {
            console.warn('[Dog] Walk into slime');
            this.level.entities.splice(this.level.entities.indexOf(findSlime), 1);
            this.level.clearCache();
            this.level.render();
            var isFindSlime = this.level.entities.find((entity: Pos2 extends RenderableObject ? Pos2 : RenderableObject) => {
                return entity instanceof Slime;
            });
            if (!isFindSlime) {
                Swal.fire({
                    title: 'You passed the first level!',
                    icon: 'success',
                    confirmButtonText: 'Restart',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.dismiss) return;
                    window.location.reload();
                });
            }
        }
    }

    render(): void {
        const dogCell = findCell(this!.y, this!.x);
        dogCell!.classList.add('dog');
        const modRotate = mod(this!.rotation, 360);
        var rotatedSet = `rotate(${mod(modRotate, 180)}deg)`;
        rotatedSet += modRotate >= 180 ? ' rotateY(180deg)' : '';
        dogCell!.style.setProperty('transform', rotatedSet);
    }

    clear(): void {
        const dogCell = findCell(this!.y, this!.x);
        if (dogCell == null) return;
        dogCell!.style.removeProperty('transform');
        dogCell!.classList.remove('dog');
    }
}