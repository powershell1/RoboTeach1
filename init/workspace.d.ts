import Dog from "./types/entities/dog";
import Pos2 from "./types/pos2";
export declare class EmulatorWorkspaces {
    dog: Dog | null;
    slimes: Pos2[];
    actionAvaible: number | null;
    cacheWorkspace: any[];
    constructor(dog: Dog, slimes: Pos2[], action?: number | null);
    resetLevel(): void;
    clearCache(): void;
    render(): void;
}
//# sourceMappingURL=workspace.d.ts.map