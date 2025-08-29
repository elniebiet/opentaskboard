import rightangles from "../db/taskboards/rightangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, UNUSED, ARROW_JOIN_POINT, META_ACTIONS } from "../common/globals";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";
import { _add_activity_to_tracker } from "./components/taskboard_activity_tracker_mgt";

const _calculate_rightangle_length = (rightangle_start_pos_x, rightangle_start_pos_y, rightangle_end_pos_x, rightangle_end_pos_y) => {
  const dx = rightangle_end_pos_x - rightangle_start_pos_x;
  const dy = rightangle_end_pos_y - rightangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * add new rightangle
 * @param {Taskboard_Comp_DS} new_rightangle 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if rightangle added successfully, false otherwise
 */
const _add_rightangle = (new_rightangle, meta_action = META_ACTIONS.NONE) => {

    if(typeof new_rightangle !== "object" || new_rightangle == null) return false;

    let rightangle_length = _calculate_rightangle_length(new_rightangle.x1_pos, new_rightangle.y1_pos, new_rightangle.x2_pos, new_rightangle.y2_pos);
    
    if(rightangle_length < MIN_LINE_LENGTH)
    {
      new_rightangle.x2_pos = new_rightangle.x1_pos + MIN_LINE_LENGTH;
      new_rightangle.y2_pos = new_rightangle.y1_pos + MIN_LINE_LENGTH;
    }
    
    new_rightangle.win_width_perc = UNUSED,
    new_rightangle.text = UNUSED,
    new_rightangle.highlighted = true,
    new_rightangle.active = false,
    new_rightangle.toolbar_show = true,
    new_rightangle.toolbar_display_loc = {x: 200, y: 200},
    new_rightangle.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
    new_rightangle.filleted = UNUSED;

    rightangles.push(new_rightangle);

    if(meta_action === META_ACTIONS.NONE)
    {
      let b_result = _add_activity_to_tracker({taskboard_id: new_rightangle.taskboard_id, action_type: ACTIONS.ADD, component_data: new_rightangle});
    }

    return true;
};

/**
 * update end point for an rightangle
 * @param {int} id - rightangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for a rightangle
 */
const _update_rightangle_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
  for(let i=0; i<rightangles.length; i++)
  {
    if(rightangles[i].id === id)
    {
    let rightangle_length = _calculate_rightangle_length(rightangles[i].x1_pos, rightangles[i].y1_pos, new_x2_pos, new_y2_pos);
  
    if(rightangle_length < MIN_LINE_LENGTH)
    {
      new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
      new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
    }

    rightangles[i].x2_pos = new_x2_pos;
    rightangles[i].y2_pos = new_y2_pos;

    if(b_drawing_over)
    {
      // add action to activity tracker
      let b_result = _add_activity_to_tracker({taskboard_id: rightangles[i].taskboard_id, action_type: ACTIONS.UPDATE, component_data: rightangles[i]});
    }

    break;
    }
  }
};

/**
 * update start point for an rightangle
 * @param {int} id - rightangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_rightangle_start_pos = (id, new_x1_pos, new_y1_pos, b_drawing_over = false) => {    
  for(let i=0; i<rightangles.length; i++)
  {
    if(rightangles[i].id === id)
    {
      rightangles[i].x1_pos = new_x1_pos;
      rightangles[i].y1_pos = new_y1_pos;

      let rightangle = rightangles[i];

      if(b_drawing_over)
      {
        let b_result = _add_activity_to_tracker({taskboard_id: rightangle.taskboard_id, action_type: ACTIONS.UPDATE, component_data: rightangle});
      }
      break;
    }
  }
};

/**
 * update rightangle highlighted flag
 * @param {int} id - rightangle id
 * @param {boolean} highlighted - rightangle highlighted
 */
