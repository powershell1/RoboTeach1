import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
export declare class LoopBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: {
        [id: string]: any;
    };
    constructor(workspace: EmulatorWorkspaces, blockData: {
        [id: string]: any;
    });
    run(): Promise<void>;
}
//# sourceMappingURL=loop.d.ts.map