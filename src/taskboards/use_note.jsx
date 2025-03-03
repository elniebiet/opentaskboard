import { _get_global_last_item_add_or_move_loc, _set_global_last_item_add_or_move_loc } from "./taskboard_globals";
import { _set_global_cursor_type } from "./taskboard_globals";
import { SELECTED_COLOR_THEME } from "../common/globals";
import { STKNOTE_WIDTH_PERC_DEFAULT } from "./taskboard_globals";

import notes from "./notes_db_temp";

/**
 * add sticky note
 * @param {bool} clicked - item was clicked
 * @param {float} pos_x - x cord to add note
 * @param {float} pos_y - y cord to add note   
 */
const _add_note = (clicked = true, pos_x = 100, pos_y = 100) => {
    if(clicked)
    {  
        // set cursor type
        _set_global_cursor_type('default');

        // get last add/drag location
        const {loc_x, loc_y} = _get_global_last_item_add_or_move_loc();  
        let new_loc_x = loc_x + 20;
        let new_loc_y = loc_y + 20;
        const new_note = { 
        id: Date.now(),
        text: "",
        x_pos: new_loc_x,
        y_pos: new_loc_y,
        colour: SELECTED_COLOR_THEME,
        win_width_perc: STKNOTE_WIDTH_PERC_DEFAULT 
        };
        _set_global_last_item_add_or_move_loc(new_loc_x, new_loc_y); // update last added location
        notes.push(new_note);
    }
    else
    {

        // dragged
        const new_note = { 
        id: Date.now(), 
        text: "", 
        x_pos: pos_x, 
        y_pos: pos_y, 
        colour: SELECTED_COLOR_THEME, 
        win_width_perc: STKNOTE_WIDTH_PERC_DEFAULT 
        };
        notes.push(new_note);
    }
};

const _delete_note = (id) => {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1); 
    }
};

/**
 * update note text
 * @param {int} id - note id
 * @param {string} text - note text
 */
const _update_note_text = (id, text) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].text = text;
            break;
        }
    }
};

/**
 * update note colour
 * @param {int} id - note id
 * @param {string} colour - hex string of note colour   
 */
const _update_note_colour = (id, colour) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].colour = colour;
            break;
        }
    }
};

/**
 * update note width percentage
 * @param {int} id - note id
 * @param {float} win_width_perc - note width in percentage wrt window size
 */
const _update_note_win_width_perc = (id, win_width_perc) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].win_width_perc = win_width_perc;
            break;
        }
    }
};

/**
   * update note location
   * @param {int} id - note id
   * @param {int} int_x_cord - note x cordinate
   * @param {int} int_y_cord - note y cordinate
   */
const _update_note_loc = (int_id, int_x_cord, int_y_cord) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === int_id)
        {
            notes[i].x_pos = int_x_cord;
            notes[i].y_pos = int_y_cord;
            break;
        }
    }
};

export {
    _add_note,
    _delete_note,
    _update_note_text,
    _update_note_colour,
    _update_note_win_width_perc,
    _update_note_loc,
};