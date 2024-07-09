import Pos2 from "../pos2";
export default class Dog extends Pos2 {
    rotation: number;
    constructor(pos: Pos2, rotation?: number);
    static init: (reference: Dog) => Dog;
    walk(forward: boolean): void;
    render(): void;
    clear(): void;
}
//# sourceMappingURL=dog.d.ts.map