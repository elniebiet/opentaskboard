const URL_MAIN = "http://localhost:5173/";

/* TaskBoard codes begin */
const TASKBOARD_DEFAULT = 1;
/* TaskBoard codes end */

/* Template codes begin */
const SPRINT_PLANNING = 1;
/* Template codes end */

/* Toolbar item types begin */
const TOOLBAR_ITEM_TYPE = {
    DRAGGABLE: 0,
    CLICKABLE: 1,
    DRAGGABLE_CLICKABLE: 2
};
/* Toolbar item types end */

/*********** ZINDEX block begins ***************/
const ZINDEX = 
{
    MAX_POSSIBLE: 1000000000,
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
    if(ZINDEX.CURRENT_HIGHEST >= ZINDEX.MAX_POSSIBLE)
    {
        ZINDEX.CURRENT_HIGHEST = 1000;
    }
    else
    {
        ZINDEX.CURRENT_HIGHEST += 1;
    }
};

const _get_max_possible_z_index = () => {
    return ZINDEX.MAX_POSSIBLE;
};
/*********** ZINDEX block ends ***************/

/*********** Generic Highlighter block begins ***************/
let HIGHLIGHT_PARAMS = {
    highlight_gap: '15', // pixels
    highlight_line_width: '3'   // pixels
};

const HIGHLIGHT_DRAG_DIRECTION = {
    TOP_LEFT:       1,
    TOP_RIGHT:      2,
    BOTTOM_LEFT:    3,
    BOTTOM_RIGHT:   4,
    TOP:            5,
    BOTTOM:         6,
    LEFT:           7,
    RIGHT:          8
};

/*********** Generic Highlighter block ends ***************/

/*********** Arrow block begins ***************/
// Arrow highlighter drag positions
const ARROW_HLIGHT_DRAG_POS = {
    START:  1,
    MID:    2,
    END:    3,
};

// Arrow width increment and decrement factors
const ARROW_WIDTH_INCR_FACTOR   = 0.1; // 10 percent of original width
const ARROW_WIDTH_DECR_FACTOR   = 0.1; // 10 percent of original width
const MAX_ARROW_WIDTH           = 100; // maximum arrow width in pixels
const MIN_ARROW_WIDTH           = 1;   // minimum arrow width in pixels
const MIN_ARROW_LENGTH          = 30;  // minimum arrow length in pixels
/*********** Arrow block ends ***************/


/* Color Theme */
const COLOR_THEMES = {
    white: {
        bg_colour: '#ffffff',
        text_colour: '#000000',
        highlight_colour: '#1976d2',
    },
    
    black: {
        bg_colour: '#000000',
        text_colour: '#ffffff',
        highlight_colour: '#1976d2',
    }, 
};

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
    TOOLBAR_ITEM_TYPE, 

    /* Color Theme exports */
    COLOR_THEMES, 
    SELECTED_COLOR_THEME,
    
    /* ZINDEX exports */
    _get_max_z_index,
    _get_lowest_z_index,
    _use_max_z_index,
    _get_max_possible_z_index,

    /* Highlighter exports */
    HIGHLIGHT_PARAMS,
    HIGHLIGHT_DRAG_DIRECTION,

    /* Arrow Highlighter exports */
    ARROW_HLIGHT_DRAG_POS,

    /* Arrow exports */
    ARROW_WIDTH_INCR_FACTOR,
    ARROW_WIDTH_DECR_FACTOR,
    MAX_ARROW_WIDTH,
    MIN_ARROW_WIDTH,
    MIN_ARROW_LENGTH,
};

