import { _set_global_cursor_type } from "./taskboard_definitions";
import { _set_global_new_shape_type, _get_global_new_shape_type, _get_global_new_shape_id } from "./taskboard_definitions";
import { SHAPES_TOOLBAR_ITEM_TYPE } from "../common/globals";
import arrows from "./arrows_db_temp";
import { CURSOR_TYPES } from "./taskboard_definitions";

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

const _add_arrow = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width) => {
    const new_arrow = { 
        id: id,
        x1_pos: x1_pos,
        x2_pos: x2_pos,
        y1_pos: y1_pos,
        y2_pos: y2_pos,
        colour: colour,
        stroke_width: stroke_width, 
    };
    arrows.push(new_arrow);
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
        default:
        {
            console.log("_start_drawing: dont know shape " + type_of_shape);
            break;
        }
    }
};

/**
   * update end point for an arrow
   * @param {int} id - arrow id
   * @param {int} new_x2_pos - new x cordinate
   * @param {int} new_y2_pos - new y cordinate
   */
const _update_arrow_end_pos = (id, new_x2_pos, new_y2_pos) => {    
    for(let i=0; i<arrows.length; i++)
    {
      if(arrows[i].id === id)
      {
        arrows[i].x2_pos = new_x2_pos;
        arrows[i].y2_pos = new_y2_pos;
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