import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { EditorProps, EditorView } from 'prosemirror-view';
import { Observable } from 'rxjs';
import EditorCommands from './EditorCommands';
declare type JSONDoc = Record<string, any>;
declare type Content = string | null | JSONDoc;
interface Options {
    content?: Content;
    history?: boolean;
    keyboardShortcuts?: boolean;
    inputRules?: boolean;
    schema?: Schema;
    plugins?: Plugin[];
    nodeViews?: EditorProps['nodeViews'];
}
declare class Editor {
    private options;
    view: EditorView;
    constructor(options?: Options);
    private valueChangesSubject;
    private updateSubject;
    get valueChanges(): Observable<JSONDoc>;
    get update(): Observable<EditorView>;
    get schema(): Schema;
    get commands(): EditorCommands;
    setContent(content: Content): void;
    private handleTransactions;
    private createEditor;
    registerPlugin(plugin: Plugin): void;
    destroy(): void;
}
export default Editor;
//# sourceMappingURL=Editor.d.ts.map