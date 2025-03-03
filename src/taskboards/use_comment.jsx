import { _get_global_last_item_add_or_move_loc, _set_global_last_item_add_or_move_loc } from "./taskboard_globals";
import { _set_global_cursor_type } from "./taskboard_globals";
import { SELECTED_COLOR_THEME } from "../common/globals";
import { COMMENT_WIDTH_PERC_DEFAULT } from "./taskboard_globals";

import comments from "./comments_db_temp";

/**
 * add sticky note
 * @param {bool} clicked - item was clicked
 * @param {float} pos_x - x cord to add note
 * @param {float} pos_y - y cord to add note   
 */
/**
 * add comment 
 * @param {bool} clicked - item was clicked
 * @param {float} pos_x - x cord to add note
 * @param {float} pos_y - y cord to add note   
 */
const _add_comment = (clicked = true, pos_x = 100, pos_y = 100) => {
    // select cursor
    _set_global_cursor_type('default');
    
    if(clicked)
    {
      // set cursor type
      _set_global_cursor_type('default');

      // get last add/drag location
      const {loc_x, loc_y} = _get_global_last_item_add_or_move_loc();  
      let new_loc_x = loc_x + 20;
      let new_loc_y = loc_y + 20;
      const new_comment = { 
        id: Date.now(), 
        text: "", 
        x_pos: new_loc_x, 
        y_pos: new_loc_y, 
        colour: SELECTED_COLOR_THEME,
        win_width_perc: COMMENT_WIDTH_PERC_DEFAULT, 
      };
      _set_global_last_item_add_or_move_loc(new_loc_x, new_loc_y); // update last added location
      comments.push(new_comment);
    }
    else
    {
      // dragged
      const new_comment = { 
        id: Date.now(), 
        text: "", 
        x_pos: pos_x, 
        y_pos: pos_y, 
        colour: SELECTED_COLOR_THEME,
        win_width_perc: COMMENT_WIDTH_PERC_DEFAULT, 
      };
      comments.push(new_comment);
    }
  };

const _delete_comment = (id) => {
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1); 
    }
};

/**
   * update comment text
   * @param {int} id - comment id
   * @param {string} text - comment text  
   */
const _update_comment_text = (id, text) => {
    for(let i=0; i<comments.length; i++)
    {
        if(comments[i].id === id)
        {
            comments[i].text = text;
            break;
        }
    }
};

/**
   * update comment colour
   * @param {int} id - comment id
   * @param {string} colour - hex string of comment colour   
   */
const _update_comment_colour = (id, colour) => {
    for(let i=0; i<comments.length; i++)
    {
        if(comments[i].id === id)
        {
            comments[i].colour = colour;
            break;
        }
    }
};

/**
   * update comment width percentage
   * @param {int} id - comment id
   * @param {float} win_width_perc - comment width in percentage wrt window size
   */
const _update_comment_win_width_perc = (id, win_width_perc) => {
    for(let i=0; i<comments.length; i++)
    {
        if(comments[i].id === id)
        {
            comments[i].win_width_perc = win_width_perc;
            break;
        }
    }
};

/**
   * update comment location
   * @param {int} id - comment id
   * @param {int} int_x_cord - comment x cordinate
   * @param {int} int_y_cord - comment y cordinate
   */
const _update_comment_loc = (int_id, int_x_cord, int_y_cord) => {
    for(let i=0; i<comments.length; i++)
    {
        if(comments[i].id === int_id)
        {
            comments[i].x_pos = int_x_cord;
            comments[i].y_pos = int_y_cord;
            break;
        }
    }
};

export {
    _add_comment,
    _delete_comment,
    _update_comment_text,
    _update_comment_colour,
    _update_comment_win_width_perc,
    _update_comment_loc,
};