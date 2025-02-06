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

/* Shapes Toolbar sub-item list */
const SHAPES_TOOLBAR_ITEM_TYPE = {
    STBI_LINE:              1,
    STBI_CIRCLE:            2,
    STBI_RECT:              3,
    STBI_FILLETED_RECT:     4,
    STBI_TRIANGLE:          5,
    STBI_RIGHT_TRIANGLE:    6,
    STBI_DIAMOND:           7,
    STBI_PENTAGON:          8,
    STBI_HEXAGON:           9,
    STBI_RIGHT_ARROW:       10,
    STBI_LEFT_ARROW:        11,
    STBI_TOP_ARROW:         12,
    STBI_DOWN_ARROW:        13,
    STBI_FOUR_POINT_STAR:   14,
    STBI_FIVE_POINT_STAR:   15,
    STBI_SIX_POINT_STAR:    16,
};

/* Color Theme */
let COLOR_THEMES = {white: '#ffffff', white_compliment: '#000000', black:'#000000', black_compliment: '#ffffff', blue_1: '#1976d2'};
let SELECTED_COLOR_THEME = COLOR_THEMES.white;

export { SPRINT_PLANNING, URL_MAIN, TOOLBAR_ITEMS, TOOLBAR_ITEM_TYPE, SHAPES_TOOLBAR_ITEM_TYPE, COLOR_THEMES, SELECTED_COLOR_THEME };

