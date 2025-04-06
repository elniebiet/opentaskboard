import arrows from "./arrows_db_temp";

const _add_arrow = (id, x1_pos, y1_pos, x2_pos, y2_pos, colour, stroke_width) => {
    const new_arrow = { 
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
    arrows.push(new_arrow);
};

/**
 * update end point for an arrow
 * @param {int} id - arrow id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_arrow_end_pos = (id, new_x2_pos, new_y2_pos) => {    
    for(let i=0; i<arrows.length; i++)
    {
      if(arrows[i].id === id)
      {
        arrows[i].x2_pos = new_x2_pos;
        arrows[i].y2_pos = new_y2_pos;
        break;
      }
    }
};

/**
 * update start point for an arrow
 * @param {int} id - arrow id
 * @param {int} new_x2_pos - new x cordinate
 * @param {int} new_y2_pos - new y cordinate
 */
const _update_arrow_start_pos = (id, new_x1_pos, new_y1_pos) => {    
  for(let i=0; i<arrows.length; i++)
  {
    if(arrows[i].id === id)
    {
      arrows[i].x1_pos = new_x1_pos;
      arrows[i].y1_pos = new_y1_pos;
      break;
    }
  }
};

/**
 * update arrow highlighted flag
 * @param {int} id - arrow id
 * @param {boolean} highlighted - arrow highlighted
 */
const _update_arrow_highlighted = (id, highlighted) => {
    for(let i=0; i<arrows.length; i++)
    {
      if(arrows[i].id === id)
      {
        arrows[i].highlighted = highlighted;
        break;
      }
    }
};

/**
 * update arrow colour
 * @param {int} id - arrow id
 * @param {string} colour colour hex string
 */
const _update_arrow_colour = (id, colour) => {
  for(let i=0; i<arrows.length; i++)
  {
    if(arrows[i].id === id)
    {
      arrows[i].colour = colour;
      break;
    }
  }
};

/**
 * update arrow toolbar show
 * @param {int} id - arrow id
 * @param {bool} b_show_toolbar - arrow toolbar is active
 */
const _update_arrow_toolbar_show = (id, b_show_toolbar) => {
  for(let i=0; i<arrows.length; i++)
  {
      if(arrows[i].id === id)
      {
          arrows[i].toolbar_show = b_show_toolbar;
          break;
      }
  }
};

/**
 * update arrow toolbar location
 * @param {int} id - arrow id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_arrow_toolbar_loc = (id, int_loc_x, int_loc_y) => {
  for(let i=0; i<arrows.length; i++)
  {
      if(arrows[i].id === id)
      {
          arrows[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
          break;
      }
  }
};

export {
    _add_arrow,
    _update_arrow_end_pos,
    _update_arrow_start_pos,
    _update_arrow_highlighted,
    _update_arrow_colour,
    _update_arrow_toolbar_show,
    _update_arrow_toolbar_loc,
};