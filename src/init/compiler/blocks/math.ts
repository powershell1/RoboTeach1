import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
import { blockPicker, craftBlock } from "../blueprint";

export class MathBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any; };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        super.clear();
        return this.blockData['fields']['NUM'];
    }
}

export class MathOperationBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any; };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        super.clear();
        const num1 = await craftBlock(this.workspace, blockPicker(this.blockData['inputs']['A'])).run();
        const num2 = await craftBlock(this.workspace, blockPicker(this.blockData['inputs']['B'])).run();
        const operation = this.blockData['fields']['OP'];
        switch (operation) {
            case 'ADD':
                return num1 + num2;
            case 'SUBTRACT':
                return num1 - num2;
            case 'MULTIPLY':
                return num1 * num2;
            case 'DIVIDE':
                return num1 / num2;
            case 'POWER':
                return Math.pow(num1, num2);
            default:
                return 0;
        }
    }
}