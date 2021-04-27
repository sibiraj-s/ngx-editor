import { ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵelementEnd, EventEmitter, ɵɵdefineComponent, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵtemplate, ɵɵelement, ɵɵstyleProp, ɵɵproperty, ɵɵpureFunction1, ɵɵadvance, ɵɵsanitizeUrl, ɵsetClassMetadata, Component, Input, Output, ViewChild, ComponentFactoryResolver, ApplicationRef, ɵɵdirectiveInject, Renderer2, Injector, ɵɵProvidersFeature, forwardRef, ɵɵNgOnChangesFeature, ɵɵprojectionDef, ɵɵprojection, ViewEncapsulation, ɵɵdefineInjectable, Injectable, ɵɵinject, Optional, ɵɵdefinePipe, Pipe, ɵɵclassProp, ɵɵpipe, ɵɵpipeBind1, ɵɵsanitizeHtml, HostBinding, ɵɵtext, ɵɵtextInterpolate1, ɵɵtextInterpolate, ElementRef, ɵɵresolveDocument, HostListener, ɵɵpureFunction2, ɵɵclassMap, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵelementContainer, ɵɵnamespaceSVG, ɵɵstyleMap, ɵɵreference, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, InjectionToken } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators as Validators$1, ɵangular_packages_forms_forms_ba, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, CheckboxControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { Plugin, PluginKey, NodeSelection, EditorState } from 'prosemirror-state';
import { DecorationSet, Decoration, EditorView } from 'prosemirror-view';
import { NgClass, NgIf, NgForOf, NgStyle, NgTemplateOutlet, KeyValuePipe, CommonModule } from '@angular/common';
import { Fragment, Slice, DOMSerializer, DOMParser } from 'prosemirror-model';
import { schema } from 'ngx-editor/schema';
export { marks, nodes, schema } from 'ngx-editor/schema';
import { Subject, fromEvent, asyncScheduler } from 'rxjs';
import { toggleMark, lift, wrapIn, setBlockType, newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock, chainCommands, exitCode, baseKeymap } from 'prosemirror-commands';
import { applyMark, removeLink, removeMark } from 'ngx-editor/commands';
import { isMarkActive, isNodeActive, getSelectionNodes, getSelectionMarks } from 'ngx-editor/helpers';
import { liftListItem, wrapInList, splitListItem, sinkListItem } from 'prosemirror-schema-list';
import { DomSanitizer } from '@angular/platform-browser';
import { throttleTime } from 'rxjs/operators';
import { isNil } from 'ngx-editor/utils';
import { keymap } from 'prosemirror-keymap';
import { undo, redo, history } from 'prosemirror-history';
import { wrappingInputRule, textblockTypeInputRule, smartQuotes, ellipsis, emDash, inputRules } from 'prosemirror-inputrules';

const editablePlugin = (editable = true) => {
    return new Plugin({
        key: new PluginKey('editable'),
        state: {
            init() {
                return editable;
            },
            apply(tr, previousVal) {
                var _a;
                return (_a = tr.getMeta('UPDATE_EDITABLE')) !== null && _a !== void 0 ? _a : previousVal;
            }
        },
        props: {
            editable(state) {
                return this.getState(state);
            },
            attributes(state) {
                const isEnabled = this.getState(state);
                if (isEnabled) {
                    return null;
                }
                return {
                    class: 'NgxEditor__Content--Disabled'
                };
            }
        }
    });
};

const PLACEHOLDER_CLASSNAME = 'NgxEditor__Placeholder';
const placeholderPlugin = (text) => {
    return new Plugin({
        key: new PluginKey('placeholder'),
        state: {
            init() {
                return text !== null && text !== void 0 ? text : '';
            },
            apply(tr, previousVal) {
                var _a;
                const placeholder = (_a = tr.getMeta('UPDATE_PLACEHOLDER')) !== null && _a !== void 0 ? _a : previousVal;
                return placeholder;
            }
        },
        props: {
            decorations(state) {
                const { doc } = state;
                const { textContent, childCount } = doc;
                const placeholder = this.getState(state);
                if (!placeholder || childCount > 1) {
                    return DecorationSet.empty;
                }
                const decorations = [];
                const decorate = (node, pos) => {
                    var _a;
                    if (node.type.isBlock && node.childCount === 0 && textContent.length === 0) {
                        const placeholderNode = Decoration.node(pos, (pos + node.nodeSize), {
                            class: PLACEHOLDER_CLASSNAME,
                            'data-placeholder': placeholder,
                            'data-align': (_a = node.attrs.align) !== null && _a !== void 0 ? _a : null
                        });
                        decorations.push(placeholderNode);
                    }
                    return false;
                };
                doc.descendants(decorate);
                return DecorationSet.create(doc, decorations);
            }
        }
    });
};

const attributesPlugin = (attributes = {}) => {
    return new Plugin({
        key: new PluginKey('attributes'),
        props: {
            attributes
        }
    });
};

const focusPlugin = (cb = () => { }) => {
    return new Plugin({
        key: new PluginKey('focus'),
        props: {
            handleDOMEvents: {
                focus: () => {
                    cb();
                    return false;
                }
            }
        }
    });
};

const blurPlugin = (cb = () => { }) => {
    return new Plugin({
        key: new PluginKey('blur'),
        props: {
            handleDOMEvents: {
                blur: () => {
                    cb();
                    return false;
                }
            }
        }
    });
};

const _c0 = ["imgEl"];
function ImageViewComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 4);
    ɵɵelementStart(1, "span", 5);
    ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_1_listener($event) { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.startResizing($event, "left"); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "span", 6);
    ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_2_listener($event) { ɵɵrestoreView(_r3); const ctx_r4 = ɵɵnextContext(); return ctx_r4.startResizing($event, "right"); });
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 7);
    ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_3_listener($event) { ɵɵrestoreView(_r3); const ctx_r5 = ɵɵnextContext(); return ctx_r5.startResizing($event, "left"); });
    ɵɵelementEnd();
    ɵɵelementStart(4, "span", 8);
    ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_4_listener($event) { ɵɵrestoreView(_r3); const ctx_r6 = ɵɵnextContext(); return ctx_r6.startResizing($event, "right"); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} }
const _c1 = function (a0) { return { "NgxEditor__Resizer--Active": a0 }; };
class ImageViewComponent {
    constructor() {
        this.alt = '';
        this.title = '';
        this.outerWidth = '';
        this.selected = false;
        this.imageResize = new EventEmitter();
    }
    startResizing(e, direction) {
        e.preventDefault();
        this.resizeImage(e, direction);
    }
    resizeImage(evt, direction) {
        const startX = evt.pageX;
        const startWidth = this.imgEl.nativeElement.clientWidth;
        const isLeftResize = direction === 'left';
        const { width } = window.getComputedStyle(this.view.dom);
        const editorWidth = parseInt(width, 10);
        const onMouseMove = (e) => {
            const currentX = e.pageX;
            const diffInPx = currentX - startX;
            const computedWidth = isLeftResize ? startWidth - diffInPx : startWidth + diffInPx;
            // prevent image overflow the editor
            // prevent resizng below 20px
            if (computedWidth > editorWidth || computedWidth < 20) {
                return;
            }
            this.outerWidth = `${computedWidth}px`;
        };
        const onMouseUp = (e) => {
            e.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            this.imageResize.emit();
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}
ImageViewComponent.ɵfac = function ImageViewComponent_Factory(t) { return new (t || ImageViewComponent)(); };
ImageViewComponent.ɵcmp = ɵɵdefineComponent({ type: ImageViewComponent, selectors: [["ngx-image-view"]], viewQuery: function ImageViewComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, 3);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.imgEl = _t.first);
    } }, inputs: { src: "src", alt: "alt", title: "title", outerWidth: "outerWidth", selected: "selected", view: "view" }, outputs: { imageResize: "imageResize" }, decls: 4, vars: 9, consts: [[1, "NgxEditor__ImageWrapper", 3, "ngClass"], ["class", "NgxEditor__ResizeHandle", 4, "ngIf"], [3, "src", "alt", "title"], ["imgEl", ""], [1, "NgxEditor__ResizeHandle"], [1, "NgxEditor__ResizeHandle--TL", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--TR", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--BL", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--BR", 3, "mousedown"]], template: function ImageViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "span", 0);
        ɵɵtemplate(1, ImageViewComponent_span_1_Template, 5, 0, "span", 1);
        ɵɵelement(2, "img", 2, 3);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵstyleProp("width", ctx.outerWidth);
        ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c1, ctx.selected));
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.selected);
        ɵɵadvance(1);
        ɵɵproperty("src", ctx.src, ɵɵsanitizeUrl)("alt", ctx.alt)("title", ctx.title);
    } }, directives: [NgClass, NgIf], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}img[_ngcontent-%COMP%]{width:100%;height:100%}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]{position:relative;display:inline-block;line-height:0;padding:2px}.NgxEditor__ImageWrapper.NgxEditor__Resizer--Active[_ngcontent-%COMP%]{padding:1px;border:1px solid #1a73e8}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BL[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BR[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TL[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TR[_ngcontent-%COMP%]{position:absolute;width:7px;height:7px;background-color:#1a73e8;border:1px solid #fff}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BR[_ngcontent-%COMP%]{bottom:-5px;right:-5px;cursor:se-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TR[_ngcontent-%COMP%]{top:-5px;right:-5px;cursor:ne-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TL[_ngcontent-%COMP%]{top:-5px;left:-5px;cursor:nw-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BL[_ngcontent-%COMP%]{bottom:-5px;left:-5px;cursor:sw-resize}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(ImageViewComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-image-view',
                templateUrl: './image-view.component.html',
                styleUrls: ['./image-view.component.scss']
            }]
    }], function () { return []; }, { src: [{
            type: Input
        }], alt: [{
            type: Input
        }], title: [{
            type: Input
        }], outerWidth: [{
            type: Input
        }], selected: [{
            type: Input
        }], view: [{
            type: Input
        }], imageResize: [{
            type: Output
        }], imgEl: [{
            type: ViewChild,
            args: ['imgEl', { static: true }]
        }] }); })();

class ImageRezieView {
    constructor(node, view, getPos, injector) {
        this.updating = false;
        this.handleResize = () => {
            if (this.updating) {
                return;
            }
            const { state, dispatch } = this.view;
            const { tr } = state;
            const transaction = tr.setNodeMarkup(this.getPos(), undefined, {
                src: this.imageComponentRef.instance.src,
                width: this.imageComponentRef.instance.outerWidth
            });
            const resolvedPos = transaction.doc.resolve(this.getPos());
            const newSelection = new NodeSelection(resolvedPos);
            transaction.setSelection(newSelection);
            dispatch(transaction);
        };
        const dom = document.createElement('image-view');
        const componentFactoryResolver = injector.get(ComponentFactoryResolver);
        this.applicationRef = injector.get(ApplicationRef);
        // Create the component and wire it up with the element
        const factory = componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
        this.imageComponentRef = factory.create(injector, [], dom);
        // Attach to the view so that the change detector knows to run
        this.applicationRef.attachView(this.imageComponentRef.hostView);
        this.setNodeAttributes(node.attrs);
        this.imageComponentRef.instance.view = view;
        this.dom = dom;
        this.view = view;
        this.node = node;
        this.getPos = getPos;
        this.resizeSubscription = this.imageComponentRef.instance.imageResize.subscribe(() => {
            this.handleResize();
        });
    }
    computeChanges(prevAttrs, newAttrs) {
        return JSON.stringify(prevAttrs) === JSON.stringify(newAttrs);
    }
    setNodeAttributes(attrs) {
        this.imageComponentRef.instance.src = attrs.src;
        this.imageComponentRef.instance.alt = attrs.alt;
        this.imageComponentRef.instance.title = attrs.title;
        this.imageComponentRef.instance.outerWidth = attrs.width;
    }
    update(node) {
        if (node.type !== this.node.type) {
            return false;
        }
        this.node = node;
        const changed = this.computeChanges(this.node.attrs, node.attrs);
        if (changed) {
            this.updating = true;
            this.setNodeAttributes(node.attrs);
            this.updating = false;
        }
        return true;
    }
    ignoreMutation() {
        return true;
    }
    selectNode() {
        this.imageComponentRef.instance.selected = true;
    }
    deselectNode() {
        this.imageComponentRef.instance.selected = false;
    }
    destroy() {
        this.resizeSubscription.unsubscribe();
        this.applicationRef.detachView(this.imageComponentRef.hostView);
    }
}
const imagePlugin = (injector) => {
    return new Plugin({
        key: new PluginKey('link'),
        props: {
            nodeViews: {
                image: (node, view, getPos) => {
                    return new ImageRezieView(node, view, getPos, injector);
                },
            }
        }
    });
};

