declare const icons: Record<string, any>;
declare class Icon {
    static get(name: keyof typeof icons, fill?: string): string;
    static getPath(name: keyof typeof icons): string;
}
export default Icon;
//# sourceMappingURL=index.d.ts.map