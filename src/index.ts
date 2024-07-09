import './index.css';
import { compile } from './init/compiler/blueprint';
import Dog from './init/types/entities/dog';
import Pos2 from './init/types/pos2';
import { EmulatorWorkspaces } from './init/workspace';

var blocklyWorkspaceJSON: any = JSON.parse('{"blocks":{"languageVersion":0,"blocks":[{"type":"start_event","id":"Y$PnHc11]nleH0`8*L$#","x":250,"y":250}]}}');

function onMessage(this: Window, event: MessageEvent<any>) {
    blocklyWorkspaceJSON = JSON.parse(event.data);
}

const iframe: HTMLIFrameElement = document.querySelector("body > div > iframe")!;
iframe.contentWindow!.addEventListener("message", onMessage, false);

const workspace = new EmulatorWorkspaces(new Dog(new Pos2(0, 0)), [new Pos2(5, 5)]);
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