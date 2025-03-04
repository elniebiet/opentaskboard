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
    TOOLBAR_ITEM_TYPE, 

    /* Color Theme exports */
    COLOR_THEMES, 
    SELECTED_COLOR_THEME,
    
    /* ZINDEX exports */
    _get_max_z_index,
    _get_lowest_z_index,
    _use_max_z_index,
    _get_max_possible_z_index,
};

