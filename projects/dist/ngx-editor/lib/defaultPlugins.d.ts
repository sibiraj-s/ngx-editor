import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
interface Options {
    history: boolean;
    keyboardShortcuts: boolean;
    inputRules: boolean;
}
declare const getDefaultPlugins: (schema: Schema, options: Options) => Plugin<any, any>[];
export default getDefaultPlugins;
//# sourceMappingURL=defaultPlugins.d.ts.map