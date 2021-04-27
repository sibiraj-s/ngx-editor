(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('prosemirror-state'), require('prosemirror-view'), require('@angular/common'), require('prosemirror-model'), require('ngx-editor/schema'), require('rxjs'), require('prosemirror-commands'), require('ngx-editor/commands'), require('ngx-editor/helpers'), require('prosemirror-schema-list'), require('@angular/platform-browser'), require('rxjs/operators'), require('ngx-editor/utils'), require('prosemirror-keymap'), require('prosemirror-history'), require('prosemirror-inputrules')) :
    typeof define === 'function' && define.amd ? define('ngx-editor', ['exports', '@angular/core', '@angular/forms', 'prosemirror-state', 'prosemirror-view', '@angular/common', 'prosemirror-model', 'ngx-editor/schema', 'rxjs', 'prosemirror-commands', 'ngx-editor/commands', 'ngx-editor/helpers', 'prosemirror-schema-list', '@angular/platform-browser', 'rxjs/operators', 'ngx-editor/utils', 'prosemirror-keymap', 'prosemirror-history', 'prosemirror-inputrules'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-editor'] = {}, global.ng.core, global.ng.forms, global.prosemirrorState, global.prosemirrorView, global.ng.common, global.prosemirrorModel, global['ngx-editor'].schema, global.rxjs, global.prosemirrorCommands, global['ngx-editor'].commands, global['ngx-editor'].helpers, global.prosemirroSchemaList, global.ng.platformBrowser, global.rxjs.operators, global['ngx-editor'].utils, global.prosemirrorKeymap, global.prosemirrorHistory, global.prosemirrorInputRules));
}(this, (function (exports, i0, i4, prosemirrorState, prosemirrorView, i3, prosemirrorModel, schema, rxjs, prosemirrorCommands, commands, helpers, prosemirrorSchemaList, i1, operators, utils, prosemirrorKeymap, prosemirrorHistory, prosemirrorInputrules) { 'use strict';

    var editablePlugin = function (editable) {
        if (editable === void 0) { editable = true; }
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('editable'),
            state: {
                init: function () {
                    return editable;
                },
                apply: function (tr, previousVal) {
                    var _a;
                    return (_a = tr.getMeta('UPDATE_EDITABLE')) !== null && _a !== void 0 ? _a : previousVal;
                }
            },
            props: {
                editable: function (state) {
                    return this.getState(state);
                },
                attributes: function (state) {
                    var isEnabled = this.getState(state);
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

    var PLACEHOLDER_CLASSNAME = 'NgxEditor__Placeholder';
    var placeholderPlugin = function (text) {
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('placeholder'),
            state: {
                init: function () {
                    return text !== null && text !== void 0 ? text : '';
                },
                apply: function (tr, previousVal) {
                    var _a;
                    var placeholder = (_a = tr.getMeta('UPDATE_PLACEHOLDER')) !== null && _a !== void 0 ? _a : previousVal;
                    return placeholder;
                }
            },
            props: {
                decorations: function (state) {
                    var doc = state.doc;
                    var textContent = doc.textContent, childCount = doc.childCount;
                    var placeholder = this.getState(state);
                    if (!placeholder || childCount > 1) {
                        return prosemirrorView.DecorationSet.empty;
                    }
                    var decorations = [];
                    var decorate = function (node, pos) {
                        var _a;
                        if (node.type.isBlock && node.childCount === 0 && textContent.length === 0) {
                            var placeholderNode = prosemirrorView.Decoration.node(pos, (pos + node.nodeSize), {
                                class: PLACEHOLDER_CLASSNAME,
                                'data-placeholder': placeholder,
                                'data-align': (_a = node.attrs.align) !== null && _a !== void 0 ? _a : null
                            });
                            decorations.push(placeholderNode);
                        }
                        return false;
                    };
                    doc.descendants(decorate);
                    return prosemirrorView.DecorationSet.create(doc, decorations);
                }
            }
        });
    };

    var attributesPlugin = function (attributes) {
        if (attributes === void 0) { attributes = {}; }
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('attributes'),
            props: {
                attributes: attributes
            }
        });
    };

    var focusPlugin = function (cb) {
        if (cb === void 0) { cb = function () { }; }
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('focus'),
            props: {
                handleDOMEvents: {
                    focus: function () {
                        cb();
                        return false;
                    }
                }
            }
        });
    };

    var blurPlugin = function (cb) {
        if (cb === void 0) { cb = function () { }; }
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('blur'),
            props: {
                handleDOMEvents: {
                    blur: function () {
                        cb();
                        return false;
                    }
                }
            }
        });
    };

    var _c0 = ["imgEl"];
    function ImageViewComponent_span_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 4);
            i0.ɵɵelementStart(1, "span", 5);
            i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_1_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.startResizing($event, "left"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "span", 6);
            i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_2_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.startResizing($event, "right"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 7);
            i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_3_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.startResizing($event, "left"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "span", 8);
            i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_4_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.startResizing($event, "right"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
    }
    var _c1 = function (a0) { return { "NgxEditor__Resizer--Active": a0 }; };
    var ImageViewComponent = /** @class */ (function () {
        function ImageViewComponent() {
            this.alt = '';
            this.title = '';
            this.outerWidth = '';
            this.selected = false;
            this.imageResize = new i0.EventEmitter();
        }
        ImageViewComponent.prototype.startResizing = function (e, direction) {
            e.preventDefault();
            this.resizeImage(e, direction);
        };
        ImageViewComponent.prototype.resizeImage = function (evt, direction) {
            var _this = this;
            var startX = evt.pageX;
            var startWidth = this.imgEl.nativeElement.clientWidth;
            var isLeftResize = direction === 'left';
            var width = window.getComputedStyle(this.view.dom).width;
            var editorWidth = parseInt(width, 10);
            var onMouseMove = function (e) {
                var currentX = e.pageX;
                var diffInPx = currentX - startX;
                var computedWidth = isLeftResize ? startWidth - diffInPx : startWidth + diffInPx;
                // prevent image overflow the editor
                // prevent resizng below 20px
                if (computedWidth > editorWidth || computedWidth < 20) {
                    return;
                }
                _this.outerWidth = computedWidth + "px";
            };
            var onMouseUp = function (e) {
                e.preventDefault();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                _this.imageResize.emit();
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        return ImageViewComponent;
    }());
    ImageViewComponent.ɵfac = function ImageViewComponent_Factory(t) { return new (t || ImageViewComponent)(); };
    ImageViewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ImageViewComponent, selectors: [["ngx-image-view"]], viewQuery: function ImageViewComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0, 3);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.imgEl = _t.first);
            }
        }, inputs: { src: "src", alt: "alt", title: "title", outerWidth: "outerWidth", selected: "selected", view: "view" }, outputs: { imageResize: "imageResize" }, decls: 4, vars: 9, consts: [[1, "NgxEditor__ImageWrapper", 3, "ngClass"], ["class", "NgxEditor__ResizeHandle", 4, "ngIf"], [3, "src", "alt", "title"], ["imgEl", ""], [1, "NgxEditor__ResizeHandle"], [1, "NgxEditor__ResizeHandle--TL", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--TR", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--BL", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--BR", 3, "mousedown"]], template: function ImageViewComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "span", 0);
                i0.ɵɵtemplate(1, ImageViewComponent_span_1_Template, 5, 0, "span", 1);
                i0.ɵɵelement(2, "img", 2, 3);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵstyleProp("width", ctx.outerWidth);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1, ctx.selected));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.selected);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("src", ctx.src, i0.ɵɵsanitizeUrl)("alt", ctx.alt)("title", ctx.title);
            }
        }, directives: [i3.NgClass, i3.NgIf], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}img[_ngcontent-%COMP%]{width:100%;height:100%}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]{position:relative;display:inline-block;line-height:0;padding:2px}.NgxEditor__ImageWrapper.NgxEditor__Resizer--Active[_ngcontent-%COMP%]{padding:1px;border:1px solid #1a73e8}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BL[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BR[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TL[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TR[_ngcontent-%COMP%]{position:absolute;width:7px;height:7px;background-color:#1a73e8;border:1px solid #fff}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BR[_ngcontent-%COMP%]{bottom:-5px;right:-5px;cursor:se-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TR[_ngcontent-%COMP%]{top:-5px;right:-5px;cursor:ne-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TL[_ngcontent-%COMP%]{top:-5px;left:-5px;cursor:nw-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BL[_ngcontent-%COMP%]{bottom:-5px;left:-5px;cursor:sw-resize}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImageViewComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-image-view',
                        templateUrl: './image-view.component.html',
                        styleUrls: ['./image-view.component.scss']
                    }]
            }], function () { return []; }, { src: [{
                    type: i0.Input
                }], alt: [{
                    type: i0.Input
                }], title: [{
                    type: i0.Input
                }], outerWidth: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], view: [{
                    type: i0.Input
                }], imageResize: [{
                    type: i0.Output
                }], imgEl: [{
                    type: i0.ViewChild,
                    args: ['imgEl', { static: true }]
                }] });
    })();

    var ImageRezieView = /** @class */ (function () {
        function ImageRezieView(node, view, getPos, injector) {
            var _this = this;
            this.updating = false;
            this.handleResize = function () {
                if (_this.updating) {
                    return;
                }
                var _a = _this.view, state = _a.state, dispatch = _a.dispatch;
                var tr = state.tr;
                var transaction = tr.setNodeMarkup(_this.getPos(), undefined, {
                    src: _this.imageComponentRef.instance.src,
                    width: _this.imageComponentRef.instance.outerWidth
                });
                var resolvedPos = transaction.doc.resolve(_this.getPos());
                var newSelection = new prosemirrorState.NodeSelection(resolvedPos);
                transaction.setSelection(newSelection);
                dispatch(transaction);
            };
            var dom = document.createElement('image-view');
            var componentFactoryResolver = injector.get(i0.ComponentFactoryResolver);
            this.applicationRef = injector.get(i0.ApplicationRef);
            // Create the component and wire it up with the element
            var factory = componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
            this.imageComponentRef = factory.create(injector, [], dom);
            // Attach to the view so that the change detector knows to run
            this.applicationRef.attachView(this.imageComponentRef.hostView);
            this.setNodeAttributes(node.attrs);
            this.imageComponentRef.instance.view = view;
            this.dom = dom;
            this.view = view;
            this.node = node;
            this.getPos = getPos;
            this.resizeSubscription = this.imageComponentRef.instance.imageResize.subscribe(function () {
                _this.handleResize();
            });
        }
        ImageRezieView.prototype.computeChanges = function (prevAttrs, newAttrs) {
            return JSON.stringify(prevAttrs) === JSON.stringify(newAttrs);
        };
        ImageRezieView.prototype.setNodeAttributes = function (attrs) {
            this.imageComponentRef.instance.src = attrs.src;
            this.imageComponentRef.instance.alt = attrs.alt;
            this.imageComponentRef.instance.title = attrs.title;
            this.imageComponentRef.instance.outerWidth = attrs.width;
        };
        ImageRezieView.prototype.update = function (node) {
            if (node.type !== this.node.type) {
                return false;
            }
            this.node = node;
            var changed = this.computeChanges(this.node.attrs, node.attrs);
            if (changed) {
                this.updating = true;
                this.setNodeAttributes(node.attrs);
                this.updating = false;
            }
            return true;
        };
        ImageRezieView.prototype.ignoreMutation = function () {
            return true;
        };
        ImageRezieView.prototype.selectNode = function () {
            this.imageComponentRef.instance.selected = true;
        };
        ImageRezieView.prototype.deselectNode = function () {
            this.imageComponentRef.instance.selected = false;
        };
        ImageRezieView.prototype.destroy = function () {
            this.resizeSubscription.unsubscribe();
            this.applicationRef.detachView(this.imageComponentRef.hostView);
        };
        return ImageRezieView;
    }());
    var imagePlugin = function (injector) {
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('link'),
            props: {
                nodeViews: {
                    image: function (node, view, getPos) {
                        return new ImageRezieView(node, view, getPos, injector);
                    },
                }
            }
        });
    };

    var HTTP_LINK_REGEX = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
    var linkify = function (fragment) {
        var linkified = [];
        fragment.forEach(function (child) {
            if (child.isText) {
                var text = child.text;
                var pos = 0;
                var match = HTTP_LINK_REGEX.exec(text);
                if (match) {
                    var start = match.index;
                    var end = start + match[0].length;
                    var link = child.type.schema.marks.link;
                    if (start > 0) {
                        linkified.push(child.cut(pos, start));
                    }
                    var urlText = text.slice(start, end);
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
        return prosemirrorModel.Fragment.fromArray(linkified);
    };
    var linkPlugin = function () {
        return new prosemirrorState.Plugin({
            key: new prosemirrorState.PluginKey('link'),
            props: {
                transformPasted: function (slice) {
                    return new prosemirrorModel.Slice(linkify(slice.content), slice.openStart, slice.openEnd);
                }
            }
        });
    };

    var emptyDoc = {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
            }
        ],
    };
    // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    var toHTML = function (json, inputSchema) {
        var schema$1 = inputSchema !== null && inputSchema !== void 0 ? inputSchema : schema.schema;
        var contentNode = schema$1.nodeFromJSON(json);
        var html = prosemirrorModel.DOMSerializer.fromSchema(schema$1).serializeFragment(contentNode.content);
        var div = document.createElement('div');
        div.appendChild(html);
        return div.innerHTML;
    };
    var toDoc = function (html, inputSchema) {
        var schema$1 = inputSchema !== null && inputSchema !== void 0 ? inputSchema : schema.schema;
        var el = document.createElement('div');
        el.innerHTML = html;
        return prosemirrorModel.DOMParser.fromSchema(schema$1).parse(el).toJSON();
    };
    var parseContent = function (value, schema) {
        if (!value) {
            return schema.nodeFromJSON(emptyDoc);
        }
        if (typeof value !== 'string') {
            return schema.nodeFromJSON(value);
        }
        var docJson = toDoc(value, schema);
        return schema.nodeFromJSON(docJson);
    };

    var _c0$1 = ["ngxEditor"];
    var _c1$1 = ["*"];
    var NgxEditorComponent = /** @class */ (function () {
        function NgxEditorComponent(renderer, injector) {
            this.renderer = renderer;
            this.injector = injector;
            this.placeholder = 'Type Here...';
            this.enabled = true;
            this.focusOut = new i0.EventEmitter();
            this.focusIn = new i0.EventEmitter();
            this.subscriptions = [];
            this.onChange = function () { };
            this.onTouched = function () { };
        }
        NgxEditorComponent.prototype.writeValue = function (value) {
            if (!this.outputFormat && typeof value === 'string') {
                this.outputFormat = 'html';
            }
            this.editor.setContent(value);
        };
        NgxEditorComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NgxEditorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        NgxEditorComponent.prototype.handleChange = function (jsonDoc) {
            if (this.outputFormat === 'html') {
                var html = toHTML(jsonDoc, this.editor.schema);
                this.onChange(html);
                return;
            }
            this.onChange(jsonDoc);
        };
        NgxEditorComponent.prototype.setMeta = function (key, value) {
            var _a = this.editor.view, dispatch = _a.dispatch, tr = _a.state.tr;
            dispatch(tr.setMeta(key, value));
        };
        NgxEditorComponent.prototype.enable = function () {
            this.setMeta('UPDATE_EDITABLE', true);
        };
        NgxEditorComponent.prototype.disable = function () {
            this.setMeta('UPDATE_EDITABLE', false);
        };
        NgxEditorComponent.prototype.setPlaceholder = function (placeholder) {
            this.setMeta('UPDATE_PLACEHOLDER', placeholder);
        };
        NgxEditorComponent.prototype.registerPlugins = function () {
            var _this = this;
            this.editor.registerPlugin(editablePlugin(this.enabled));
            this.editor.registerPlugin(placeholderPlugin(this.placeholder));
            this.editor.registerPlugin(attributesPlugin({
                class: 'NgxEditor__Content'
            }));
            this.editor.registerPlugin(focusPlugin(function () {
                _this.focusIn.emit();
            }));
            this.editor.registerPlugin(focusPlugin(function () {
                _this.focusIn.emit();
            }));
            this.editor.registerPlugin(blurPlugin(function () {
                _this.focusOut.emit();
                _this.onTouched();
            }));
            this.editor.registerPlugin(imagePlugin(this.injector));
            this.editor.registerPlugin(linkPlugin());
        };
        NgxEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.editor) {
                throw new Error('NgxEditor: Required editor instance');
            }
            // this.registerCustomElements();
            this.registerPlugins();
            this.renderer.appendChild(this.ngxEditor.nativeElement, this.editor.view.dom);
            var contentChangeSubscription = this.editor.valueChanges.subscribe(function (jsonDoc) {
                _this.handleChange(jsonDoc);
            });
            this.subscriptions.push(contentChangeSubscription);
        };
        NgxEditorComponent.prototype.ngOnChanges = function (changes) {
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
        };
        NgxEditorComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (subscription) {
                subscription.unsubscribe();
            });
        };
        return NgxEditorComponent;
    }());
    NgxEditorComponent.ɵfac = function NgxEditorComponent_Factory(t) { return new (t || NgxEditorComponent)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.Injector)); };
    NgxEditorComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxEditorComponent, selectors: [["ngx-editor"]], viewQuery: function NgxEditorComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$1, 3);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.ngxEditor = _t.first);
            }
        }, inputs: { editor: "editor", outputFormat: "outputFormat", placeholder: "placeholder", enabled: "enabled" }, outputs: { focusOut: "focusOut", focusIn: "focusIn" }, features: [i0.ɵɵProvidersFeature([{
                    provide: i4.NG_VALUE_ACCESSOR,
                    useExisting: i0.forwardRef(function () { return NgxEditorComponent; }),
                    multi: true
                }]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1$1, decls: 3, vars: 0, consts: [[1, "NgxEditor"], ["ngxEditor", ""]], template: function NgxEditorComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0, 1);
                i0.ɵɵprojection(2);
                i0.ɵɵelementEnd();
            }
        }, styles: [".NgxEditor{background:#fff;color:#000;background-clip:padding-box;border-radius:4px;border:1px solid rgba(0,0,0,.2);position:relative}.NgxEditor--Disabled{opacity:.5;pointer-events:none}.NgxEditor__Placeholder:before{color:#6c757d;opacity:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;cursor:text;content:attr(data-placeholder)}.NgxEditor__Placeholder[data-align=right]:before{position:relative}.NgxEditor__Content{padding:.5rem;white-space:pre-wrap;outline:none;font-variant-ligatures:none;font-feature-settings:\"liga\" 0}.NgxEditor__Content p{margin:0 0 .7rem}.NgxEditor__Content blockquote{padding-left:1rem;border-left:3px solid #ddd;margin-left:0;margin-right:0}.NgxEditor__Content--Disabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.NgxEditor__Wrapper{border:1px solid rgba(0,0,0,.4);border-radius:4px}.NgxEditor__Wrapper .NgxEditor__MenuBar{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom:1px solid rgba(0,0,0,.2)}.NgxEditor__Wrapper .NgxEditor{border-top-left-radius:0;border-top-right-radius:0;border:none}.NgxEditor__MenuBar{display:flex;padding:.2rem;cursor:default;background-color:#fff}.NgxEditor__MenuItem{border-radius:2px;display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0}.NgxEditor__MenuItem:hover{background-color:#f1f1f1}.NgxEditor__MenuItem.NgxEditor__MenuItem--Icon{height:1.85rem;width:1.85rem;transition:.3s ease-in-out}.NgxEditor__MenuItem.NgxEditor__MenuItem--Icon+.NgxEditor__MenuItem--Icon{margin-left:2px}.NgxEditor__MenuItem .NgxEditor__MenuItem--IconContainer{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.NgxEditor__MenuItem.NgxEditor__MenuItem--Text{padding:0 .3rem}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active{background-color:#e8f0fe}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active.NgxEditor__MenuItem--Text{color:#1a73e8}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active svg{fill:#1a73e8}.NgxEditor__Dropdown{min-width:4rem;position:relative;display:flex;align-items:center;flex-shrink:0}.NgxEditor__Dropdown:hover{background-color:#f1f1f1}.NgxEditor__Dropdown .NgxEditor__Dropdown--Text{display:flex;align-items:center;justify-content:center;padding:0 .3rem;height:100%;width:100%}.NgxEditor__Dropdown .NgxEditor__Dropdown--Text:after{display:inline-block;content:\"\";margin-left:1.5rem;vertical-align:.25rem;border-top:.25rem solid;border-right:.25rem solid transparent;border-bottom:0;border-left:.25rem solid transparent}.NgxEditor__Dropdown .NgxEditor__Dropdown--DropdownMenu{position:absolute;left:0;top:calc(1.85rem + 2px);box-shadow:0 2px 6px 2px rgba(60,64,67,.15);border-radius:4px;background-color:#fff;z-index:10;width:100%}.NgxEditor__Dropdown .NgxEditor__Dropdown--Item{padding:.5rem;white-space:nowrap;color:inherit}.NgxEditor__Dropdown .NgxEditor__Dropdown--Item:hover{background-color:#ececec}.NgxEditor__Dropdown.NgxEditor__Dropdown--Open,.NgxEditor__Dropdown.NgxEditor__Dropdown--Selected{background-color:#e8f0fe}.NgxEditor__Dropdown.NgxEditor__Dropdown--Open .NgxEditor__Dropdown--Text,.NgxEditor__Dropdown.NgxEditor__Dropdown--Selected .NgxEditor__Dropdown--Text{color:#1a73e8}.NgxEditor__Dropdown .NgxEditor__Dropdown--Active{background-color:#f1f1f1}.NgxEditor__Dropdown .NgxEditor__Dropdown--Active:hover{background-color:#e7e7e7}.NgxEditor__Popup{position:absolute;top:calc(1.85rem + 2px);box-shadow:0 2px 6px 2px rgba(60,64,67,.15);border-radius:4px;background-color:#fff;z-index:10;min-width:12rem;padding:8px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup{margin-bottom:8px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup label{margin-bottom:3px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup input[type=text],.NgxEditor__Popup .NgxEditor__Popup--FormGroup input[type=url]{padding:2px 4px}.NgxEditor__Popup .NgxEditor__Popup--Col{display:flex;flex-direction:column;position:relative}.NgxEditor__Popup .NgxEditor__Popup--Label{font-size:85%}.NgxEditor__Seperator{border-left:1px solid #ccc;margin:0 .3rem}.NgxEditor__HelpText{font-size:80%}.NgxEditor__HelpText.NgxEditor__HelpText--Error{color:red}"], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-editor',
                        templateUrl: './editor.component.html',
                        styleUrls: ['./editor.component.scss'],
                        providers: [{
                                provide: i4.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return NgxEditorComponent; }),
                                multi: true
                            }],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], function () { return [{ type: i0.Renderer2 }, { type: i0.Injector }]; }, { ngxEditor: [{
                    type: i0.ViewChild,
                    args: ['ngxEditor', { static: true }]
                }], editor: [{
                    type: i0.Input
                }], outputFormat: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], enabled: [{
                    type: i0.Input
                }], focusOut: [{
                    type: i0.Output
                }], focusIn: [{
                    type: i0.Output
                }] });
    })();

    var MenuService = /** @class */ (function () {
        function MenuService() {
            this.customMenuRefChange = new rxjs.Subject();
        }
        MenuService.prototype.setCustomMenuRef = function (c) {
            this.customMenuRefChange.next(c);
        };
        return MenuService;
    }());
    MenuService.ɵfac = function MenuService_Factory(t) { return new (t || MenuService)(); };
    MenuService.ɵprov = i0.ɵɵdefineInjectable({ token: MenuService, factory: MenuService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var bold = "\n  <path d=\"M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z\" />\n";

    var italic = "\n  <path d=\"M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z\" />\n";

    var code = "\n<path d=\"M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z\"/>\n";

    var underline = "\n<path d=\"M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z\"/>\n";

    var strike = "\n<path d=\"M6.85,7.08C6.85,4.37,9.45,3,12.24,3c1.64,0,3,0.49,3.9,1.28c0.77,0.65,1.46,1.73,1.46,3.24h-3.01 c0-0.31-0.05-0.59-0.15-0.85c-0.29-0.86-1.2-1.28-2.25-1.28c-1.86,0-2.34,1.02-2.34,1.7c0,0.48,0.25,0.88,0.74,1.21 C10.97,8.55,11.36,8.78,12,9H7.39C7.18,8.66,6.85,8.11,6.85,7.08z M21,12v-2H3v2h9.62c1.15,0.45,1.96,0.75,1.96,1.97 c0,1-0.81,1.67-2.28,1.67c-1.54,0-2.93-0.54-2.93-2.51H6.4c0,0.55,0.08,1.13,0.24,1.58c0.81,2.29,3.29,3.3,5.67,3.3 c2.27,0,5.3-0.89,5.3-4.05c0-0.3-0.01-1.16-0.48-1.94H21V12z\"/>\n";

    var orderedList = "\n<path d=\"M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z\"/>\n";

    var bulletList = "\n<path d=\"M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z\"/>\n";

    var quote = "\n<path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z\"/>\n";

    var link = "\n<path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z\"/>\n";

    var unlink = "\n<path d=\"M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z\"/>\n";

    var image = "\n<path d=\"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\"/>\n";

    var alignLeft = "\n<path d=\"M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z\"/>\n";

    var alignCenter = "\n<path d=\"M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z\"/>\n";

    var alignRight = "\n<path d=\"M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z\"/>\n";

    var alignJustify = "\n<path d=\"M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z\"/>\n";

    var textColor = "\n<path d=\"M2,20h20v4H2V20z M5.49,17h2.42l1.27-3.58h5.65L16.09,17h2.42L13.25,3h-2.5L5.49,17z M9.91,11.39l2.03-5.79h0.12l2.03,5.79 H9.91z\"/>\n";

    var colorFill = "\n<path d=\"M16.56,8.94L7.62,0L6.21,1.41l2.38,2.38L3.44,8.94c-0.59,0.59-0.59,1.54,0,2.12l5.5,5.5C9.23,16.85,9.62,17,10,17 s0.77-0.15,1.06-0.44l5.5-5.5C17.15,10.48,17.15,9.53,16.56,8.94z M5.21,10L10,5.21L14.79,10H5.21z M19,11.5c0,0-2,2.17-2,3.5 c0,1.1,0.9,2,2,2s2-0.9,2-2C21,13.67,19,11.5,19,11.5z M2,20h20v4H2V20z\"/>\n";

    // Icons source: https://material.io/
    var DEFAULT_ICON_HEIGHT = 20;
    var DEFAULT_ICON_WIDTH = 20;
    var icons = {
        bold: bold,
        italic: italic,
        code: code,
        underline: underline,
        strike: strike,
        ordered_list: orderedList,
        bullet_list: bulletList,
        blockquote: quote,
        link: link,
        unlink: unlink,
        image: image,
        align_left: alignLeft,
        align_center: alignCenter,
        align_right: alignRight,
        align_justify: alignJustify,
        text_color: textColor,
        color_fill: colorFill
    };
    var Icon = /** @class */ (function () {
        function Icon() {
        }
        Icon.get = function (name, fill) {
            if (fill === void 0) { fill = '#000'; }
            var path = icons[name] || '<path></path>';
            return "\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 24 24\"\n        fill=" + fill + "\n        height=" + DEFAULT_ICON_HEIGHT + "\n        width=" + DEFAULT_ICON_WIDTH + "\n      >\n        " + path + "\n      </svg>\n    ";
        };
        Icon.getPath = function (name) {
            var path = icons[name] || '<path></path>';
            return path;
        };
        return Icon;
    }());

    var Mark = /** @class */ (function () {
        function Mark(name) {
            this.name = name;
        }
        Mark.prototype.apply = function () {
            var _this = this;
            return function (state, dispatch) {
                var schema = state.schema;
                var type = schema.marks[_this.name];
                if (!type) {
                    return false;
                }
                return commands.applyMark(type)(state, dispatch);
            };
        };
        Mark.prototype.toggle = function () {
            var _this = this;
            return function (state, dispatch) {
                var schema = state.schema;
                var type = schema.marks[_this.name];
                if (!type) {
                    return false;
                }
                return prosemirrorCommands.toggleMark(type)(state, dispatch);
            };
        };
        Mark.prototype.isActive = function (state) {
            var schema = state.schema;
            var type = schema.marks[this.name];
            if (!type) {
                return false;
            }
            return helpers.isMarkActive(state, type);
        };
        Mark.prototype.canExecute = function (state) {
            return this.toggle()(state);
        };
        return Mark;
    }());

    var Blockqote = /** @class */ (function () {
        function Blockqote() {
        }
        Blockqote.prototype.toggle = function () {
            var _this = this;
            return function (state, dispatch) {
                var schema = state.schema;
                var type = schema.nodes.blockquote;
                if (!type) {
                    return false;
                }
                if (_this.isActive(state)) {
                    return prosemirrorCommands.lift(state, dispatch);
                }
                return prosemirrorCommands.wrapIn(type)(state, dispatch);
            };
        };
        Blockqote.prototype.isActive = function (state) {
            var schema = state.schema;
            var type = schema.nodes.blockquote;
            if (!type) {
                return false;
            }
            return helpers.isNodeActive(state, type);
        };
        Blockqote.prototype.canExecute = function (state) {
            return this.toggle()(state);
        };
        return Blockqote;
    }());

    var ListItem = /** @class */ (function () {
        function ListItem(isBulletList) {
            if (isBulletList === void 0) { isBulletList = false; }
            this.isBulletList = false;
            this.isBulletList = isBulletList;
        }
        ListItem.prototype.getType = function (schema) {
            return this.isBulletList ? schema.nodes.bullet_list : schema.nodes.ordered_list;
        };
        ListItem.prototype.toggle = function () {
            var _this = this;
            return function (state, dispatch) {
                var schema = state.schema;
                var type = _this.getType(schema);
                if (!type) {
                    return false;
                }
                if (_this.isActive(state)) {
                    return prosemirrorSchemaList.liftListItem(schema.nodes.list_item)(state, dispatch);
                }
                return prosemirrorSchemaList.wrapInList(type)(state, dispatch);
            };
        };
        ListItem.prototype.isActive = function (state) {
            var schema = state.schema;
            var type = this.getType(schema);
            if (!type) {
                return false;
            }
            return helpers.isNodeActive(state, type);
        };
        ListItem.prototype.canExecute = function (state) {
            return this.toggle()(state);
        };
        return ListItem;
    }());

    var Heading = /** @class */ (function () {
        function Heading(level) {
            this.level = level;
        }
        Heading.prototype.apply = function () {
            return function (state, dispatch) {
                var schema = state.schema;
                var type = schema.nodes.heading;
                if (!type) {
                    return false;
                }
                return prosemirrorCommands.setBlockType(type)(state, dispatch);
            };
        };
        Heading.prototype.toggle = function () {
            var _this = this;
            return function (state, dispatch) {
                var _a;
                var schema = state.schema, selection = state.selection, doc = state.doc;
                var type = schema.nodes.heading;
                if (!type) {
                    return false;
                }
                var nodePos = selection.$from.before(1);
                var node = doc.nodeAt(nodePos);
                var attrs = (_a = node === null || node === void 0 ? void 0 : node.attrs) !== null && _a !== void 0 ? _a : {};
                if (_this.isActive(state)) {
                    return prosemirrorCommands.setBlockType(schema.nodes.paragraph, attrs)(state, dispatch);
                }
                return prosemirrorCommands.setBlockType(type, Object.assign(Object.assign({}, attrs), { level: _this.level }))(state, dispatch);
            };
        };
        Heading.prototype.isActive = function (state) {
            var _this = this;
            var schema = state.schema;
            var nodesInSelection = helpers.getSelectionNodes(state);
            var type = schema.nodes.heading;
            if (!type) {
                return false;
            }
            var supportedNodes = [
                type,
                schema.nodes.text,
                schema.nodes.blockquote
            ];
            // heading is a text node
            // don't mark as active when it has more nodes
            var nodes = nodesInSelection.filter(function (node) {
                return supportedNodes.includes(node.type);
            });
            var acitveNode = nodes.find(function (node) {
                return node.attrs.level === _this.level;
            });
            return Boolean(acitveNode);
        };
        Heading.prototype.canExecute = function (state) {
            return this.toggle()(state);
        };
        return Heading;
    }());

    var TextAlign = /** @class */ (function () {
        function TextAlign(align) {
            this.align = align;
        }
        TextAlign.prototype.toggle = function () {
            var _this = this;
            return function (state, dispatch) {
                var doc = state.doc, selection = state.selection, tr = state.tr, schema = state.schema;
                var from = selection.from, to = selection.to;
                var applicable = false;
                doc.nodesBetween(from, to, function (node, pos) {
                    var nodeType = node.type;
                    if ([schema.nodes.paragraph, schema.nodes.heading].includes(nodeType)) {
                        applicable = true;
                        tr.setNodeMarkup(pos, nodeType, Object.assign(Object.assign({}, node.attrs), { align: _this.align }));
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
        };
        TextAlign.prototype.isActive = function (state) {
            var _this = this;
            var nodes = helpers.getSelectionNodes(state);
            var active = nodes.find(function (node) {
                return node.attrs.align === _this.align;
            });
            return Boolean(active);
        };
        TextAlign.prototype.canExecute = function (state) {
            return this.toggle()(state);
        };
        return TextAlign;
    }());

    var defaultOptions = {
        strict: true
    };
    var Link = /** @class */ (function () {
        function Link() {
        }
        Link.prototype.update = function (attrs) {
            if (attrs === void 0) { attrs = {}; }
            return function (state, dispatch) {
                var schema = state.schema, selection = state.selection;
                var type = schema.marks.link;
                if (!type) {
                    return false;
                }
                if (selection.empty) {
                    return false;
                }
                return prosemirrorCommands.toggleMark(type, attrs)(state, dispatch);
            };
        };
        Link.prototype.insert = function (text, attrs) {
            return function (state, dispatch) {
                var _a, _b;
                var schema = state.schema, tr = state.tr;
                var type = schema.marks.link;
                if (!type) {
                    return false;
                }
                var linkAttrs = {
                    href: attrs.href,
                    title: (_a = attrs.title) !== null && _a !== void 0 ? _a : text,
                    target: (_b = attrs.target) !== null && _b !== void 0 ? _b : '_blank'
                };
                var node = schema.text(text, [schema.marks.link.create(linkAttrs)]);
                tr.replaceSelectionWith(node, false)
                    .scrollIntoView();
                if (tr.docChanged) {
                    dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
                    return true;
                }
                return false;
            };
        };
        Link.prototype.isActive = function (state, options) {
            if (options === void 0) { options = defaultOptions; }
            if (options.strict) {
                return true;
            }
            var schema = state.schema;
            var type = schema.marks.link;
            if (!type) {
                return false;
            }
            return helpers.isMarkActive(state, type);
        };
        Link.prototype.remove = function (state, dispatch) {
            return commands.removeLink()(state, dispatch);
        };
        Link.prototype.canExecute = function (state) {
            return this.update({})(state);
        };
        return Link;
    }());

    var Image = /** @class */ (function () {
        function Image() {
        }
        Image.prototype.insert = function (src, attrs) {
            return function (state, dispatch) {
                var schema = state.schema, tr = state.tr, selection = state.selection;
                var type = schema.nodes.image;
                if (!type) {
                    return false;
                }
                var imageAttrs = Object.assign({ width: null, src: src }, attrs);
                if (!imageAttrs.width && selection instanceof prosemirrorState.NodeSelection && selection.node.type === type) {
                    imageAttrs.width = selection.node.attrs.width;
                }
                tr.replaceSelectionWith(type.createAndFill(imageAttrs));
                var resolvedPos = tr.doc.resolve(tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize);
                tr
                    .setSelection(new prosemirrorState.NodeSelection(resolvedPos))
                    .scrollIntoView();
                if (tr.docChanged) {
                    dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
                    return true;
                }
                return false;
            };
        };
        Image.prototype.isActive = function (state) {
            var selection = state.selection;
            if (selection instanceof prosemirrorState.NodeSelection) {
                return selection.node.type.name === 'image';
            }
            return false;
        };
        return Image;
    }());

    var TextColor = /** @class */ (function () {
        function TextColor(name) {
            this.name = name;
        }
        TextColor.prototype.apply = function (attrs) {
            var _this = this;
            return function (state, dispatch) {
                var schema = state.schema, selection = state.selection, doc = state.doc;
                var type = schema.marks[_this.name];
                if (!type) {
                    return false;
                }
                var from = selection.from, to = selection.to, empty = selection.empty;
                if (!empty && (from + 1 === to)) {
                    var node = doc.nodeAt(from);
                    if ((node === null || node === void 0 ? void 0 : node.isAtom) && !node.isText && node.isLeaf) {
                        // An atomic node (e.g. Image) is selected.
                        return false;
                    }
                }
                return commands.applyMark(type, attrs)(state, dispatch);
            };
        };
        TextColor.prototype.isActive = function (state) {
            var schema = state.schema;
            var type = schema.marks[this.name];
            if (!type) {
                return false;
            }
            return helpers.isMarkActive(state, type);
        };
        TextColor.prototype.getActiveColors = function (state) {
            var _this = this;
            if (!this.isActive(state)) {
                return [];
            }
            var schema = state.schema;
            var marks = helpers.getSelectionMarks(state);
            var colors = marks
                .filter(function (mark) { return mark.type === schema.marks[_this.name]; })
                .map(function (mark) { return mark.attrs.color; })
                .filter(Boolean);
            return colors;
        };
        TextColor.prototype.remove = function () {
            var _this = this;
            return function (state, dispatch) {
                var schema = state.schema;
                var type = schema.marks[_this.name];
                if (!type) {
                    return false;
                }
                return commands.removeMark(type)(state, dispatch);
            };
        };
        TextColor.prototype.canExecute = function (state) {
            var attrs = this.name === 'text_color' ? { color: '' } : { backgroundColor: '' };
            return this.apply(attrs)(state);
        };
        return TextColor;
    }());

    var STRONG = new Mark('strong');
    var EM = new Mark('em');
    var CODE = new Mark('code');
    var UNDERLINE = new Mark('u');
    var STRIKE = new Mark('s');
    var BLOCKQUOTE = new Blockqote();
    var UL = new ListItem(true);
    var OL = new ListItem(false);
    var H1 = new Heading(1);
    var H2 = new Heading(2);
    var H3 = new Heading(3);
    var H4 = new Heading(4);
    var H5 = new Heading(5);
    var H6 = new Heading(6);
    var ALIGN_LEFT = new TextAlign('left');
    var ALIGN_CENTER = new TextAlign('center');
    var ALIGN_RIGHT = new TextAlign('right');
    var ALIGN_JUSTIFY = new TextAlign('justify');
    var LINK = new Link();
    var IMAGE = new Image();
    var TEXT_COLOR = new TextColor('text_color');
    var TEXT_BACKGROUND_COLOR = new TextColor('text_background_color');

    var ToggleCommands = {
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
    var Link$1 = LINK;
    var Image$1 = IMAGE;
    var TextColor$1 = TEXT_COLOR;
    var TextBackgroundColor = TEXT_BACKGROUND_COLOR;

    var defaults = {
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
    var Locals = /** @class */ (function () {
        function Locals(newLocals) {
            var _this = this;
            if (newLocals === void 0) { newLocals = {}; }
            this.locals = defaults;
            this.get = function (key) {
                var _a;
                return (_a = _this.locals[key]) !== null && _a !== void 0 ? _a : '';
            };
            this.locals = Object.assign({}, defaults, newLocals);
        }
        return Locals;
    }());

    var NgxEditorServiceConfig = /** @class */ (function () {
        function NgxEditorServiceConfig() {
            this.locals = {};
        }
        return NgxEditorServiceConfig;
    }());
    NgxEditorServiceConfig.ɵfac = function NgxEditorServiceConfig_Factory(t) { return new (t || NgxEditorServiceConfig)(); };
    NgxEditorServiceConfig.ɵprov = i0.ɵɵdefineInjectable({ token: NgxEditorServiceConfig, factory: NgxEditorServiceConfig.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorServiceConfig, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], null, null);
    })();
    var NgxEditorService = /** @class */ (function () {
        function NgxEditorService(config) {
            this.config = config;
        }
        Object.defineProperty(NgxEditorService.prototype, "locals", {
            get: function () {
                return new Locals(this.config.locals);
            },
            enumerable: false,
            configurable: true
        });
        return NgxEditorService;
    }());
    NgxEditorService.ɵfac = function NgxEditorService_Factory(t) { return new (t || NgxEditorService)(i0.ɵɵinject(NgxEditorServiceConfig, 8)); };
    NgxEditorService.ɵprov = i0.ɵɵdefineInjectable({ token: NgxEditorService, factory: NgxEditorService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: NgxEditorServiceConfig, decorators: [{
                            type: i0.Optional
                        }] }];
        }, null);
    })();
    var provideMyServiceOptions = function (config) {
        var _a;
        return {
            locals: (_a = config.locals) !== null && _a !== void 0 ? _a : {}
        };
    };

    var SanitizeHtmlPipe = /** @class */ (function () {
        function SanitizeHtmlPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        SanitizeHtmlPipe.prototype.transform = function (value) {
            return this.sanitizer.bypassSecurityTrustHtml(value);
        };
        return SanitizeHtmlPipe;
    }());
    SanitizeHtmlPipe.ɵfac = function SanitizeHtmlPipe_Factory(t) { return new (t || SanitizeHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
    SanitizeHtmlPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sanitizeHtml", type: SanitizeHtmlPipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SanitizeHtmlPipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'sanitizeHtml'
                    }]
            }], function () { return [{ type: i1.DomSanitizer }]; }, null);
    })();

    var ToggleCommandComponent = /** @class */ (function () {
        function ToggleCommandComponent(ngxeService, menuService) {
            var _this = this;
            this.ngxeService = ngxeService;
            this.menuService = menuService;
            this.isActive = false;
            this.disabled = false;
            this.update = function (view) {
                var state = view.state;
                var command = ToggleCommands[_this.name];
                _this.isActive = command.isActive(state);
                _this.disabled = !command.canExecute(state);
            };
        }
        Object.defineProperty(ToggleCommandComponent.prototype, "name", {
            get: function () {
                return this.toolbarItem;
            },
            enumerable: false,
            configurable: true
        });
        ToggleCommandComponent.prototype.toggle = function (e) {
            e.preventDefault();
            if (e.button !== 0) {
                return;
            }
            var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
            var command = ToggleCommands[this.name];
            command.toggle()(state, dispatch);
        };
        ToggleCommandComponent.prototype.getTitle = function (name) {
            return this.ngxeService.locals.get(name);
        };
        ToggleCommandComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.html = Icon.get(this.name);
            this.editorView = this.menuService.editor.view;
            this.updateSubscription = this.menuService.editor.update.subscribe(function (view) {
                _this.update(view);
            });
        };
        ToggleCommandComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
        };
        return ToggleCommandComponent;
    }());
    ToggleCommandComponent.ɵfac = function ToggleCommandComponent_Factory(t) { return new (t || ToggleCommandComponent)(i0.ɵɵdirectiveInject(NgxEditorService), i0.ɵɵdirectiveInject(MenuService)); };
    ToggleCommandComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ToggleCommandComponent, selectors: [["ngx-toggle-command"]], hostVars: 4, hostBindings: function ToggleCommandComponent_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.isActive)("NgxEditor--Disabled", ctx.disabled);
            }
        }, inputs: { toolbarItem: "toolbarItem" }, decls: 2, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "title", "mousedown"]], template: function ToggleCommandComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵlistener("mousedown", function ToggleCommandComponent_Template_div_mousedown_0_listener($event) { return ctx.toggle($event); });
                i0.ɵɵpipe(1, "sanitizeHtml");
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 2, ctx.html), i0.ɵɵsanitizeHtml)("title", ctx.getTitle(ctx.name));
            }
        }, pipes: [SanitizeHtmlPipe], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToggleCommandComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-toggle-command',
                        templateUrl: './toggle-command.component.html',
                        styleUrls: ['./toggle-command.component.scss']
                    }]
            }], function () { return [{ type: NgxEditorService }, { type: MenuService }]; }, { toolbarItem: [{
                    type: i0.Input
                }], isActive: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor__MenuItem--Active']
                }], disabled: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor--Disabled']
                }] });
    })();

    function LinkComponent_div_2_div_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", (ctx_r1.href.errors == null ? null : ctx_r1.href.errors.pattern) && "Please enter valid url.", " ");
        }
    }
    function LinkComponent_div_2_div_13_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", (ctx_r2.text.errors == null ? null : ctx_r2.text.errors.required) && "This is required", " ");
        }
    }
    function LinkComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelementStart(1, "form", 3);
            i0.ɵɵlistener("ngSubmit", function LinkComponent_div_2_Template_form_ngSubmit_1_listener($event) { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.insertLink($event); });
            i0.ɵɵelementStart(2, "div", 4);
            i0.ɵɵelementStart(3, "div", 5);
            i0.ɵɵelementStart(4, "label", 6);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(6, "input", 7);
            i0.ɵɵtemplate(7, LinkComponent_div_2_div_7_Template, 2, 1, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 4);
            i0.ɵɵelementStart(9, "div", 5);
            i0.ɵɵelementStart(10, "label", 6);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 9);
            i0.ɵɵtemplate(13, LinkComponent_div_2_div_13_Template, 2, 1, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 4);
            i0.ɵɵelementStart(15, "div", 5);
            i0.ɵɵelementStart(16, "label");
            i0.ɵɵelement(17, "input", 10);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 11);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("formGroup", ctx_r0.form);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("url"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.href.touched && ctx_r0.href.invalid);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("text"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.text.touched && ctx_r0.text.invalid);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx_r0.getLabel("openInNewTab"), " ");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("disabled", !ctx_r0.form.valid);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("insert"));
        }
    }
    var LinkComponent = /** @class */ (function () {
        function LinkComponent(el, ngxeService, menuService) {
            var _this = this;
            this.el = el;
            this.ngxeService = ngxeService;
            this.menuService = menuService;
            this.showPopup = false;
            this.isActive = false;
            this.canExecute = true;
            this.form = new i4.FormGroup({
                href: new i4.FormControl('', [
                    i4.Validators.required,
                    i4.Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
                ]),
                text: new i4.FormControl('', [i4.Validators.required]),
                openInNewTab: new i4.FormControl(true)
            });
            this.setText = function () {
                var _a = _this.editorView.state, selection = _a.selection, doc = _a.doc;
                var empty = selection.empty, from = selection.from, to = selection.to;
                var selectedText = !empty ? doc.textBetween(from, to) : '';
                if (selectedText) {
                    _this.text.patchValue(selectedText);
                    _this.text.disable();
                }
            };
            this.update = function (view) {
                var state = view.state;
                _this.isActive = Link$1.isActive(state, { strict: false });
                _this.canExecute = Link$1.canExecute(state);
            };
        }
        Object.defineProperty(LinkComponent.prototype, "valid", {
            get: function () {
                return this.isActive || this.showPopup;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LinkComponent.prototype, "disabled", {
            get: function () {
                return !this.canExecute;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LinkComponent.prototype, "icon", {
            get: function () {
                return Icon.get(this.isActive ? 'unlink' : 'link');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LinkComponent.prototype, "href", {
            get: function () {
                return this.form.get('href');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LinkComponent.prototype, "text", {
            get: function () {
                return this.form.get('text');
            },
            enumerable: false,
            configurable: true
        });
        LinkComponent.prototype.onDocumentClick = function (e) {
            if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
                this.hideForm();
            }
        };
        LinkComponent.prototype.getLabel = function (key) {
            return this.ngxeService.locals.get(key);
        };
        LinkComponent.prototype.hideForm = function () {
            this.showPopup = false;
            this.form.reset({
                href: '',
                text: '',
                openInNewTab: true
            });
            this.text.enable();
        };
        LinkComponent.prototype.onMouseDown = function (e) {
            e.preventDefault();
            if (e.button !== 0) {
                return;
            }
            var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
            if (this.isActive) {
                Link$1.remove(state, dispatch);
                return;
            }
            this.showPopup = !this.showPopup;
            if (this.showPopup) {
                this.setText();
            }
        };
        LinkComponent.prototype.insertLink = function (e) {
            e.preventDefault();
            var _a = this.form.getRawValue(), text = _a.text, href = _a.href, openInNewTab = _a.openInNewTab;
            var _b = this.editorView, dispatch = _b.dispatch, state = _b.state;
            var selection = state.selection;
            var attrs = {
                title: href,
                href: href,
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
        };
        LinkComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.editorView = this.menuService.editor.view;
            this.updateSubscription = this.menuService.editor.update.subscribe(function (view) {
                _this.update(view);
            });
        };
        LinkComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
        };
        return LinkComponent;
    }());
    LinkComponent.ɵfac = function LinkComponent_Factory(t) { return new (t || LinkComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NgxEditorService), i0.ɵɵdirectiveInject(MenuService)); };
    LinkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LinkComponent, selectors: [["ngx-link"]], hostVars: 4, hostBindings: function LinkComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mousedown", function LinkComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
            }
            if (rf & 2) {
                i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid)("NgxEditor--Disabled", ctx.disabled);
            }
        }, decls: 3, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], [1, "NgxEditor__Popup--Form", 3, "formGroup", "ngSubmit"], [1, "NgxEditor__Popup--FormGroup"], [1, "NgxEditor__Popup--Col"], [1, "NgxEditor__Popup--Label"], ["type", "href", "id", "href", "formControlName", "href", "autofocus", "", "autocomplete", "off"], ["class", "NgxEditor__HelpText NgxEditor__HelpText--Error", 4, "ngIf"], ["type", "text", "formControlName", "text", "autocomplete", "off"], ["type", "checkbox", "formControlName", "openInNewTab"], ["type", "submit", 3, "disabled"], [1, "NgxEditor__HelpText", "NgxEditor__HelpText--Error"]], template: function LinkComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵlistener("mousedown", function LinkComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
                i0.ɵɵpipe(1, "sanitizeHtml");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(2, LinkComponent_div_2_Template, 21, 8, "div", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 2, ctx.icon), i0.ɵɵsanitizeHtml);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.showPopup);
            }
        }, directives: [i3.NgIf, i4.ɵangular_packages_forms_forms_ba, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlName, i4.CheckboxControlValueAccessor], pipes: [SanitizeHtmlPipe], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-link',
                        templateUrl: './link.component.html',
                        styleUrls: ['./link.component.scss']
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: NgxEditorService }, { type: MenuService }]; }, { valid: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor__MenuItem--Active']
                }], disabled: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor--Disabled']
                }], onDocumentClick: [{
                    type: i0.HostListener,
                    args: ['document:mousedown', ['$event']]
                }] });
    })();

    function ImageComponent_div_2_div_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", (ctx_r1.src.errors == null ? null : ctx_r1.src.errors.pattern) && "Please enter valid url.", " ");
        }
    }
    function ImageComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelementStart(1, "form", 3);
            i0.ɵɵlistener("ngSubmit", function ImageComponent_div_2_Template_form_ngSubmit_1_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.insertLink($event); });
            i0.ɵɵelementStart(2, "div", 4);
            i0.ɵɵelementStart(3, "div", 5);
            i0.ɵɵelementStart(4, "label", 6);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(6, "input", 7);
            i0.ɵɵtemplate(7, ImageComponent_div_2_div_7_Template, 2, 1, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 4);
            i0.ɵɵelementStart(9, "div", 5);
            i0.ɵɵelementStart(10, "label", 6);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 4);
            i0.ɵɵelementStart(14, "div", 5);
            i0.ɵɵelementStart(15, "label", 6);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 11);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("formGroup", ctx_r0.form);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("url"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.src.touched && ctx_r0.src.invalid);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("altText"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("title"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx_r0.form.valid || !ctx_r0.form.dirty);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r0.getLabel("insert"));
        }
    }
    var ImageComponent = /** @class */ (function () {
        function ImageComponent(el, ngxeService, menuService) {
            var _this = this;
            this.el = el;
            this.ngxeService = ngxeService;
            this.menuService = menuService;
            this.showPopup = false;
            this.isActive = false;
            this.form = new i4.FormGroup({
                src: new i4.FormControl('', [
                    i4.Validators.required,
                    i4.Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
                ]),
                alt: new i4.FormControl(''),
                title: new i4.FormControl('')
            });
            this.update = function (view) {
                var state = view.state;
                _this.isActive = Image$1.isActive(state);
            };
        }
        Object.defineProperty(ImageComponent.prototype, "valid", {
            get: function () {
                return this.isActive || this.showPopup;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageComponent.prototype, "icon", {
            get: function () {
                return Icon.get('image');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageComponent.prototype, "src", {
            get: function () {
                return this.form.get('src');
            },
            enumerable: false,
            configurable: true
        });
        ImageComponent.prototype.onDocumentClick = function (e) {
            if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
                this.hideForm();
            }
        };
        ImageComponent.prototype.getLabel = function (key) {
            return this.ngxeService.locals.get(key);
        };
        ImageComponent.prototype.hideForm = function () {
            this.showPopup = false;
            this.form.reset({
                src: '',
                alt: '',
                title: ''
            });
        };
        ImageComponent.prototype.onMouseDown = function (e) {
            e.preventDefault();
            if (e.button !== 0) {
                return;
            }
            this.showPopup = !this.showPopup;
            if (this.showPopup) {
                this.fillForm();
            }
        };
        ImageComponent.prototype.fillForm = function () {
            var state = this.editorView.state;
            var selection = state.selection;
            if (selection instanceof prosemirrorState.NodeSelection && this.isActive) {
                var _a = selection.node.attrs, src = _a.src, _b = _a.alt, alt = _b === void 0 ? '' : _b, _c = _a.title, title = _c === void 0 ? '' : _c;
                this.form.setValue({
                    src: src,
                    alt: alt,
                    title: title
                });
            }
        };
        ImageComponent.prototype.insertLink = function (e) {
            e.preventDefault();
            var _a = this.form.getRawValue(), src = _a.src, alt = _a.alt, title = _a.title;
            var _b = this.editorView, dispatch = _b.dispatch, state = _b.state;
            var attrs = {
                alt: alt,
                title: title
            };
            Image$1.insert(src, attrs)(state, dispatch);
            this.editorView.focus();
            this.hideForm();
        };
        ImageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.editorView = this.menuService.editor.view;
            this.updateSubscription = this.menuService.editor.update.subscribe(function (view) {
                _this.update(view);
            });
        };
        ImageComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
        };
        return ImageComponent;
    }());
    ImageComponent.ɵfac = function ImageComponent_Factory(t) { return new (t || ImageComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NgxEditorService), i0.ɵɵdirectiveInject(MenuService)); };
    ImageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ImageComponent, selectors: [["ngx-image"]], hostVars: 2, hostBindings: function ImageComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mousedown", function ImageComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
            }
            if (rf & 2) {
                i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid);
            }
        }, decls: 3, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], [1, "NgxEditor__Popup--Form", 3, "formGroup", "ngSubmit"], [1, "NgxEditor__Popup--FormGroup"], [1, "NgxEditor__Popup--Col"], [1, "NgxEditor__Popup--Label"], ["type", "href", "id", "href", "formControlName", "src", "autofocus", "", "autocomplete", "off"], ["class", "NgxEditor__HelpText NgxEditor__HelpText--Error", 4, "ngIf"], ["type", "text", "formControlName", "alt", "autocomplete", "off"], ["type", "text", "formControlName", "title", "autocomplete", "off"], ["type", "submit", 3, "disabled"], [1, "NgxEditor__HelpText", "NgxEditor__HelpText--Error"]], template: function ImageComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵlistener("mousedown", function ImageComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
                i0.ɵɵpipe(1, "sanitizeHtml");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(2, ImageComponent_div_2_Template, 20, 7, "div", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 2, ctx.icon), i0.ɵɵsanitizeHtml);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.showPopup);
            }
        }, directives: [i3.NgIf, i4.ɵangular_packages_forms_forms_ba, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlName], pipes: [SanitizeHtmlPipe], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImageComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-image',
                        templateUrl: './image.component.html',
                        styleUrls: ['./image.component.scss']
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: NgxEditorService }, { type: MenuService }]; }, { valid: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor__MenuItem--Active']
                }], onDocumentClick: [{
                    type: i0.HostListener,
                    args: ['document:mousedown', ['$event']]
                }] });
    })();

    var _c0$2 = function (a0, a1) { return { "NgxEditor__Dropdown--Active": a0, "NgxEditor--Disabled": a1 }; };
    function DropdownComponent_div_2_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵlistener("mousedown", function DropdownComponent_div_2_div_1_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r4_1); var item_r2 = ctx.$implicit; var ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.onClick($event, item_r2); });
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r2 = ctx.$implicit;
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c0$2, item_r2 === ctx_r1.activeItem, ctx_r1.disabledItems.includes(item_r2)));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", ctx_r1.getName(item_r2), " ");
        }
    }
    function DropdownComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵtemplate(1, DropdownComponent_div_2_div_1_Template, 2, 5, "div", 3);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.items);
        }
    }
    var DropdownComponent = /** @class */ (function () {
        function DropdownComponent(ngxeService, menuService, el) {
            var _this = this;
            this.ngxeService = ngxeService;
            this.menuService = menuService;
            this.el = el;
            this.isDropdownOpen = false;
            this.activeItems = [];
            this.disabledItems = [];
            this.update = function (view) {
                var state = view.state;
                _this.activeItems = [];
                _this.disabledItems = [];
                _this.items.forEach(function (item) {
                    var command = ToggleCommands[item];
                    var isActive = command.isActive(state);
                    if (isActive) {
                        _this.activeItems.push(item);
                    }
                    if (!command.canExecute(state)) {
                        _this.disabledItems.push(item);
                    }
                });
                if (_this.activeItems.length === 1) {
                    _this.activeItem = _this.activeItems[0];
                }
                else {
                    _this.activeItem = null;
                }
            };
        }
        Object.defineProperty(DropdownComponent.prototype, "isSelected", {
            get: function () {
                return Boolean(this.activeItem || this.isDropdownOpen);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DropdownComponent.prototype, "isDropdownDisabled", {
            get: function () {
                return this.disabledItems.length === this.items.length;
            },
            enumerable: false,
            configurable: true
        });
        DropdownComponent.prototype.onDocumentClick = function (target) {
            if (!this.el.nativeElement.contains(target) && this.isDropdownOpen) {
                this.isDropdownOpen = false;
            }
        };
        DropdownComponent.prototype.getName = function (key) {
            return this.ngxeService.locals.get(key);
        };
        DropdownComponent.prototype.toggleDropdown = function (e) {
            e.preventDefault();
            this.isDropdownOpen = !this.isDropdownOpen;
        };
        DropdownComponent.prototype.onClick = function (e, item) {
            e.preventDefault();
            // consider only left click
            if (e.button !== 0) {
                return;
            }
            var command = ToggleCommands[item];
            var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
            command.toggle()(state, dispatch);
            this.isDropdownOpen = false;
        };
        DropdownComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.editorView = this.menuService.editor.view;
            this.updateSubscription = this.menuService.editor.update.subscribe(function (view) {
                _this.update(view);
            });
        };
        DropdownComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
        };
        return DropdownComponent;
    }());
    DropdownComponent.ɵfac = function DropdownComponent_Factory(t) { return new (t || DropdownComponent)(i0.ɵɵdirectiveInject(NgxEditorService), i0.ɵɵdirectiveInject(MenuService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    DropdownComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DropdownComponent, selectors: [["ngx-dropdown"]], hostVars: 4, hostBindings: function DropdownComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mousedown", function DropdownComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event.target); }, false, i0.ɵɵresolveDocument);
            }
            if (rf & 2) {
                i0.ɵɵclassProp("NgxEditor__Dropdown--Selected", ctx.isSelected)("NgxEditor--Disabled", ctx.isDropdownDisabled);
            }
        }, inputs: { group: "group", items: "items" }, decls: 3, vars: 2, consts: [[1, "NgxEditor__Dropdown--Text", 3, "mousedown"], ["class", "NgxEditor__Dropdown--DropdownMenu", 4, "ngIf"], [1, "NgxEditor__Dropdown--DropdownMenu"], ["class", "NgxEditor__Dropdown--Item", 3, "ngClass", "mousedown", 4, "ngFor", "ngForOf"], [1, "NgxEditor__Dropdown--Item", 3, "ngClass", "mousedown"]], template: function DropdownComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵlistener("mousedown", function DropdownComponent_Template_div_mousedown_0_listener($event) { return ctx.toggleDropdown($event); });
                i0.ɵɵtext(1);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(2, DropdownComponent_div_2_Template, 2, 1, "div", 1);
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate1(" ", ctx.getName(ctx.activeItem || ctx.group), "\n");
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isDropdownOpen);
            }
        }, directives: [i3.NgIf, i3.NgForOf, i3.NgClass], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DropdownComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-dropdown',
                        templateUrl: './dropdown.component.html',
                        styleUrls: ['./dropdown.component.scss']
                    }]
            }], function () { return [{ type: NgxEditorService }, { type: MenuService }, { type: i0.ElementRef }]; }, { group: [{
                    type: i0.Input
                }], items: [{
                    type: i0.Input
                }], isSelected: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor__Dropdown--Selected']
                }], isDropdownDisabled: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor--Disabled']
                }], onDocumentClick: [{
                    type: i0.HostListener,
                    args: ['document:mousedown', ['$event.target']]
                }] });
    })();

    var _c0$3 = function (a0, a1) { return { backgroundColor: a0, color: a1 }; };
    var _c1$2 = function (a0) { return { "NgxEditor__Color--Active": a0 }; };
    function ColorPickerComponent_div_2_div_1_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 7);
            i0.ɵɵlistener("mousedown", function ColorPickerComponent_div_2_div_1_button_1_Template_button_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r6_1); var color_r4 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(3); return ctx_r5.onColorSelect($event, color_r4); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var color_r4 = ctx.$implicit;
            var ctx_r3 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(3, _c0$3, color_r4, ctx_r3.getContrastYIQ(color_r4)))("title", color_r4)("ngClass", i0.ɵɵpureFunction1(6, _c1$2, ctx_r3.activeColors.includes(color_r4)));
        }
    }
    function ColorPickerComponent_div_2_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 5);
            i0.ɵɵtemplate(1, ColorPickerComponent_div_2_div_1_button_1_Template, 1, 8, "button", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var colorGroup_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", colorGroup_r2);
        }
    }
    function ColorPickerComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵtemplate(1, ColorPickerComponent_div_2_div_1_Template, 2, 1, "div", 3);
            i0.ɵɵelementStart(2, "button", 4);
            i0.ɵɵlistener("mousedown", function ColorPickerComponent_div_2_Template_button_mousedown_2_listener($event) { i0.ɵɵrestoreView(_r8_1); var ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.remove($event); });
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.presets);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("disabled", !ctx_r0.isActive);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", ctx_r0.getLabel("remove"), " ");
        }
    }
    var ColorPickerComponent = /** @class */ (function () {
        function ColorPickerComponent(el, menuService, ngxeService) {
            var _this = this;
            this.el = el;
            this.menuService = menuService;
            this.ngxeService = ngxeService;
            this.showPopup = false;
            this.isActive = false;
            this.activeColors = [];
            this.canExecute = true;
            this.update = function (view) {
                var state = view.state;
                _this.canExecute = _this.command.canExecute(state);
                _this.isActive = _this.command.isActive(state);
                _this.activeColors = [];
                if (_this.isActive) {
                    _this.activeColors = _this.command.getActiveColors(state);
                }
            };
        }
        Object.defineProperty(ColorPickerComponent.prototype, "valid", {
            get: function () {
                return this.isActive || this.showPopup;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPickerComponent.prototype, "disabled", {
            get: function () {
                return !this.canExecute;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPickerComponent.prototype, "title", {
            get: function () {
                return this.getLabel(this.type === 'text_color' ? 'text_color' : 'background_color');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPickerComponent.prototype, "icon", {
            get: function () {
                return Icon.get(this.type === 'text_color' ? 'text_color' : 'color_fill');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPickerComponent.prototype, "command", {
            get: function () {
                return this.type === 'text_color' ? TextColor$1 : TextBackgroundColor;
            },
            enumerable: false,
            configurable: true
        });
        ColorPickerComponent.prototype.getContrastYIQ = function (hexcolor) {
            hexcolor = hexcolor.replace('#', '');
            var r = parseInt(hexcolor.substr(0, 2), 16);
            var g = parseInt(hexcolor.substr(2, 2), 16);
            var b = parseInt(hexcolor.substr(4, 2), 16);
            var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return (yiq >= 128) ? 'black' : 'white';
        };
        ColorPickerComponent.prototype.onDocumentClick = function (e) {
            if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
                this.hidePopup();
            }
        };
        ColorPickerComponent.prototype.hidePopup = function () {
            this.showPopup = false;
        };
        ColorPickerComponent.prototype.togglePopup = function (e) {
            e.preventDefault();
            if (e.button !== 0) {
                return;
            }
            this.showPopup = !this.showPopup;
        };
        ColorPickerComponent.prototype.remove = function (e) {
            e.preventDefault();
            var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
            this.command.remove()(state, dispatch);
            this.hidePopup();
        };
        ColorPickerComponent.prototype.onColorSelect = function (e, color) {
            e.preventDefault();
            if (e.button !== 0) {
                return;
            }
            var _a = this.editorView, state = _a.state, dispatch = _a.dispatch;
            if (this.type === 'text_color') {
                var attrs = { color: color };
                this.command.apply(attrs)(state, dispatch);
            }
            else {
                var attrs = { backgroundColor: color };
                this.command.apply(attrs)(state, dispatch);
            }
            if (!this.editorView.hasFocus()) {
                this.editorView.focus();
            }
            this.hidePopup();
        };
        ColorPickerComponent.prototype.getLabel = function (key) {
            return this.ngxeService.locals.get(key);
        };
        ColorPickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.editorView = this.menuService.editor.view;
            this.updateSubscription = this.menuService.editor.update.subscribe(function (view) {
                _this.update(view);
            });
        };
        ColorPickerComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
        };
        return ColorPickerComponent;
    }());
    ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) { return new (t || ColorPickerComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(MenuService), i0.ɵɵdirectiveInject(NgxEditorService)); };
    ColorPickerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["ngx-color-picker"]], hostVars: 4, hostBindings: function ColorPickerComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mousedown", function ColorPickerComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
            }
            if (rf & 2) {
                i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid)("NgxEditor--Disabled", ctx.disabled);
            }
        }, inputs: { presets: "presets", type: "type" }, decls: 3, vars: 5, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "title", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], ["class", "NgxEditor__ColorContainer", 4, "ngFor", "ngForOf"], [1, "NgxEditor__MenuItem--Button", 3, "disabled", "mousedown"], [1, "NgxEditor__ColorContainer"], ["class", "NgxEditor__Color", 3, "ngStyle", "title", "ngClass", "mousedown", 4, "ngFor", "ngForOf"], [1, "NgxEditor__Color", 3, "ngStyle", "title", "ngClass", "mousedown"]], template: function ColorPickerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵlistener("mousedown", function ColorPickerComponent_Template_div_mousedown_0_listener($event) { return ctx.togglePopup($event); });
                i0.ɵɵpipe(1, "sanitizeHtml");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(2, ColorPickerComponent_div_2_Template, 4, 3, "div", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 3, ctx.icon), i0.ɵɵsanitizeHtml)("title", ctx.title);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.showPopup);
            }
        }, directives: [i3.NgIf, i3.NgForOf, i3.NgStyle, i3.NgClass], pipes: [SanitizeHtmlPipe], styles: ["@charset \"UTF-8\";.NgxEditor__Popup[_ngcontent-%COMP%]{width:230px}.NgxEditor__ColorContainer[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.NgxEditor__ColorContainer[_ngcontent-%COMP%] + .NgxEditor__ColorContainer[_ngcontent-%COMP%]{margin-top:5px}.NgxEditor__Color[_ngcontent-%COMP%]{border:none;outline:none;border-radius:6px;width:24px;height:24px;flex-shrink:0}.NgxEditor__Color--Active[_ngcontent-%COMP%]:after{content:\"\u2714\";font-size:90%}.NgxEditor__MenuItem--Button[_ngcontent-%COMP%]{margin-top:5px}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ColorPickerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-color-picker',
                        templateUrl: './color-picker.component.html',
                        styleUrls: ['./color-picker.component.scss']
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: MenuService }, { type: NgxEditorService }]; }, { presets: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], valid: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor__MenuItem--Active']
                }], disabled: [{
                    type: i0.HostBinding,
                    args: ['class.NgxEditor--Disabled']
                }], onDocumentClick: [{
                    type: i0.HostListener,
                    args: ['document:mousedown', ['$event']]
                }] });
    })();

    function MenuComponent_ng_container_1_ng_container_1_ngx_toggle_command_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ngx-toggle-command", 7);
        }
        if (rf & 2) {
            var item_r5 = i0.ɵɵnextContext().$implicit;
            var ctx_r7 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMap(ctx_r7.iconContainerClass);
            i0.ɵɵproperty("toolbarItem", item_r5);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_ngx_link_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ngx-link");
        }
        if (rf & 2) {
            var ctx_r8 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMap(ctx_r8.iconContainerClass);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_ngx_image_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ngx-image");
        }
        if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMap(ctx_r9.iconContainerClass);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_ng_container_4_ngx_dropdown_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ngx-dropdown", 9);
        }
        if (rf & 2) {
            var dropdownItem_r16 = ctx.$implicit;
            var ctx_r15 = i0.ɵɵnextContext(4);
            i0.ɵɵclassMap(ctx_r15.dropdownContainerClass);
            i0.ɵɵproperty("group", dropdownItem_r16.key)("items", dropdownItem_r16.value);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_ng_container_4_ngx_dropdown_1_Template, 1, 4, "ngx-dropdown", 8);
            i0.ɵɵpipe(2, "keyvalue");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r5 = i0.ɵɵnextContext().$implicit;
            var ctx_r10 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 1, ctx_r10.getDropdownItems(item_r5)));
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ngx-color-picker", 10);
        }
        if (rf & 2) {
            var ctx_r11 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMap(ctx_r11.iconContainerClass);
            i0.ɵɵproperty("presets", ctx_r11.presets);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ngx-color-picker", 11);
        }
        if (rf & 2) {
            var ctx_r12 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMap(ctx_r12.iconContainerClass);
            i0.ɵɵproperty("presets", ctx_r12.presets);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_div_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div");
        }
        if (rf & 2) {
            var ctx_r13 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMap(ctx_r13.seperatorClass);
        }
    }
    function MenuComponent_ng_container_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_ngx_toggle_command_1_Template, 1, 3, "ngx-toggle-command", 3);
            i0.ɵɵtemplate(2, MenuComponent_ng_container_1_ng_container_1_ngx_link_2_Template, 1, 2, "ngx-link", 4);
            i0.ɵɵtemplate(3, MenuComponent_ng_container_1_ng_container_1_ngx_image_3_Template, 1, 2, "ngx-image", 4);
            i0.ɵɵtemplate(4, MenuComponent_ng_container_1_ng_container_1_ng_container_4_Template, 3, 3, "ng-container", 2);
            i0.ɵɵtemplate(5, MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_5_Template, 1, 3, "ngx-color-picker", 5);
            i0.ɵɵtemplate(6, MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_6_Template, 1, 3, "ngx-color-picker", 6);
            i0.ɵɵtemplate(7, MenuComponent_ng_container_1_ng_container_1_div_7_Template, 1, 2, "div", 4);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r5 = ctx.$implicit;
            var lastItem_r6 = ctx.last;
            var lastToolbarItem_r3 = i0.ɵɵnextContext().last;
            var ctx_r4 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r4.toggleCommands.includes(item_r5));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r5 === "link");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r5 === "image");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r4.isDropDown(item_r5));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r5 === "text_color");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r5 === "background_color");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", lastItem_r6 && !lastToolbarItem_r3);
        }
    }
    function MenuComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_Template, 8, 7, "ng-container", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var toolbarItem_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", toolbarItem_r2);
        }
    }
    function MenuComponent_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementContainer(1, 12);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.customMenuRef);
        }
    }
    var _c0$4 = function (a0) { return { "NgxEditor--Disabled": a0 }; };
    var DEFAULT_TOOLBAR = [
        ['bold', 'italic'],
        ['code', 'blockquote'],
        ['underline', 'strike'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    var DEFAULT_COLOR_PRESETS = [
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
    var MenuComponent = /** @class */ (function () {
        function MenuComponent(menuService) {
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
        Object.defineProperty(MenuComponent.prototype, "presets", {
            get: function () {
                var col = 8;
                var colors = [];
                this.colorPresets.forEach(function (color, index) {
                    var row = Math.floor(index / col);
                    if (!colors[row]) {
                        colors.push([]);
                    }
                    colors[row].push(color);
                });
                return colors;
            },
            enumerable: false,
            configurable: true
        });
        MenuComponent.prototype.isDropDown = function (item) {
            var _a;
            if ((_a = item) === null || _a === void 0 ? void 0 : _a.heading) {
                return true;
            }
            return false;
        };
        MenuComponent.prototype.getDropdownItems = function (item) {
            return item;
        };
        MenuComponent.prototype.ngOnInit = function () {
            if (!this.editor) {
                throw new Error('NgxEditor: Required editor instance');
            }
            this.menuService.editor = this.editor;
        };
        return MenuComponent;
    }());
    MenuComponent.ɵfac = function MenuComponent_Factory(t) { return new (t || MenuComponent)(i0.ɵɵdirectiveInject(MenuService)); };
    MenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MenuComponent, selectors: [["ngx-editor-menu"]], inputs: { toolbar: "toolbar", colorPresets: "colorPresets", disabled: "disabled", editor: "editor", customMenuRef: "customMenuRef" }, features: [i0.ɵɵProvidersFeature([MenuService])], decls: 3, vars: 5, consts: [[1, "NgxEditor__MenuBar", 3, "ngClass"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "toolbarItem", "class", 4, "ngIf"], [3, "class", 4, "ngIf"], ["type", "text_color", 3, "class", "presets", 4, "ngIf"], ["type", "background_color", 3, "class", "presets", 4, "ngIf"], [3, "toolbarItem"], [3, "class", "group", "items", 4, "ngFor", "ngForOf"], [3, "group", "items"], ["type", "text_color", 3, "presets"], ["type", "background_color", 3, "presets"], [3, "ngTemplateOutlet"]], template: function MenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, MenuComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
                i0.ɵɵtemplate(2, MenuComponent_ng_container_2_Template, 2, 1, "ng-container", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0$4, ctx.disabled));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.toolbar);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.customMenuRef);
            }
        }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, ToggleCommandComponent, LinkComponent, ImageComponent, DropdownComponent, ColorPickerComponent, i3.NgTemplateOutlet], pipes: [i3.KeyValuePipe], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-editor-menu',
                        templateUrl: './menu.component.html',
                        styleUrls: ['./menu.component.scss'],
                        providers: [MenuService]
                    }]
            }], function () { return [{ type: MenuService }]; }, { toolbar: [{
                    type: i0.Input
                }], colorPresets: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], editor: [{
                    type: i0.Input
                }], customMenuRef: [{
                    type: i0.Input
                }] });
    })();

    var _c0$5 = function (a0, a1) { return { "NgxBubbleMenu__Icon--Active": a0, "NgxEditor--Disabled": a1 }; };
    function BubbleComponent_ng_container_0_ng_container_1_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3);
            i0.ɵɵlistener("mousedown", function BubbleComponent_ng_container_0_ng_container_1_div_1_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r10_1); var item_r4 = i0.ɵɵnextContext().$implicit; var ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.onClick($event, item_r4); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelement(1, "svg", 4);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r4 = i0.ɵɵnextContext().$implicit;
            var ctx_r6 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(3, _c0$5, ctx_r6.activeItems.includes(item_r4), !ctx_r6.execulableItems.includes(item_r4)))("title", ctx_r6.getTitle(item_r4));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("innerHTML", ctx_r6.getIcon(item_r4), i0.ɵɵsanitizeHtml);
        }
    }
    function BubbleComponent_ng_container_0_ng_container_1_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 5);
        }
    }
    function BubbleComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BubbleComponent_ng_container_0_ng_container_1_div_1_Template, 2, 6, "div", 1);
            i0.ɵɵtemplate(2, BubbleComponent_ng_container_0_ng_container_1_div_2_Template, 1, 0, "div", 2);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r4 = ctx.$implicit;
            var lastItem_r5 = ctx.last;
            var lastToolbarItem_r2 = i0.ɵɵnextContext().last;
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r3.toggleCommands.includes(item_r4));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", lastItem_r5 && !lastToolbarItem_r2);
        }
    }
    function BubbleComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BubbleComponent_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 0);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var toolbarItem_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", toolbarItem_r1);
        }
    }
    var BubbleComponent = /** @class */ (function () {
        function BubbleComponent(sanitizeHTML, ngxeService) {
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
        Object.defineProperty(BubbleComponent.prototype, "view", {
            get: function () {
                return this.editor.view;
            },
            enumerable: false,
            configurable: true
        });
        BubbleComponent.prototype.getIcon = function (name) {
            var icon = Icon.getPath(name);
            return this.sanitizeHTML.transform(icon);
        };
        BubbleComponent.prototype.getTitle = function (name) {
            return this.ngxeService.locals.get(name);
        };
        BubbleComponent.prototype.onClick = function (e, commandName) {
            e.preventDefault();
            e.stopPropagation();
            if (e.button !== 0) {
                return;
            }
            var _a = this.view, state = _a.state, dispatch = _a.dispatch;
            var command = ToggleCommands[commandName];
            command.toggle()(state, dispatch);
        };
        BubbleComponent.prototype.update = function (view) {
            var _this = this;
            this.activeItems = [];
            this.execulableItems = [];
            var state = view.state;
            this.toggleCommands.forEach(function (toolbarItem) {
                var command = ToggleCommands[toolbarItem];
                var isActive = command.isActive(state);
                if (isActive) {
                    _this.activeItems.push(toolbarItem);
                }
                var canExecute = command.canExecute(state);
                if (canExecute) {
                    _this.execulableItems.push(toolbarItem);
                }
            });
        };
        BubbleComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.updateSubscription = this.editor.update
                .subscribe(function (view) {
                _this.update(view);
            });
        };
        BubbleComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
        };
        return BubbleComponent;
    }());
    BubbleComponent.ɵfac = function BubbleComponent_Factory(t) { return new (t || BubbleComponent)(i0.ɵɵdirectiveInject(SanitizeHtmlPipe), i0.ɵɵdirectiveInject(NgxEditorService)); };
    BubbleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BubbleComponent, selectors: [["ngx-bubble"]], inputs: { editor: "editor" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "NgxBubbleMenu__Icon", 3, "ngClass", "title", "mousedown", 4, "ngIf"], ["class", "NgxBubbleMenu__Seperator", 4, "ngIf"], [1, "NgxBubbleMenu__Icon", 3, "ngClass", "title", "mousedown"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "height", "20", "width", "20", 3, "innerHTML"], [1, "NgxBubbleMenu__Seperator"]], template: function BubbleComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BubbleComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx.toolbar);
            }
        }, directives: [i3.NgForOf, i3.NgIf, i3.NgClass], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}[_nghost-%COMP%]{display:flex;background-color:#000;color:#fff;padding:.3rem;border-radius:4px}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]{height:1.8rem;width:1.8rem;transition:.3s ease-in-out;border-radius:2px;display:flex;align-items:center;justify-content:center}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]:hover{background-color:#636262}.NgxBubbleMenu__Icon[_ngcontent-%COMP%] + .NgxBubbleMenu__Icon[_ngcontent-%COMP%]{margin-left:.3rem}.NgxBubbleMenu__Icon.NgxBubbleMenu__Icon--Active[_ngcontent-%COMP%]{background-color:#fff}.NgxBubbleMenu__Icon.NgxBubbleMenu__Icon--Active[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#000}.NgxBubbleMenu__Seperator[_ngcontent-%COMP%]{border-left:1px solid #fff;margin:0 5px}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BubbleComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-bubble',
                        templateUrl: './bubble.component.html',
                        styleUrls: ['./bubble.component.scss']
                    }]
            }], function () { return [{ type: SanitizeHtmlPipe }, { type: NgxEditorService }]; }, { editor: [{
                    type: i0.Input
                }] });
    })();

    function FloatingMenuComponent_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "ngx-bubble", 2);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("editor", ctx_r1.editor);
        }
    }
    var _c0$6 = ["*"];
    var FloatingMenuComponent = /** @class */ (function () {
        function FloatingMenuComponent(el, sanitizeHTML) {
            this.el = el;
            this.sanitizeHTML = sanitizeHTML;
            this.posLeft = 0;
            this.posTop = 0;
            this.showMenu = false;
            this.dragging = false;
            this.execulableItems = [];
            this.activeItems = [];
        }
        Object.defineProperty(FloatingMenuComponent.prototype, "display", {
            get: function () {
                return {
                    visibility: this.showMenu ? 'visible' : 'hidden',
                    opacity: this.showMenu ? '1' : '0',
                    top: this.posTop + 'px',
                    left: this.posLeft + 'px',
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FloatingMenuComponent.prototype, "view", {
            get: function () {
                return this.editor.view;
            },
            enumerable: false,
            configurable: true
        });
        FloatingMenuComponent.prototype.onMouseDown = function (e) {
            if (this.el.nativeElement.contains(e.target)) {
                e.preventDefault();
                return;
            }
            this.dragging = true;
        };
        FloatingMenuComponent.prototype.onKeyDown = function () {
            this.dragging = true;
            this.hide();
        };
        FloatingMenuComponent.prototype.onMouseUp = function () {
            this.dragging = false;
            this.useUpdate();
        };
        FloatingMenuComponent.prototype.onKeyUp = function () {
            this.dragging = false;
            this.useUpdate();
        };
        FloatingMenuComponent.prototype.useUpdate = function () {
            if (!this.view) {
                return;
            }
            this.update(this.view);
        };
        FloatingMenuComponent.prototype.getIcon = function (name) {
            var icon = Icon.getPath(name);
            return this.sanitizeHTML.transform(icon);
        };
        FloatingMenuComponent.prototype.hide = function () {
            this.showMenu = false;
        };
        FloatingMenuComponent.prototype.show = function () {
            this.showMenu = true;
        };
        FloatingMenuComponent.prototype.calculateBubblePosition = function (view) {
            var selection = view.state.selection;
            var from = selection.from;
            // the floating bubble itself
            var bubbleEl = this.el.nativeElement;
            var bubble = bubbleEl.getBoundingClientRect();
            // The box in which the tooltip is positioned, to use as base
            var box = bubbleEl.parentElement.getBoundingClientRect();
            var start = view.coordsAtPos(from);
            var left = start.left - box.left;
            var overflowsRight = (box.right < (start.left + bubble.width) ||
                bubble.right > box.right);
            if (overflowsRight) {
                left = box.width - bubble.width;
            }
            if (left < 0) {
                left = 0;
            }
            var bubbleHeight = bubble.height + parseInt(getComputedStyle(bubbleEl).marginBottom, 10);
            var top = (start.top - box.top) - bubbleHeight;
            return {
                left: left,
                top: top
            };
        };
        FloatingMenuComponent.prototype.update = function (view) {
            var state = view.state;
            var selection = state.selection;
            var empty = selection.empty;
            if (selection instanceof prosemirrorState.NodeSelection) {
                if (selection.node.type.name === 'image') {
                    this.hide();
                    return;
                }
            }
            var hasFocus = this.view.hasFocus();
            if (!hasFocus || empty || this.dragging) {
                this.hide();
                return;
            }
            var _a = this.calculateBubblePosition(this.view), top = _a.top, left = _a.left;
            this.posLeft = left;
            this.posTop = top;
            this.show();
        };
        FloatingMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.editor) {
                throw new Error('NgxEditor: Required editor instance');
            }
            this.updateSubscription = this.editor.update
                .subscribe(function (view) {
                _this.update(view);
            });
            this.resizeSubscription = rxjs.fromEvent(window, 'resize').pipe(operators.throttleTime(500, rxjs.asyncScheduler, { leading: true, trailing: true })).subscribe(function () {
                _this.useUpdate();
            });
        };
        FloatingMenuComponent.prototype.ngOnDestroy = function () {
            this.updateSubscription.unsubscribe();
            this.resizeSubscription.unsubscribe();
        };
        return FloatingMenuComponent;
    }());
    FloatingMenuComponent.ɵfac = function FloatingMenuComponent_Factory(t) { return new (t || FloatingMenuComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(SanitizeHtmlPipe)); };
    FloatingMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FloatingMenuComponent, selectors: [["ngx-editor-floating-menu"]], hostVars: 2, hostBindings: function FloatingMenuComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mousedown", function FloatingMenuComponent_mousedown_HostBindingHandler($event) { return ctx.onMouseDown($event); }, false, i0.ɵɵresolveDocument)("keydown", function FloatingMenuComponent_keydown_HostBindingHandler() { return ctx.onKeyDown(); }, false, i0.ɵɵresolveDocument)("mouseup", function FloatingMenuComponent_mouseup_HostBindingHandler() { return ctx.onMouseUp(); }, false, i0.ɵɵresolveDocument)("keyup", function FloatingMenuComponent_keyup_HostBindingHandler() { return ctx.onKeyUp(); }, false, i0.ɵɵresolveDocument);
            }
            if (rf & 2) {
                i0.ɵɵstyleMap(ctx.display);
            }
        }, inputs: { editor: "editor" }, ngContentSelectors: _c0$6, decls: 4, vars: 1, consts: [["ref", ""], [4, "ngIf"], [3, "editor"]], template: function FloatingMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", null, 0);
                i0.ɵɵprojection(2);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(3, FloatingMenuComponent_ng_container_3_Template, 2, 1, "ng-container", 1);
            }
            if (rf & 2) {
                var _r0 = i0.ɵɵreference(1);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngIf", _r0.children.length === 0);
            }
        }, directives: [i3.NgIf, BubbleComponent], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}[_nghost-%COMP%]{position:absolute;z-index:20;margin-bottom:.35rem;visibility:hidden;opacity:0}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FloatingMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-editor-floating-menu',
                        templateUrl: './floating-menu.component.html',
                        styleUrls: ['./floating-menu.component.scss']
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: SanitizeHtmlPipe }]; }, { display: [{
                    type: i0.HostBinding,
                    args: ['style']
                }], editor: [{
                    type: i0.Input
                }], onMouseDown: [{
                    type: i0.HostListener,
                    args: ['document:mousedown', ['$event']]
                }], onKeyDown: [{
                    type: i0.HostListener,
                    args: ['document:keydown']
                }], onMouseUp: [{
                    type: i0.HostListener,
                    args: ['document:mouseup']
                }], onKeyUp: [{
                    type: i0.HostListener,
                    args: ['document:keyup']
                }] });
    })();

    var MenuModule = /** @class */ (function () {
        function MenuModule() {
        }
        return MenuModule;
    }());
    MenuModule.ɵfac = function MenuModule_Factory(t) { return new (t || MenuModule)(); };
    MenuModule.ɵmod = i0.ɵɵdefineNgModule({ type: MenuModule });
    MenuModule.ɵinj = i0.ɵɵdefineInjector({ providers: [
            SanitizeHtmlPipe,
        ], imports: [[
                i3.CommonModule,
                i4.ReactiveFormsModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MenuModule, { declarations: [
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
            ], imports: [i3.CommonModule,
                i4.ReactiveFormsModule], exports: [MenuComponent,
                FloatingMenuComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3.CommonModule,
                            i4.ReactiveFormsModule
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
            }], null, null);
    })();

    var NGX_EDITOR_CONFIG_TOKEN = new i0.InjectionToken('NgxEditorConfig');
    var NgxEditorModule = /** @class */ (function () {
        function NgxEditorModule() {
        }
        NgxEditorModule.forRoot = function (config) {
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
        };
        NgxEditorModule.forChild = function (config) {
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
        };
        return NgxEditorModule;
    }());
    NgxEditorModule.ɵfac = function NgxEditorModule_Factory(t) { return new (t || NgxEditorModule)(); };
    NgxEditorModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxEditorModule });
    NgxEditorModule.ɵinj = i0.ɵɵdefineInjector({ providers: [], imports: [[
                i3.CommonModule,
                MenuModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxEditorModule, { declarations: [NgxEditorComponent,
                ImageViewComponent], imports: [i3.CommonModule,
                MenuModule], exports: [NgxEditorComponent,
                MenuComponent,
                FloatingMenuComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3.CommonModule,
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
            }], null, null);
    })();

    var isEmptyInputValue = function (value) {
        // we don't check for string here so it also works with arrays
        return value === null || value.length === 0;
    };
    var hasValidLength = function (value) {
        // non-strict comparison is intentional, to check for both `null` and `undefined` values
        return value != null && typeof value.length === 'number';
    };
    var isDocEmpty = function (doc) {
        if (!doc) {
            return true;
        }
        var childCount = doc.childCount, firstChild = doc.firstChild;
        return Boolean(childCount === 1 && (firstChild === null || firstChild === void 0 ? void 0 : firstChild.isTextblock) && firstChild.content.size === 0);
    };
    // @dynamic
    var Validators = /** @class */ (function () {
        function Validators() {
        }
        Validators.required = function (userSchema) {
            return function (control) {
                var schema$1 = userSchema || schema.schema;
                var doc = parseContent(control.value, schema$1);
                var isEmpty = isDocEmpty(doc);
                if (!isEmpty) {
                    return null;
                }
                return {
                    required: true
                };
            };
        };
        Validators.maxLength = function (maxLength, userSchema) {
            return function (control) {
                var schema$1 = userSchema || schema.schema;
                var doc = parseContent(control.value, schema$1);
                var value = doc.textContent;
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
        };
        Validators.minLength = function (minLength, userSchema) {
            return function (control) {
                var schema$1 = userSchema || schema.schema;
                var doc = parseContent(control.value, schema$1);
                var value = doc.textContent;
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
        };
        return Validators;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var execMark = function (name, toggle) {
        if (toggle === void 0) { toggle = false; }
        return function (state, dispatch) {
            var command = new Mark(name);
            if (!toggle) {
                return command.apply()(state, dispatch);
            }
            return command.toggle()(state, dispatch);
        };
    };
    var EditorCommands = /** @class */ (function () {
        function EditorCommands(view) {
            var _this = this;
            this.applyTrx = function (tr) {
                _this.state = _this.state.apply(tr !== null && tr !== void 0 ? tr : _this.tr);
                _this.tr = _this.state.tr;
                _this.tr.setMeta('APPLIED_TRX', true);
            };
            this.dispatch = function (tr) {
                _this.applyTrx(tr);
            };
            if (!view) {
                throw Error('NgxEditor: Required view to initialize commands.');
            }
            this.view = view;
            this.state = view.state;
            this.tr = this.view.state.tr;
        }
        EditorCommands.prototype.exec = function () {
            // No changes applied
            if (!this.tr.getMeta('APPLIED_TRX')) {
                return false;
            }
            var forceEmit = !this.view.state.doc.eq(this.state.doc);
            this.view.updateState(this.state);
            var tr = this.tr
                .setMeta('FORCE_EMIT', forceEmit);
            this.view.dispatch(tr);
            return true;
        };
        EditorCommands.prototype.focus = function () {
            this.view.focus();
            return this;
        };
        EditorCommands.prototype.scrollIntoView = function () {
            this.tr.scrollIntoView();
            this.applyTrx();
            return this;
        };
        EditorCommands.prototype.insertText = function (text) {
            this.tr.insertText(text);
            this.applyTrx();
            return this;
        };
        EditorCommands.prototype.insertNewLine = function () {
            var newLineCommands = [prosemirrorCommands.newlineInCode, prosemirrorCommands.createParagraphNear, prosemirrorCommands.liftEmptyBlock, prosemirrorCommands.splitBlock];
            prosemirrorCommands.chainCommands.apply(void 0, __spread(newLineCommands))(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.applyMark = function (name) {
            execMark(name, false)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleMark = function (name) {
            execMark(name, true)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.bold = function () {
            execMark('strong')(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleBold = function () {
            execMark('strong', true)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.italics = function () {
            execMark('em')(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleItalics = function () {
            execMark('em', true)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.underline = function () {
            execMark('u')(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleUnderline = function () {
            execMark('u', true)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.strike = function () {
            execMark('s')(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleStrike = function () {
            execMark('s', true)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.code = function () {
            execMark('code')(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleCode = function () {
            execMark('code', true)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleOrderedList = function () {
            var command = new ListItem(false);
            command.toggle()(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleBulletList = function () {
            var command = new ListItem(true);
            command.toggle()(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.toggleHeading = function (level) {
            var command = new Heading(level);
            command.toggle()(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.insertLink = function (text, attrs) {
            var command = new Link();
            command.insert(text, attrs)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.updateLink = function (attrs) {
            var command = new Link();
            command.update(attrs)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.insertImage = function (src, attrs) {
            if (attrs === void 0) { attrs = {}; }
            var command = new Image();
            command.insert(src, attrs)(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.textColor = function (color) {
            var command = new TextColor('text_color');
            command.apply({ color: color })(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.backgroundColor = function (color) {
            var command = new TextColor('text_background_color');
            command.apply({ backgroundColor: color })(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.removeTextColor = function () {
            var command = new TextColor('text_color');
            command.remove()(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.removeBackgroundColor = function () {
            var command = new TextColor('text_background_color');
            command.remove()(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.align = function (p) {
            var command = new TextAlign(p);
            command.toggle()(this.state, this.dispatch);
            return this;
        };
        EditorCommands.prototype.insertHTML = function (html) {
            var _a = this.state, selection = _a.selection, schema = _a.schema, tr = _a.tr;
            var from = selection.from, to = selection.to;
            var element = document.createElement('div');
            element.innerHTML = html.trim();
            var slice = prosemirrorModel.DOMParser.fromSchema(schema).parseSlice(element);
            var transaction = tr.replaceRange(from, to, slice);
            this.applyTrx(transaction);
            return this;
        };
        return EditorCommands;
    }());

    var isMacOs = /Mac/.test(navigator.platform);
    // Input rules ref: https://github.com/ProseMirror/prosemirror-example-setup/
    // : (NodeType) → InputRule
    // Given a blockquote node type, returns an input rule that turns `"> "`
    // at the start of a textblock into a blockquote.
    var blockQuoteRule = function (nodeType) {
        return prosemirrorInputrules.wrappingInputRule(/^\s*>\s$/, nodeType);
    };
    // : (NodeType) → InputRule
    // Given a list node type, returns an input rule that turns a number
    // followed by a dot at the start of a textblock into an ordered list.
    var orderedListRule = function (nodeType) {
        return prosemirrorInputrules.wrappingInputRule(/^(\d+)\.\s$/, nodeType, function (match) { return ({ order: +match[1] }); }, function (match, node) { return node.childCount + node.attrs.order === +match[1]; });
    };
    // : (NodeType) → InputRule
    // Given a list node type, returns an input rule that turns a bullet
    // (dash, plush, or asterisk) at the start of a textblock into a
    // bullet list.
    var bulletListRule = function (nodeType) {
        return prosemirrorInputrules.wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
    };
    // : (NodeType) → InputRule
    // Given a code block node type, returns an input rule that turns a
    // textblock starting with three backticks into a code block.
    var codeBlockRule = function (nodeType) {
        return prosemirrorInputrules.textblockTypeInputRule(/^```$/, nodeType);
    };
    // : (NodeType, number) → InputRule
    // Given a node type and a maximum level, creates an input rule that
    // turns up to that number of `#` characters followed by a space at
    // the start of a textblock into a heading whose level corresponds to
    // the number of `#` signs.
    var headingRule = function (nodeType, maxLevel) {
        return prosemirrorInputrules.textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, function (match) { return ({ level: match[1].length }); });
    };
    // : (Schema) → Plugin
    // A set of input rules for creating the basic block quotes, lists,
    // code blocks, and heading.
    var buildInputRules = function (schema) {
        var rules = prosemirrorInputrules.smartQuotes.concat(prosemirrorInputrules.ellipsis, prosemirrorInputrules.emDash);
        rules.push(blockQuoteRule(schema.nodes.blockquote));
        rules.push(orderedListRule(schema.nodes.ordered_list));
        rules.push(bulletListRule(schema.nodes.bullet_list));
        rules.push(codeBlockRule(schema.nodes.code_block));
        rules.push(headingRule(schema.nodes.heading, 6));
        return prosemirrorInputrules.inputRules({ rules: rules });
    };
    var getKeyboardShortcuts = function (schema, options) {
        var historyKeyMap = {};
        historyKeyMap['Mod-z'] = prosemirrorHistory.undo;
        if (isMacOs) {
            historyKeyMap['Shift-Mod-z'] = prosemirrorHistory.redo;
        }
        else {
            historyKeyMap['Mod-y'] = prosemirrorHistory.redo;
        }
        var plugins = [
            prosemirrorKeymap.keymap({
                'Mod-b': prosemirrorCommands.toggleMark(schema.marks.strong),
                'Mod-i': prosemirrorCommands.toggleMark(schema.marks.em),
                'Mod-`': prosemirrorCommands.toggleMark(schema.marks.code),
            }),
            prosemirrorKeymap.keymap({
                Enter: prosemirrorSchemaList.splitListItem(schema.nodes.list_item),
                'Shift-Enter': prosemirrorCommands.chainCommands(prosemirrorCommands.exitCode, function (state, dispatch) {
                    var tr = state.tr;
                    var br = schema.nodes.hard_break;
                    dispatch(tr.replaceSelectionWith(br.create()).scrollIntoView());
                    return true;
                }),
                'Mod-[': prosemirrorSchemaList.liftListItem(schema.nodes.list_item),
                'Mod-]': prosemirrorSchemaList.sinkListItem(schema.nodes.list_item),
                Tab: prosemirrorSchemaList.sinkListItem(schema.nodes.list_item)
            }),
            prosemirrorKeymap.keymap(prosemirrorCommands.baseKeymap)
        ];
        if (options.history) {
            plugins.push(prosemirrorKeymap.keymap(historyKeyMap));
        }
        return plugins;
    };
    var getDefaultPlugins = function (schema, options) {
        var plugins = [];
        if (options.keyboardShortcuts) {
            plugins.push.apply(plugins, __spread(getKeyboardShortcuts(schema, { history: options.history })));
        }
        if (options.history) {
            plugins.push(prosemirrorHistory.history());
        }
        if (options.inputRules) {
            plugins.push(buildInputRules(schema));
        }
        return plugins;
    };

    var DEFAULT_OPTIONS = {
        content: null,
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
        schema: schema.schema,
        plugins: [],
        nodeViews: {}
    };
    var Editor = /** @class */ (function () {
        function Editor(options) {
            if (options === void 0) { options = DEFAULT_OPTIONS; }
            this.valueChangesSubject = new rxjs.Subject();
            this.updateSubject = new rxjs.Subject();
            this.options = Object.assign({}, DEFAULT_OPTIONS, options);
            this.createEditor();
        }
        Object.defineProperty(Editor.prototype, "valueChanges", {
            get: function () {
                return this.valueChangesSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Editor.prototype, "update", {
            get: function () {
                return this.updateSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Editor.prototype, "schema", {
            get: function () {
                return this.options.schema || schema.schema;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Editor.prototype, "commands", {
            get: function () {
                return new EditorCommands(this.view);
            },
            enumerable: false,
            configurable: true
        });
        Editor.prototype.setContent = function (content) {
            if (utils.isNil(content)) {
                return;
            }
            var state = this.view.state;
            var tr = state.tr, doc = state.doc;
            var newDoc = parseContent(content, this.schema);
            tr.replaceWith(0, state.doc.content.size, newDoc);
            // don't emit if both content is same
            if (doc.eq(tr.doc)) {
                return;
            }
            if (!tr.docChanged) {
                return;
            }
            this.view.dispatch(tr);
        };
        Editor.prototype.handleTransactions = function (tr) {
            var state = this.view.state.apply(tr);
            this.view.updateState(state);
            this.updateSubject.next(this.view);
            if (!tr.docChanged && !tr.getMeta('FORCE_EMIT')) {
                return;
            }
            var json = state.doc.toJSON();
            this.valueChangesSubject.next(json);
        };
        Editor.prototype.createEditor = function () {
            var _a;
            var options = this.options;
            var _b = options.content, content = _b === void 0 ? null : _b, nodeViews = options.nodeViews;
            var _c = options.history, history = _c === void 0 ? true : _c, _d = options.keyboardShortcuts, keyboardShortcuts = _d === void 0 ? true : _d, _e = options.inputRules, inputRules = _e === void 0 ? true : _e;
            var schema = this.schema;
            var doc = parseContent(content, schema);
            var plugins = (_a = options.plugins) !== null && _a !== void 0 ? _a : [];
            var defaultPlugins = getDefaultPlugins(schema, {
                history: history,
                keyboardShortcuts: keyboardShortcuts,
                inputRules: inputRules
            });
            this.view = new prosemirrorView.EditorView(null, {
                state: prosemirrorState.EditorState.create({
                    doc: doc,
                    schema: schema,
                    plugins: __spread(defaultPlugins, plugins),
                }),
                nodeViews: nodeViews,
                dispatchTransaction: this.handleTransactions.bind(this)
            });
        };
        Editor.prototype.registerPlugin = function (plugin) {
            var state = this.view.state;
            var plugins = __spread(state.plugins, [plugin]);
            var newState = state.reconfigure({ plugins: plugins });
            this.view.updateState(newState);
        };
        Editor.prototype.destroy = function () {
            this.view.destroy();
        };
        return Editor;
    }());

    /**
     * Generated bundle index. Do not edit.
     */

    Object.defineProperty(exports, 'marks', {
        enumerable: true,
        get: function () {
            return schema.marks;
        }
    });
    Object.defineProperty(exports, 'nodes', {
        enumerable: true,
        get: function () {
            return schema.nodes;
        }
    });
    Object.defineProperty(exports, 'schema', {
        enumerable: true,
        get: function () {
            return schema.schema;
        }
    });
    exports.Editor = Editor;
    exports.FloatingMenuComponent = FloatingMenuComponent;
    exports.MenuComponent = MenuComponent;
    exports.NgxEditorComponent = NgxEditorComponent;
    exports.NgxEditorModule = NgxEditorModule;
    exports.Validators = Validators;
    exports.emptyDoc = emptyDoc;
    exports.parseContent = parseContent;
    exports.toDoc = toDoc;
    exports.toHTML = toHTML;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-editor.umd.js.map
