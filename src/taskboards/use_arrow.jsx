import arrows from "../db/taskboards/arrows_db_temp";
import { ARROW_WIDTH_INCR_FACTOR, ARROW_WIDTH_DECR_FACTOR, MAX_ARROW_WIDTH, MIN_ARROW_WIDTH,
  MIN_ARROW_LENGTH, UNUSED, 
  META_ACTIONS} from "../common/globals";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";

//TODO: CAN HAVE ONE INSTANCE OF THE ACTIVITY TRACKER
const _calculate_arrow_length = (line_start_pos_x, line_start_pos_y, line_end_pos_x, line_end_pos_y) => {
  const dx = line_end_pos_x - line_start_pos_x;
  const dy = line_end_pos_y - line_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * add new arrow
 * @param {Taskboard_Comp_DS} new_arrow 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if arrow added successfully, false otherwise
 */
const _add_arrow = (new_arrow, meta_action = META_ACTIONS.NONE) => {

  if(typeof new_arrow !== "object" || new_arrow == null) return false;

  let line_length = _calculate_arrow_length(new_arrow.x1_pos, new_arrow.y1_pos, new_arrow.x2_pos, new_arrow.y2_pos);
  
  if(line_length < MIN_ARROW_LENGTH)
  {
    new_arrow.x2_pos = new_arrow.x1_pos + MIN_ARROW_LENGTH;
    new_arrow.y2_pos = new_arrow.y1_pos + MIN_ARROW_LENGTH;
  }

  arrows.push(new_arrow);

  return true;
};

/**
 * update end point for an arrow
 * @param {int} id - arrow id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for an arrow
 */
const _update_arrow_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
    for(let i=0; i<arrows.length; i++)
    {
      if(arrows[i].id === id)
      {
        let line_length = _calculate_arrow_length(arrows[i].x1_pos, arrows[i].y1_pos, new_x2_pos, new_y2_pos);
  
        if(line_length < MIN_ARROW_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_ARROW_LENGTH;
          new_y2_pos = new_y2_pos + MIN_ARROW_LENGTH;
        }

        arrows[i].x2_pos = new_x2_pos;
        arrows[i].y2_pos = new_y2_pos;

        if(b_drawing_over)
        {
          // add action to activity tracker
          const activity = new Taskboard_Activity(arrows[i].taskboard_id, ACTIONS.ADD, arrows[i]);
          const activity_tracker = new Taskboard_Activity_Tracker(arrows[i].taskboard_id);
          let b_result = activity_tracker._add_activity(arrows[i].taskboard_id, activity);
        }

        break;
      }
    }
};

/**
 * update start point for an arrow
 * @param {int} id - arrow id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_arrow_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<arrows.length; i++)
  {
    if(arrows[i].id === id)
    {
      arrows[i].x1_pos = new_x1_pos;
      arrows[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update arrow highlighted flag
 * @param {int} id - arrow id
 * @param {boolean} highlighted - arrow highlighted
 */
const _update_arrow_highlighted = (id, highlighted) => {
    for(let i=0; i<arrows.length; i++)
    {
      if(arrows[i].id === id)
      {
        arrows[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update arrow colour
 * @param {int} id - arrow id
 * @param {string} colour colour hex string
 */
const _update_arrow_colour = (id, colour) => {
  for(let i=0; i<arrows.length; i++)
  {
    if(arrows[i].id === id)
    {
      arrows[i].colour = colour;
      break;
    }
  }
};

/**
 * update arrow toolbar show
 * @param {int} id - arrow id
 * @param {bool} b_show_toolbar - arrow toolbar is active
 */
const _update_arrow_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<arrows.length; i++)
  {
      if(arrows[i].id === id)
      {
          arrows[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update arrow toolbar location
 * @param {int} id - arrow id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_arrow_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<arrows.length; i++)
  {
      if(arrows[i].id === id)
      {
          arrows[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete arrow
 * @param {int} id - arrow id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if arrow deleted successfully, false otherwise
 */
const _delete_arrow = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;
  const index = arrows.findIndex(arrow => arrow.id === id);

  if (index !== -1) {
    b_result = true;
    
    let arrow = arrows[index];
    arrows.splice(index, 1); 

    if(meta_action === META_ACTIONS.NONE)
    {
      // add action to activity tracker
      const delete_activity = new Taskboard_Activity(arrow.taskboard_id, ACTIONS.DELETE, arrow);
      const activity_tracker = new Taskboard_Activity_Tracker(arrow.taskboard_id);
      b_result = activity_tracker._add_activity(arrow.taskboard_id, delete_activity);
    }
  }

  return b_result;
};

/**
 * increase arrow width
 * @param {int} id - arrow id
 */
const _increase_arrow_width = (id) => {
  for(let i=0; i<arrows.length; i++)
  {
    if(arrows[i].id === id)
    {
      let increment = (arrows[i].stroke_width * ARROW_WIDTH_INCR_FACTOR);

      if(arrows[i].stroke_width + increment > MAX_ARROW_WIDTH)
      {
        arrows[i].stroke_width = MAX_ARROW_WIDTH;
      }
      else
      {
        arrows[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease arrow width
 * @param {int} id - arrow id
 */
const _decrease_arrow_width = (id) => {
  for(let i=0; i<arrows.length; i++)
  {
    if(arrows[i].id === id)
    {
      let decrement = (arrows[i].stroke_width * ARROW_WIDTH_DECR_FACTOR);
      
      if(arrows[i].stroke_width - decrement < MIN_ARROW_WIDTH)
      {
        arrows[i].stroke_width = MIN_ARROW_WIDTH;
      }
      else
      {
        arrows[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

export {
    _add_arrow,
    _update_arrow_end_pos,
    _update_arrow_start_pos,
    _update_arrow_highlighted,
    _update_arrow_colour,
    _update_arrow_toolbar_show,
    _update_arrow_toolbar_loc,
    _delete_arrow,
    _increase_arrow_width,
    _decrease_arrow_width,
};