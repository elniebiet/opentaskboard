import { SHAPES_TOOLBAR_ITEM_TYPE } from "../common/globals";
/************************************ TASKBOARD CONST DEFINITIONS *************************************************/
// Default sticky note width percentage ratio
const STKNOTE_WIDTH_PERC_DEFAULT                      = 0.15; 
// Default comment width percentage ratio
const COMMENT_WIDTH_PERC_DEFAULT                      = 0.15; 

// Taskboard states
const TASKBOARD_STATES = {
    TBS_NORMAL:                 1,
    TBS_SUB_TOOLBAR_ACTIVE:     2,
    TBS_WAITING_DRAW_SHAPE:     3,  // waiting to draw a shape
    TBS_BEGIN_DRAWING_SHAPE:    4,  // began drawing shape
    TBS_DRAWING_SHAPE:          5,  // drawing shape
    TBS_WRITING:                7,
};

/************************************ TASKBOARD VARIABLE DEFINITIONS *************************************************/
let global_new_shape_id                         = 0;                        // id for the new shape to be drawn
let global_last_item_add_or_move_loc            = {loc_x: 100, loc_y: 100}; // last location a toolbar item was added or moved
let global_cursor_type                          = "default";                // cursor type in use
let global_new_shape_type                       = SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE; // currently selected type of shape to be drawn, default is line

/************************************ TASKBOARD GLOBAL FUNCTION DEFINITIONS *************************************************/
const _get_global_new_shape_id = () => {
    return global_new_shape_id;
};

const _set_global_new_shape_id = (new_id) => {
    global_new_shape_id = new_id;
};

const _get_global_last_item_add_or_move_loc= () => {
    return global_last_item_add_or_move_loc;
};

const _set_global_last_item_add_or_move_loc= (x, y) => {
    global_last_item_add_or_move_loc = {loc_x: x, loc_y: y};
};

const _get_global_cursor_type = () => {
    return global_cursor_type;
};

const _set_global_cursor_type = (cursor_type) => {
    global_cursor_type = cursor_type;
};

const _get_global_new_shape_type = () => {
    return global_new_shape_type;
};

const _set_global_new_shape_type = (new_shape_type) => {
    global_new_shape_type = new_shape_type;
};

/***************** EXPORT *******************/
export {
    // CONSTANTS
    STKNOTE_WIDTH_PERC_DEFAULT,
    COMMENT_WIDTH_PERC_DEFAULT,
    TASKBOARD_STATES,
    
    // FUNCTIONS
    _get_global_new_shape_id,
    _set_global_new_shape_id,
    _get_global_last_item_add_or_move_loc,
    _set_global_last_item_add_or_move_loc,
    _get_global_cursor_type,
    _set_global_cursor_type,
    _get_global_new_shape_type,
    _set_global_new_shape_type,
};