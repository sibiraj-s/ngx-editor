declare const defaults: Record<string, string>;
export declare type LocalsKeys = keyof typeof defaults;
declare class Locals {
    locals: Record<string, string>;
    constructor(newLocals?: Partial<Record<LocalsKeys, string>>);
    get: (key: string) => string;
}
export default Locals;
//# sourceMappingURL=Locals.d.ts.map