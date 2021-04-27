import { parseContent } from './parsers';
import defaultSchema from './schema';
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
export class Validators {
    static required(userSchema) {
        return (control) => {
            const schema = userSchema || defaultSchema;
            const doc = parseContent(control.value, schema);
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
            const schema = userSchema || defaultSchema;
            const doc = parseContent(control.value, schema);
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
            const schema = userSchema || defaultSchema;
            const doc = parseContent(control.value, schema);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25neC1lZGl0b3Ivc3JjL2xpYi92YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDekMsT0FBTyxhQUFhLE1BQU0sVUFBVSxDQUFDO0FBSXJDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFVLEVBQVcsRUFBRTtJQUNoRCw4REFBOEQ7SUFDOUQsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQztBQUVGLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBVSxFQUFXLEVBQUU7SUFDN0Msd0ZBQXdGO0lBQ3hGLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQzNELENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBMkIsRUFBVyxFQUFFO0lBQzFELElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDUixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDdkMsT0FBTyxPQUFPLENBQUMsVUFBVSxLQUFLLENBQUMsS0FBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFBLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDL0YsQ0FBQyxDQUFDO0FBRUYsV0FBVztBQUNYLE1BQU0sT0FBTyxVQUFVO0lBRXJCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBbUI7UUFDakMsT0FBTyxDQUFDLE9BQXdCLEVBQTJCLEVBQUU7WUFFM0QsTUFBTSxNQUFNLEdBQUcsVUFBVSxJQUFJLGFBQWEsQ0FBQztZQUMzQyxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVoRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFpQixFQUFFLFVBQW1CO1FBQ3JELE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBQzNELE1BQU0sTUFBTSxHQUFHLFVBQVUsSUFBSSxhQUFhLENBQUM7WUFDM0MsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUU5QixJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsRUFBRTtnQkFDckQsT0FBTztvQkFDTCxTQUFTLEVBQUU7d0JBQ1QsY0FBYyxFQUFFLFNBQVM7d0JBQ3pCLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDM0I7aUJBQ0YsQ0FBQzthQUNIO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFpQixFQUFFLFVBQW1CO1FBQ3JELE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBRTNELE1BQU0sTUFBTSxHQUFHLFVBQVUsSUFBSSxhQUFhLENBQUM7WUFDM0MsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUU5QixJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0RCx5REFBeUQ7Z0JBQ3pELGtEQUFrRDtnQkFDbEQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7Z0JBQzVCLE9BQU87b0JBQ0wsU0FBUyxFQUFFO3dCQUNULGNBQWMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxNQUFNO3FCQUN0RDtpQkFDRixDQUFDO2FBQ0g7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTY2hlbWEsIE5vZGUgYXMgUHJvc2VNaXJyb3JOb2RlIH0gZnJvbSAncHJvc2VtaXJyb3ItbW9kZWwnO1xuXG5pbXBvcnQgeyBwYXJzZUNvbnRlbnQgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IGRlZmF1bHRTY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG50eXBlIFZhbGlkYXRpb25FcnJvcnMgPSBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG5jb25zdCBpc0VtcHR5SW5wdXRWYWx1ZSA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XG4gIC8vIHdlIGRvbid0IGNoZWNrIGZvciBzdHJpbmcgaGVyZSBzbyBpdCBhbHNvIHdvcmtzIHdpdGggYXJyYXlzXG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDA7XG59O1xuXG5jb25zdCBoYXNWYWxpZExlbmd0aCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XG4gIC8vIG5vbi1zdHJpY3QgY29tcGFyaXNvbiBpcyBpbnRlbnRpb25hbCwgdG8gY2hlY2sgZm9yIGJvdGggYG51bGxgIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXNcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcic7XG59O1xuXG5jb25zdCBpc0RvY0VtcHR5ID0gKGRvYzogUHJvc2VNaXJyb3JOb2RlIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWRvYykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgeyBjaGlsZENvdW50LCBmaXJzdENoaWxkIH0gPSBkb2M7XG4gIHJldHVybiBCb29sZWFuKGNoaWxkQ291bnQgPT09IDEgJiYgZmlyc3RDaGlsZD8uaXNUZXh0YmxvY2sgJiYgZmlyc3RDaGlsZC5jb250ZW50LnNpemUgPT09IDApO1xufTtcblxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JzIHtcblxuICBzdGF0aWMgcmVxdWlyZWQodXNlclNjaGVtYT86IFNjaGVtYSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcblxuICAgICAgY29uc3Qgc2NoZW1hID0gdXNlclNjaGVtYSB8fCBkZWZhdWx0U2NoZW1hO1xuICAgICAgY29uc3QgZG9jID0gcGFyc2VDb250ZW50KGNvbnRyb2wudmFsdWUsIHNjaGVtYSk7XG5cbiAgICAgIGNvbnN0IGlzRW1wdHkgPSBpc0RvY0VtcHR5KGRvYyk7XG5cbiAgICAgIGlmICghaXNFbXB0eSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBtYXhMZW5ndGgobWF4TGVuZ3RoOiBudW1iZXIsIHVzZXJTY2hlbWE/OiBTY2hlbWEpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBzY2hlbWEgPSB1c2VyU2NoZW1hIHx8IGRlZmF1bHRTY2hlbWE7XG4gICAgICBjb25zdCBkb2MgPSBwYXJzZUNvbnRlbnQoY29udHJvbC52YWx1ZSwgc2NoZW1hKTtcblxuICAgICAgY29uc3QgdmFsdWUgPSBkb2MudGV4dENvbnRlbnQ7XG5cbiAgICAgIGlmIChoYXNWYWxpZExlbmd0aCh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbWF4bGVuZ3RoOiB7XG4gICAgICAgICAgICByZXF1aXJlZExlbmd0aDogbWF4TGVuZ3RoLFxuICAgICAgICAgICAgYWN0dWFsTGVuZ3RoOiB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgbWluTGVuZ3RoKG1pbkxlbmd0aDogbnVtYmVyLCB1c2VyU2NoZW1hPzogU2NoZW1hKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuXG4gICAgICBjb25zdCBzY2hlbWEgPSB1c2VyU2NoZW1hIHx8IGRlZmF1bHRTY2hlbWE7XG4gICAgICBjb25zdCBkb2MgPSBwYXJzZUNvbnRlbnQoY29udHJvbC52YWx1ZSwgc2NoZW1hKTtcblxuICAgICAgY29uc3QgdmFsdWUgPSBkb2MudGV4dENvbnRlbnQ7XG5cbiAgICAgIGlmIChpc0VtcHR5SW5wdXRWYWx1ZSh2YWx1ZSkgfHwgIWhhc1ZhbGlkTGVuZ3RoKHZhbHVlKSkge1xuICAgICAgICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgICAgLy8gZG9uJ3QgdmFsaWRhdGUgdmFsdWVzIHdpdGhvdXQgYGxlbmd0aGAgcHJvcGVydHlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPCBtaW5MZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtaW5sZW5ndGg6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkTGVuZ3RoOiBtaW5MZW5ndGgsIGFjdHVhbExlbmd0aDogdmFsdWUubGVuZ3RoXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG59XG4iXX0=