const isNil = (val) => {
    return typeof val === 'undefined' || val === null;
};

const camelToDashed = (str) => {
    return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
};
const cleanObject = (obj) => {
    const cleanObj = {};
    Object.keys(obj).forEach((prop) => {
        if (obj[prop]) {
            cleanObj[prop] = obj[prop];
        }
    });
    return cleanObj;
};
const toStyleString = (obj) => {
    const styles = cleanObject(obj);
    return Object.entries(styles).map(([k, v]) => `${camelToDashed(k)}:${v}`).join(';');
};

/**
 * Generated bundle index. Do not edit.
 */

export { isNil, toStyleString };
//# sourceMappingURL=ngx-editor-utils.js.map
