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
const TASKBOARD_TOOLBAR_ITEMS = {
    TBI_CURSOR:             1,
    TBI_STKNOTE:            2,
    TBI_COMMENT:            3,
    TBI_MARKER:             4,
    TBI_SHAPE:              5,
    TBI_FILL:               6,
    TBI_ERASER:             7,
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


export { 
    TASKBOARD_DEFAULT_TB_LOC, 
    TASKBOARD_DEFAULT_SHAPES_TB_LOC, 
    TASKBOARD_DEFAULT_TB_SIZE,
    TASKBOARD_TOOLBAR_ITEMS, 
    NOTE_TOOLBAR_ITEMS,
    SHAPES_TOOLBAR_ITEM_TYPE,
    ARROW_TOOLBAR_ITEMS,
};

