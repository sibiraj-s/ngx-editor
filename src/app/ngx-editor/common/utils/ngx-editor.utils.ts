// enable or disable toolbar based on configuration
export function canEnableToolbarOptions(value: string, toolbar: any): boolean {

    if (value) {
        if (toolbar['length'] === 0) {
            return true;
        } else {
            return toolbar.find(array => {
                return array.includes(value);
            });
        }
    } else {
        return false;
    }
}

// set editor configuration
export function getEditorConfiguration(value, ngxEditorConfig): any {

    for (const i in ngxEditorConfig) {
        if (i) {
            if (this[i]) {
                value[i] = this[i];
            }
            if (!value.hasOwnProperty(i)) {
                value[i] = ngxEditorConfig[i];
            }
        }
    }
    return value;
}

// return vertical if the element is the resizer property is set to basic
export function canResize(resizer: string) {
    if (resizer === 'basic') {
        return 'vertical';
    }
    return false;
}
