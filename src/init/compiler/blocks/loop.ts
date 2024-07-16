import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
import { craftBlock, blockPicker } from "../blueprint";

export class LoopBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any; };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string]: any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        super.clear();
        const inputs = this.blockData['inputs']['TIMES'];
        const times = await craftBlock(this.workspace, blockPicker(inputs)).run();
        for (let i = 0; i < times; i++) {
            if (this.workspace.actionAvaible ?? 1 <= 0) break;
            if (this.blockData['inputs']['DO']) {
                const doBlock = this.blockData['inputs']['DO']['block'];
                await craftBlock(this.workspace, doBlock).run();
            }
        }
        await super.run(false);
    }
}