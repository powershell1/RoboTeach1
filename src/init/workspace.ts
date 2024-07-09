import Dog from "./types/entities/dog";
import Pos2 from "./types/pos2";
import RenderableObject from "./types/renderable";

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
    dog: Dog | null = null;
    slimes: Pos2[] = [];
    actionAvaible: number | null = null;

    cacheWorkspace: any[];

    constructor(dog: Dog, slimes: Pos2[], action: number | null = 10) {
        const dogStruct = structuredClone(dog);
        const slimesClone = structuredClone(slimes);
        // this.dog = new Dog(dogStruct, dogStruct.rotation);
        this.dog = Dog.init(dogStruct);
        this.slimes = [];
        slimesClone.forEach((slimePos: Pos2) => {
            this.slimes.push(Pos2.init(slimePos));
        });

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

        const sturct = structuredClone([dogStruct, slimesClone, structuredClone(action)]);
        this.cacheWorkspace = sturct;

        // console.log(sturct);
    }

    resetLevel(): void {
        emulatorDiv.querySelectorAll('.boxes').forEach((cell) => {
            cell.classList.remove('dog');
            cell.classList.remove('slime');
        });
        const sturct = structuredClone(this.cacheWorkspace);
        this.dog = Dog.init(sturct[0]);
        this.slimes = [];
        sturct[1].forEach((slimePos: Pos2) => {
            this.slimes.push(Pos2.init(slimePos));
        });
        this.actionAvaible = sturct[2];
        this.render();
    }

    clearCache(): void {
        var property: { [id: string]: any } = ({ ...this });
        for (const prop in property) {
            const classProp = getValue(this, prop as keyof EmulatorWorkspaces);
            const renderableObject = classProp as RenderableObject;
            if (renderableObject != null && renderableObject.clear != undefined) {
                renderableObject.clear();
            }
        }
    }

    render(): void {
        var property: { [id: string]: any } = ({ ...this });
        for (const prop in property) {
            const classProp = getValue(this, prop as keyof EmulatorWorkspaces);
            const renderableObject = classProp as RenderableObject;
            if (renderableObject != null && renderableObject.render != undefined) {
                renderableObject.render();
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