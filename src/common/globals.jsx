const URL_MAIN = "http://localhost:5173/";

/* Template codes */
const SPRINT_PLANNING = 1;

/* Toolbar item indices */
const TOOLBAR_ITEMS = {
    TBI_CURSOR:             1,
    TBI_STKNOTE:            2,
    TBI_COMMENT:            3,
    TBI_MARKER:             4,
    TBI_SHAPE:              5,
    TBI_FILL:               6,
    TBI_ERASER:             7
};

/* Toolbar item type */
const TOOLBAR_ITEM_TYPE = {
    DRAGGABLE: 0,
    CLICKABLE: 1,
    DRAGGABLE_CLICKABLE: 2
};

/* Color Theme */
let COLOR_THEMES = {white: '#ffffff', white_compliment: '#000000', black:'#000000', black_compliment: '#ffffff', blue_1: '#1976d2'};
let SELECTED_COLOR_THEME = COLOR_THEMES.white;

export { SPRINT_PLANNING, URL_MAIN, TOOLBAR_ITEMS, TOOLBAR_ITEM_TYPE, COLOR_THEMES, SELECTED_COLOR_THEME };

