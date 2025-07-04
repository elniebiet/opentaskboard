import rectangles from "../db/taskboards/rectangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
MIN_LINE_LENGTH, ARROW_JOIN_POINT, UNUSED, META_ACTIONS } from "../common/globals";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";

const _calculate_rectangle_length = (rectangle_start_pos_x, rectangle_start_pos_y, rectangle_end_pos_x, rectangle_end_pos_y) => {
  const dx = rectangle_end_pos_x - rectangle_start_pos_x;
  const dy = rectangle_end_pos_y - rectangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * add new rectangle
 * @param {Taskboard_Comp_DS} new_rectangle 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if rectangle added successfully, false otherwise
 */
const _add_rectangle = (new_rectangle, meta_action = META_ACTIONS.NONE) => {

    if(typeof new_rectangle !== "object" || new_rectangle == null) return false;

    let rectangle_length = _calculate_rectangle_length(new_rectangle.x1_pos, new_rectangle.y1_pos, new_rectangle.x2_pos, new_rectangle.y2_pos);
    
    if(rectangle_length < MIN_LINE_LENGTH)
    {
        new_rectangle.x2_pos = new_rectangle.x1_pos + MIN_LINE_LENGTH;
        new_rectangle.y2_pos = new_rectangle.y1_pos + MIN_LINE_LENGTH;
    }
    
    new_rectangle.win_width_perc = UNUSED,
    new_rectangle.text = UNUSED,
    new_rectangle.highlighted = true,
    new_rectangle.active = false,
    new_rectangle.toolbar_show = true,
    new_rectangle.toolbar_display_loc = {x: 200, y: 200},
    new_rectangle.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},

    rectangles.push(new_rectangle);

    return true;
};

/**
 * update end point for an rectangle
 * @param {int} id - rectangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for a rectangle
 */
const _update_rectangle_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
  for(let i=0; i<rectangles.length; i++)
  {
    if(rectangles[i].id === id)
    {
        let rectangle_length = _calculate_rectangle_length(rectangles[i].x1_pos, rectangles[i].y1_pos, new_x2_pos, new_y2_pos);
      
        if(rectangle_length < MIN_LINE_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
          new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
        }

        rectangles[i].x2_pos = new_x2_pos;
        rectangles[i].y2_pos = new_y2_pos;

        if(b_drawing_over)
        {
          // add action to activity tracker
          const activity = new Taskboard_Activity(rectangles[i].taskboard_id, ACTIONS.ADD, rectangles[i]);
          const activity_tracker = new Taskboard_Activity_Tracker(rectangles[i].taskboard_type);
          let b_result = activity_tracker._add_activity(rectangles[i].taskboard_type, activity);
        }

        break;
    }
  }
};

/**
 * update start point for an rectangle
 * @param {int} id - rectangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_rectangle_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<rectangles.length; i++)
  {
    if(rectangles[i].id === id)
    {
      rectangles[i].x1_pos = new_x1_pos;
      rectangles[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update rectangle highlighted flag
 * @param {int} id - rectangle id
 * @param {boolean} highlighted - rectangle highlighted
 */
const _update_rectangle_highlighted = (id, highlighted) => {
    for(let i=0; i<rectangles.length; i++)
    {
      if(rectangles[i].id === id)
      {
        rectangles[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update rectangle colour
 * @param {int} id - rectangle id
 * @param {string} colour colour hex string
 */
const _update_rectangle_colour = (id, colour) => {
  for(let i=0; i<rectangles.length; i++)
  {
    if(rectangles[i].id === id)
    {
      rectangles[i].colour = colour;
      break;
    }
  }
};

/**
 * update rectangle toolbar show
 * @param {int} id - rectangle id
 * @param {bool} b_show_toolbar - rectangle toolbar is active
 */
const _update_rectangle_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<rectangles.length; i++)
  {
      if(rectangles[i].id === id)
      {
          rectangles[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update rectangle toolbar location
 * @param {int} id - rectangle id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_rectangle_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<rectangles.length; i++)
  {
      if(rectangles[i].id === id)
      {
          rectangles[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete rectangle
 * @param {int} id - rectangle id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 */
const _delete_rectangle = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;

  const index = rectangles.findIndex(rectangle => rectangle.id === id);

  if (index !== -1) {
      b_result = true; 
      
      let rectangle = rectangles[index];

      rectangles.splice(index, 1); 

      if(meta_action === META_ACTIONS.NONE)
      {
        // add action to activity tracker
        const delete_activity = new Taskboard_Activity(rectangle.taskboard_id, ACTIONS.DELETE, rectangle);
        const activity_tracker = new Taskboard_Activity_Tracker(rectangle.taskboard_type);
        b_result = activity_tracker._add_activity(rectangle.taskboard_type, delete_activity);
      }
  }

  return b_result;
};

/**
 * increase rectangle width
 * @param {int} id - rectangle id
 */
const _increase_rectangle_width = (id) => {
  for(let i=0; i<rectangles.length; i++)
  {
    if(rectangles[i].id === id)
    {
      let increment = (rectangles[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(rectangles[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        rectangles[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        rectangles[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease rectangle width
 * @param {int} id - rectangle id
 */
const _decrease_rectangle_width = (id) => {
  for(let i=0; i<rectangles.length; i++)
  {
    if(rectangles[i].id === id)
    {
      let decrement = (rectangles[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(rectangles[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        rectangles[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        rectangles[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

/**
 * update rectangle active state
 * @param {int} id - rectangle id
 * @param {bool} b_is_active - rectangle is active
 */
const _update_rectangle_active_state = (id, b_is_active) => {
  for(let i=0; i<rectangles.length; i++)
  {
      if(rectangles[i].id === id)
      {
          rectangles[i].active = b_is_active;
          break;
      }
  }
};

export {
    _add_rectangle,
    _update_rectangle_end_pos,
    _update_rectangle_start_pos,
    _update_rectangle_highlighted,
    _update_rectangle_colour,
    _update_rectangle_toolbar_show,
    _update_rectangle_toolbar_loc,
    _delete_rectangle,
    _increase_rectangle_width,
    _decrease_rectangle_width,
    _update_rectangle_active_state,
};