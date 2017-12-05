// enable or disable toolbar based on configuration
export function canEnableToolbarOptions(value: string, toolbar: any): boolean {

    if (value) {

        if (toolbar['length'] === 0) {
            return true;
        } else {

            const found = toolbar.filter(array => {
                return array.indexOf(value) !== -1;
            });

            return found.length ? true : false;
        }
    } else {
        return false;
    }
}

// set editor configuration
export function getEditorConfiguration(value, ngxEditorConfig, input): any {

    for (const i in ngxEditorConfig) {
        if (i) {
            if (input[i]) {
                value[i] = input[i];
            }
            if (!value.hasOwnProperty(i)) {
                value[i] = ngxEditorConfig[i];
            }
        }
    }
    return value;
}

// return vertical if the element is the resizer property is set to basic
export function canResize(resizer: string): any {
    if (resizer === 'basic') {
        return 'vertical';
    }
    return false;
}
