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
    SUBTOOLBAR_Z_INDEX: 10000000,
    TOOLBAR_Z_INDEX: 1000000,

    // most components should fall within this range ( > 10000, < 1000000)
    
    CURRENT_HIGHEST: 10000,
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

const _get_toolbar_z_index = () => {
    return ZINDEX.TOOLBAR_Z_INDEX;
};

const _get_subtoolbar_z_index = () => {
    return ZINDEX.SUBTOOLBAR_Z_INDEX;
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

const HIGHLIGHT_JOIN_POSITIONS = {
    TOP:        1,
    RIGHT:      2,
    BOTTOM:     3,
    LEFT:       4,
    NONE:       5,   
};
/*********** Generic Highlighter block ends ***************/

/*********** Arrow block begins ***************/
// Arrow highlighter drag positions
const ARROW_HLIGHT_DRAG_POS = {
    START:  1,
    MID:    2,
    END:    3,
};

// Arrow join point
const ARROW_JOIN_POINT = {
    START_POINT:  1,
    END_POINT:    2,
};

// Arrow width increment and decrement factors
const ARROW_WIDTH_INCR_FACTOR   = 0.1; // 10 percent of original width
const ARROW_WIDTH_DECR_FACTOR   = 0.1; // 10 percent of original width
const MAX_ARROW_WIDTH           = 100; // maximum arrow width in pixels
const MIN_ARROW_WIDTH           = 1;   // minimum arrow width in pixels
const MIN_ARROW_LENGTH          = 30;  // minimum arrow length in pixels

// current joining arrow id
let current_joining_arrow_id = -1;

const _get_current_joining_arrow_id = () => {
    return current_joining_arrow_id;
};

const _set_current_joining_arrow_id = (id) => {
    current_joining_arrow_id = id;
};
/*********** Arrow block ends ***************/

// current joining position
let current_joining_position = HIGHLIGHT_JOIN_POSITIONS.TOP;

const _get_current_joining_position = () => {
    return current_joining_position;
};

const _set_current_joining_position = (joining_pos) => {
    current_joining_position = joining_pos;
};

// last hovered joining position item id 
// during a join, this is the last item hovered over for joining
// clear this id when the join is completed
let last_hovered_joining_item_id = -1;

const _get_last_hovered_joining_item_id = () => {
    return last_hovered_joining_item_id;
};

const _set_last_hovered_joining_item_id = (id) => {
    if(id === last_hovered_joining_item_id) return;

    last_hovered_joining_item_id = id;
};

// last hovered joining position
// during a join, this is the last position hovered over for joining
let last_hovered_joining_position = HIGHLIGHT_JOIN_POSITIONS.NONE;

const _get_last_hovered_joining_position = () => {
    return last_hovered_joining_position;
};

const _set_last_hovered_joining_position = (joining_pos) => {
    if(joining_pos === last_hovered_joining_position) return;

    last_hovered_joining_position = joining_pos;
}


/*********** Line block begins ***************/
// Line highlighter drag positions
const LINE_HLIGHT_DRAG_POS = {
    START:  1,
    MID:    2,
    END:    3,
};

// Line width increment and decrement factors
const LINE_WIDTH_INCR_FACTOR   = 0.1; // 10 percent of original width
const LINE_WIDTH_DECR_FACTOR   = 0.1; // 10 percent of original width
const MAX_LINE_WIDTH           = 100; // maximum line width in pixels
const MIN_LINE_WIDTH           = 1;   // minimum line width in pixels
const MIN_LINE_LENGTH          = 30;  // minimum line length in pixels

/*********** Line block ends ***************/

/************* Color Theme block begins ************/
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
/************* Color Theme block ends ***************/

/********** click/drag block begins ****************/
const CLICK_OR_DRAG = {
    NONE:   0,
    CLICK:  1,
    DRAG:   2,
};

// parameter to track if the user is clicking or dragging
let is_click_or_drag = CLICK_OR_DRAG.NONE;

// timeout for click or drag detection
const CLICK_OR_DRAG_TIMEOUT = 500; // milliseconds

const _set_click_or_drag = (value) => {
    if(value === CLICK_OR_DRAG.CLICK 
        || value === CLICK_OR_DRAG.DRAG 
        || value === CLICK_OR_DRAG.NONE)
    {
        is_click_or_drag = value;
    }
}

const _get_click_or_drag = () => {
    return is_click_or_drag;
}
/********** click/drag block ends ****************/


/********** Misc block begins ****************/

/********** Misc block ends ****************/


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
    _get_toolbar_z_index,
    _get_subtoolbar_z_index,

    /* Highlighter exports */
    HIGHLIGHT_PARAMS,
    HIGHLIGHT_DRAG_DIRECTION,
    HIGHLIGHT_JOIN_POSITIONS,

    /* Arrow exports */
    ARROW_WIDTH_INCR_FACTOR,
    ARROW_WIDTH_DECR_FACTOR,
    MAX_ARROW_WIDTH,
    MIN_ARROW_WIDTH,
    MIN_ARROW_LENGTH,
    ARROW_JOIN_POINT,
    ARROW_HLIGHT_DRAG_POS,
    _get_current_joining_arrow_id,
    _set_current_joining_arrow_id,

    /* Line exports */
    LINE_WIDTH_INCR_FACTOR,
    LINE_WIDTH_DECR_FACTOR,
    MAX_LINE_WIDTH,
    MIN_LINE_WIDTH,
    MIN_LINE_LENGTH,
    LINE_HLIGHT_DRAG_POS,

    /* click/drag exports */
    _set_click_or_drag,
    _get_click_or_drag,
    CLICK_OR_DRAG,
    CLICK_OR_DRAG_TIMEOUT,

    /* other function exports */
    _get_current_joining_position,
    _set_current_joining_position,
    _get_last_hovered_joining_item_id,
    _set_last_hovered_joining_item_id,
    _get_last_hovered_joining_position,
    _set_last_hovered_joining_position,
    
    /* Other misc exports */
};

