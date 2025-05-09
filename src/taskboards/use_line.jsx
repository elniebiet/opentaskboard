import lines from "./lines_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH } from "../common/globals";

const _calculate_line_length = (line_start_pos_x, line_start_pos_y, line_end_pos_x, line_end_pos_y) => {
  const dx = line_end_pos_x - line_start_pos_x;
  const dy = line_end_pos_y - line_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

const _add_line = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width) => {

  let line_length = _calculate_line_length(x1_pos, y1_pos, x2_pos, y2_pos);
  
  if(line_length < MIN_LINE_LENGTH)
  {
    x2_pos = x1_pos + MIN_LINE_LENGTH;
    y2_pos = y1_pos + MIN_LINE_LENGTH;
  }

  const new_line = { 
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
  };
  lines.push(new_line);
};

/**
 * update end point for an line
 * @param {int} id - line id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_line_end_pos = (id, new_x2_pos, new_y2_pos) => {    
    for(let i=0; i<lines.length; i++)
    {
      if(lines[i].id === id)
      {
        let line_length = _calculate_line_length(lines[i].x1_pos, lines[i].y1_pos, new_x2_pos, new_y2_pos);
  
        if(line_length < MIN_LINE_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
          new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
        }

        lines[i].x2_pos = new_x2_pos;
        lines[i].y2_pos = new_y2_pos;
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
 */
const _delete_line = (id) => {
  const index = lines.findIndex(line => line.id === id);
  if (index !== -1) {
      lines.splice(index, 1); 
  }
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