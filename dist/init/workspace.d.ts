import { RenderableObject } from "./types/interfaces";
import Pos2 from "./types/pos2";
export declare class EmulatorWorkspaces {
    entities: Pos2 extends RenderableObject ? Pos2[] : RenderableObject[];
    actionAvaible: number | null;
    cacheWorkspace: any[];
    constructor(action?: number | null);
    addEntity(entity: RenderableObject): void;
    resetLevel(): void;
    clearCache(): void;
    render(): void;
}
//# sourceMappingURL=workspace.d.ts.map