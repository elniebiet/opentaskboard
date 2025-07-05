import circles from "../db/taskboards/circles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, ARROW_JOIN_POINT, UNUSED  } from "../common/globals";
import { META_ACTIONS } from "../common/globals";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { ACTIONS } from "../common/globals";

const _calculate_circle_length = (circle_start_pos_x, circle_start_pos_y, circle_end_pos_x, circle_end_pos_y) => {
  const dx = circle_end_pos_x - circle_start_pos_x;
  const dy = circle_end_pos_y - circle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};


/**
 * add new circle
 * @param {Taskboard_Comp_DS} new_circle 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if circle added successfully, false otherwise
 */
const _add_circle = (new_circle, meta_action = META_ACTIONS.NONE) => {

  if(typeof new_circle !== "object" || new_circle == null) return false;

  let circle_length = _calculate_circle_length(new_circle.x1_pos, new_circle.y1_pos, new_circle.x2_pos, new_circle.y2_pos);
  
  if(circle_length < MIN_LINE_LENGTH)
  {
    new_circle.x2_pos = new_circle.x1_pos + MIN_LINE_LENGTH;
    new_circle.y2_pos = new_circle.y1_pos + MIN_LINE_LENGTH;
  }
  
  new_circle.win_width_perc = UNUSED,
  new_circle.text = UNUSED,
  new_circle.highlighted = true,
  new_circle.active = false,
  new_circle.toolbar_show = true,
  new_circle.toolbar_display_loc = {x: 200, y: 200},
  new_circle.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
  new_circle.filleted = UNUSED;

  circles.push(new_circle);

  return true;
};

/**
 * update end point for an circle
 * @param {int} id - circle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for a circle
 */
const _update_circle_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
    for(let i=0; i<circles.length; i++)
    {
      if(circles[i].id === id)
      {
        let circle_length = _calculate_circle_length(circles[i].x1_pos, circles[i].y1_pos, new_x2_pos, new_y2_pos);
  
        if(circle_length < MIN_LINE_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
          new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
        }

        circles[i].x2_pos = new_x2_pos;
        circles[i].y2_pos = new_y2_pos;

        if(b_drawing_over)
        {
          // add action to activity tracker
          const activity = new Taskboard_Activity(circles[i].taskboard_id, ACTIONS.ADD, circles[i]);
          const activity_tracker = new Taskboard_Activity_Tracker(circles[i].taskboard_id);
          let b_result = activity_tracker._add_activity(circles[i].taskboard_id, activity);
        }

        break;
      }
    }
};

/**
 * update start point for an circle
 * @param {int} id - circle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_circle_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<circles.length; i++)
  {
    if(circles[i].id === id)
    {
      circles[i].x1_pos = new_x1_pos;
      circles[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update circle highlighted flag
 * @param {int} id - circle id
 * @param {boolean} highlighted - circle highlighted
 */
const _update_circle_highlighted = (id, highlighted) => {
    for(let i=0; i<circles.length; i++)
    {
      if(circles[i].id === id)
      {
        circles[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update circle colour
 * @param {int} id - circle id
 * @param {string} colour colour hex string
 */
const _update_circle_colour = (id, colour) => {
  for(let i=0; i<circles.length; i++)
  {
    if(circles[i].id === id)
    {
      circles[i].colour = colour;
      break;
    }
  }
};

/**
 * update circle toolbar show
 * @param {int} id - circle id
 * @param {bool} b_show_toolbar - circle toolbar is active
 */
const _update_circle_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<circles.length; i++)
  {
      if(circles[i].id === id)
      {
          circles[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update circle toolbar location
 * @param {int} id - circle id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_circle_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<circles.length; i++)
  {
      if(circles[i].id === id)
      {
          circles[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete circle
 * @param {int} id - circle id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 */
const _delete_circle = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;

  const index = circles.findIndex(circle => circle.id === id);

  if (index !== -1) {
    b_result = true; 
    
    let circle = circles[index];

    circles.splice(index, 1); 

    if(meta_action === META_ACTIONS.NONE)
    {
      // add action to activity tracker
      const delete_activity = new Taskboard_Activity(circle.taskboard_id, ACTIONS.DELETE, circle);
      const activity_tracker = new Taskboard_Activity_Tracker(circle.taskboard_id);
      b_result = activity_tracker._add_activity(circle.taskboard_id, delete_activity);
    }
  }

  return b_result;
};

/**
 * increase circle width
 * @param {int} id - circle id
 */
const _increase_circle_width = (id) => {
  for(let i=0; i<circles.length; i++)
  {
    if(circles[i].id === id)
    {
      let increment = (circles[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(circles[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        circles[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        circles[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease circle width
 * @param {int} id - circle id
 */
const _decrease_circle_width = (id) => {
  for(let i=0; i<circles.length; i++)
  {
    if(circles[i].id === id)
    {
      let decrement = (circles[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(circles[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        circles[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        circles[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

/**
 * update circle active state
 * @param {int} id - circle id
 * @param {bool} b_is_active - circle is active
 */
const _update_circle_active_state = (id, b_is_active) => {
  for(let i=0; i<circles.length; i++)
  {
      if(circles[i].id === id)
      {
          circles[i].active = b_is_active;
          break;
      }
  }
};

export {
    _add_circle,
    _update_circle_end_pos,
    _update_circle_start_pos,
    _update_circle_highlighted,
    _update_circle_colour,
    _update_circle_toolbar_show,
    _update_circle_toolbar_loc,
    _delete_circle,
    _increase_circle_width,
    _decrease_circle_width,
    _update_circle_active_state,
};