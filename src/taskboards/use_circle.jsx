import circles from "../db/taskboards/circles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, ARROW_JOIN_POINT, UNUSED  } from "../common/globals";

const _calculate_circle_length = (circle_start_pos_x, circle_start_pos_y, circle_end_pos_x, circle_end_pos_y) => {
  const dx = circle_end_pos_x - circle_start_pos_x;
  const dy = circle_end_pos_y - circle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

const _add_circle = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width) => {

  let circle_length = _calculate_circle_length(x1_pos, y1_pos, x2_pos, y2_pos);
  
  if(circle_length < MIN_LINE_LENGTH)
  {
    x2_pos = x1_pos + MIN_LINE_LENGTH;
    y2_pos = y1_pos + MIN_LINE_LENGTH;
  }

  const new_circle = { 
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
      filleted: UNUSED,
  };
  circles.push(new_circle);
};

/**
 * update end point for an circle
 * @param {int} id - circle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_circle_end_pos = (id, new_x2_pos, new_y2_pos) => {    
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
 */
const _delete_circle = (id) => {
  const index = circles.findIndex(circle => circle.id === id);
  if (index !== -1) {
      circles.splice(index, 1); 
  }
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