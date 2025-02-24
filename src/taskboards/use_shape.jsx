import { _set_global_cursor_type } from "./taskboard_definitions";
import { _set_global_new_shape_type } from "./taskboard_definitions";
import cross_pointer from '../../res/imgs/plus_sign_16x16.png'; 

/**
 * Handler first called when a shape is selected
 * @param {*} e 
 * @param {*} sel_shape_type 
 */
const _shape_selected_handler = (e, sel_shape_type) => 
{    
    // custom 'crosshair' cursor
    let cursor_type = `url(${cross_pointer}) 5 5, auto`;
    _set_global_cursor_type(cursor_type);
    _set_global_new_shape_type(sel_shape_type);
};

export {
    _shape_selected_handler,
};