const HTTP_LINK_REGEX = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
const linkify = (fragment) => {
    const linkified = [];
    fragment.forEach((child) => {
        if (child.isText) {
            const text = child.text;
            let pos = 0;
            const match = HTTP_LINK_REGEX.exec(text);
            if (match) {
                const start = match.index;
                const end = start + match[0].length;
                const link = child.type.schema.marks.link;
                if (start > 0) {
                    linkified.push(child.cut(pos, start));
                }
                const urlText = text.slice(start, end);
                linkified.push(child.cut(start, end).mark(link.create({ href: urlText }).addToSet(child.marks)));
                pos = end;
            }
            if (pos < text.length) {
                linkified.push(child.cut(pos));
            }
        }
        else {
            linkified.push(child.copy(linkify(child.content)));
        }
    });
    return Fragment.fromArray(linkified);
};
const linkPlugin = () => {
    return new Plugin({
        key: new PluginKey('link'),
        props: {
            transformPasted: (slice) => {
                return new Slice(linkify(slice.content), slice.openStart, slice.openEnd);
            }
        }
    });
};

const emptyDoc = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
        }
    ],
};
// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
const toHTML = (json, inputSchema) => {
    const schema$1 = inputSchema !== null && inputSchema !== void 0 ? inputSchema : schema;
    const contentNode = schema$1.nodeFromJSON(json);
    const html = DOMSerializer.fromSchema(schema$1).serializeFragment(contentNode.content);
    const div = document.createElement('div');
    div.appendChild(html);
    return div.innerHTML;
};
const toDoc = (html, inputSchema) => {
    const schema$1 = inputSchema !== null && inputSchema !== void 0 ? inputSchema : schema;
    const el = document.createElement('div');
    el.innerHTML = html;
    return DOMParser.fromSchema(schema$1).parse(el).toJSON();
};
const parseContent = (value, schema) => {
    if (!value) {
        return schema.nodeFromJSON(emptyDoc);
    }
    if (typeof value !== 'string') {
        return schema.nodeFromJSON(value);
    }
    const docJson = toDoc(value, schema);
    return schema.nodeFromJSON(docJson);
};

const _c0$1 = ["ngxEditor"];
const _c1$1 = ["*"];
class NgxEditorComponent {
    constructor(renderer, injector) {
        this.renderer = renderer;
        this.injector = injector;
        this.placeholder = 'Type Here...';
        this.enabled = true;
        this.focusOut = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.subscriptions = [];
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (!this.outputFormat && typeof value === 'string') {
            this.outputFormat = 'html';
        }
        this.editor.setContent(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    handleChange(jsonDoc) {
        if (this.outputFormat === 'html') {
            const html = toHTML(jsonDoc, this.editor.schema);
            this.onChange(html);
            return;
        }
        this.onChange(jsonDoc);
    }
    setMeta(key, value) {
        const { dispatch, state: { tr } } = this.editor.view;
        dispatch(tr.setMeta(key, value));
    }
    enable() {
        this.setMeta('UPDATE_EDITABLE', true);
    }
    disable() {
        this.setMeta('UPDATE_EDITABLE', false);
    }
    setPlaceholder(placeholder) {
        this.setMeta('UPDATE_PLACEHOLDER', placeholder);
    }
    registerPlugins() {
        this.editor.registerPlugin(editablePlugin(this.enabled));
        this.editor.registerPlugin(placeholderPlugin(this.placeholder));
        this.editor.registerPlugin(attributesPlugin({
            class: 'NgxEditor__Content'
        }));
        this.editor.registerPlugin(focusPlugin(() => {
            this.focusIn.emit();
        }));
        this.editor.registerPlugin(focusPlugin(() => {
            this.focusIn.emit();
        }));
        this.editor.registerPlugin(blurPlugin(() => {
            this.focusOut.emit();
            this.onTouched();
        }));
        this.editor.registerPlugin(imagePlugin(this.injector));
        this.editor.registerPlugin(linkPlugin());
    }
    ngOnInit() {
        if (!this.editor) {
            throw new Error('NgxEditor: Required editor instance');
        }
        // this.registerCustomElements();
        this.registerPlugins();
        this.renderer.appendChild(this.ngxEditor.nativeElement, this.editor.view.dom);
        const contentChangeSubscription = this.editor.valueChanges.subscribe(jsonDoc => {
            this.handleChange(jsonDoc);
        });
        this.subscriptions.push(contentChangeSubscription);
    }
    ngOnChanges(changes) {
        if ((changes === null || changes === void 0 ? void 0 : changes.placeholder) && !changes.placeholder.isFirstChange()) {
            this.setPlaceholder(changes.placeholder.currentValue);
        }
        if ((changes === null || changes === void 0 ? void 0 : changes.enabled) && !changes.enabled.isFirstChange()) {
            if (!changes.enabled.currentValue) {
                this.disable();
            }
            else {
                this.enable();
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
NgxEditorComponent.ɵfac = function NgxEditorComponent_Factory(t) { return new (t || NgxEditorComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(Injector)); };
NgxEditorComponent.ɵcmp = ɵɵdefineComponent({ type: NgxEditorComponent, selectors: [["ngx-editor"]], viewQuery: function NgxEditorComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$1, 3);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.ngxEditor = _t.first);
    } }, inputs: { editor: "editor", outputFormat: "outputFormat", placeholder: "placeholder", enabled: "enabled" }, outputs: { focusOut: "focusOut", focusIn: "focusIn" }, features: [ɵɵProvidersFeature([{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxEditorComponent),
                multi: true
            }]), ɵɵNgOnChangesFeature], ngContentSelectors: _c1$1, decls: 3, vars: 0, consts: [[1, "NgxEditor"], ["ngxEditor", ""]], template: function NgxEditorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0, 1);
        ɵɵprojection(2);
        ɵɵelementEnd();
    } }, styles: [".NgxEditor{background:#fff;color:#000;background-clip:padding-box;border-radius:4px;border:1px solid rgba(0,0,0,.2);position:relative}.NgxEditor--Disabled{opacity:.5;pointer-events:none}.NgxEditor__Placeholder:before{color:#6c757d;opacity:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;cursor:text;content:attr(data-placeholder)}.NgxEditor__Placeholder[data-align=right]:before{position:relative}.NgxEditor__Content{padding:.5rem;white-space:pre-wrap;outline:none;font-variant-ligatures:none;font-feature-settings:\"liga\" 0}.NgxEditor__Content p{margin:0 0 .7rem}.NgxEditor__Content blockquote{padding-left:1rem;border-left:3px solid #ddd;margin-left:0;margin-right:0}.NgxEditor__Content--Disabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.NgxEditor__Wrapper{border:1px solid rgba(0,0,0,.4);border-radius:4px}.NgxEditor__Wrapper .NgxEditor__MenuBar{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom:1px solid rgba(0,0,0,.2)}.NgxEditor__Wrapper .NgxEditor{border-top-left-radius:0;border-top-right-radius:0;border:none}.NgxEditor__MenuBar{display:flex;padding:.2rem;cursor:default;background-color:#fff}.NgxEditor__MenuItem{border-radius:2px;display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0}.NgxEditor__MenuItem:hover{background-color:#f1f1f1}.NgxEditor__MenuItem.NgxEditor__MenuItem--Icon{height:1.85rem;width:1.85rem;transition:.3s ease-in-out}.NgxEditor__MenuItem.NgxEditor__MenuItem--Icon+.NgxEditor__MenuItem--Icon{margin-left:2px}.NgxEditor__MenuItem .NgxEditor__MenuItem--IconContainer{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.NgxEditor__MenuItem.NgxEditor__MenuItem--Text{padding:0 .3rem}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active{background-color:#e8f0fe}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active.NgxEditor__MenuItem--Text{color:#1a73e8}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active svg{fill:#1a73e8}.NgxEditor__Dropdown{min-width:4rem;position:relative;display:flex;align-items:center;flex-shrink:0}.NgxEditor__Dropdown:hover{background-color:#f1f1f1}.NgxEditor__Dropdown .NgxEditor__Dropdown--Text{display:flex;align-items:center;justify-content:center;padding:0 .3rem;height:100%;width:100%}.NgxEditor__Dropdown .NgxEditor__Dropdown--Text:after{display:inline-block;content:\"\";margin-left:1.5rem;vertical-align:.25rem;border-top:.25rem solid;border-right:.25rem solid transparent;border-bottom:0;border-left:.25rem solid transparent}.NgxEditor__Dropdown .NgxEditor__Dropdown--DropdownMenu{position:absolute;left:0;top:calc(1.85rem + 2px);box-shadow:0 2px 6px 2px rgba(60,64,67,.15);border-radius:4px;background-color:#fff;z-index:10;width:100%}.NgxEditor__Dropdown .NgxEditor__Dropdown--Item{padding:.5rem;white-space:nowrap;color:inherit}.NgxEditor__Dropdown .NgxEditor__Dropdown--Item:hover{background-color:#ececec}.NgxEditor__Dropdown.NgxEditor__Dropdown--Open,.NgxEditor__Dropdown.NgxEditor__Dropdown--Selected{background-color:#e8f0fe}.NgxEditor__Dropdown.NgxEditor__Dropdown--Open .NgxEditor__Dropdown--Text,.NgxEditor__Dropdown.NgxEditor__Dropdown--Selected .NgxEditor__Dropdown--Text{color:#1a73e8}.NgxEditor__Dropdown .NgxEditor__Dropdown--Active{background-color:#f1f1f1}.NgxEditor__Dropdown .NgxEditor__Dropdown--Active:hover{background-color:#e7e7e7}.NgxEditor__Popup{position:absolute;top:calc(1.85rem + 2px);box-shadow:0 2px 6px 2px rgba(60,64,67,.15);border-radius:4px;background-color:#fff;z-index:10;min-width:12rem;padding:8px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup{margin-bottom:8px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup label{margin-bottom:3px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup input[type=text],.NgxEditor__Popup .NgxEditor__Popup--FormGroup input[type=url]{padding:2px 4px}.NgxEditor__Popup .NgxEditor__Popup--Col{display:flex;flex-direction:column;position:relative}.NgxEditor__Popup .NgxEditor__Popup--Label{font-size:85%}.NgxEditor__Seperator{border-left:1px solid #ccc;margin:0 .3rem}.NgxEditor__HelpText{font-size:80%}.NgxEditor__HelpText.NgxEditor__HelpText--Error{color:red}"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NgxEditorComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-editor',
                templateUrl: './editor.component.html',
                styleUrls: ['./editor.component.scss'],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxEditorComponent),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: Renderer2 }, { type: Injector }]; }, { ngxEditor: [{
            type: ViewChild,
            args: ['ngxEditor', { static: true }]
        }], editor: [{
            type: Input
        }], outputFormat: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], enabled: [{
            type: Input
        }], focusOut: [{
            type: Output
        }], focusIn: [{
            type: Output
        }] }); })();

