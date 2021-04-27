import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
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
export default placeholderPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvcGx1Z2lucy9wbGFjZWhvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFlLFNBQVMsRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHN0QsTUFBTSxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQztBQUV2RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBYSxFQUFVLEVBQUU7SUFDbEQsT0FBTyxJQUFJLE1BQU0sQ0FBQztRQUNoQixHQUFHLEVBQUUsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ2pDLEtBQUssRUFBRTtZQUNMLElBQUk7Z0JBQ0YsT0FBTyxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUNELEtBQUssQ0FBQyxFQUFlLEVBQUUsV0FBbUI7O2dCQUN4QyxNQUFNLFdBQVcsU0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLG1DQUFJLFdBQVcsQ0FBQztnQkFDcEUsT0FBTyxXQUFXLENBQUM7WUFDckIsQ0FBQztTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsV0FBVyxDQUFDLEtBQWtCO2dCQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFFeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFekMsSUFBSSxDQUFDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO29CQUNsQyxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUM7aUJBQzVCO2dCQUVELE1BQU0sV0FBVyxHQUFpQixFQUFFLENBQUM7Z0JBRXJDLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBcUIsRUFBRSxHQUFXLEVBQUUsRUFBRTs7b0JBQ3RELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQzFFLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDbEUsS0FBSyxFQUFFLHFCQUFxQjs0QkFDNUIsa0JBQWtCLEVBQUUsV0FBVzs0QkFDL0IsWUFBWSxRQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxtQ0FBSSxJQUFJO3lCQUN2QyxDQUFDLENBQUM7d0JBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDbkM7b0JBRUQsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDO2dCQUVGLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDaEQsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsZUFBZSxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsdWdpbiwgRWRpdG9yU3RhdGUsIFBsdWdpbktleSwgVHJhbnNhY3Rpb24gfSBmcm9tICdwcm9zZW1pcnJvci1zdGF0ZSc7XG5pbXBvcnQgeyBEZWNvcmF0aW9uU2V0LCBEZWNvcmF0aW9uIH0gZnJvbSAncHJvc2VtaXJyb3Itdmlldyc7XG5pbXBvcnQgeyBOb2RlIGFzIFByb3NlTWlycm9yTm9kZSB9IGZyb20gJ3Byb3NlbWlycm9yLW1vZGVsJztcblxuY29uc3QgUExBQ0VIT0xERVJfQ0xBU1NOQU1FID0gJ05neEVkaXRvcl9fUGxhY2Vob2xkZXInO1xuXG5jb25zdCBwbGFjZWhvbGRlclBsdWdpbiA9ICh0ZXh0Pzogc3RyaW5nKTogUGx1Z2luID0+IHtcbiAgcmV0dXJuIG5ldyBQbHVnaW4oe1xuICAgIGtleTogbmV3IFBsdWdpbktleSgncGxhY2Vob2xkZXInKSxcbiAgICBzdGF0ZToge1xuICAgICAgaW5pdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGV4dCA/PyAnJztcbiAgICAgIH0sXG4gICAgICBhcHBseSh0cjogVHJhbnNhY3Rpb24sIHByZXZpb3VzVmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRyLmdldE1ldGEoJ1VQREFURV9QTEFDRUhPTERFUicpID8/IHByZXZpb3VzVmFsO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wczoge1xuICAgICAgZGVjb3JhdGlvbnMoc3RhdGU6IEVkaXRvclN0YXRlKTogRGVjb3JhdGlvblNldCB7XG4gICAgICAgIGNvbnN0IHsgZG9jIH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgeyB0ZXh0Q29udGVudCwgY2hpbGRDb3VudCB9ID0gZG9jO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5nZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgaWYgKCFwbGFjZWhvbGRlciB8fCBjaGlsZENvdW50ID4gMSkge1xuICAgICAgICAgIHJldHVybiBEZWNvcmF0aW9uU2V0LmVtcHR5O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjb3JhdGlvbnM6IERlY29yYXRpb25bXSA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGRlY29yYXRlID0gKG5vZGU6IFByb3NlTWlycm9yTm9kZSwgcG9zOiBudW1iZXIpID0+IHtcbiAgICAgICAgICBpZiAobm9kZS50eXBlLmlzQmxvY2sgJiYgbm9kZS5jaGlsZENvdW50ID09PSAwICYmIHRleHRDb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJOb2RlID0gRGVjb3JhdGlvbi5ub2RlKHBvcywgKHBvcyArIG5vZGUubm9kZVNpemUpLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiBQTEFDRUhPTERFUl9DTEFTU05BTUUsXG4gICAgICAgICAgICAgICdkYXRhLXBsYWNlaG9sZGVyJzogcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICdkYXRhLWFsaWduJzogbm9kZS5hdHRycy5hbGlnbiA/PyBudWxsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVjb3JhdGlvbnMucHVzaChwbGFjZWhvbGRlck5vZGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBkb2MuZGVzY2VuZGFudHMoZGVjb3JhdGUpO1xuICAgICAgICByZXR1cm4gRGVjb3JhdGlvblNldC5jcmVhdGUoZG9jLCBkZWNvcmF0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlaG9sZGVyUGx1Z2luO1xuIl19