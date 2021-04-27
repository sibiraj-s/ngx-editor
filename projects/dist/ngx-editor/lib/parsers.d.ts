import { Schema, Node as ProseMirrorNode } from 'prosemirror-model';
export declare const emptyDoc: {
    type: string;
    content: {
        type: string;
    }[];
};
export declare const toHTML: (json: Record<string, any>, inputSchema?: Schema) => string;
export declare const toDoc: (html: string, inputSchema?: Schema) => Record<string, any>;
export declare const parseContent: (value: string | Record<string, any> | null, schema: Schema) => ProseMirrorNode;
//# sourceMappingURL=parsers.d.ts.map