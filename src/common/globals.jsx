const URL_MAIN = "http://localhost:5173/";

/* TaskBoard codes begin */
const TASKBOARD_DEFAULT = 1;
/* TaskBoard codes end */

/* Template codes begin */
const SPRINT_PLANNING = 1;
/* Template codes end */

/* Toolbar item indices begin */
const TOOLBAR_ITEMS = {
    TBI_CURSOR:             1,
    TBI_STKNOTE:            2,
    TBI_COMMENT:            3,
    TBI_MARKER:             4,
    TBI_SHAPE:              5,
    TBI_FILL:               6,
    TBI_ERASER:             7
};
/* Toolbar item indices end */

/* Toolbar item types begin */
const TOOLBAR_ITEM_TYPE = {
    DRAGGABLE: 0,
    CLICKABLE: 1,
    DRAGGABLE_CLICKABLE: 2
};
/* Toolbar item types end */

/* Shapes Toolbar sub-item list begin */
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
    STBI_ARROW:             10,
    STBI_FOUR_POINT_STAR:   11,
    STBI_FIVE_POINT_STAR:   12,
    STBI_SIX_POINT_STAR:    13,
};
/* Shapes Toolbar sub-item list end */

/*********** ZINDEX block begins ***************/
const ZINDEX = 
{
    CURRENT_HIGHEST: 1000,
    LOWEST: 0
}

const _get_max_z_index = () => {
    return ZINDEX.CURRENT_HIGHEST;
};

const _get_lowest_z_index = () => {
    return ZINDEX.LOWEST;
};

const _use_max_z_index = () => {
    ZINDEX.CURRENT_HIGHEST += 1;
};
/*********** ZINDEX block ends ***************/

/* Color Theme */
let COLOR_THEMES = {white: '#ffffff', black:'#000000', blue_1: '#1976d2'};
let SELECTED_COLOR_THEME = COLOR_THEMES.white;



/************************************************************/
/******************** EXPORT *******************************/
/************************************************************/
export {
    URL_MAIN, 

    /* TaskBoard code exports */
    TASKBOARD_DEFAULT,

    /* Template code exports  */
    SPRINT_PLANNING,

    /* Toolbar item exports */
    TOOLBAR_ITEMS, 
    TOOLBAR_ITEM_TYPE, 
    SHAPES_TOOLBAR_ITEM_TYPE, 

    /* Color Theme exports */
    COLOR_THEMES, 
    SELECTED_COLOR_THEME,
    
    /* ZINDEX exports */
    _get_max_z_index,
    _get_lowest_z_index,
    _use_max_z_index,
};

