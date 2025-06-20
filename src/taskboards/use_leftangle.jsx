import leftangles from "../db/taskboards/leftangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, ARROW_JOIN_POINT, UNUSED } from "../common/globals";

const _calculate_leftangle_length = (leftangle_start_pos_x, leftangle_start_pos_y, leftangle_end_pos_x, leftangle_end_pos_y) => {
  const dx = leftangle_end_pos_x - leftangle_start_pos_x;
  const dy = leftangle_end_pos_y - leftangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

const _add_leftangle = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width, filleted) => {
  let leftangle_length = _calculate_leftangle_length(x1_pos, y1_pos, x2_pos, y2_pos);
  
  if(leftangle_length < MIN_LINE_LENGTH)
  {
    x2_pos = x1_pos + MIN_LINE_LENGTH;
    y2_pos = y1_pos + MIN_LINE_LENGTH;
  }

  const new_leftangle = { 
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
  leftangles.push(new_leftangle);
};

/**
 * update end point for an leftangle
 * @param {int} id - leftangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_leftangle_end_pos = (id, new_x2_pos, new_y2_pos) => {    
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
 */
const _delete_leftangle = (id) => {
  const index = leftangles.findIndex(leftangle => leftangle.id === id);
  if (index !== -1) {
      leftangles.splice(index, 1); 
  }
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
};