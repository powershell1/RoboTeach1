import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";
export default class Dog extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    sword: boolean;
    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation?: number);
    static init: (reference: Dog) => Dog;
    walk(forward: boolean): void;
    render(): void;
    clear(posClear: Pos2 | null): void;
}
//# sourceMappingURL=dog.d.ts.map