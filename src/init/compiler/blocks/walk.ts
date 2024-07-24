import Dog from "../../types/entities/dog";
import { EmulatorWorkspaces } from "../../workspace";
import { BlockCode } from "../blockCode";
import { blockPicker, craftBlock } from "../blueprint";

export class WalkBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any; };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        super.clear();
        // const add = (2*this.blockData['fields']['FB'])-1;
        this.workspace.entities.forEach((entity: any) => {
            if (entity instanceof Dog) {
                entity.walk(this.blockData['fields']['FB'] === '1');
            }
        });
        // this.workspace.dog!.x = this.workspace.dog!.x - add;
        await super.run();
    }
}

export class RotateBlock extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any; };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        super.clear();
        const add = (2*this.blockData['fields']['LR'])-1;
        this.workspace.entities.forEach((entity: any) => {
            if (entity instanceof Dog) {
                entity.rotation += add*90;
            }
        });
        // this.workspace.dog!.rotation -= add*90;
        // const add = this.blockData['fields']['DEG'];
        // this.workspace.dog!.y = this.workspace.dog!.y + add;
        await super.run();
    }
}

export class WaitTurn extends BlockCode {
    workspace: EmulatorWorkspaces;
    blockData: { [id: string]: any; };

    constructor(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }) {
        super(workspace, blockData);
        this.workspace = workspace;
        this.blockData = blockData;
    }

    async run() {
        const num1 = await craftBlock(this.workspace, blockPicker(this.blockData['inputs']['TURNS'])).run();
        if (num1 === null) return;
        for (let i = 1; i < num1; i++) {
            await super.clear();
            await super.run(true, false);
        }
        await super.clear();
        await super.run();
    }
}