import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance, RenderableObject } from "../interfaces";
import Pos2 from "../pos2";

import HunterShoot from "../../../audio/gun_shot.mp3";
import bulletPebble from "../../../images/rock.png";
import Dog from "./dog";
import Wood from "./wood";

var mod = function (n: number, m: number) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);

function vh(percent: number): number {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function vw(percent: number): number {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function vmin(percent: number): number {
    return Math.min(vh(percent), vw(percent));
}

function vmax(percent: number): number {
    return Math.max(vh(percent), vw(percent));
}

function calculateRotationAngle(hunterX: number, hunterY: number, dogX: number, dogY: number): number {
    // Step 1: Calculate differences
    const deltaX = dogX - hunterX;
    const deltaY = dogY - hunterY;

    // Step 2: Get angle in radians
    let angleRadians = Math.atan2(deltaY, deltaX);

    // Step 3: Convert to degrees
    let angleDegrees = angleRadians * (180 / Math.PI);

    // Step 4: Normalize angle
    if (angleDegrees < 0) {
        angleDegrees += 360;
    }

    return angleDegrees;
}

function getCenterElement(element: HTMLElement): { x: number, y: number } {
    const rect = element.getBoundingClientRect();
    return {
        x: element.offsetLeft + rect.width / 2,
        y: element.offsetTop + rect.height / 2
    };
}

export default class Hunter extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    cache: any = null;
    oldAction: number | null;

    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation: number = 180) {
        super(pos.x, pos.y);
        this.level = level;
        this.rotation = rotation;
        this.cache = structuredClone(this);
        this.oldAction = structuredClone(this.level).actionAvaible;
    }

    static init = (reference: Hunter) => new Hunter(reference.level, Pos2.init(reference), reference.rotation);

    render(): void {
        const hunterCell = findCell(this!.y, this!.x);
        const currentAction = this.level.actionAvaible;
        if (this.oldAction !== currentAction && currentAction != null) {
            if ((currentAction % 3) == 0) {
                var snd = new Audio(HunterShoot);
                snd.play();
                const cellCenter = getCenterElement(hunterCell!);
                const bulletCreated = new Image();
                bulletCreated.src = bulletPebble;
                bulletCreated.style.position = 'absolute';
                bulletCreated.style.zIndex = '10';
                bulletCreated.style.top = `${cellCenter.y}px`;
                bulletCreated.style.left = `${cellCenter.x}px`;
                const sized = 'calc(50vmin / 6 / 3)';
                bulletCreated.style.width = sized;
                bulletCreated.style.height = sized;
                document.querySelector("#moveable_entity")!.appendChild(bulletCreated);
                const rotateBullet = this.rotation+90;
                const inter = setInterval(() => {
                    var bulletX = Math.floor(bulletCreated.offsetLeft / vmin(50) * 6);
                    var bulletY = Math.floor(bulletCreated.offsetTop / vmin(50) * 6);
                    const findEntity = this.level.entities.find((entity: Pos2 extends RenderableObject ? Pos2 : RenderableObject) => {
                        if (entity instanceof Pos2) {
                            return entity.x === bulletX && entity.y === bulletY;
                        }
                        return false;
                    });
                    if (findEntity instanceof Dog) {
                        var index = this.level.entities.indexOf(findEntity);
                        this.level.entities.splice(index, 1);
                        findEntity.clear();
                        bulletCreated.remove();
                        clearInterval(inter);
                    } else if (findEntity instanceof Wood) {
                        findEntity.remain--;
                        findEntity.clear();
                        findEntity.render();
                        bulletCreated.remove();
                        clearInterval(inter);
                    }
                    const moveX = Math.sin(rotateBullet * Math.PI / 180);
                    const moveY = Math.cos(rotateBullet * Math.PI / 180);
                    bulletCreated.style.left = `${bulletCreated.offsetLeft + (moveX * 3)}px`;
                    bulletCreated.style.top = `${bulletCreated.offsetTop - (moveY * 3)}px`;
                    if (parseInt(bulletCreated.style.left) <= 0 || parseInt(bulletCreated.style.left) >= vmin(50) || parseInt(bulletCreated.style.top) <= 0 || parseInt(bulletCreated.style.top) >= vmin(50)) {
                        bulletCreated.remove();
                        clearInterval(inter);
                    }
                }, 10);
            }
            this.oldAction = currentAction;
        } else {
            const dog: any = this.level.entities.find((entity: Pos2 extends RenderableObject ? Pos2 : RenderableObject) => {
                if (entity instanceof Dog && entity instanceof Pos2) {
                    return true;
                }
                return false;
            });
            const rotate = calculateRotationAngle(this.x, this.y, dog?.x ?? 0,dog?.y ?? 0);
            this.rotation = rotate;
        }
        hunterCell!.classList.add('hunter');
        const modRotate = mod(this!.rotation+180, 360);
        var rotatedSet = `rotate(${modRotate}deg)`;
        rotatedSet += modRotate > 180 || modRotate == 0 ? ' rotateY(180deg)' : '';
        hunterCell!.style.setProperty('transform', rotatedSet);
    }

    clear(): void {
        const hunterCell = findCell(this!.y, this!.x);
        if (hunterCell == null) return;
        hunterCell!.style.removeProperty('transform');
        hunterCell!.classList.remove('hunter');
        hunterCell!.innerHTML = '';
    }
}