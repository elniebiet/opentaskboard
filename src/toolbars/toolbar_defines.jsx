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

/* Note toolbar item indices begin */
const NOTE_TOOLBAR_ITEMS = {
// Basic text formatting
    NTBI_BOLD:                      1,
    NTBI_ITALIC:                    2,
    NTBI_UNDERLINE:                 3,
    NTBI_STRIKETHROUGH:             4,
// Font and style adjustments
    NTBI_FONT_SELECTION:            10,
    NTBI_FONT_SIZE:                 11,
    NTBI_TEXT_COLOUR:               12,
// Paragraph formatting
    NTBI_ALIGNMENT:                 20,
// Inserts
    NTBI_LINK:                      30,
    NTBI_EMOJI:                     31,
// Others
    NTBI_OTHERS:                    100,
};
/* Note toolbar item indices end */

export { 
    TASKBOARD_DEFAULT_TB_LOC, 
    TASKBOARD_DEFAULT_SHAPES_TB_LOC, 
    TASKBOARD_DEFAULT_TB_SIZE, 
    NOTE_TOOLBAR_ITEMS 
};

