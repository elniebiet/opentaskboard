import triangles from "../db/taskboards/triangles_db_temp";
import { LINE_WIDTH_INCR_FACTOR, LINE_WIDTH_DECR_FACTOR, MAX_LINE_WIDTH, MIN_LINE_WIDTH,
  MIN_LINE_LENGTH, 
  UNUSED} from "../common/globals";
import { ARROW_JOIN_POINT } from "../common/globals";

const _calculate_triangle_length = (triangle_start_pos_x, triangle_start_pos_y, triangle_end_pos_x, triangle_end_pos_y) => {
  const dx = triangle_end_pos_x - triangle_start_pos_x;
  const dy = triangle_end_pos_y - triangle_start_pos_y;
  return Math.sqrt(dx * dx + dy * dy);
};

const _add_triangle = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width, filleted) => {
  let triangle_length = _calculate_triangle_length(x1_pos, y1_pos, x2_pos, y2_pos);
  
  if(triangle_length < MIN_LINE_LENGTH)
  {
    x2_pos = x1_pos + MIN_LINE_LENGTH;
    y2_pos = y1_pos + MIN_LINE_LENGTH;
  }

  const new_triangle = { 
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
  triangles.push(new_triangle);
};

/**
 * update end point for an triangle
 * @param {int} id - triangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_triangle_end_pos = (id, new_x2_pos, new_y2_pos) => {    
    for(let i=0; i<triangles.length; i++)
    {
      if(triangles[i].id === id)
      {
        let triangle_length = _calculate_triangle_length(triangles[i].x1_pos, triangles[i].y1_pos, new_x2_pos, new_y2_pos);

        if(triangle_length < MIN_LINE_LENGTH)
        {
          new_x2_pos = new_x2_pos + MIN_LINE_LENGTH;
          new_y2_pos = new_y2_pos + MIN_LINE_LENGTH;
        }

        triangles[i].x2_pos = new_x2_pos;
        triangles[i].y2_pos = new_y2_pos;
        break;
      }
    }
};

/**
 * update start point for an triangle
 * @param {int} id - triangle id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_triangle_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      triangles[i].x1_pos = new_x1_pos;
      triangles[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update triangle highlighted flag
 * @param {int} id - triangle id
 * @param {boolean} highlighted - triangle highlighted
 */
const _update_triangle_highlighted = (id, highlighted) => {
    for(let i=0; i<triangles.length; i++)
    {
      if(triangles[i].id === id)
      {
        triangles[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update triangle colour
 * @param {int} id - triangle id
 * @param {string} colour colour hex string
 */
const _update_triangle_colour = (id, colour) => {
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      triangles[i].colour = colour;
      break;
    }
  }
};

/**
 * update triangle toolbar show
 * @param {int} id - triangle id
 * @param {bool} b_show_toolbar - triangle toolbar is active
 */
const _update_triangle_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<triangles.length; i++)
  {
      if(triangles[i].id === id)
      {
          triangles[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update triangle toolbar location
 * @param {int} id - triangle id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_triangle_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<triangles.length; i++)
  {
      if(triangles[i].id === id)
      {
          triangles[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

/**
 * delete triangle
 * @param {int} id - triangle id
 */
const _delete_triangle = (id) => {
  const index = triangles.findIndex(triangle => triangle.id === id);
  if (index !== -1) {
      triangles.splice(index, 1); 
  }
};

/**
 * increase triangle width
 * @param {int} id - triangle id
 */
const _increase_triangle_width = (id) => {
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      let increment = (triangles[i].stroke_width * LINE_WIDTH_INCR_FACTOR);

      if(triangles[i].stroke_width + increment > MAX_LINE_WIDTH)
      {
        triangles[i].stroke_width = MAX_LINE_WIDTH;
      }
      else
      {
        triangles[i].stroke_width += increment;
      }

      break;
    }
  }
};

/**
 * decrease triangle width
 * @param {int} id - triangle id
 */
const _decrease_triangle_width = (id) => {
  for(let i=0; i<triangles.length; i++)
  {
    if(triangles[i].id === id)
    {
      let decrement = (triangles[i].stroke_width * LINE_WIDTH_DECR_FACTOR);
      
      if(triangles[i].stroke_width - decrement < MIN_LINE_WIDTH)
      {
        triangles[i].stroke_width = MIN_LINE_WIDTH;
      }
      else
      {
        triangles[i].stroke_width -= decrement;
      }

      break;
    }
  }
};

/**
 * update triangle active state
 * @param {int} id - triangle id
 * @param {bool} b_is_active - triangle is active
 */
const _update_triangle_active_state = (id, b_is_active) => {
  for(let i=0; i<triangles.length; i++)
  {
      if(triangles[i].id === id)
      {
          triangles[i].active = b_is_active;
          break;
      }
  }
};

export {
    _add_triangle,
    _update_triangle_end_pos,
    _update_triangle_start_pos,
    _update_triangle_highlighted,
    _update_triangle_colour,
    _update_triangle_toolbar_show,
    _update_triangle_toolbar_loc,
    _delete_triangle,
    _increase_triangle_width,
    _decrease_triangle_width,
    _update_triangle_active_state,
};