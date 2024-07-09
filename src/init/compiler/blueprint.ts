import { EmulatorWorkspaces } from "../workspace";
import { BlockCode } from "./blockCode";
import RunBlock from "./blocks/events";
import { WalkBlock, RotateBlock } from "./blocks/walk";


function craftBlock(workspace: EmulatorWorkspaces, blockData: { [id: string] : any }): BlockCode {
    switch (blockData.type) {
        case 'move':
            return new WalkBlock(workspace, blockData);
        case 'turn_degrees':
            return new RotateBlock(workspace, blockData);
        case 'start_event':
            return new RunBlock(workspace, blockData);
        default:
            throw new Error(`Block not found ${blockData.type}`);
            // return new BlockCode(workspace, blockData);
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function compile(workspace: EmulatorWorkspaces, json: { [id: string] : any }) {
    workspace.resetLevel();
    await sleep(500);
    const cacheB = json['blocks'];
    if (!cacheB) return;
    const blocks: any[] = cacheB['blocks'];
    for (let i = 0; i < blocks.length; i++) {
        const idx = blocks[i];
        if (idx.type !== 'start_event') continue;
        await craftBlock(workspace, idx).run();
    }
    // craftBlock(workspace, 'walk').run();
}

export {compile, craftBlock};