class MenuService {
    constructor() {
        this.customMenuRefChange = new Subject();
    }
    setCustomMenuRef(c) {
        this.customMenuRefChange.next(c);
    }
}
MenuService.ɵfac = function MenuService_Factory(t) { return new (t || MenuService)(); };
MenuService.ɵprov = ɵɵdefineInjectable({ token: MenuService, factory: MenuService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(MenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

var bold = `
  <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
`;

var italic = `
  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
`;

var code = `
<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
`;

var underline = `
<path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
`;

var strike = `
<path d="M6.85,7.08C6.85,4.37,9.45,3,12.24,3c1.64,0,3,0.49,3.9,1.28c0.77,0.65,1.46,1.73,1.46,3.24h-3.01 c0-0.31-0.05-0.59-0.15-0.85c-0.29-0.86-1.2-1.28-2.25-1.28c-1.86,0-2.34,1.02-2.34,1.7c0,0.48,0.25,0.88,0.74,1.21 C10.97,8.55,11.36,8.78,12,9H7.39C7.18,8.66,6.85,8.11,6.85,7.08z M21,12v-2H3v2h9.62c1.15,0.45,1.96,0.75,1.96,1.97 c0,1-0.81,1.67-2.28,1.67c-1.54,0-2.93-0.54-2.93-2.51H6.4c0,0.55,0.08,1.13,0.24,1.58c0.81,2.29,3.29,3.3,5.67,3.3 c2.27,0,5.3-0.89,5.3-4.05c0-0.3-0.01-1.16-0.48-1.94H21V12z"/>
`;

var orderedList = `
<path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
`;

var bulletList = `
<path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
`;

var quote = `
<path d="M0 0h24v24H0z" fill="none"/><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
`;

var link = `
<path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
`;

var unlink = `
<path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"/>
`;

var image = `
<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
`;

var alignLeft = `
<path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
`;

var alignCenter = `
<path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>
`;

var alignRight = `
<path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
`;

var alignJustify = `
<path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>
`;

var textColor = `
<path d="M2,20h20v4H2V20z M5.49,17h2.42l1.27-3.58h5.65L16.09,17h2.42L13.25,3h-2.5L5.49,17z M9.91,11.39l2.03-5.79h0.12l2.03,5.79 H9.91z"/>
`;

var colorFill = `
<path d="M16.56,8.94L7.62,0L6.21,1.41l2.38,2.38L3.44,8.94c-0.59,0.59-0.59,1.54,0,2.12l5.5,5.5C9.23,16.85,9.62,17,10,17 s0.77-0.15,1.06-0.44l5.5-5.5C17.15,10.48,17.15,9.53,16.56,8.94z M5.21,10L10,5.21L14.79,10H5.21z M19,11.5c0,0-2,2.17-2,3.5 c0,1.1,0.9,2,2,2s2-0.9,2-2C21,13.67,19,11.5,19,11.5z M2,20h20v4H2V20z"/>
`;

// Icons source: https://material.io/
const DEFAULT_ICON_HEIGHT = 20;
const DEFAULT_ICON_WIDTH = 20;
const icons = {
    bold,
    italic,
    code,
    underline,
    strike,
    ordered_list: orderedList,
    bullet_list: bulletList,
    blockquote: quote,
    link,
    unlink,
    image,
    align_left: alignLeft,
    align_center: alignCenter,
    align_right: alignRight,
    align_justify: alignJustify,
    text_color: textColor,
    color_fill: colorFill
};
class Icon {
    static get(name, fill = '#000') {
        const path = icons[name] || '<path></path>';
        return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill=${fill}
        height=${DEFAULT_ICON_HEIGHT}
        width=${DEFAULT_ICON_WIDTH}
      >
        ${path}
      </svg>
    `;
    }
    static getPath(name) {
        const path = icons[name] || '<path></path>';
        return path;
    }
}

class Mark {
    constructor(name) {
        this.name = name;
    }
    apply() {
        return (state, dispatch) => {
            const { schema } = state;
            const type = schema.marks[this.name];
            if (!type) {
                return false;
            }
            return applyMark(type)(state, dispatch);
        };
    }
    toggle() {
        return (state, dispatch) => {
            const { schema } = state;
            const type = schema.marks[this.name];
            if (!type) {
                return false;
            }
            return toggleMark(type)(state, dispatch);
        };
    }
    isActive(state) {
        const { schema } = state;
        const type = schema.marks[this.name];
        if (!type) {
            return false;
        }
        return isMarkActive(state, type);
    }
    canExecute(state) {
        return this.toggle()(state);
    }
}

class Blockqote {
    toggle() {
        return (state, dispatch) => {
            const { schema } = state;
            const type = schema.nodes.blockquote;
            if (!type) {
                return false;
            }
            if (this.isActive(state)) {
                return lift(state, dispatch);
            }
            return wrapIn(type)(state, dispatch);
        };
    }
    isActive(state) {
        const { schema } = state;
        const type = schema.nodes.blockquote;
        if (!type) {
            return false;
        }
        return isNodeActive(state, type);
    }
    canExecute(state) {
        return this.toggle()(state);
    }
}

class ListItem {
    constructor(isBulletList = false) {
        this.isBulletList = false;
        this.isBulletList = isBulletList;
    }
    getType(schema) {
        return this.isBulletList ? schema.nodes.bullet_list : schema.nodes.ordered_list;
    }
    toggle() {
        return (state, dispatch) => {
            const { schema } = state;
            const type = this.getType(schema);
            if (!type) {
                return false;
            }
            if (this.isActive(state)) {
                return liftListItem(schema.nodes.list_item)(state, dispatch);
            }
            return wrapInList(type)(state, dispatch);
        };
    }
    isActive(state) {
        const { schema } = state;
        const type = this.getType(schema);
        if (!type) {
            return false;
        }
        return isNodeActive(state, type);
    }
    canExecute(state) {
        return this.toggle()(state);
    }
}

class Heading {
    constructor(level) {
        this.level = level;
    }
    apply() {
        return (state, dispatch) => {
            const { schema } = state;
            const type = schema.nodes.heading;
            if (!type) {
                return false;
            }
            return setBlockType(type)(state, dispatch);
        };
    }
    toggle() {
        return (state, dispatch) => {
            var _a;
            const { schema, selection, doc } = state;
            const type = schema.nodes.heading;
            if (!type) {
                return false;
            }
            const nodePos = selection.$from.before(1);
            const node = doc.nodeAt(nodePos);
            const attrs = (_a = node === null || node === void 0 ? void 0 : node.attrs) !== null && _a !== void 0 ? _a : {};
            if (this.isActive(state)) {
                return setBlockType(schema.nodes.paragraph, attrs)(state, dispatch);
            }
            return setBlockType(type, Object.assign(Object.assign({}, attrs), { level: this.level }))(state, dispatch);
        };
    }
    isActive(state) {
        const { schema } = state;
        const nodesInSelection = getSelectionNodes(state);
        const type = schema.nodes.heading;
        if (!type) {
            return false;
        }
        const supportedNodes = [
            type,
            schema.nodes.text,
            schema.nodes.blockquote
        ];
        // heading is a text node
        // don't mark as active when it has more nodes
        const nodes = nodesInSelection.filter(node => {
            return supportedNodes.includes(node.type);
        });
        const acitveNode = nodes.find((node) => {
            return node.attrs.level === this.level;
        });
        return Boolean(acitveNode);
    }
    canExecute(state) {
        return this.toggle()(state);
    }
}

class TextAlign {
    constructor(align) {
        this.align = align;
    }
    toggle() {
        return (state, dispatch) => {
            const { doc, selection, tr, schema } = state;
            const { from, to } = selection;
            let applicable = false;
            doc.nodesBetween(from, to, (node, pos) => {
                const nodeType = node.type;
                if ([schema.nodes.paragraph, schema.nodes.heading].includes(nodeType)) {
                    applicable = true;
                    tr.setNodeMarkup(pos, nodeType, Object.assign(Object.assign({}, node.attrs), { align: this.align }));
                }
                return true;
            });
            if (!applicable) {
                return false;
            }
            if (tr.docChanged) {
                dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
            }
            return true;
        };
    }
    isActive(state) {
        const nodes = getSelectionNodes(state);
        const active = nodes.find((node) => {
            return node.attrs.align === this.align;
        });
        return Boolean(active);
    }
    canExecute(state) {
        return this.toggle()(state);
    }
}

const defaultOptions = {
    strict: true
};
class Link {
    update(attrs = {}) {
        return (state, dispatch) => {
            const { schema, selection } = state;
            const type = schema.marks.link;
            if (!type) {
                return false;
            }
            if (selection.empty) {
                return false;
            }
            return toggleMark(type, attrs)(state, dispatch);
        };
    }
    insert(text, attrs) {
        return (state, dispatch) => {
            var _a, _b;
            const { schema, tr } = state;
            const type = schema.marks.link;
            if (!type) {
                return false;
            }
            const linkAttrs = {
                href: attrs.href,
                title: (_a = attrs.title) !== null && _a !== void 0 ? _a : text,
                target: (_b = attrs.target) !== null && _b !== void 0 ? _b : '_blank'
            };
            const node = schema.text(text, [schema.marks.link.create(linkAttrs)]);
            tr.replaceSelectionWith(node, false)
                .scrollIntoView();
            if (tr.docChanged) {
                dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
                return true;
            }
            return false;
        };
    }
    isActive(state, options = defaultOptions) {
        if (options.strict) {
            return true;
        }
        const { schema } = state;
        const type = schema.marks.link;
        if (!type) {
            return false;
        }
        return isMarkActive(state, type);
    }
    remove(state, dispatch) {
        return removeLink()(state, dispatch);
    }
    canExecute(state) {
        return this.update({})(state);
    }
}

class Image {
    insert(src, attrs) {
        return (state, dispatch) => {
            const { schema, tr, selection } = state;
            const type = schema.nodes.image;
            if (!type) {
                return false;
            }
            const imageAttrs = Object.assign({ width: null, src }, attrs);
            if (!imageAttrs.width && selection instanceof NodeSelection && selection.node.type === type) {
                imageAttrs.width = selection.node.attrs.width;
            }
            tr.replaceSelectionWith(type.createAndFill(imageAttrs));
            const resolvedPos = tr.doc.resolve(tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize);
            tr
                .setSelection(new NodeSelection(resolvedPos))
                .scrollIntoView();
            if (tr.docChanged) {
                dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
                return true;
            }
            return false;
        };
    }
    isActive(state) {
        const { selection } = state;
        if (selection instanceof NodeSelection) {
            return selection.node.type.name === 'image';
        }
        return false;
    }
}

class TextColor {
    constructor(name) {
        this.name = name;
    }
    apply(attrs) {
        return (state, dispatch) => {
            const { schema, selection, doc } = state;
            const type = schema.marks[this.name];
            if (!type) {
                return false;
            }
            const { from, to, empty } = selection;
            if (!empty && (from + 1 === to)) {
                const node = doc.nodeAt(from);
                if ((node === null || node === void 0 ? void 0 : node.isAtom) && !node.isText && node.isLeaf) {
                    // An atomic node (e.g. Image) is selected.
                    return false;
                }
            }
            return applyMark(type, attrs)(state, dispatch);
        };
    }
    isActive(state) {
        const { schema } = state;
        const type = schema.marks[this.name];
        if (!type) {
            return false;
        }
        return isMarkActive(state, type);
    }
    getActiveColors(state) {
        if (!this.isActive(state)) {
            return [];
        }
        const { schema } = state;
        const marks = getSelectionMarks(state);
        const colors = marks
            .filter(mark => mark.type === schema.marks[this.name])
            .map(mark => mark.attrs.color)
            .filter(Boolean);
        return colors;
    }
    remove() {
        return (state, dispatch) => {
            const { schema } = state;
            const type = schema.marks[this.name];
            if (!type) {
                return false;
            }
            return removeMark(type)(state, dispatch);
        };
    }
    canExecute(state) {
        const attrs = this.name === 'text_color' ? { color: '' } : { backgroundColor: '' };
        return this.apply(attrs)(state);
    }
}

const STRONG = new Mark('strong');
const EM = new Mark('em');
const CODE = new Mark('code');
const UNDERLINE = new Mark('u');
const STRIKE = new Mark('s');
const BLOCKQUOTE = new Blockqote();
const UL = new ListItem(true);
const OL = new ListItem(false);
const H1 = new Heading(1);
const H2 = new Heading(2);
const H3 = new Heading(3);
const H4 = new Heading(4);
const H5 = new Heading(5);
const H6 = new Heading(6);
const ALIGN_LEFT = new TextAlign('left');
const ALIGN_CENTER = new TextAlign('center');
const ALIGN_RIGHT = new TextAlign('right');
const ALIGN_JUSTIFY = new TextAlign('justify');
const LINK = new Link();
const IMAGE = new Image();
const TEXT_COLOR = new TextColor('text_color');
const TEXT_BACKGROUND_COLOR = new TextColor('text_background_color');

const ToggleCommands = {
    bold: STRONG,
    italic: EM,
    code: CODE,
    underline: UNDERLINE,
    strike: STRIKE,
    blockquote: BLOCKQUOTE,
    bullet_list: UL,
    ordered_list: OL,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    align_left: ALIGN_LEFT,
    align_center: ALIGN_CENTER,
    align_right: ALIGN_RIGHT,
    align_justify: ALIGN_JUSTIFY
};
const Link$1 = LINK;
const Image$1 = IMAGE;
const TextColor$1 = TEXT_COLOR;
const TextBackgroundColor = TEXT_BACKGROUND_COLOR;

const defaults = {
    // menu
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    strike: 'Strike',
    blockquote: 'Blockquote',
    bullet_list: 'Bullet List',
    ordered_list: 'Ordered List',
    heading: 'Heading',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: 'Left Align',
    align_center: 'Center Align',
    align_right: 'Right Align',
    align_justify: 'Justify',
    text_color: 'Text Color',
    background_color: 'Background Color',
    // pupups, forms, others...
    url: 'URL',
    text: 'Text',
    openInNewTab: 'Open in new tab',
    insert: 'Insert',
    altText: 'Alt Text',
    title: 'Title',
    remove: 'Remove',
};
class Locals {
    constructor(newLocals = {}) {
        this.locals = defaults;
        this.get = (key) => {
            var _a;
            return (_a = this.locals[key]) !== null && _a !== void 0 ? _a : '';
        };
        this.locals = Object.assign({}, defaults, newLocals);
    }
}

class NgxEditorServiceConfig {
    constructor() {
        this.locals = {};
    }
}
NgxEditorServiceConfig.ɵfac = function NgxEditorServiceConfig_Factory(t) { return new (t || NgxEditorServiceConfig)(); };
NgxEditorServiceConfig.ɵprov = ɵɵdefineInjectable({ token: NgxEditorServiceConfig, factory: NgxEditorServiceConfig.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NgxEditorServiceConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
class NgxEditorService {
    constructor(config) {
        this.config = config;
    }
    get locals() {
        return new Locals(this.config.locals);
    }
}
NgxEditorService.ɵfac = function NgxEditorService_Factory(t) { return new (t || NgxEditorService)(ɵɵinject(NgxEditorServiceConfig, 8)); };
NgxEditorService.ɵprov = ɵɵdefineInjectable({ token: NgxEditorService, factory: NgxEditorService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NgxEditorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: NgxEditorServiceConfig, decorators: [{
                type: Optional
            }] }]; }, null); })();
const provideMyServiceOptions = (config) => {
    var _a;
    return {
        locals: (_a = config.locals) !== null && _a !== void 0 ? _a : {}
    };
};

class SanitizeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
SanitizeHtmlPipe.ɵfac = function SanitizeHtmlPipe_Factory(t) { return new (t || SanitizeHtmlPipe)(ɵɵdirectiveInject(DomSanitizer)); };
SanitizeHtmlPipe.ɵpipe = ɵɵdefinePipe({ name: "sanitizeHtml", type: SanitizeHtmlPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(SanitizeHtmlPipe, [{
        type: Pipe,
        args: [{
                name: 'sanitizeHtml'
            }]
    }], function () { return [{ type: DomSanitizer }]; }, null); })();

class ToggleCommandComponent {
    constructor(ngxeService, menuService) {
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.isActive = false;
        this.disabled = false;
        this.update = (view) => {
            const { state } = view;
            const command = ToggleCommands[this.name];
            this.isActive = command.isActive(state);
            this.disabled = !command.canExecute(state);
        };
    }
    get name() {
        return this.toolbarItem;
    }
    toggle(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.editorView;
        const command = ToggleCommands[this.name];
        command.toggle()(state, dispatch);
    }
    getTitle(name) {
        return this.ngxeService.locals.get(name);
    }
    ngOnInit() {
        this.html = Icon.get(this.name);
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
ToggleCommandComponent.ɵfac = function ToggleCommandComponent_Factory(t) { return new (t || ToggleCommandComponent)(ɵɵdirectiveInject(NgxEditorService), ɵɵdirectiveInject(MenuService)); };
ToggleCommandComponent.ɵcmp = ɵɵdefineComponent({ type: ToggleCommandComponent, selectors: [["ngx-toggle-command"]], hostVars: 4, hostBindings: function ToggleCommandComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.isActive)("NgxEditor--Disabled", ctx.disabled);
    } }, inputs: { toolbarItem: "toolbarItem" }, decls: 2, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "title", "mousedown"]], template: function ToggleCommandComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("mousedown", function ToggleCommandComponent_Template_div_mousedown_0_listener($event) { return ctx.toggle($event); });
        ɵɵpipe(1, "sanitizeHtml");
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 2, ctx.html), ɵɵsanitizeHtml)("title", ctx.getTitle(ctx.name));
    } }, pipes: [SanitizeHtmlPipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(ToggleCommandComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-toggle-command',
                templateUrl: './toggle-command.component.html',
                styleUrls: ['./toggle-command.component.scss']
            }]
    }], function () { return [{ type: NgxEditorService }, { type: MenuService }]; }, { toolbarItem: [{
            type: Input
        }], isActive: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], disabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }] }); })();

function LinkComponent_div_2_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", (ctx_r1.href.errors == null ? null : ctx_r1.href.errors.pattern) && "Please enter valid url.", " ");
} }
function LinkComponent_div_2_div_13_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", (ctx_r2.text.errors == null ? null : ctx_r2.text.errors.required) && "This is required", " ");
} }
function LinkComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵelementStart(1, "form", 3);
    ɵɵlistener("ngSubmit", function LinkComponent_div_2_Template_form_ngSubmit_1_listener($event) { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.insertLink($event); });
    ɵɵelementStart(2, "div", 4);
    ɵɵelementStart(3, "div", 5);
    ɵɵelementStart(4, "label", 6);
    ɵɵtext(5);
    ɵɵelementEnd();
    ɵɵelement(6, "input", 7);
    ɵɵtemplate(7, LinkComponent_div_2_div_7_Template, 2, 1, "div", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(8, "div", 4);
    ɵɵelementStart(9, "div", 5);
    ɵɵelementStart(10, "label", 6);
    ɵɵtext(11);
    ɵɵelementEnd();
    ɵɵelement(12, "input", 9);
    ɵɵtemplate(13, LinkComponent_div_2_div_13_Template, 2, 1, "div", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(14, "div", 4);
    ɵɵelementStart(15, "div", 5);
    ɵɵelementStart(16, "label");
    ɵɵelement(17, "input", 10);
    ɵɵtext(18);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(19, "button", 11);
    ɵɵtext(20);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("formGroup", ctx_r0.form);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r0.getLabel("url"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.href.touched && ctx_r0.href.invalid);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r0.getLabel("text"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.text.touched && ctx_r0.text.invalid);
    ɵɵadvance(5);
    ɵɵtextInterpolate1(" ", ctx_r0.getLabel("openInNewTab"), " ");
    ɵɵadvance(1);
    ɵɵproperty("disabled", !ctx_r0.form.valid);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r0.getLabel("insert"));
} }
class LinkComponent {
    constructor(el, ngxeService, menuService) {
        this.el = el;
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.showPopup = false;
        this.isActive = false;
        this.canExecute = true;
        this.form = new FormGroup({
            href: new FormControl('', [
                Validators$1.required,
                Validators$1.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
            ]),
            text: new FormControl('', [Validators$1.required]),
            openInNewTab: new FormControl(true)
        });
        this.setText = () => {
            const { state: { selection, doc } } = this.editorView;
            const { empty, from, to } = selection;
            const selectedText = !empty ? doc.textBetween(from, to) : '';
            if (selectedText) {
                this.text.patchValue(selectedText);
                this.text.disable();
            }
        };
        this.update = (view) => {
            const { state } = view;
            this.isActive = Link$1.isActive(state, { strict: false });
            this.canExecute = Link$1.canExecute(state);
        };
    }
    get valid() {
        return this.isActive || this.showPopup;
    }
    get disabled() {
        return !this.canExecute;
    }
    get icon() {
        return Icon.get(this.isActive ? 'unlink' : 'link');
    }
    get href() {
        return this.form.get('href');
    }
    get text() {
        return this.form.get('text');
    }
    onDocumentClick(e) {
        if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
            this.hideForm();
        }
    }
    getLabel(key) {
        return this.ngxeService.locals.get(key);
    }
    hideForm() {
        this.showPopup = false;
        this.form.reset({
            href: '',
            text: '',
            openInNewTab: true
        });
        this.text.enable();
    }
    onMouseDown(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.editorView;
        if (this.isActive) {
            Link$1.remove(state, dispatch);
            return;
        }
        this.showPopup = !this.showPopup;
        if (this.showPopup) {
            this.setText();
        }
    }
    insertLink(e) {
        e.preventDefault();
        const { text, href, openInNewTab } = this.form.getRawValue();
        const { dispatch, state } = this.editorView;
        const { selection } = state;
        const attrs = {
            title: href,
            href,
            target: openInNewTab ? '_blank' : '_self'
        };
        if (selection.empty) {
            Link$1.insert(text, attrs)(state, dispatch);
            this.editorView.focus();
        }
        else {
            Link$1.update(attrs)(state, dispatch);
        }
        this.hideForm();
    }
    ngOnInit() {
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
LinkComponent.ɵfac = function LinkComponent_Factory(t) { return new (t || LinkComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxEditorService), ɵɵdirectiveInject(MenuService)); };
LinkComponent.ɵcmp = ɵɵdefineComponent({ type: LinkComponent, selectors: [["ngx-link"]], hostVars: 4, hostBindings: function LinkComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function LinkComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, ɵɵresolveDocument);
    } if (rf & 2) {
        ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid)("NgxEditor--Disabled", ctx.disabled);
    } }, decls: 3, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], [1, "NgxEditor__Popup--Form", 3, "formGroup", "ngSubmit"], [1, "NgxEditor__Popup--FormGroup"], [1, "NgxEditor__Popup--Col"], [1, "NgxEditor__Popup--Label"], ["type", "href", "id", "href", "formControlName", "href", "autofocus", "", "autocomplete", "off"], ["class", "NgxEditor__HelpText NgxEditor__HelpText--Error", 4, "ngIf"], ["type", "text", "formControlName", "text", "autocomplete", "off"], ["type", "checkbox", "formControlName", "openInNewTab"], ["type", "submit", 3, "disabled"], [1, "NgxEditor__HelpText", "NgxEditor__HelpText--Error"]], template: function LinkComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("mousedown", function LinkComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
        ɵɵpipe(1, "sanitizeHtml");
        ɵɵelementEnd();
        ɵɵtemplate(2, LinkComponent_div_2_Template, 21, 8, "div", 1);
    } if (rf & 2) {
        ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 2, ctx.icon), ɵɵsanitizeHtml);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.showPopup);
    } }, directives: [NgIf, ɵangular_packages_forms_forms_ba, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, CheckboxControlValueAccessor], pipes: [SanitizeHtmlPipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(LinkComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-link',
                templateUrl: './link.component.html',
                styleUrls: ['./link.component.scss']
            }]
    }], function () { return [{ type: ElementRef }, { type: NgxEditorService }, { type: MenuService }]; }, { valid: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], disabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }] }); })();

function ImageComponent_div_2_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", (ctx_r1.src.errors == null ? null : ctx_r1.src.errors.pattern) && "Please enter valid url.", " ");
} }
function ImageComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵelementStart(1, "form", 3);
    ɵɵlistener("ngSubmit", function ImageComponent_div_2_Template_form_ngSubmit_1_listener($event) { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.insertLink($event); });
    ɵɵelementStart(2, "div", 4);
    ɵɵelementStart(3, "div", 5);
    ɵɵelementStart(4, "label", 6);
    ɵɵtext(5);
    ɵɵelementEnd();
    ɵɵelement(6, "input", 7);
    ɵɵtemplate(7, ImageComponent_div_2_div_7_Template, 2, 1, "div", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(8, "div", 4);
    ɵɵelementStart(9, "div", 5);
    ɵɵelementStart(10, "label", 6);
    ɵɵtext(11);
    ɵɵelementEnd();
    ɵɵelement(12, "input", 9);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(13, "div", 4);
    ɵɵelementStart(14, "div", 5);
    ɵɵelementStart(15, "label", 6);
    ɵɵtext(16);
    ɵɵelementEnd();
    ɵɵelement(17, "input", 10);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(18, "button", 11);
    ɵɵtext(19);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("formGroup", ctx_r0.form);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r0.getLabel("url"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.src.touched && ctx_r0.src.invalid);
    ɵɵadvance(4);
    ɵɵtextInterpolate(ctx_r0.getLabel("altText"));
    ɵɵadvance(5);
    ɵɵtextInterpolate(ctx_r0.getLabel("title"));
    ɵɵadvance(2);
    ɵɵproperty("disabled", !ctx_r0.form.valid || !ctx_r0.form.dirty);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r0.getLabel("insert"));
} }
class ImageComponent {
    constructor(el, ngxeService, menuService) {
        this.el = el;
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.showPopup = false;
        this.isActive = false;
        this.form = new FormGroup({
            src: new FormControl('', [
                Validators$1.required,
                Validators$1.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
            ]),
            alt: new FormControl(''),
            title: new FormControl('')
        });
        this.update = (view) => {
            const { state } = view;
            this.isActive = Image$1.isActive(state);
        };
    }
    get valid() {
        return this.isActive || this.showPopup;
    }
    get icon() {
        return Icon.get('image');
    }
    get src() {
        return this.form.get('src');
    }
    onDocumentClick(e) {
        if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
            this.hideForm();
        }
    }
    getLabel(key) {
        return this.ngxeService.locals.get(key);
    }
    hideForm() {
        this.showPopup = false;
        this.form.reset({
            src: '',
            alt: '',
            title: ''
        });
    }
    onMouseDown(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        this.showPopup = !this.showPopup;
        if (this.showPopup) {
            this.fillForm();
        }
    }
    fillForm() {
        const { state } = this.editorView;
        const { selection } = state;
        if (selection instanceof NodeSelection && this.isActive) {
            const { src, alt = '', title = '' } = selection.node.attrs;
            this.form.setValue({
                src,
                alt,
                title
            });
        }
    }
    insertLink(e) {
        e.preventDefault();
        const { src, alt, title } = this.form.getRawValue();
        const { dispatch, state } = this.editorView;
        const attrs = {
            alt,
            title
        };
        Image$1.insert(src, attrs)(state, dispatch);
        this.editorView.focus();
        this.hideForm();
    }
    ngOnInit() {
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
ImageComponent.ɵfac = function ImageComponent_Factory(t) { return new (t || ImageComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxEditorService), ɵɵdirectiveInject(MenuService)); };
ImageComponent.ɵcmp = ɵɵdefineComponent({ type: ImageComponent, selectors: [["ngx-image"]], hostVars: 2, hostBindings: function ImageComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function ImageComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, ɵɵresolveDocument);
    } if (rf & 2) {
        ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid);
    } }, decls: 3, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], [1, "NgxEditor__Popup--Form", 3, "formGroup", "ngSubmit"], [1, "NgxEditor__Popup--FormGroup"], [1, "NgxEditor__Popup--Col"], [1, "NgxEditor__Popup--Label"], ["type", "href", "id", "href", "formControlName", "src", "autofocus", "", "autocomplete", "off"], ["class", "NgxEditor__HelpText NgxEditor__HelpText--Error", 4, "ngIf"], ["type", "text", "formControlName", "alt", "autocomplete", "off"], ["type", "text", "formControlName", "title", "autocomplete", "off"], ["type", "submit", 3, "disabled"], [1, "NgxEditor__HelpText", "NgxEditor__HelpText--Error"]], template: function ImageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("mousedown", function ImageComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
        ɵɵpipe(1, "sanitizeHtml");
        ɵɵelementEnd();
        ɵɵtemplate(2, ImageComponent_div_2_Template, 20, 7, "div", 1);
    } if (rf & 2) {
        ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 2, ctx.icon), ɵɵsanitizeHtml);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.showPopup);
    } }, directives: [NgIf, ɵangular_packages_forms_forms_ba, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName], pipes: [SanitizeHtmlPipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(ImageComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-image',
                templateUrl: './image.component.html',
                styleUrls: ['./image.component.scss']
            }]
    }], function () { return [{ type: ElementRef }, { type: NgxEditorService }, { type: MenuService }]; }, { valid: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }] }); })();

const _c0$2 = function (a0, a1) { return { "NgxEditor__Dropdown--Active": a0, "NgxEditor--Disabled": a1 }; };
function DropdownComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("mousedown", function DropdownComponent_div_2_div_1_Template_div_mousedown_0_listener($event) { ɵɵrestoreView(_r4); const item_r2 = ctx.$implicit; const ctx_r3 = ɵɵnextContext(2); return ctx_r3.onClick($event, item_r2); });
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(2, _c0$2, item_r2 === ctx_r1.activeItem, ctx_r1.disabledItems.includes(item_r2)));
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r1.getName(item_r2), " ");
} }
function DropdownComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, DropdownComponent_div_2_div_1_Template, 2, 5, "div", 3);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.items);
} }
class DropdownComponent {
    constructor(ngxeService, menuService, el) {
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.el = el;
        this.isDropdownOpen = false;
        this.activeItems = [];
        this.disabledItems = [];
        this.update = (view) => {
            const { state } = view;
            this.activeItems = [];
            this.disabledItems = [];
            this.items.forEach((item) => {
                const command = ToggleCommands[item];
                const isActive = command.isActive(state);
                if (isActive) {
                    this.activeItems.push(item);
                }
                if (!command.canExecute(state)) {
                    this.disabledItems.push(item);
                }
            });
            if (this.activeItems.length === 1) {
                this.activeItem = this.activeItems[0];
            }
            else {
                this.activeItem = null;
            }
        };
    }
    get isSelected() {
        return Boolean(this.activeItem || this.isDropdownOpen);
    }
    get isDropdownDisabled() {
        return this.disabledItems.length === this.items.length;
    }
    onDocumentClick(target) {
        if (!this.el.nativeElement.contains(target) && this.isDropdownOpen) {
            this.isDropdownOpen = false;
        }
    }
    getName(key) {
        return this.ngxeService.locals.get(key);
    }
    toggleDropdown(e) {
        e.preventDefault();
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    onClick(e, item) {
        e.preventDefault();
        // consider only left click
        if (e.button !== 0) {
            return;
        }
        const command = ToggleCommands[item];
        const { state, dispatch } = this.editorView;
        command.toggle()(state, dispatch);
        this.isDropdownOpen = false;
    }
    ngOnInit() {
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
DropdownComponent.ɵfac = function DropdownComponent_Factory(t) { return new (t || DropdownComponent)(ɵɵdirectiveInject(NgxEditorService), ɵɵdirectiveInject(MenuService), ɵɵdirectiveInject(ElementRef)); };
DropdownComponent.ɵcmp = ɵɵdefineComponent({ type: DropdownComponent, selectors: [["ngx-dropdown"]], hostVars: 4, hostBindings: function DropdownComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function DropdownComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event.target); }, false, ɵɵresolveDocument);
    } if (rf & 2) {
        ɵɵclassProp("NgxEditor__Dropdown--Selected", ctx.isSelected)("NgxEditor--Disabled", ctx.isDropdownDisabled);
    } }, inputs: { group: "group", items: "items" }, decls: 3, vars: 2, consts: [[1, "NgxEditor__Dropdown--Text", 3, "mousedown"], ["class", "NgxEditor__Dropdown--DropdownMenu", 4, "ngIf"], [1, "NgxEditor__Dropdown--DropdownMenu"], ["class", "NgxEditor__Dropdown--Item", 3, "ngClass", "mousedown", 4, "ngFor", "ngForOf"], [1, "NgxEditor__Dropdown--Item", 3, "ngClass", "mousedown"]], template: function DropdownComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("mousedown", function DropdownComponent_Template_div_mousedown_0_listener($event) { return ctx.toggleDropdown($event); });
        ɵɵtext(1);
        ɵɵelementEnd();
        ɵɵtemplate(2, DropdownComponent_div_2_Template, 2, 1, "div", 1);
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵtextInterpolate1(" ", ctx.getName(ctx.activeItem || ctx.group), "\n");
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isDropdownOpen);
    } }, directives: [NgIf, NgForOf, NgClass], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(DropdownComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-dropdown',
                templateUrl: './dropdown.component.html',
                styleUrls: ['./dropdown.component.scss']
            }]
    }], function () { return [{ type: NgxEditorService }, { type: MenuService }, { type: ElementRef }]; }, { group: [{
            type: Input
        }], items: [{
            type: Input
        }], isSelected: [{
            type: HostBinding,
            args: ['class.NgxEditor__Dropdown--Selected']
        }], isDropdownDisabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event.target']]
        }] }); })();

const _c0$3 = function (a0, a1) { return { backgroundColor: a0, color: a1 }; };
const _c1$2 = function (a0) { return { "NgxEditor__Color--Active": a0 }; };
function ColorPickerComponent_div_2_div_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("mousedown", function ColorPickerComponent_div_2_div_1_button_1_Template_button_mousedown_0_listener($event) { ɵɵrestoreView(_r6); const color_r4 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(3); return ctx_r5.onColorSelect($event, color_r4); });
    ɵɵelementEnd();
} if (rf & 2) {
    const color_r4 = ctx.$implicit;
    const ctx_r3 = ɵɵnextContext(3);
    ɵɵproperty("ngStyle", ɵɵpureFunction2(3, _c0$3, color_r4, ctx_r3.getContrastYIQ(color_r4)))("title", color_r4)("ngClass", ɵɵpureFunction1(6, _c1$2, ctx_r3.activeColors.includes(color_r4)));
} }
function ColorPickerComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵtemplate(1, ColorPickerComponent_div_2_div_1_button_1_Template, 1, 8, "button", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const colorGroup_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", colorGroup_r2);
} }
function ColorPickerComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, ColorPickerComponent_div_2_div_1_Template, 2, 1, "div", 3);
    ɵɵelementStart(2, "button", 4);
    ɵɵlistener("mousedown", function ColorPickerComponent_div_2_Template_button_mousedown_2_listener($event) { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(); return ctx_r7.remove($event); });
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.presets);
    ɵɵadvance(1);
    ɵɵproperty("disabled", !ctx_r0.isActive);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r0.getLabel("remove"), " ");
} }
class ColorPickerComponent {
    constructor(el, menuService, ngxeService) {
        this.el = el;
        this.menuService = menuService;
        this.ngxeService = ngxeService;
        this.showPopup = false;
        this.isActive = false;
        this.activeColors = [];
        this.canExecute = true;
        this.update = (view) => {
            const { state } = view;
            this.canExecute = this.command.canExecute(state);
            this.isActive = this.command.isActive(state);
            this.activeColors = [];
            if (this.isActive) {
                this.activeColors = this.command.getActiveColors(state);
            }
        };
    }
    get valid() {
        return this.isActive || this.showPopup;
    }
    get disabled() {
        return !this.canExecute;
    }
    get title() {
        return this.getLabel(this.type === 'text_color' ? 'text_color' : 'background_color');
    }
    get icon() {
        return Icon.get(this.type === 'text_color' ? 'text_color' : 'color_fill');
    }
    get command() {
        return this.type === 'text_color' ? TextColor$1 : TextBackgroundColor;
    }
    getContrastYIQ(hexcolor) {
        hexcolor = hexcolor.replace('#', '');
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }
    onDocumentClick(e) {
        if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
            this.hidePopup();
        }
    }
    hidePopup() {
        this.showPopup = false;
    }
    togglePopup(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        this.showPopup = !this.showPopup;
    }
    remove(e) {
        e.preventDefault();
        const { state, dispatch } = this.editorView;
        this.command.remove()(state, dispatch);
        this.hidePopup();
    }
    onColorSelect(e, color) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.editorView;
        if (this.type === 'text_color') {
            const attrs = { color };
            this.command.apply(attrs)(state, dispatch);
        }
        else {
            const attrs = { backgroundColor: color };
            this.command.apply(attrs)(state, dispatch);
        }
        if (!this.editorView.hasFocus()) {
            this.editorView.focus();
        }
        this.hidePopup();
    }
    getLabel(key) {
        return this.ngxeService.locals.get(key);
    }
    ngOnInit() {
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) { return new (t || ColorPickerComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(MenuService), ɵɵdirectiveInject(NgxEditorService)); };
ColorPickerComponent.ɵcmp = ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["ngx-color-picker"]], hostVars: 4, hostBindings: function ColorPickerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function ColorPickerComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, ɵɵresolveDocument);
    } if (rf & 2) {
        ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid)("NgxEditor--Disabled", ctx.disabled);
    } }, inputs: { presets: "presets", type: "type" }, decls: 3, vars: 5, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "title", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], ["class", "NgxEditor__ColorContainer", 4, "ngFor", "ngForOf"], [1, "NgxEditor__MenuItem--Button", 3, "disabled", "mousedown"], [1, "NgxEditor__ColorContainer"], ["class", "NgxEditor__Color", 3, "ngStyle", "title", "ngClass", "mousedown", 4, "ngFor", "ngForOf"], [1, "NgxEditor__Color", 3, "ngStyle", "title", "ngClass", "mousedown"]], template: function ColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("mousedown", function ColorPickerComponent_Template_div_mousedown_0_listener($event) { return ctx.togglePopup($event); });
        ɵɵpipe(1, "sanitizeHtml");
        ɵɵelementEnd();
        ɵɵtemplate(2, ColorPickerComponent_div_2_Template, 4, 3, "div", 1);
    } if (rf & 2) {
        ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 3, ctx.icon), ɵɵsanitizeHtml)("title", ctx.title);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.showPopup);
    } }, directives: [NgIf, NgForOf, NgStyle, NgClass], pipes: [SanitizeHtmlPipe], styles: ["@charset \"UTF-8\";.NgxEditor__Popup[_ngcontent-%COMP%]{width:230px}.NgxEditor__ColorContainer[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.NgxEditor__ColorContainer[_ngcontent-%COMP%] + .NgxEditor__ColorContainer[_ngcontent-%COMP%]{margin-top:5px}.NgxEditor__Color[_ngcontent-%COMP%]{border:none;outline:none;border-radius:6px;width:24px;height:24px;flex-shrink:0}.NgxEditor__Color--Active[_ngcontent-%COMP%]:after{content:\"\u2714\";font-size:90%}.NgxEditor__MenuItem--Button[_ngcontent-%COMP%]{margin-top:5px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(ColorPickerComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-color-picker',
                templateUrl: './color-picker.component.html',
                styleUrls: ['./color-picker.component.scss']
            }]
    }], function () { return [{ type: ElementRef }, { type: MenuService }, { type: NgxEditorService }]; }, { presets: [{
            type: Input
        }], type: [{
            type: Input
        }], valid: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], disabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }] }); })();

function MenuComponent_ng_container_1_ng_container_1_ngx_toggle_command_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ngx-toggle-command", 7);
} if (rf & 2) {
    const item_r5 = ɵɵnextContext().$implicit;
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r7.iconContainerClass);
    ɵɵproperty("toolbarItem", item_r5);
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_link_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ngx-link");
} if (rf & 2) {
    const ctx_r8 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r8.iconContainerClass);
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_image_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ngx-image");
} if (rf & 2) {
    const ctx_r9 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r9.iconContainerClass);
} }
function MenuComponent_ng_container_1_ng_container_1_ng_container_4_ngx_dropdown_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ngx-dropdown", 9);
} if (rf & 2) {
    const dropdownItem_r16 = ctx.$implicit;
    const ctx_r15 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r15.dropdownContainerClass);
    ɵɵproperty("group", dropdownItem_r16.key)("items", dropdownItem_r16.value);
} }
function MenuComponent_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_ng_container_4_ngx_dropdown_1_Template, 1, 4, "ngx-dropdown", 8);
    ɵɵpipe(2, "keyvalue");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r5 = ɵɵnextContext().$implicit;
    const ctx_r10 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 1, ctx_r10.getDropdownItems(item_r5)));
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ngx-color-picker", 10);
} if (rf & 2) {
    const ctx_r11 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r11.iconContainerClass);
    ɵɵproperty("presets", ctx_r11.presets);
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ngx-color-picker", 11);
} if (rf & 2) {
    const ctx_r12 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r12.iconContainerClass);
    ɵɵproperty("presets", ctx_r12.presets);
} }
function MenuComponent_ng_container_1_ng_container_1_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div");
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r13.seperatorClass);
} }
function MenuComponent_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_ngx_toggle_command_1_Template, 1, 3, "ngx-toggle-command", 3);
    ɵɵtemplate(2, MenuComponent_ng_container_1_ng_container_1_ngx_link_2_Template, 1, 2, "ngx-link", 4);
    ɵɵtemplate(3, MenuComponent_ng_container_1_ng_container_1_ngx_image_3_Template, 1, 2, "ngx-image", 4);
    ɵɵtemplate(4, MenuComponent_ng_container_1_ng_container_1_ng_container_4_Template, 3, 3, "ng-container", 2);
    ɵɵtemplate(5, MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_5_Template, 1, 3, "ngx-color-picker", 5);
    ɵɵtemplate(6, MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_6_Template, 1, 3, "ngx-color-picker", 6);
    ɵɵtemplate(7, MenuComponent_ng_container_1_ng_container_1_div_7_Template, 1, 2, "div", 4);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const lastItem_r6 = ctx.last;
    const lastToolbarItem_r3 = ɵɵnextContext().last;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r4.toggleCommands.includes(item_r5));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r5 === "link");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r5 === "image");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r4.isDropDown(item_r5));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r5 === "text_color");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r5 === "background_color");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", lastItem_r6 && !lastToolbarItem_r3);
} }
function MenuComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_Template, 8, 7, "ng-container", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const toolbarItem_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", toolbarItem_r2);
} }
function MenuComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementContainer(1, 12);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.customMenuRef);
} }
const _c0$4 = function (a0) { return { "NgxEditor--Disabled": a0 }; };
const DEFAULT_TOOLBAR = [
    ['bold', 'italic'],
    ['code', 'blockquote'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
];
const DEFAULT_COLOR_PRESETS = [
    '#b60205',
    '#d93f0b',
    '#fbca04',
    '#0e8a16',
    '#006b75',
    '#1d76db',
    '#0052cc',
    '#5319e7',
    '#e99695',
    '#f9d0c4',
    '#fef2c0',
    '#c2e0c6',
    '#bfdadc',
    '#c5def5',
    '#bfd4f2',
    '#d4c5f9'
];
class MenuComponent {
    constructor(menuService) {
        this.menuService = menuService;
        this.toolbar = DEFAULT_TOOLBAR;
        this.colorPresets = DEFAULT_COLOR_PRESETS;
        this.disabled = false;
        this.customMenuRef = null;
        this.toggleCommands = [
            'bold', 'italic',
            'underline', 'strike',
            'code', 'blockquote',
            'ordered_list', 'bullet_list',
            'align_left', 'align_center', 'align_right', 'align_justify'
        ];
        this.iconContainerClass = ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--Icon'];
        this.dropdownContainerClass = ['NgxEditor__Dropdown'];
        this.seperatorClass = ['NgxEditor__Seperator'];
    }
    get presets() {
        const col = 8;
        const colors = [];
        this.colorPresets.forEach((color, index) => {
            const row = Math.floor(index / col);
            if (!colors[row]) {
                colors.push([]);
            }
            colors[row].push(color);
        });
        return colors;
    }
    isDropDown(item) {
        var _a;
        if ((_a = item) === null || _a === void 0 ? void 0 : _a.heading) {
            return true;
        }
        return false;
    }
    getDropdownItems(item) {
        return item;
    }
    ngOnInit() {
        if (!this.editor) {
            throw new Error('NgxEditor: Required editor instance');
        }
        this.menuService.editor = this.editor;
    }
}
MenuComponent.ɵfac = function MenuComponent_Factory(t) { return new (t || MenuComponent)(ɵɵdirectiveInject(MenuService)); };
MenuComponent.ɵcmp = ɵɵdefineComponent({ type: MenuComponent, selectors: [["ngx-editor-menu"]], inputs: { toolbar: "toolbar", colorPresets: "colorPresets", disabled: "disabled", editor: "editor", customMenuRef: "customMenuRef" }, features: [ɵɵProvidersFeature([MenuService])], decls: 3, vars: 5, consts: [[1, "NgxEditor__MenuBar", 3, "ngClass"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "toolbarItem", "class", 4, "ngIf"], [3, "class", 4, "ngIf"], ["type", "text_color", 3, "class", "presets", 4, "ngIf"], ["type", "background_color", 3, "class", "presets", 4, "ngIf"], [3, "toolbarItem"], [3, "class", "group", "items", 4, "ngFor", "ngForOf"], [3, "group", "items"], ["type", "text_color", 3, "presets"], ["type", "background_color", 3, "presets"], [3, "ngTemplateOutlet"]], template: function MenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, MenuComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        ɵɵtemplate(2, MenuComponent_ng_container_2_Template, 2, 1, "ng-container", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c0$4, ctx.disabled));
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.toolbar);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.customMenuRef);
    } }, directives: [NgClass, NgForOf, NgIf, ToggleCommandComponent, LinkComponent, ImageComponent, DropdownComponent, ColorPickerComponent, NgTemplateOutlet], pipes: [KeyValuePipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(MenuComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-editor-menu',
                templateUrl: './menu.component.html',
                styleUrls: ['./menu.component.scss'],
                providers: [MenuService]
            }]
    }], function () { return [{ type: MenuService }]; }, { toolbar: [{
            type: Input
        }], colorPresets: [{
            type: Input
        }], disabled: [{
            type: Input
        }], editor: [{
            type: Input
        }], customMenuRef: [{
            type: Input
        }] }); })();

const _c0$5 = function (a0, a1) { return { "NgxBubbleMenu__Icon--Active": a0, "NgxEditor--Disabled": a1 }; };
function BubbleComponent_ng_container_0_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3);
    ɵɵlistener("mousedown", function BubbleComponent_ng_container_0_ng_container_1_div_1_Template_div_mousedown_0_listener($event) { ɵɵrestoreView(_r10); const item_r4 = ɵɵnextContext().$implicit; const ctx_r8 = ɵɵnextContext(2); return ctx_r8.onClick($event, item_r4); });
    ɵɵnamespaceSVG();
    ɵɵelement(1, "svg", 4);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ɵɵnextContext().$implicit;
    const ctx_r6 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c0$5, ctx_r6.activeItems.includes(item_r4), !ctx_r6.execulableItems.includes(item_r4)))("title", ctx_r6.getTitle(item_r4));
    ɵɵadvance(1);
    ɵɵproperty("innerHTML", ctx_r6.getIcon(item_r4), ɵɵsanitizeHtml);
} }
function BubbleComponent_ng_container_0_ng_container_1_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 5);
} }
function BubbleComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BubbleComponent_ng_container_0_ng_container_1_div_1_Template, 2, 6, "div", 1);
    ɵɵtemplate(2, BubbleComponent_ng_container_0_ng_container_1_div_2_Template, 1, 0, "div", 2);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const lastItem_r5 = ctx.last;
    const lastToolbarItem_r2 = ɵɵnextContext().last;
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r3.toggleCommands.includes(item_r4));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", lastItem_r5 && !lastToolbarItem_r2);
} }
function BubbleComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BubbleComponent_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 0);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const toolbarItem_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", toolbarItem_r1);
} }
class BubbleComponent {
    constructor(sanitizeHTML, ngxeService) {
        this.sanitizeHTML = sanitizeHTML;
        this.ngxeService = ngxeService;
        this.execulableItems = [];
        this.activeItems = [];
        this.toolbar = [
            ['bold', 'italic', 'underline', 'strike'],
            ['ordered_list', 'bullet_list', 'blockquote', 'code'],
            ['align_left', 'align_center', 'align_right', 'align_justify']
        ];
        this.toggleCommands = [
            'bold', 'italic', 'underline', 'strike',
            'ordered_list', 'bullet_list', 'blockquote', 'code',
            'align_left', 'align_center', 'align_right', 'align_justify'
        ];
    }
    get view() {
        return this.editor.view;
    }
    getIcon(name) {
        const icon = Icon.getPath(name);
        return this.sanitizeHTML.transform(icon);
    }
    getTitle(name) {
        return this.ngxeService.locals.get(name);
    }
    onClick(e, commandName) {
        e.preventDefault();
        e.stopPropagation();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.view;
        const command = ToggleCommands[commandName];
        command.toggle()(state, dispatch);
    }
    update(view) {
        this.activeItems = [];
        this.execulableItems = [];
        const { state } = view;
        this.toggleCommands.forEach(toolbarItem => {
            const command = ToggleCommands[toolbarItem];
            const isActive = command.isActive(state);
            if (isActive) {
                this.activeItems.push(toolbarItem);
            }
            const canExecute = command.canExecute(state);
            if (canExecute) {
                this.execulableItems.push(toolbarItem);
            }
        });
    }
    ngOnInit() {
        this.updateSubscription = this.editor.update
            .subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
BubbleComponent.ɵfac = function BubbleComponent_Factory(t) { return new (t || BubbleComponent)(ɵɵdirectiveInject(SanitizeHtmlPipe), ɵɵdirectiveInject(NgxEditorService)); };
BubbleComponent.ɵcmp = ɵɵdefineComponent({ type: BubbleComponent, selectors: [["ngx-bubble"]], inputs: { editor: "editor" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "NgxBubbleMenu__Icon", 3, "ngClass", "title", "mousedown", 4, "ngIf"], ["class", "NgxBubbleMenu__Seperator", 4, "ngIf"], [1, "NgxBubbleMenu__Icon", 3, "ngClass", "title", "mousedown"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "height", "20", "width", "20", 3, "innerHTML"], [1, "NgxBubbleMenu__Seperator"]], template: function BubbleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BubbleComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.toolbar);
    } }, directives: [NgForOf, NgIf, NgClass], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}[_nghost-%COMP%]{display:flex;background-color:#000;color:#fff;padding:.3rem;border-radius:4px}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]{height:1.8rem;width:1.8rem;transition:.3s ease-in-out;border-radius:2px;display:flex;align-items:center;justify-content:center}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]:hover{background-color:#636262}.NgxBubbleMenu__Icon[_ngcontent-%COMP%] + .NgxBubbleMenu__Icon[_ngcontent-%COMP%]{margin-left:.3rem}.NgxBubbleMenu__Icon.NgxBubbleMenu__Icon--Active[_ngcontent-%COMP%]{background-color:#fff}.NgxBubbleMenu__Icon.NgxBubbleMenu__Icon--Active[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#000}.NgxBubbleMenu__Seperator[_ngcontent-%COMP%]{border-left:1px solid #fff;margin:0 5px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(BubbleComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-bubble',
                templateUrl: './bubble.component.html',
                styleUrls: ['./bubble.component.scss']
            }]
    }], function () { return [{ type: SanitizeHtmlPipe }, { type: NgxEditorService }]; }, { editor: [{
            type: Input
        }] }); })();

function FloatingMenuComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "ngx-bubble", 2);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("editor", ctx_r1.editor);
} }
const _c0$6 = ["*"];
class FloatingMenuComponent {
    constructor(el, sanitizeHTML) {
        this.el = el;
        this.sanitizeHTML = sanitizeHTML;
        this.posLeft = 0;
        this.posTop = 0;
        this.showMenu = false;
        this.dragging = false;
        this.execulableItems = [];
        this.activeItems = [];
    }
    get display() {
        return {
            visibility: this.showMenu ? 'visible' : 'hidden',
            opacity: this.showMenu ? '1' : '0',
            top: this.posTop + 'px',
            left: this.posLeft + 'px',
        };
    }
    get view() {
        return this.editor.view;
    }
    onMouseDown(e) {
        if (this.el.nativeElement.contains(e.target)) {
            e.preventDefault();
            return;
        }
        this.dragging = true;
    }
    onKeyDown() {
        this.dragging = true;
        this.hide();
    }
    onMouseUp() {
        this.dragging = false;
        this.useUpdate();
    }
    onKeyUp() {
        this.dragging = false;
        this.useUpdate();
    }
    useUpdate() {
        if (!this.view) {
            return;
        }
        this.update(this.view);
    }
    getIcon(name) {
        const icon = Icon.getPath(name);
        return this.sanitizeHTML.transform(icon);
    }
    hide() {
        this.showMenu = false;
    }
    show() {
        this.showMenu = true;
    }
    calculateBubblePosition(view) {
        const { state: { selection } } = view;
        const { from } = selection;
        // the floating bubble itself
        const bubbleEl = this.el.nativeElement;
        const bubble = bubbleEl.getBoundingClientRect();
        // The box in which the tooltip is positioned, to use as base
        const box = bubbleEl.parentElement.getBoundingClientRect();
        const start = view.coordsAtPos(from);
        let left = start.left - box.left;
        const overflowsRight = (box.right < (start.left + bubble.width) ||
            bubble.right > box.right);
        if (overflowsRight) {
            left = box.width - bubble.width;
        }
        if (left < 0) {
            left = 0;
        }
        const bubbleHeight = bubble.height + parseInt(getComputedStyle(bubbleEl).marginBottom, 10);
        const top = (start.top - box.top) - bubbleHeight;
        return {
            left,
            top
        };
    }
    update(view) {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;
        if (selection instanceof NodeSelection) {
            if (selection.node.type.name === 'image') {
                this.hide();
                return;
            }
        }
        const hasFocus = this.view.hasFocus();
        if (!hasFocus || empty || this.dragging) {
            this.hide();
            return;
        }
        const { top, left } = this.calculateBubblePosition(this.view);
        this.posLeft = left;
        this.posTop = top;
        this.show();
    }
    ngOnInit() {
        if (!this.editor) {
            throw new Error('NgxEditor: Required editor instance');
        }
        this.updateSubscription = this.editor.update
            .subscribe((view) => {
            this.update(view);
        });
        this.resizeSubscription = fromEvent(window, 'resize').pipe(throttleTime(500, asyncScheduler, { leading: true, trailing: true })).subscribe(() => {
            this.useUpdate();
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
        this.resizeSubscription.unsubscribe();
    }
}
FloatingMenuComponent.ɵfac = function FloatingMenuComponent_Factory(t) { return new (t || FloatingMenuComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SanitizeHtmlPipe)); };
FloatingMenuComponent.ɵcmp = ɵɵdefineComponent({ type: FloatingMenuComponent, selectors: [["ngx-editor-floating-menu"]], hostVars: 2, hostBindings: function FloatingMenuComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function FloatingMenuComponent_mousedown_HostBindingHandler($event) { return ctx.onMouseDown($event); }, false, ɵɵresolveDocument)("keydown", function FloatingMenuComponent_keydown_HostBindingHandler() { return ctx.onKeyDown(); }, false, ɵɵresolveDocument)("mouseup", function FloatingMenuComponent_mouseup_HostBindingHandler() { return ctx.onMouseUp(); }, false, ɵɵresolveDocument)("keyup", function FloatingMenuComponent_keyup_HostBindingHandler() { return ctx.onKeyUp(); }, false, ɵɵresolveDocument);
    } if (rf & 2) {
        ɵɵstyleMap(ctx.display);
    } }, inputs: { editor: "editor" }, ngContentSelectors: _c0$6, decls: 4, vars: 1, consts: [["ref", ""], [4, "ngIf"], [3, "editor"]], template: function FloatingMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", null, 0);
        ɵɵprojection(2);
        ɵɵelementEnd();
        ɵɵtemplate(3, FloatingMenuComponent_ng_container_3_Template, 2, 1, "ng-container", 1);
    } if (rf & 2) {
        const _r0 = ɵɵreference(1);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", _r0.children.length === 0);
    } }, directives: [NgIf, BubbleComponent], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}[_nghost-%COMP%]{position:absolute;z-index:20;margin-bottom:.35rem;visibility:hidden;opacity:0}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(FloatingMenuComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-editor-floating-menu',
                templateUrl: './floating-menu.component.html',
                styleUrls: ['./floating-menu.component.scss']
            }]
    }], function () { return [{ type: ElementRef }, { type: SanitizeHtmlPipe }]; }, { display: [{
            type: HostBinding,
            args: ['style']
        }], editor: [{
            type: Input
        }], onMouseDown: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }], onKeyDown: [{
            type: HostListener,
            args: ['document:keydown']
        }], onMouseUp: [{
            type: HostListener,
            args: ['document:mouseup']
        }], onKeyUp: [{
            type: HostListener,
            args: ['document:keyup']
        }] }); })();

class MenuModule {
}
MenuModule.ɵfac = function MenuModule_Factory(t) { return new (t || MenuModule)(); };
MenuModule.ɵmod = ɵɵdefineNgModule({ type: MenuModule });
MenuModule.ɵinj = ɵɵdefineInjector({ providers: [
        SanitizeHtmlPipe,
    ], imports: [[
            CommonModule,
            ReactiveFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(MenuModule, { declarations: [
        // pipes
        SanitizeHtmlPipe,
        // components
        MenuComponent,
        ToggleCommandComponent,
        LinkComponent,
        DropdownComponent,
        ImageComponent,
        ColorPickerComponent,
        FloatingMenuComponent,
        BubbleComponent], imports: [CommonModule,
        ReactiveFormsModule], exports: [MenuComponent,
        FloatingMenuComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(MenuModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule
                ],
                declarations: [
                    // pipes
                    SanitizeHtmlPipe,
                    // components
                    MenuComponent,
                    ToggleCommandComponent,
                    LinkComponent,
                    DropdownComponent,
                    ImageComponent,
                    ColorPickerComponent,
                    FloatingMenuComponent,
                    BubbleComponent
                ],
                providers: [
                    SanitizeHtmlPipe,
                ],
                exports: [
                    MenuComponent,
                    FloatingMenuComponent
                ],
            }]
    }], null, null); })();

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken('NgxEditorConfig');
class NgxEditorModule {
    static forRoot(config) {
        return {
            ngModule: NgxEditorModule,
            providers: [
                {
                    provide: NGX_EDITOR_CONFIG_TOKEN,
                    useValue: config
                },
                {
                    provide: NgxEditorServiceConfig,
                    useFactory: provideMyServiceOptions,
                    deps: [NGX_EDITOR_CONFIG_TOKEN]
                }
            ]
        };
    }
    static forChild(config) {
        return {
            ngModule: NgxEditorModule,
            providers: [
                {
                    provide: NGX_EDITOR_CONFIG_TOKEN,
                    useValue: config
                },
                {
                    provide: NgxEditorServiceConfig,
                    useFactory: provideMyServiceOptions,
                    deps: [NGX_EDITOR_CONFIG_TOKEN]
                },
                NgxEditorService,
            ]
        };
    }
}
NgxEditorModule.ɵfac = function NgxEditorModule_Factory(t) { return new (t || NgxEditorModule)(); };
NgxEditorModule.ɵmod = ɵɵdefineNgModule({ type: NgxEditorModule });
NgxEditorModule.ɵinj = ɵɵdefineInjector({ providers: [], imports: [[
            CommonModule,
            MenuModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxEditorModule, { declarations: [NgxEditorComponent,
        ImageViewComponent], imports: [CommonModule,
        MenuModule], exports: [NgxEditorComponent,
        MenuComponent,
        FloatingMenuComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(NgxEditorModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MenuModule,
                ],
                providers: [],
                declarations: [
                    NgxEditorComponent,
                    ImageViewComponent
                ],
                exports: [
                    NgxEditorComponent,
                    MenuComponent,
                    FloatingMenuComponent
                ]
            }]
    }], null, null); })();

const isEmptyInputValue = (value) => {
    // we don't check for string here so it also works with arrays
    return value === null || value.length === 0;
};
const hasValidLength = (value) => {
    // non-strict comparison is intentional, to check for both `null` and `undefined` values
    return value != null && typeof value.length === 'number';
};
const isDocEmpty = (doc) => {
    if (!doc) {
        return true;
    }
    const { childCount, firstChild } = doc;
    return Boolean(childCount === 1 && (firstChild === null || firstChild === void 0 ? void 0 : firstChild.isTextblock) && firstChild.content.size === 0);
};
// @dynamic
class Validators {
    static required(userSchema) {
        return (control) => {
            const schema$1 = userSchema || schema;
            const doc = parseContent(control.value, schema$1);
            const isEmpty = isDocEmpty(doc);
            if (!isEmpty) {
                return null;
            }
            return {
                required: true
            };
        };
    }
    static maxLength(maxLength, userSchema) {
        return (control) => {
            const schema$1 = userSchema || schema;
            const doc = parseContent(control.value, schema$1);
            const value = doc.textContent;
            if (hasValidLength(value) && value.length > maxLength) {
                return {
                    maxlength: {
                        requiredLength: maxLength,
                        actualLength: value.length
                    }
                };
            }
            return null;
        };
    }
    static minLength(minLength, userSchema) {
        return (control) => {
            const schema$1 = userSchema || schema;
            const doc = parseContent(control.value, schema$1);
            const value = doc.textContent;
            if (isEmptyInputValue(value) || !hasValidLength(value)) {
                // don't validate empty values to allow optional controls
                // don't validate values without `length` property
                return null;
            }
            if (value.length < minLength) {
                return {
                    minlength: {
                        requiredLength: minLength, actualLength: value.length
                    }
                };
            }
            return null;
        };
    }
}

const execMark = (name, toggle = false) => {
    return (state, dispatch) => {
        const command = new Mark(name);
        if (!toggle) {
            return command.apply()(state, dispatch);
        }
        return command.toggle()(state, dispatch);
    };
};
class EditorCommands {
    constructor(view) {
        this.applyTrx = (tr) => {
            this.state = this.state.apply(tr !== null && tr !== void 0 ? tr : this.tr);
            this.tr = this.state.tr;
            this.tr.setMeta('APPLIED_TRX', true);
        };
        this.dispatch = (tr) => {
            this.applyTrx(tr);
        };
        if (!view) {
            throw Error('NgxEditor: Required view to initialize commands.');
        }
        this.view = view;
        this.state = view.state;
        this.tr = this.view.state.tr;
    }
    exec() {
        // No changes applied
        if (!this.tr.getMeta('APPLIED_TRX')) {
            return false;
        }
        const forceEmit = !this.view.state.doc.eq(this.state.doc);
        this.view.updateState(this.state);
        const tr = this.tr
            .setMeta('FORCE_EMIT', forceEmit);
        this.view.dispatch(tr);
        return true;
    }
    focus() {
        this.view.focus();
        return this;
    }
    scrollIntoView() {
        this.tr.scrollIntoView();
        this.applyTrx();
        return this;
    }
    insertText(text) {
        this.tr.insertText(text);
        this.applyTrx();
        return this;
    }
    insertNewLine() {
        const newLineCommands = [newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock];
        chainCommands(...newLineCommands)(this.state, this.dispatch);
        return this;
    }
    applyMark(name) {
        execMark(name, false)(this.state, this.dispatch);
        return this;
    }
    toggleMark(name) {
        execMark(name, true)(this.state, this.dispatch);
        return this;
    }
    bold() {
        execMark('strong')(this.state, this.dispatch);
        return this;
    }
    toggleBold() {
        execMark('strong', true)(this.state, this.dispatch);
        return this;
    }
    italics() {
        execMark('em')(this.state, this.dispatch);
        return this;
    }
    toggleItalics() {
        execMark('em', true)(this.state, this.dispatch);
        return this;
    }
    underline() {
        execMark('u')(this.state, this.dispatch);
        return this;
    }
    toggleUnderline() {
        execMark('u', true)(this.state, this.dispatch);
        return this;
    }
    strike() {
        execMark('s')(this.state, this.dispatch);
        return this;
    }
    toggleStrike() {
        execMark('s', true)(this.state, this.dispatch);
        return this;
    }
    code() {
        execMark('code')(this.state, this.dispatch);
        return this;
    }
    toggleCode() {
        execMark('code', true)(this.state, this.dispatch);
        return this;
    }
    toggleOrderedList() {
        const command = new ListItem(false);
        command.toggle()(this.state, this.dispatch);
        return this;
    }
    toggleBulletList() {
        const command = new ListItem(true);
        command.toggle()(this.state, this.dispatch);
        return this;
    }
    toggleHeading(level) {
        const command = new Heading(level);
        command.toggle()(this.state, this.dispatch);
        return this;
    }
    insertLink(text, attrs) {
        const command = new Link();
        command.insert(text, attrs)(this.state, this.dispatch);
        return this;
    }
    updateLink(attrs) {
        const command = new Link();
        command.update(attrs)(this.state, this.dispatch);
        return this;
    }
    insertImage(src, attrs = {}) {
        const command = new Image();
        command.insert(src, attrs)(this.state, this.dispatch);
        return this;
    }
    textColor(color) {
        const command = new TextColor('text_color');
        command.apply({ color })(this.state, this.dispatch);
        return this;
    }
    backgroundColor(color) {
        const command = new TextColor('text_background_color');
        command.apply({ backgroundColor: color })(this.state, this.dispatch);
        return this;
    }
    removeTextColor() {
        const command = new TextColor('text_color');
        command.remove()(this.state, this.dispatch);
        return this;
    }
    removeBackgroundColor() {
        const command = new TextColor('text_background_color');
        command.remove()(this.state, this.dispatch);
        return this;
    }
    align(p) {
        const command = new TextAlign(p);
        command.toggle()(this.state, this.dispatch);
        return this;
    }
    insertHTML(html) {
        const { selection, schema, tr } = this.state;
        const { from, to } = selection;
        const element = document.createElement('div');
        element.innerHTML = html.trim();
        const slice = DOMParser.fromSchema(schema).parseSlice(element);
        const transaction = tr.replaceRange(from, to, slice);
        this.applyTrx(transaction);
        return this;
    }
}

const isMacOs = /Mac/.test(navigator.platform);
// Input rules ref: https://github.com/ProseMirror/prosemirror-example-setup/
// : (NodeType) → InputRule
// Given a blockquote node type, returns an input rule that turns `"> "`
// at the start of a textblock into a blockquote.
const blockQuoteRule = (nodeType) => {
    return wrappingInputRule(/^\s*>\s$/, nodeType);
};
// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a number
// followed by a dot at the start of a textblock into an ordered list.
const orderedListRule = (nodeType) => {
    return wrappingInputRule(/^(\d+)\.\s$/, nodeType, match => ({ order: +match[1] }), (match, node) => node.childCount + node.attrs.order === +match[1]);
};
// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a bullet
// (dash, plush, or asterisk) at the start of a textblock into a
// bullet list.
const bulletListRule = (nodeType) => {
    return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
};
// : (NodeType) → InputRule
// Given a code block node type, returns an input rule that turns a
// textblock starting with three backticks into a code block.
const codeBlockRule = (nodeType) => {
    return textblockTypeInputRule(/^```$/, nodeType);
};
// : (NodeType, number) → InputRule
// Given a node type and a maximum level, creates an input rule that
// turns up to that number of `#` characters followed by a space at
// the start of a textblock into a heading whose level corresponds to
// the number of `#` signs.
const headingRule = (nodeType, maxLevel) => {
    return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, (match) => ({ level: match[1].length }));
};
// : (Schema) → Plugin
// A set of input rules for creating the basic block quotes, lists,
// code blocks, and heading.
const buildInputRules = (schema) => {
    const rules = smartQuotes.concat(ellipsis, emDash);
    rules.push(blockQuoteRule(schema.nodes.blockquote));
    rules.push(orderedListRule(schema.nodes.ordered_list));
    rules.push(bulletListRule(schema.nodes.bullet_list));
    rules.push(codeBlockRule(schema.nodes.code_block));
    rules.push(headingRule(schema.nodes.heading, 6));
    return inputRules({ rules });
};
const getKeyboardShortcuts = (schema, options) => {
    const historyKeyMap = {};
    historyKeyMap['Mod-z'] = undo;
    if (isMacOs) {
        historyKeyMap['Shift-Mod-z'] = redo;
    }
    else {
        historyKeyMap['Mod-y'] = redo;
    }
    const plugins = [
        keymap({
            'Mod-b': toggleMark(schema.marks.strong),
            'Mod-i': toggleMark(schema.marks.em),
            'Mod-`': toggleMark(schema.marks.code),
        }),
        keymap({
            Enter: splitListItem(schema.nodes.list_item),
            'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
                const tr = state.tr;
                const br = schema.nodes.hard_break;
                dispatch(tr.replaceSelectionWith(br.create()).scrollIntoView());
                return true;
            }),
            'Mod-[': liftListItem(schema.nodes.list_item),
            'Mod-]': sinkListItem(schema.nodes.list_item),
            Tab: sinkListItem(schema.nodes.list_item)
        }),
        keymap(baseKeymap)
    ];
    if (options.history) {
        plugins.push(keymap(historyKeyMap));
    }
    return plugins;
};
const getDefaultPlugins = (schema, options) => {
    const plugins = [];
    if (options.keyboardShortcuts) {
        plugins.push(...getKeyboardShortcuts(schema, { history: options.history }));
    }
    if (options.history) {
        plugins.push(history());
    }
    if (options.inputRules) {
        plugins.push(buildInputRules(schema));
    }
    return plugins;
};

