import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";
export default class Wood extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    remain: number;
    cache: any;
    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation?: number);
    static init: (reference: Wood) => Wood;
    render(): void;
    clear(): void;
}
//# sourceMappingURL=wood.d.ts.map