/************************************ TASKBOARD CONST DEFINITIONS *************************************************/
// Default sticky note width percentage ratio
const STKNOTE_WIDTH_PERC_DEFAULT                      = 0.15; 
// Default comment width percentage ratio
const COMMENT_WIDTH_PERC_DEFAULT                      = 0.15; 

// Taskboard states
const TASKBOARD_STATES = {
    TBS_NORMAL:                 1,
    TBS_SUB_TOOLBAR_ACTIVE:     2,
    TBS_DRAWING_SHAPE:          3,
    TBS_BEGIN_DRAWING_SHAPE:    4,
    TBS_WRITING:                5,
};

/************************************ TASKBOARD VARIABLE DEFINITIONS *************************************************/
let global_new_arrow_id = 0;

/************************************ TASKBOARD GLOBAL FUNCTION DEFINITIONS *************************************************/
const _set_global_new_arrow_id = (new_id) => {
    global_new_arrow_id = new_id;
};

/***************** EXPORT *******************/
export {
    // CONSTANTS
    STKNOTE_WIDTH_PERC_DEFAULT,
    COMMENT_WIDTH_PERC_DEFAULT,
    TASKBOARD_STATES,

    // VARIABLES
    global_new_arrow_id,
    
    // FUNCTIONS
    _set_global_new_arrow_id,
};