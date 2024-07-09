export interface RenderableObject {
    render(): void;
    clear(): void;
}
export interface InitableConstructor<T> {
    new (): InitableInstance;
    init(reference: T): T;
}
export interface InitableInstance {
}
//# sourceMappingURL=interfaces.d.ts.map