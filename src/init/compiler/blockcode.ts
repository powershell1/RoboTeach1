import { EmulatorWorkspaces } from "../workspace";
import { craftBlock } from "./blueprint";

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string]: any }) {
        this.workspace = workspace;
        this.blockData = blockData;
    }

    clear() {
        this.workspace.clearCache();
    }

    async run(actionDeduct: boolean = true): Promise<any> {
        // console.log('BlockCode run');
        if (actionDeduct && this.workspace.actionAvaible != null) {
            var actionAvaible: number = this.workspace.actionAvaible ?? 0;
            this.workspace.actionAvaible = actionAvaible - 1;
        }
        this.workspace.render();
        if (actionDeduct) await timeout(500);
        const nextBlock = this.blockData['next'];
        if (nextBlock) {
            const nextBlockData = craftBlock(this.workspace, nextBlock['block']);
            await nextBlockData.run();
        }
    }
}