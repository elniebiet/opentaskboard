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
import { _add_leftangle, _update_leftangle_end_pos } from "./use_leftangle";
import { COMPONENT_CLSID_PREFIXES } from "../common/otb_component_class_id_prefixes";
import { _otb_generate_uuid } from "../common/otb_id_generator";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";
import { UNUSED } from "../common/globals";
import { META_ACTIONS } from "../common/globals";

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

const _start_drawing = ({ shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, taskboard_type, taskboard_id}) => {
    let type_of_shape = _get_global_new_shape_type(); 

    // this structure definition follows the format defined in Taskboard_Comp_DS class
    const new_shape = new Taskboard_Comp_DS(); 
    new_shape.id = shape_id;
    new_shape.x1_pos = start_pos_x;
    new_shape.y1_pos = start_pos_y;
    new_shape.x2_pos = end_pos_x;
    new_shape.y2_pos = end_pos_y;
    new_shape.colour = colour;
    new_shape.stroke_width = stroke_width; 
    new_shape.win_width_perc = UNUSED;
    new_shape.text = UNUSED;
    new_shape.highlighted = true;
    new_shape.active = UNUSED;
    new_shape.toolbar_show = true;
    new_shape.toolbar_display_loc = {x: 200, y: 200};
    new_shape.join_arrow_ids = UNUSED;
    new_shape.filleted = UNUSED;
    new_shape.taskboard_type = taskboard_type;
    new_shape.taskboard_id = taskboard_id;

    switch(type_of_shape)
    {
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW:
        {
            _add_arrow(new_shape, META_ACTIONS.NONE);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
        {
            _add_line(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, taskboard_type, taskboard_id);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE:
        {
            _add_circle(new_shape);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RECT:
        {
            const filleted = 0;
            _add_rectangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted, taskboard_type, taskboard_id);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_FILLETED_RECT:
        {
            new_shape.filleted = true;
            const filleted = 1;
            _add_rectangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted, taskboard_type, taskboard_id);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_TRIANGLE:
        {
            const filleted = 0;
            _add_triangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted, taskboard_type, taskboard_id);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RIGHT_TRIANGLE:
        {
            const filleted = 0;
            _add_rightangle(shape_id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour, stroke_width, filleted, taskboard_type, taskboard_id);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LEFT_TRIANGLE:
        {
            _add_leftangle(new_shape, META_ACTIONS.NONE);
            break;
        }
        default:
        {
            console.log("_start_drawing: dont know shape " + type_of_shape);
            break;
        }
    }
};

const _update_drawing = ({e, shape_type, b_drawing_over}) => {
    switch(shape_type)
    {
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW:
        {
            _update_arrow_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY, b_drawing_over);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
        {
            _update_line_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE:
        {
            _update_circle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY, b_drawing_over);
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
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LEFT_TRIANGLE:
        {
            _update_leftangle_end_pos(_get_global_new_shape_id(), e.clientX, e.clientY, b_drawing_over);
            break;
        }
        default:
        {
            console.log("_update_drawing_dont know shape " + shape_type);
            break;
        }
    }
};

const _create_new_shape_id = (shape_type) => {
    
    let new_shape_id = null;

    switch(shape_type)
    {
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.ARROW);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.LINE);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.CIRCLE);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RECT:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.RECT);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_FILLETED_RECT:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.FILLETED_RECT);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_TRIANGLE:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.TRIANGLE);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RIGHT_TRIANGLE:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.RIGHT_ANGLE);
            break;
        }
        case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LEFT_TRIANGLE:
        {
            new_shape_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.LEFT_ANGLE);
            break;
        }
        default:
        {
            new_shape_id = null;
        }
    }

    return new_shape_id;
};

export {
    _shape_selected_handler,
    _start_drawing,
    _update_drawing,
    _create_new_shape_id,
};