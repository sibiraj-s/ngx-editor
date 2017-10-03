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
            })
        }
    }
    else {
        return false;
    }
}

export function isToolbarDefault(toolbar) {

    if (toolbar) {
        return toolbar.find(array => {
            return array.includes('default');
        })
    }
    else {
        return false;
    }
}

/*
 * return values for attributes that accepts boolean
 */
export function getBooleanProperty(value, config) {
    if (this[value] === false) {
        return false;
    }
    else if (this[value] === undefined) {
        return config[value];
    }
    else {
        return true;
    }
}
