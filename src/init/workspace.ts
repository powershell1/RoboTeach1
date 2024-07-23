import Dog from "./types/entities/dog";
import { RenderableObject } from "./types/interfaces";
import Pos2 from "./types/pos2";

const actionLeft = document.getElementById('action_limit')!;
const emulatorDiv = document.querySelector('.emulator')!;

const numberOfBlock = 6 ** 2;
const blockPer = Math.sqrt(numberOfBlock);
const findCell = (y: number, x: number) => document.getElementById(`${y}-${x}`);
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function getValue<T, K extends keyof T>(data: T, key: K) {
    return data[key];
}

class CloneableObject {
    construct: any;
    object: any;

    constructor(construct: any, object: any) {
        this.construct = construct;
        this.object = object;
    }
}

export class EmulatorWorkspaces {
    entities: Pos2 extends RenderableObject ? Pos2[] : RenderableObject[] = [];
    actionAvaible: number | null = null;

    cacheWorkspace: any[] = [];

    constructor(action: number | null = 10) {
        this.clearCache();
        this.actionAvaible = action;

        for (let y = 0; y < blockPer; y++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let x = 0; x < blockPer; x++) {
                const cell = document.createElement('div');
                cell.className = 'boxes';
                cell.id = `${y}-${x}`;
                row.appendChild(cell);
            }
            emulatorDiv.appendChild(row);
        }

        // this.randomStart();
        // this.randomEnd();
        this.render();

        // this.cacheWorkspace = new EmulatorConfig(new Pos2(dog.x, dog.y), slimesClone, action);

        const sturct = structuredClone([this.entities, structuredClone(action)]);
        this.cacheWorkspace = sturct;

        // console.log(sturct);
    }

    addEntity(entity: RenderableObject): void {
        this.entities.push(entity);
        const enti = entity as any;
        this.cacheWorkspace[0].push(enti.constructor.init(entity));
        this.clearCache();
        this.render();
    }

    resetLevel(): void {
        emulatorDiv.querySelectorAll('.boxes').forEach((cell) => {
            cell.classList.remove('dog');
            cell.classList.remove('slime');
        });
        const sturct = structuredClone(this.cacheWorkspace);
        // this.entities = [];
        // console.log("init" in this.entities);

        this.entities = [];
        // const newEntities: RenderableObject[] = [];
        this.cacheWorkspace[0].forEach((entity: any, idx: number) => {
            if ("init" in entity.constructor) {
                this.entities.push(entity.constructor.init(entity));
            }
        });
        // this.entities = newEntities;
        this.actionAvaible = sturct[1];
        this.render();
    }

    clearCache(): void {
        document.querySelector("body > div > div > div")!.querySelectorAll(".boxes").forEach((cell) => {
            if (cell instanceof HTMLElement) {
                if (cell.getAttribute('style')) {
                    cell.removeAttribute('style');
                }
                cell.classList.forEach((className) => {
                    if (className === 'boxes') return;
                    cell.classList.remove(className);
                });
            }
        });
        var property: { [id: string]: any } = ({ ...this });
        for (const prop in property['entities']) {
            const classProp: any = property['entities'][prop];
            //const classProp: any = getValue(this, prop as keyof EmulatorWorkspaces);
            if (classProp != null && "clear" in classProp) {
                classProp.clear();
            }
        }
    }

    render(): void {
        var property: { [id: string]: any } = ({ ...this });
        for (const prop in property['entities']) {
            const classProp: any = property['entities'][prop];
            if (classProp != null && "render" in classProp) {
                classProp.render();
            }
        }

        if (this.actionAvaible == null) {
            actionLeft.style.display = 'none';
            return;
        }
        actionLeft.innerText = `Action Left: ${this.actionAvaible}`;
        /*
        this.slimes.forEach((slime) => {
            const foundCell = findCell(slime.y, slime.x);
            foundCell!.classList.add('slime');
        });
        */
    }
}