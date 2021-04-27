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
export default Locals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL0xvY2Fscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBMkI7SUFDdkMsT0FBTztJQUNQLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsV0FBVztJQUN0QixNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUUsWUFBWTtJQUN4QixXQUFXLEVBQUUsYUFBYTtJQUMxQixZQUFZLEVBQUUsY0FBYztJQUM1QixPQUFPLEVBQUUsU0FBUztJQUNsQixFQUFFLEVBQUUsVUFBVTtJQUNkLEVBQUUsRUFBRSxVQUFVO0lBQ2QsRUFBRSxFQUFFLFVBQVU7SUFDZCxFQUFFLEVBQUUsVUFBVTtJQUNkLEVBQUUsRUFBRSxVQUFVO0lBQ2QsRUFBRSxFQUFFLFVBQVU7SUFDZCxVQUFVLEVBQUUsWUFBWTtJQUN4QixZQUFZLEVBQUUsY0FBYztJQUM1QixXQUFXLEVBQUUsYUFBYTtJQUMxQixhQUFhLEVBQUUsU0FBUztJQUN4QixVQUFVLEVBQUUsWUFBWTtJQUN4QixnQkFBZ0IsRUFBRSxrQkFBa0I7SUFFcEMsMkJBQTJCO0lBQzNCLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLE1BQU07SUFDWixZQUFZLEVBQUUsaUJBQWlCO0lBQy9CLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxVQUFVO0lBQ25CLEtBQUssRUFBRSxPQUFPO0lBQ2QsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQztBQUlGLE1BQU0sTUFBTTtJQUdWLFlBQVksWUFBaUQsRUFBRTtRQUYvRCxXQUFNLEdBQUcsUUFBUSxDQUFDO1FBTWxCLFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFOztZQUNwQixhQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFMQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBS0Y7QUFFRCxlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRlZmF1bHRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAvLyBtZW51XG4gIGJvbGQ6ICdCb2xkJyxcbiAgaXRhbGljOiAnSXRhbGljJyxcbiAgY29kZTogJ0NvZGUnLFxuICB1bmRlcmxpbmU6ICdVbmRlcmxpbmUnLFxuICBzdHJpa2U6ICdTdHJpa2UnLFxuICBibG9ja3F1b3RlOiAnQmxvY2txdW90ZScsXG4gIGJ1bGxldF9saXN0OiAnQnVsbGV0IExpc3QnLFxuICBvcmRlcmVkX2xpc3Q6ICdPcmRlcmVkIExpc3QnLFxuICBoZWFkaW5nOiAnSGVhZGluZycsXG4gIGgxOiAnSGVhZGVyIDEnLFxuICBoMjogJ0hlYWRlciAyJyxcbiAgaDM6ICdIZWFkZXIgMycsXG4gIGg0OiAnSGVhZGVyIDQnLFxuICBoNTogJ0hlYWRlciA1JyxcbiAgaDY6ICdIZWFkZXIgNicsXG4gIGFsaWduX2xlZnQ6ICdMZWZ0IEFsaWduJyxcbiAgYWxpZ25fY2VudGVyOiAnQ2VudGVyIEFsaWduJyxcbiAgYWxpZ25fcmlnaHQ6ICdSaWdodCBBbGlnbicsXG4gIGFsaWduX2p1c3RpZnk6ICdKdXN0aWZ5JyxcbiAgdGV4dF9jb2xvcjogJ1RleHQgQ29sb3InLFxuICBiYWNrZ3JvdW5kX2NvbG9yOiAnQmFja2dyb3VuZCBDb2xvcicsXG5cbiAgLy8gcHVwdXBzLCBmb3Jtcywgb3RoZXJzLi4uXG4gIHVybDogJ1VSTCcsXG4gIHRleHQ6ICdUZXh0JyxcbiAgb3BlbkluTmV3VGFiOiAnT3BlbiBpbiBuZXcgdGFiJyxcbiAgaW5zZXJ0OiAnSW5zZXJ0JyxcbiAgYWx0VGV4dDogJ0FsdCBUZXh0JyxcbiAgdGl0bGU6ICdUaXRsZScsXG4gIHJlbW92ZTogJ1JlbW92ZScsXG59O1xuXG5leHBvcnQgdHlwZSBMb2NhbHNLZXlzID0ga2V5b2YgdHlwZW9mIGRlZmF1bHRzO1xuXG5jbGFzcyBMb2NhbHMge1xuICBsb2NhbHMgPSBkZWZhdWx0cztcblxuICBjb25zdHJ1Y3RvcihuZXdMb2NhbHM6IFBhcnRpYWw8UmVjb3JkPExvY2Fsc0tleXMsIHN0cmluZz4+ID0ge30pIHtcbiAgICB0aGlzLmxvY2FscyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBuZXdMb2NhbHMpO1xuICB9XG5cbiAgZ2V0ID0gKGtleTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxzW2tleV0gPz8gJyc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxzO1xuIl19