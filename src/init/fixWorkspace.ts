/*
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

export class EmulatorWorkspaces {
    entities: RenderableObject[] = [];
    actionAvaible: number | null = null;

    cacheWorkspace: any[];

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

    resetLevel(): void {
        emulatorDiv.querySelectorAll('.boxes').forEach((cell) => {
            cell.classList.remove('dog');
            cell.classList.remove('slime');
        });
        const sturct = structuredClone(this.cacheWorkspace);
        this.entities = [];
        sturct[0].forEach((entity: RenderableObject) => {
            this.entities.push(entity);
        });
        this.actionAvaible = sturct[1];
        this.render();
    }

    clearCache(): void {
        var property: { [id: string]: any } = ({ ...this });
        for (const prop in property) {
            const classProp = getValue(this, prop as keyof EmulatorWorkspaces);
        }
    }

    render(): void {
        var property: { [id: string]: any } = ({ ...this });
        for (const prop in property) {
            const classProp = getValue(this, prop as keyof EmulatorWorkspaces);
            if (classProp as RenderableObject) {
                classProp.render();
            }
        }

        if (this.actionAvaible == null) {
            actionLeft.style.display = 'none';
            return;
        }
        actionLeft.innerText = `Action Left: ${this.actionAvaible}`;
        
        this.slimes.forEach((slime) => {
            const foundCell = findCell(slime.y, slime.x);
            foundCell!.classList.add('slime');
        });
    }
}
    */