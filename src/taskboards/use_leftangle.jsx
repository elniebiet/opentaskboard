import leftangles from "../db/taskboards/leftangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, ARROW_JOIN_POINT, UNUSED } from "../common/globals";
import { TASKBOARD_TYPES } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";
import { META_ACTIONS } from "../common/globals";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { _add_activity_to_tracker } from "./components/taskboard_activity_tracker_mgt";

const _calculate_leftangle_length = (leftangle_start_pos_x, leftangle_start_pos_y, leftangle_end_pos_x, leftangle_end_pos_y) => {
  const dx = leftangle_end_pos_x - leftangle_start_pos_x;
  const dy = leftangle_end_pos_y - leftangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * add new leftangle
 * @param {Taskboard_Comp_DS} new_leftangle 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if leftangle added successfully, false otherwise
 */
const _add_leftangle = (new_leftangle, meta_action = META_ACTIONS.NONE) => {
    if(typeof new_leftangle !== "object" || new_leftangle == null) return false;

    let leftangle_length = _calculate_leftangle_length(new_leftangle.x1_pos, new_leftangle.y1_pos, new_leftangle.x2_pos, new_leftangle.y2_pos);

    if(leftangle_length < MIN_LINE_LENGTH)
    {
      new_leftangle.x2_pos = new_leftangle.x1_pos + MIN_LINE_LENGTH;
      new_leftangle.y2_pos = new_leftangle.y1_pos + MIN_LINE_LENGTH;
    }

    new_leftangle.win_width_perc = UNUSED,
    new_leftangle.text = UNUSED,
    new_leftangle.highlighted = true,
    new_leftangle.active = false,
    new_leftangle.toolbar_show = true,
    new_leftangle.toolbar_display_loc = {x: 200, y: 200},
    new_leftangle.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
    new_leftangle.filleted = UNUSED;

    leftangles.push(new_leftangle);

return true;
};

/**
 * update end point for an leftangle
 * @param {int} id - leftangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for a leftangle
 */
const _update_leftangle_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
  for(let i=0; i<leftangles.length; i++)
  {
    if(leftangles[i].id === id)
    {
    let leftangle_length = _calculate_leftangle_length(leftangles[i].x1_pos, leftangles[i].y1_pos, new_x2_pos, new_y2_pos);
  
    if(leftangle_length < MIN_LINE_LENGTH)
    {
      new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
      new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
    }

    leftangles[i].x2_pos = new_x2_pos;
    leftangles[i].y2_pos = new_y2_pos;

    if(b_drawing_over)
    {
      // add action to activity tracker
      let b_result = _add_activity_to_tracker({taskboard_id: leftangles[i].taskboard_id, action_type: ACTIONS.ADD, component_data: leftangles[i]});
    }

    break;
    }
  }
};

/**
 * update start point for an leftangle
 * @param {int} id - leftangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_leftangle_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<leftangles.length; i++)
  {
    if(leftangles[i].id === id)
    {
      leftangles[i].x1_pos = new_x1_pos;
      leftangles[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update leftangle highlighted flag
 * @param {int} id - leftangle id
 * @param {boolean} highlighted - leftangle highlighted
 */
