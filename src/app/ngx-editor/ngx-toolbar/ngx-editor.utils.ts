/*
 * enable or diable toolbar based on configuration
 */
export function canEnableToolbarOptions(value, toolbar) {

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

