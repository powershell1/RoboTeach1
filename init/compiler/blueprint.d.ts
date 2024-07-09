import { EmulatorWorkspaces } from "../workspace";
import { BlockCode } from "./blockCode";
declare function craftBlock(workspace: EmulatorWorkspaces, blockData: {
    [id: string]: any;
}): BlockCode;
declare function compile(workspace: EmulatorWorkspaces, json: {
    [id: string]: any;
}): Promise<void>;
export { compile, craftBlock };
//# sourceMappingURL=blueprint.d.ts.map