const _update_leftangle_highlighted = (id, highlighted) => {
    for(let i=0; i<leftangles.length; i++)
    {
      if(leftangles[i].id === id)
      {
        leftangles[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update leftangle colour
 * @param {int} id - leftangle id
 * @param {string} colour colour hex string
 */
const _update_leftangle_colour = (id, colour) => {
  for(let i=0; i<leftangles.length; i++)
  {
    if(leftangles[i].id === id)
    {
      leftangles[i].colour = colour;

      let leftangle = leftangles[i];

      let b_result = _add_activity_to_tracker({taskboard_id: leftangle.taskboard_id, action_type: ACTIONS.UPDATE, component_data: leftangle});

      break;
    }
  }
};

/**
 * update leftangle toolbar show
 * @param {int} id - leftangle id
 * @param {bool} b_show_toolbar - leftangle toolbar is active
 */
const _update_leftangle_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<leftangles.length; i++)
  {
      if(leftangles[i].id === id)
      {
          leftangles[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update leftangle toolbar location
 * @param {int} id - leftangle id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_leftangle_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<leftangles.length; i++)
  {
      if(leftangles[i].id === id)
      {
          leftangles[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete leftangle
 * @param {int} id - leftangle id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 */
const _delete_leftangle = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;

  const index = leftangles.findIndex(leftangle => leftangle.id === id);

  if (index !== -1) {
    b_result = true; 
    
    let leftangle = leftangles[index];

    leftangles.splice(index, 1); 

    if(meta_action === META_ACTIONS.NONE)
    {
      // add action to activity tracker
      b_result = _add_activity_to_tracker({taskboard_id: leftangle.taskboard_id, action_type: ACTIONS.DELETE, component_data: leftangle});
    }
  }

  return b_result;
};

/**
 * increase leftangle width
 * @param {int} id - leftangle id
 */
const _increase_leftangle_width = (id) => {
  for(let i=0; i<leftangles.length; i++)
  {
    if(leftangles[i].id === id)
    {
      let increment = (leftangles[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(leftangles[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        leftangles[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        leftangles[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease leftangle width
 * @param {int} id - leftangle id
 */
const _decrease_leftangle_width = (id) => {
  for(let i=0; i<leftangles.length; i++)
  {
    if(leftangles[i].id === id)
    {
      let decrement = (leftangles[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(leftangles[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        leftangles[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        leftangles[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

/**
 * update leftangle active state
 * @param {int} id - leftangle id
 * @param {bool} b_is_active - leftangle is active
 */
const _update_leftangle_active_state = (id, b_is_active) => {
  for(let i=0; i<leftangles.length; i++)
  {
      if(leftangles[i].id === id)
      {
          leftangles[i].active = b_is_active;
          break;
      }
  }
};

/**
 * general update leftangle function
 * @param {int} id - leftangle id
 * @param {Taskboard_Comp_DS} updated_leftangle - update leftangle data   
 */
const _update_leftangle_general = (updated_leftangle, meta_action) => {
        
    if(meta_action === META_ACTIONS.REDO || meta_action === META_ACTIONS.UNDO)
    {
        for(let i=0; i<leftangles.length; i++)
        {
            if(leftangles[i].id === updated_leftangle.id)
            {
                leftangles[i].x1_pos = updated_leftangle.x1_pos;
                leftangles[i].y1_pos = updated_leftangle.y1_pos;
                leftangles[i].x2_pos = updated_leftangle.x2_pos;
                leftangles[i].y2_pos = updated_leftangle.y2_pos;
                leftangles[i].colour = updated_leftangle.colour;
                leftangles[i].stroke_width = updated_leftangle.stroke_width; 
                leftangles[i].win_width_perc = updated_leftangle.win_width_perc;
                leftangles[i].text = updated_leftangle.text;
                leftangles[i].highlighted = false;
                leftangles[i].active = false;
                leftangles[i].toolbar_show = updated_leftangle.toolbar_show;
                leftangles[i].toolbar_display_loc = updated_leftangle.toolbar_display_loc;
                leftangles[i].join_arrow_ids = updated_leftangle.join_arrow_ids;
                leftangles[i].filleted = updated_leftangle.filleted;
                leftangles[i].taskboard_type = updated_leftangle.taskboard_type;
                leftangles[i].taskboard_id = updated_leftangle.taskboard_id;
                
                return true;
            }
        }
    }

    return false;
};

export {
    _add_leftangle,
    _update_leftangle_end_pos,
    _update_leftangle_start_pos,
    _update_leftangle_highlighted,
    _update_leftangle_colour,
    _update_leftangle_toolbar_show,
    _update_leftangle_toolbar_loc,
    _delete_leftangle,
    _increase_leftangle_width,
    _decrease_leftangle_width,
    _update_leftangle_active_state,
    _update_leftangle_general,
};