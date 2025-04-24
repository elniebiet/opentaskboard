import { _get_global_last_item_add_or_move_loc, _set_global_last_item_add_or_move_loc } from "./taskboard_globals";
import { _set_global_cursor_type } from "./taskboard_globals";
import { SELECTED_COLOR_THEME } from "../common/globals";
import { STKNOTE_WIDTH_PERC_DEFAULT } from "./taskboard_globals";
import { ARROW_JOIN_POINT } from "../common/globals";

// temporary note database for testing
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
            colour: SELECTED_COLOR_THEME.bg_colour,
            active: false,
            win_width_perc: STKNOTE_WIDTH_PERC_DEFAULT,
            toolbar_show: true,
            toolbar_display_loc: {x: 200, y: 200},
            highlighted: true,
            join_arrow_ids: {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
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
            colour: SELECTED_COLOR_THEME.bg_colour, 
            active: false,
            win_width_perc: STKNOTE_WIDTH_PERC_DEFAULT,
            toolbar_show: true,
            toolbar_display_loc: {x: 200, y: 200},
            highlighted: true,   
            join_arrow_ids: {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
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
 * get note width percentage
 * @param {int} id - note id
 * @return {float} win_width_perc - note width in percentage wrt window size
 */
const _get_note_win_width_perc = (id) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            return notes[i].win_width_perc;
        }
    }

    return 0;
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

/**
 * update note active state
 * @param {int} id - note id
 * @param {bool} b_is_active - note is active
 */
const _update_note_active_state = (id, b_is_active) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].active = b_is_active;
            break;
        }
    }
};

/**
 * update note toolbar show
 * @param {int} id - note id
 * @param {bool} b_show_toolbar - note is active
 */
const _update_note_toolbar_show = (id, b_show_toolbar) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].toolbar_show = b_show_toolbar;
            break;
        }
    }
};

/**
 * update note toolbar location
 * @param {int} id - note id
 * @param {int} int_loc_x - x position
 * @param {int} int_loc_y - y position
 */
const _update_note_toolbar_loc = (id, int_loc_x, int_loc_y) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].toolbar_display_loc = {x: int_loc_x, y: int_loc_y};
            break;
        }
    }
};

/**
 * update note highlighted
 * @param {int} id - note id
 * @param {boolean} note_highlighted
 */
const _update_note_highlighted = (id, note_highlighted) => {
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            notes[i].highlighted = note_highlighted;
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
    _get_note_win_width_perc,
    _update_note_loc,
    _update_note_active_state,
    _update_note_toolbar_show,
    _update_note_toolbar_loc,
    _update_note_highlighted,
};