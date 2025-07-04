import rightangles from "../db/taskboards/rightangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, UNUSED, ARROW_JOIN_POINT } from "../common/globals";

const _calculate_rightangle_length = (rightangle_start_pos_x, rightangle_start_pos_y, rightangle_end_pos_x, rightangle_end_pos_y) => {
  const dx = rightangle_end_pos_x - rightangle_start_pos_x;
  const dy = rightangle_end_pos_y - rightangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

const _add_rightangle = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width, filleted, taskboard_type, taskboard_id) => {
  let rightangle_length = _calculate_rightangle_length(x1_pos, y1_pos, x2_pos, y2_pos);
  
  if(rightangle_length < MIN_LINE_LENGTH)
  {
    x2_pos = x1_pos + MIN_LINE_LENGTH;
    y2_pos = y1_pos + MIN_LINE_LENGTH;
  }
  // this structure definition follows the format defined in taskboard_components_data_structure.txt 
  const new_rightangle = { 
      id: id,
      x1_pos: x1_pos,
      y1_pos: y1_pos,
      x2_pos: x2_pos,
      y2_pos: y2_pos,
      colour: colour,
      stroke_width: stroke_width, 
      win_width_perc: UNUSED,
      text: UNUSED,
      highlighted: true,
      active: false,
      toolbar_show: true,
      toolbar_display_loc: {x: 200, y: 200},
      join_arrow_ids: {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
      filleted: filleted,
  };
  rightangles.push(new_rightangle);
};

/**
 * update end point for an rightangle
 * @param {int} id - rightangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_rightangle_end_pos = (id, new_x2_pos, new_y2_pos) => {    
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
const _update_rightangle_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<rightangles.length; i++)
  {
    if(rightangles[i].id === id)
    {
      rightangles[i].x1_pos = new_x1_pos;
      rightangles[i].y1_pos = new_y1_pos;
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
 */
const _delete_rightangle = (id) => {
  const index = rightangles.findIndex(rightangle => rightangle.id === id);
  if (index !== -1) {
      rightangles.splice(index, 1); 
  }
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
};