const _update_rightangle_highlighted = (id, highlighted) => {
    for(let i=0; i<rightangles.length; i++)
    {
      if(rightangles[i].id === id)
      {
        rightangles[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update rightangle colour
 * @param {int} id - rightangle id
 * @param {string} colour colour hex string
 */
const _update_rightangle_colour = (id, colour) => {
  for(let i=0; i<rightangles.length; i++)
  {
    if(rightangles[i].id === id)
    {
      rightangles[i].colour = colour;

      let rightangle = rightangles[i];

      let b_result = _add_activity_to_tracker({taskboard_id: rightangle.taskboard_id, action_type: ACTIONS.UPDATE, component_data: rightangle});

      break;
    }
  }
};

/**
 * update rightangle toolbar show
 * @param {int} id - rightangle id
 * @param {bool} b_show_toolbar - rightangle toolbar is active
 */
const _update_rightangle_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<rightangles.length; i++)
  {
      if(rightangles[i].id === id)
      {
          rightangles[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update rightangle toolbar location
 * @param {int} id - rightangle id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_rightangle_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<rightangles.length; i++)
  {
      if(rightangles[i].id === id)
      {
          rightangles[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete rightangle
 * @param {int} id - rightangle id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 */
const _delete_rightangle = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;

  const index = rightangles.findIndex(rightangle => rightangle.id === id);

  if (index !== -1) {
    b_result = true; 
    
    let rightangle = rightangles[index];

    rightangles.splice(index, 1); 

    if(meta_action === META_ACTIONS.NONE)
    {
      // add action to activity tracker
      b_result = _add_activity_to_tracker({taskboard_id: rightangle.taskboard_id, action_type: ACTIONS.DELETE, component_data: rightangle});
    }
  }

  return b_result;
};

/**
 * increase rightangle width
 * @param {int} id - rightangle id
 */
const _increase_rightangle_width = (id) => {
  for(let i=0; i<rightangles.length; i++)
  {
    if(rightangles[i].id === id)
    {
      let increment = (rightangles[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(rightangles[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        rightangles[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        rightangles[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease rightangle width
 * @param {int} id - rightangle id
 */
const _decrease_rightangle_width = (id) => {
  for(let i=0; i<rightangles.length; i++)
  {
    if(rightangles[i].id === id)
    {
      let decrement = (rightangles[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(rightangles[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        rightangles[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        rightangles[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

/**
 * update rightangle active state
 * @param {int} id - rightangle id
 * @param {bool} b_is_active - rightangle is active
 */
const _update_rightangle_active_state = (id, b_is_active) => {
  for(let i=0; i<rightangles.length; i++)
  {
      if(rightangles[i].id === id)
      {
          rightangles[i].active = b_is_active;
          break;
      }
  }
};

/**
 * general update rightangle function
 * @param {int} id - rightangle id
 * @param {Taskboard_Comp_DS} updated_rightangle - update rightangle data   
 */
const _update_rightangle_general = (updated_rightangle, meta_action) => {
        
    if(meta_action === META_ACTIONS.REDO || meta_action === META_ACTIONS.UNDO)
    {
        for(let i=0; i<rightangles.length; i++)
        {
            if(rightangles[i].id === updated_rightangle.id)
            {
                rightangles[i].x1_pos = updated_rightangle.x1_pos;
                rightangles[i].y1_pos = updated_rightangle.y1_pos;
                rightangles[i].x2_pos = updated_rightangle.x2_pos;
                rightangles[i].y2_pos = updated_rightangle.y2_pos;
                rightangles[i].colour = updated_rightangle.colour;
                rightangles[i].stroke_width = updated_rightangle.stroke_width; 
                rightangles[i].win_width_perc = updated_rightangle.win_width_perc;
                rightangles[i].text = updated_rightangle.text;
                rightangles[i].highlighted = false;
                rightangles[i].active = false;
                rightangles[i].toolbar_show = updated_rightangle.toolbar_show;
                rightangles[i].toolbar_display_loc = updated_rightangle.toolbar_display_loc;
                rightangles[i].join_arrow_ids = updated_rightangle.join_arrow_ids;
                rightangles[i].filleted = updated_rightangle.filleted;
                rightangles[i].taskboard_type = updated_rightangle.taskboard_type;
                rightangles[i].taskboard_id = updated_rightangle.taskboard_id;
                
                return true;
            }
        }
    }

    return false;
};

export {
    _add_rightangle,
    _update_rightangle_end_pos,
    _update_rightangle_start_pos,
    _update_rightangle_highlighted,
    _update_rightangle_colour,
    _update_rightangle_toolbar_show,
    _update_rightangle_toolbar_loc,
    _delete_rightangle,
    _increase_rightangle_width,
    _decrease_rightangle_width,
    _update_rightangle_active_state,
    _update_rightangle_general,
};