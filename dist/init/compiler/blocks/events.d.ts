import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
export default class RunBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: {
        [id: string]: any;
    };
    constructor(workspace: EmulatorWorkspaces, blockData: {
        [id: string]: any;
    });
    run(): Promise<void>;
}
//# sourceMappingURL=events.d.ts.map