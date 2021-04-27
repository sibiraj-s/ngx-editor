import { DOMOutputSpec, Node as ProseMirrorNode, NodeSpec } from 'prosemirror-model';
export declare const image: NodeSpec;
declare const nodes: {
    doc: NodeSpec;
    text: NodeSpec;
    paragraph: NodeSpec;
    blockquote: NodeSpec;
    horizontal_rule: NodeSpec;
    heading: NodeSpec;
    hard_break: NodeSpec;
    code_block: NodeSpec;
    image: NodeSpec;
    list_item: {
        content: string;
        marks?: string;
        group?: string;
        inline?: boolean;
        atom?: boolean;
        attrs?: {
            [name: string]: import("prosemirror-model").AttributeSpec;
        };
        selectable?: boolean;
        draggable?: boolean;
        code?: boolean;
        defining?: boolean;
        isolating?: boolean;
        toDOM?: (node: ProseMirrorNode<any>) => DOMOutputSpec;
        parseDOM?: import("prosemirror-model").ParseRule[];
        toDebugString?: (node: ProseMirrorNode<any>) => string;
    };
    ordered_list: {
        content: string;
        group: string;
        marks?: string;
        inline?: boolean;
        atom?: boolean;
        attrs?: {
            [name: string]: import("prosemirror-model").AttributeSpec;
        };
        selectable?: boolean;
        draggable?: boolean;
        code?: boolean;
        defining?: boolean;
        isolating?: boolean;
        toDOM?: (node: ProseMirrorNode<any>) => DOMOutputSpec;
        parseDOM?: import("prosemirror-model").ParseRule[];
        toDebugString?: (node: ProseMirrorNode<any>) => string;
    };
    bullet_list: {
        content: string;
        group: string;
        marks?: string;
        inline?: boolean;
        atom?: boolean;
        attrs?: {
            [name: string]: import("prosemirror-model").AttributeSpec;
        };
        selectable?: boolean;
        draggable?: boolean;
        code?: boolean;
        defining?: boolean;
        isolating?: boolean;
        toDOM?: (node: ProseMirrorNode<any>) => DOMOutputSpec;
        parseDOM?: import("prosemirror-model").ParseRule[];
        toDebugString?: (node: ProseMirrorNode<any>) => string;
    };
};
export default nodes;
//# sourceMappingURL=nodes.d.ts.map