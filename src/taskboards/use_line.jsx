import lines from "../db/taskboards/lines_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, UNUSED, META_ACTIONS} from "../common/globals";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";
import { MIN_ARROW_LENGTH } from "../common/globals";

const _calculate_line_length = (line_start_pos_x, line_start_pos_y, line_end_pos_x, line_end_pos_y) => {
  const dx = line_end_pos_x - line_start_pos_x;
  const dy = line_end_pos_y - line_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * add new line
 * @param {Taskboard_Comp_DS} new_line 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if line added successfully, false otherwise
 */
const _add_line = (new_line, meta_action = META_ACTIONS.NONE) => {

  if(typeof new_line !== "object" || new_line == null) return false;

  let line_length = _calculate_line_length(new_line.x1_pos, new_line.y1_pos, new_line.x2_pos, new_line.y2_pos);
  
  if(line_length < MIN_ARROW_LENGTH)
  {
    new_line.x2_pos = new_line.x1_pos + MIN_ARROW_LENGTH;
    new_line.y2_pos = new_line.y1_pos + MIN_ARROW_LENGTH;
  }

  new_line.join_arrow_ids = UNUSED;

  lines.push(new_line);

  return true;
};

/**
 * update end point for an line
 * @param {int} id - line id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 * @param {boolean} b_drawing_over - true if drawing is finished for an line
 */
const _update_line_end_pos = (id, new_x2_pos, new_y2_pos, b_drawing_over) => {    
    for(let i=0; i<lines.length; i++)
    {
      if(lines[i].id === id)
      {
        let line_length = _calculate_line_length(lines[i].x1_pos, lines[i].y1_pos, new_x2_pos, new_y2_pos);
  
        if(line_length < MIN_ARROW_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_ARROW_LENGTH;
          new_y2_pos = new_y2_pos + MIN_ARROW_LENGTH;
        }

        lines[i].x2_pos = new_x2_pos;
        lines[i].y2_pos = new_y2_pos;

        if(b_drawing_over)
        {
          // add action to activity tracker
          const activity = new Taskboard_Activity(lines[i].taskboard_id, ACTIONS.ADD, lines[i]);
          const activity_tracker = new Taskboard_Activity_Tracker(lines[i].taskboard_id);
          let b_result = activity_tracker._add_activity(lines[i].taskboard_id, activity);
        }

        break;
      }
    }
};

/**
 * update start point for an line
 * @param {int} id - line id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_line_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<lines.length; i++)
  {
    if(lines[i].id === id)
    {
      lines[i].x1_pos = new_x1_pos;
      lines[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update line highlighted flag
 * @param {int} id - line id
 * @param {boolean} highlighted - line highlighted
 */
const _update_line_highlighted = (id, highlighted) => {
    for(let i=0; i<lines.length; i++)
    {
      if(lines[i].id === id)
      {
        lines[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update line colour
 * @param {int} id - line id
 * @param {string} colour colour hex string
 */
const _update_line_colour = (id, colour) => {
  for(let i=0; i<lines.length; i++)
  {
    if(lines[i].id === id)
    {
      lines[i].colour = colour;
      break;
    }
  }
};

/**
 * update line toolbar show
 * @param {int} id - line id
 * @param {bool} b_show_toolbar - line toolbar is active
 */
const _update_line_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<lines.length; i++)
  {
      if(lines[i].id === id)
      {
          lines[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update line toolbar location
 * @param {int} id - line id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_line_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<lines.length; i++)
  {
      if(lines[i].id === id)
      {
          lines[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete line
 * @param {int} id - line id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @returns true if line deleted successfully, false otherwise
 */
const _delete_line = (id, meta_action = META_ACTIONS.NONE) => {
  let b_result = false;
  const index = lines.findIndex(line => line.id === id);

  if (index !== -1) {
    b_result = true;
    
    let line = lines[index];
    lines.splice(index, 1); 

    if(meta_action === META_ACTIONS.NONE)
    {
      // add action to activity tracker
      const delete_activity = new Taskboard_Activity(line.taskboard_id, ACTIONS.DELETE, line);
      const activity_tracker = new Taskboard_Activity_Tracker(line.taskboard_id);
      b_result = activity_tracker._add_activity(line.taskboard_id, delete_activity);
    }
  }

  return b_result;
};

/**
 * increase line width
 * @param {int} id - line id
 */
const _increase_line_width = (id) => {
  for(let i=0; i<lines.length; i++)
  {
    if(lines[i].id === id)
    {
      let increment = (lines[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(lines[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        lines[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        lines[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease line width
 * @param {int} id - line id
 */
const _decrease_line_width = (id) => {
  for(let i=0; i<lines.length; i++)
  {
    if(lines[i].id === id)
    {
      let decrement = (lines[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(lines[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        lines[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        lines[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

export {
    _add_line,
    _update_line_end_pos,
    _update_line_start_pos,
    _update_line_highlighted,
    _update_line_colour,
    _update_line_toolbar_show,
    _update_line_toolbar_loc,
    _delete_line,
    _increase_line_width,
    _decrease_line_width,
};