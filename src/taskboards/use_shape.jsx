import { _set_global_cursor_type } from "./taskboard_globals";
import { _set_global_new_shape_type, _get_global_new_shape_type, _get_global_new_shape_id } from "./taskboard_globals";
import { SHAPES_TOOLBAR_ITEM_TYPE } from "../toolbars/toolbar_globals";
import { CURSOR_TYPES } from "./taskboard_globals";
import { _add_arrow, _update_arrow_end_pos } from "./use_arrow";
import { _add_line, _update_line_end_pos } from "./use_line";
import { _add_circle, _update_circle_end_pos } from "./use_circle";
import { _add_rectangle, _update_rectangle_end_pos } from "./use_rectangle";
import { _add_triangle, _update_triangle_end_pos } from "./use_triangle";
import { _add_rightangle, _update_rightangle_end_pos } from "./use_rightangle";

/**
 * Handler first called when a shape is selected
 * @param {*} e 
 * @param {*} sel_shape_type 
 */
const _shape_selected_handler = (e, sel_shape_type) => 
{    
    // custom 'crosshair' cursor
    _set_global_cursor_type(CURSOR_TYPES.CT_DRAW_SHAPE);
    _set_global_new_shape_type(sel_shape_type);
};

const _start_drawing = ({ shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width}) => {
    let type_of_shape = _get_global_new_shape_type(); 
    switch(type_of_shape)
    {
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW:
        {
            _add_arrow(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
        {
            _add_line(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE:
        {
            _add_circle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RECT:
        {
            const filleted = 0;
            _add_rectangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_FILLETED_RECT:
        {
            const filleted = 1;
            _add_rectangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_TRIANGLE:
        {
            const filleted = 0;
            _add_triangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RIGHT_TRIANGLE:
        {
            const filleted = 0;
            _add_rightangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted);
            break;
        }
        default:
        {
            console.log("_start_drawing: dont know shape " + type_of_shape);
            break;
        }
    }
};

const _update_drawing = ({e, shape_type}) => {
    switch(shape_type)
    {
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW:
        {
            _update_arrow_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
        {
            _update_line_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE:
        {
            _update_circle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RECT:
        {
            _update_rectangle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_FILLETED_RECT:
        {
            _update_rectangle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_TRIANGLE:
        {
            _update_triangle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RIGHT_TRIANGLE:
        {
            _update_rightangle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        default:
        {
            console.log("_update_drawing_dont know shape " + shape_type);
            break;
        }
    }
};

export {
    _shape_selected_handler,
    _start_drawing,
    _update_drawing,
};