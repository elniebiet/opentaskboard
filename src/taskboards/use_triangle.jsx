import triangles from "../db/taskboards/triangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, UNUSED, ARROW_JOIN_POINT, META_ACTIONS} from "../common/globals";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";
import { _add_activity_to_tracker } from "./components/taskboard_activity_tracker_mgt";

const _calculate_triangle_length = (triangle_start_pos_x, triangle_start_pos_y, triangle_end_pos_x, triangle_end_pos_y) => {
  const dx = triangle_end_pos_x - triangle_start_pos_x;
  const dy = triangle_end_pos_y - triangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * add new triangle
 * @param {Taskboard_Comp_DS} new_triangle 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if triangle added successfully, false otherwise
 */
const _add_triangle = (new_triangle, meta_action = META_ACTIONS.NONE) => {

  if(typeof new_triangle !== "object" || new_triangle == null) return false;

  let triangle_length = _calculate_triangle_length(new_triangle.x1_pos, new_triangle.y1_pos, new_triangle.x2_pos, new_triangle.y2_pos);
  
  if(triangle_length < MIN_LINE_LENGTH)
  {
    new_triangle.x2_pos = new_triangle.x1_pos + MIN_LINE_LENGTH;
    new_triangle.y2_pos = new_triangle.y1_pos + MIN_LINE_LENGTH;
  }
  
  new_triangle.win_width_perc = UNUSED,
  new_triangle.text = UNUSED,
  new_triangle.highlighted = true,
  new_triangle.active = false,
  new_triangle.toolbar_show = true,
  new_triangle.toolbar_display_loc = {x: 200, y: 200},
  new_triangle.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
  new_triangle.filleted = UNUSED;

  triangles.push(new_triangle);

  return true;
};

/**
 * update end point for an triangle
 * @param {int} id - triangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for a triangle
 */
const _update_triangle_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      let triangle_length = _calculate_triangle_length(triangles[i].x1_pos, triangles[i].y1_pos, new_x2_pos, new_y2_pos);
    
      if(triangle_length < MIN_LINE_LENGTH)
      {
        new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
        new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
      }

      triangles[i].x2_pos = new_x2_pos;
      triangles[i].y2_pos = new_y2_pos;

      if(b_drawing_over)
      {
        // add action to activity tracker
        let b_result = _add_activity_to_tracker({taskboard_id: triangles[i].taskboard_id, action_type: ACTIONS.ADD, component_data: triangles[i]});
      }

      break;
    }
  }
};

/**
 * update start point for an triangle
 * @param {int} id - triangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_triangle_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      triangles[i].x1_pos = new_x1_pos;
      triangles[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update triangle highlighted flag
 * @param {int} id - triangle id
 * @param {boolean} highlighted - triangle highlighted
 */
const _update_triangle_highlighted = (id, highlighted) => {
    for(let i=0; i<triangles.length; i++)
    {
      if(triangles[i].id === id)
      {
        triangles[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update triangle colour
 * @param {int} id - triangle id
 * @param {string} colour colour hex string
 */
const _update_triangle_colour = (id, colour) => {
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      triangles[i].colour = colour;

      let triangle = triangles[i];

      let b_result = _add_activity_to_tracker({taskboard_id: triangle.taskboard_id, action_type: ACTIONS.UPDATE, component_data: triangle});

      break;
    }
  }
};

/**
 * update triangle toolbar show
 * @param {int} id - triangle id
 * @param {bool} b_show_toolbar - triangle toolbar is active
 */
const _update_triangle_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<triangles.length; i++)
  {
      if(triangles[i].id === id)
      {
          triangles[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update triangle toolbar location
 * @param {int} id - triangle id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_triangle_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<triangles.length; i++)
  {
      if(triangles[i].id === id)
      {
          triangles[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete triangle
 * @param {int} id - triangle id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 */
const _delete_triangle = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;

  const index = triangles.findIndex(triangle => triangle.id === id);

  if (index !== -1) {
    b_result = true; 
    
    let triangle = triangles[index];

    triangles.splice(index, 1); 

    if(meta_action === META_ACTIONS.NONE)
    {
      // add action to activity tracker
      b_result = _add_activity_to_tracker({taskboard_id: triangle.taskboard_id, action_type: ACTIONS.DELETE, component_data: triangle});
    }
  }

  return b_result;
};

/**
 * increase triangle width
 * @param {int} id - triangle id
 */
const _increase_triangle_width = (id) => {
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      let increment = (triangles[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(triangles[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        triangles[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        triangles[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease triangle width
 * @param {int} id - triangle id
 */
const _decrease_triangle_width = (id) => {
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      let decrement = (triangles[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(triangles[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        triangles[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        triangles[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

/**
 * update triangle active state
 * @param {int} id - triangle id
 * @param {bool} b_is_active - triangle is active
 */
const _update_triangle_active_state = (id, b_is_active) => {
  for(let i=0; i<triangles.length; i++)
  {
      if(triangles[i].id === id)
      {
          triangles[i].active = b_is_active;
          break;
      }
  }
};

/**
 * general update triangle function
 * @param {int} id - triangle id
 * @param {Taskboard_Comp_DS} updated_triangle - update triangle data   
 */
const _update_triangle_general = (updated_triangle, meta_action) => {
        
    if(meta_action === META_ACTIONS.REDO || meta_action === META_ACTIONS.UNDO)
    {
        for(let i=0; i<triangles.length; i++)
        {
            if(triangles[i].id === updated_triangle.id)
            {
                triangles[i].x1_pos = updated_triangle.x1_pos;
                triangles[i].y1_pos = updated_triangle.y1_pos;
                triangles[i].x2_pos = updated_triangle.x2_pos;
                triangles[i].y2_pos = updated_triangle.y2_pos;
                triangles[i].colour = updated_triangle.colour;
                triangles[i].stroke_width = updated_triangle.stroke_width; 
                triangles[i].win_width_perc = updated_triangle.win_width_perc;
                triangles[i].text = updated_triangle.text;
                triangles[i].highlighted = false;
                triangles[i].active = false;
                triangles[i].toolbar_show = updated_triangle.toolbar_show;
                triangles[i].toolbar_display_loc = updated_triangle.toolbar_display_loc;
                triangles[i].join_arrow_ids = updated_triangle.join_arrow_ids;
                triangles[i].filleted = updated_triangle.filleted;
                triangles[i].taskboard_type = updated_triangle.taskboard_type;
                triangles[i].taskboard_id = updated_triangle.taskboard_id;
                
                return true;
            }
        }
    }

    return false;
};

export {
    _add_triangle,
    _update_triangle_end_pos,
    _update_triangle_start_pos,
    _update_triangle_highlighted,
    _update_triangle_colour,
    _update_triangle_toolbar_show,
    _update_triangle_toolbar_loc,
    _delete_triangle,
    _increase_triangle_width,
    _decrease_triangle_width,
    _update_triangle_active_state,
    _update_triangle_general,
};