const DEFAULT_OPTIONS = {
    content: null,
    history: true,
    keyboardShortcuts: true,
    inputRules: true,
    schema: schema,
    plugins: [],
    nodeViews: {}
};
class Editor {
    constructor(options = DEFAULT_OPTIONS) {
        this.valueChangesSubject = new Subject();
        this.updateSubject = new Subject();
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.createEditor();
    }
    get valueChanges() {
        return this.valueChangesSubject.asObservable();
    }
    get update() {
        return this.updateSubject.asObservable();
    }
    get schema() {
        return this.options.schema || schema;
    }
    get commands() {
        return new EditorCommands(this.view);
    }
    setContent(content) {
        if (isNil(content)) {
            return;
        }
        const { state } = this.view;
        const { tr, doc } = state;
        const newDoc = parseContent(content, this.schema);
        tr.replaceWith(0, state.doc.content.size, newDoc);
        // don't emit if both content is same
        if (doc.eq(tr.doc)) {
            return;
        }
        if (!tr.docChanged) {
            return;
        }
        this.view.dispatch(tr);
    }
    handleTransactions(tr) {
        const state = this.view.state.apply(tr);
        this.view.updateState(state);
        this.updateSubject.next(this.view);
        if (!tr.docChanged && !tr.getMeta('FORCE_EMIT')) {
            return;
        }
        const json = state.doc.toJSON();
        this.valueChangesSubject.next(json);
    }
    createEditor() {
        var _a;
        const { options } = this;
        const { content = null, nodeViews } = options;
        const { history = true, keyboardShortcuts = true, inputRules = true } = options;
        const schema = this.schema;
        const doc = parseContent(content, schema);
        const plugins = (_a = options.plugins) !== null && _a !== void 0 ? _a : [];
        const defaultPlugins = getDefaultPlugins(schema, {
            history,
            keyboardShortcuts,
            inputRules
        });
        this.view = new EditorView(null, {
            state: EditorState.create({
                doc,
                schema,
                plugins: [...defaultPlugins, ...plugins,],
            }),
            nodeViews,
            dispatchTransaction: this.handleTransactions.bind(this)
        });
    }
    registerPlugin(plugin) {
        const { state } = this.view;
        const plugins = [...state.plugins, plugin];
        const newState = state.reconfigure({ plugins });
        this.view.updateState(newState);
    }
    destroy() {
        this.view.destroy();
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { Editor, FloatingMenuComponent, MenuComponent, NgxEditorComponent, NgxEditorModule, Validators, emptyDoc, parseContent, toDoc, toHTML };
//# sourceMappingURL=ngx-editor.js.map
