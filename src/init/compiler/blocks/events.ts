import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
import { craftBlock } from "../blueprint";

export default class RunBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string] : any };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        const inputs: { [id: string] : any } = this.blockData['inputs'];
        if (inputs) {
            const doBlock = inputs['DO']['block'];
            await craftBlock(this.workspace, doBlock).run();
        }
        await super.run(false);
    }
}