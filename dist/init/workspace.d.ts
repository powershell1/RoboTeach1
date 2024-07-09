export declare class Pos2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class EmulatorWorkspaces {
    dog: Pos2 | null;
    slimes: Pos2[];
    actionAvaible: number | null;
    cacheWorkspace: EmulatorWorkspaces | null;
    constructor(dog: Pos2, slimes: Pos2[], action?: number | null);
    resetLevel(): void;
    removeCache(): void;
    refresh(): void;
    refreshAction(): void;
}
//# sourceMappingURL=workspace.d.ts.map