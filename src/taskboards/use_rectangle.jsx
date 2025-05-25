import rectangles from "../db/taskboards/rectangles_db_temp";
import { RECTANGLE_LINE_WIDTH_INCR_FACTOR, RECTANGLE_LINE_WIDTH_DECR_FACTOR, MAX_RECTANGLE_LINE_WIDTH, MIN_RECTANGLE_LINE_WIDTH,
  MIN_RECTANGLE_LENGTH } from "../common/globals";
import { ARROW_JOIN_POINT } from "../common/globals";

const _calculate_rectangle_length = (rectangle_start_pos_x, rectangle_start_pos_y, rectangle_end_pos_x, rectangle_end_pos_y) => {
  const dx = rectangle_end_pos_x - rectangle_start_pos_x;
  const dy = rectangle_end_pos_y - rectangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

const _add_rectangle = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width) => {
  let rectangle_length = _calculate_rectangle_length(x1_pos, y1_pos, x2_pos, y2_pos);
  
  if(rectangle_length < MIN_RECTANGLE_LENGTH)
  {
    x2_pos = x1_pos + MIN_RECTANGLE_LENGTH;
    y2_pos = y1_pos + MIN_RECTANGLE_LENGTH;
  }

  const new_rectangle = { 
      id: id,
      x1_pos: x1_pos,
      x2_pos: x2_pos,
      y1_pos: y1_pos,
      y2_pos: y2_pos,
      colour: colour,
      stroke_width: stroke_width, 
      highlighted: true,
      toolbar_show: true,
      toolbar_display_loc: {x: 200, y: 200},
      active: false,
      join_arrow_ids: {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]}
  };
  rectangles.push(new_rectangle);
};

/**
 * update end point for an rectangle
 * @param {int} id - rectangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_rectangle_end_pos = (id, new_x2_pos, new_y2_pos) => {    
    for(let i=0; i<rectangles.length; i++)
    {
      if(rectangles[i].id === id)
      {
        let rectangle_length = _calculate_rectangle_length(rectangles[i].x1_pos, rectangles[i].y1_pos, new_x2_pos, new_y2_pos);

        if(rectangle_length < MIN_RECTANGLE_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_RECTANGLE_LENGTH;
          new_y2_pos = new_y2_pos + MIN_RECTANGLE_LENGTH;
        }

        rectangles[i].x2_pos = new_x2_pos;
        rectangles[i].y2_pos = new_y2_pos;
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
 */
const _delete_rectangle = (id) => {
  const index = rectangles.findIndex(rectangle => rectangle.id === id);
  if (index !== -1) {
      rectangles.splice(index, 1); 
  }
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
      let increment = (rectangles[i].stroke_width * RECTANGLE_LINE_WIDTH_INCR_FACTOR);

      if(rectangles[i].stroke_width + increment > MAX_RECTANGLE_LINE_WIDTH)
      {
        rectangles[i].stroke_width = MAX_RECTANGLE_LINE_WIDTH;
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
      let decrement = (rectangles[i].stroke_width * RECTANGLE_LINE_WIDTH_DECR_FACTOR);
      
      if(rectangles[i].stroke_width - decrement < MIN_RECTANGLE_LINE_WIDTH)
      {
        rectangles[i].stroke_width = MIN_RECTANGLE_LINE_WIDTH;
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