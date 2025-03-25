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

export {
    _add_arrow,
    _update_arrow_end_pos,
    _update_arrow_start_pos,
    _update_arrow_highlighted,
    _update_arrow_colour,
};