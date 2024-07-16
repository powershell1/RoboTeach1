import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
export declare class MathBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: {
        [id: string]: any;
    };
    constructor(workspace: EmulatorWorkspaces, blockData: {
        [id: string]: any;
    });
    run(): Promise<any>;
}
export declare class MathOperationBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: {
        [id: string]: any;
    };
    constructor(workspace: EmulatorWorkspaces, blockData: {
        [id: string]: any;
    });
    run(): Promise<any>;
}
//# sourceMappingURL=math.d.ts.map