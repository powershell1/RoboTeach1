import Pos2 from "./pos2";

export interface RenderableObject {
    render(): void;
    clear(): void;
}

export interface InitableConstructor<T> {
    new (): InitableInstance; // Instance side
    init(reference: T): T; // Static side
}

export interface InitableInstance {
    // Instance methods or properties here
}