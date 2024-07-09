import { EmulatorWorkspaces } from "../workspace";
export declare class BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: {
        [id: string]: any;
    };
    constructor(workspace: EmulatorWorkspaces, blockData: {
        [id: string]: any;
    });
    clear(): void;
    run(actionDeduct?: boolean): Promise<any>;
}
//# sourceMappingURL=blockCode.d.ts.map