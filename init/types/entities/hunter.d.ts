import { EmulatorWorkspaces } from "../../workspace";
import { InitableInstance } from "../interfaces";
import Pos2 from "../pos2";
export default class Hunter extends Pos2 implements InitableInstance {
    rotation: number;
    level: EmulatorWorkspaces;
    cache: any;
    oldAction: number | null;
    constructor(level: EmulatorWorkspaces, pos: Pos2, rotation?: number);
    static init: (reference: Hunter) => Hunter;
    render(): void;
    clear(): void;
}
//# sourceMappingURL=hunter.d.ts.map