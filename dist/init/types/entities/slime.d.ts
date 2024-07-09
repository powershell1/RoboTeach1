import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";
export default class Slime extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation?: number);
    static init: (reference: Slime) => Slime;
    render(): void;
    clear(): void;
}
//# sourceMappingURL=slime.d.ts.map