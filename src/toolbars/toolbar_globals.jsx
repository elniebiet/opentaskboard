/**
 * Toolbar global definitions
 */

// default taskboard tb location (percentage)
const TASKBOARD_DEFAULT_TB_LOC =
{
    top:    1,
    left:   50,
};

// default taskboard shapes tb location (percentage)
const TASKBOARD_DEFAULT_SHAPES_TB_LOC =
{
    top:    6,
    left:   60,
};

// default taskboard toolbar size (percentage)
const TASKBOARD_DEFAULT_TB_SIZE = 0.02;

// Taskboard Toolbar item indices
const TASKBOARD_COMPONENT_TYPE = {
    TCT_CURSOR:             1,
    TCT_STKNOTE:            2,
    TCT_COMMENT:            3,
    TCT_MARKER:             4,
    TCT_SHAPE:              5,
    TCT_FILL:               6,
    TCT_ERASER:             7,
};

// Shapes Toolbar sub-item list begin
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
    STBI_LEFT_TRIANGLE:     14,
};

/******************************* Note toolbar block begins *******************************/
/* Note toolbar item indices begin */
const NOTE_TOOLBAR_ITEMS = {
// Basic text formatting
    NTBI_BOLD:                      1,
    NTBI_ITALIC:                    2,
    NTBI_UNDERLINE:                 3,
    NTBI_STRIKETHROUGH:             4,
// Font and style adjustments
    NTBI_FONT_FAMILY:               10,
    NTBI_FONT_SIZE:                 11,
    NTBI_FONT_COLOUR:               12,
// Paragraph formatting
    NTBI_ALIGNMENT:                 20,
// Inserts
    NTBI_LINK:                      30,
    NTBI_EMOJI:                     31,
// Others
    NTBI_OTHERS:                    100,
};
/* Note toolbar item indices end */
/******************************* Note toolbar block ends *******************************/

/******************************* Arrow toolbar block begins *******************************/
/* Arrow toolbar item indices begin */
const ARROW_TOOLBAR_ITEMS = {
    ATBI_COLOUR:                1,
    ATBI_INCREASE_LINE_WIDTH:   2,
    ATBI_DECREASE_LINE_WIDTH:   3,
    ATBI_DELETE:                4,
};
/* Arrow toolbar item indices end */    
/******************************* Arrow toolbar block ends *******************************/

/******************************* Line toolbar block begins *******************************/
/* Line toolbar item indices begin */
const LINE_TOOLBAR_ITEMS = {
    ATBI_COLOUR:                1,
    ATBI_INCREASE_LINE_WIDTH:   2,
    ATBI_DECREASE_LINE_WIDTH:   3,
    ATBI_DELETE:                4,
};
/* Arrow toolbar item indices end */    
/******************************* Line toolbar block ends *******************************/

/******************************* Circle toolbar block begins *******************************/
/* Circle toolbar item indices begin */
const CIRCLE_TOOLBAR_ITEMS = {
    ATBI_COLOUR:                    1,
    ATBI_INCREASE_CIRCLE_WIDTH:     2,
    ATBI_DECREASE_CIRCLE_WIDTH:     3,
    ATBI_DELETE:                    4,
};
/* Circle toolbar item indices end */    
/******************************* Circle toolbar block ends *******************************/

/******************************* Rectangle toolbar block begins *******************************/
/* Rectangle toolbar item indices begin */
const RECTANGLE_TOOLBAR_ITEMS = {
    ATBI_COLOUR:                        1,
    ATBI_INCREASE_RECTANGLE_WIDTH:      2,
    ATBI_DECREASE_RECTANGLE_WIDTH:      3,
    ATBI_DELETE:                        4,
};
/* Rectangle toolbar item indices end */    
/******************************* Rectangle toolbar block ends *******************************/

/******************************* Top Right Static Toolbar begins ***************************************/
const TOP_RIGHT_STATIC_TOOLBAR_ITEMS = {
    TRTBI_HISTORY:            1,
    TRTBI_PROFILE:            2,
    TRTBI_SETTINGS:           3,
};
/******************************* Top Right Static Toolbar ends ****************************************/


export { 
    TASKBOARD_DEFAULT_TB_LOC, 
    TASKBOARD_DEFAULT_SHAPES_TB_LOC, 
    TASKBOARD_DEFAULT_TB_SIZE,
    TASKBOARD_COMPONENT_TYPE, 
    NOTE_TOOLBAR_ITEMS,
    SHAPES_TOOLBAR_ITEM_TYPE,
    ARROW_TOOLBAR_ITEMS,
    LINE_TOOLBAR_ITEMS,
    CIRCLE_TOOLBAR_ITEMS,
    RECTANGLE_TOOLBAR_ITEMS,
    TOP_RIGHT_STATIC_TOOLBAR_ITEMS,
};

