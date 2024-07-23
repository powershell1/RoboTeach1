
import './index.css';
import { compile } from './init/compiler/blueprint';
import Dog from './init/types/entities/dog';
import Slime from './init/types/entities/slime';
import Sword from './init/types/entities/sword';
import Wood from './init/types/entities/wood';
import { InitableConstructor, InitableInstance } from './init/types/interfaces';
import Pos2 from './init/types/pos2';
import { EmulatorWorkspaces } from './init/workspace';

function getCallerInfo(): String {
    try {
        // Throw an error to generate a stack trace
        throw new Error();
    } catch (e : any) {
        // Access the stack trace and split it into lines
        const stackLines = e.stack?.split("\n") || [];
        // The first line is the Error message, the second line is this function's call,
        // so the caller would be on the third line or beyond.
        if (stackLines.length > 3) {
            // Adjust the index based on where you believe the caller is in the stack
            const callerLine = stackLines[3];
            // You can further parse `callerLine` to extract more specific details
            return callerLine;
        }
    }
    return "Caller information not available";
}

function isBundleCalling() {
    const callerInfo = getCallerInfo();
    return callerInfo.includes('app.bundle.js');
}

export const workspace = new EmulatorWorkspaces();
export const levelDatas = [
    [
        new Dog(workspace, new Pos2(0, 0)),
        new Slime(workspace, new Pos2(5, 2), 0),
    ],
    [
        new Dog(workspace, new Pos2(0, 0)),
        new Sword(workspace, new Pos2(2, 0), 0),
        new Wood(workspace, new Pos2(4, 1), 0),
        new Wood(workspace, new Pos2(3, 2), 0),
        new Slime(workspace, new Pos2(4, 2), 0),
        new Wood(workspace, new Pos2(5, 2), 0),
        new Wood(workspace, new Pos2(4, 3), 0),
    ],
];

if (isBundleCalling()) {
    const urlParams = new URLSearchParams(location.search);
    const pageLevel = urlParams.get('level') || '1';
    const data = levelDatas[parseInt(pageLevel) - 1];
    if (data == undefined) {
        document.body.innerHTML = 'Level not found';
        throw new Error('Level not found');
    }
    data.forEach((entity: any) => {
        workspace.addEntity(entity);
    });
    /*
    workspace.addEntity(new Dog(workspace, new Pos2(0, 0)));
    // workspace.addEntity(new Slime(workspace, new Pos2(5, 5), 0));
    workspace.addEntity(new Slime(workspace, new Pos2(2, 0), 0));
    workspace.addEntity(new Slime(workspace, new Pos2(4, 2), 0));
    */

    var blocklyWorkspaceJSON: any = JSON.parse('{"blocks":{"languageVersion":0,"blocks":[{"type":"start_event","id":"Y$PnHc11]nleH0`8*L$#","x":250,"y":250}]}}');

    function onMessage(this: Window, event: MessageEvent<any>) {
        blocklyWorkspaceJSON = JSON.parse(event.data);
    }

    const iframe: HTMLIFrameElement = document.querySelector("body > div > iframe")!;
    iframe.contentWindow!.addEventListener("message", onMessage, false);

    //const workspace = new EmulatorWorkspaces(new Dog(new Pos2(0, 0)), [new Pos2(5, 5)]);
    var isCompiling = false;

    document.getElementById('compile')?.addEventListener('click', async (event) => {
        if (isCompiling) return;
        isCompiling = true;
        await compile(workspace, blocklyWorkspaceJSON);
        isCompiling = false;
    });

    /*
    setTimeout(() => {
        compile(workspace, blocklyWorkspaceJSON);
        setTimeout(() => {
            compile(workspace, blocklyWorkspaceJSON);
        }, 1000);
    }, 3000);
    */
}