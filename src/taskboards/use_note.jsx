import { _get_global_last_item_add_or_move_loc, _set_global_last_item_add_or_move_loc } from "./taskboard_globals";
import { _set_global_cursor_type } from "./taskboard_globals";
import { STKNOTE_WIDTH_PERC_DEFAULT } from "./taskboard_globals";
import { ARROW_JOIN_POINT, UNUSED, META_ACTIONS } from "../common/globals";
import { SELECTED_COLOR_THEME } from "../common/components/use_colour_themes";
import { COMPONENT_CLSID_PREFIXES } from "../common/otb_component_class_id_prefixes";
import { _otb_generate_uuid } from "../common/otb_id_generator";
import { Taskboard_Activity } from "./components/taskboard_activity";
import { Taskboard_Activity_Tracker } from "./components/taskboard_activity_tracker";
import { ACTIONS } from "../common/globals";
import { Taskboard_Comp_DS } from "./taskboard_components_data_structure";

// temporary note database for testing
import notes from "../db/taskboards/notes_db_temp";

/**
 * add new note
 * @param {Taskboard_Comp_DS} new_note 
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @param {bool} clicked - item was clicked
 * @returns true if note added successfully, false otherwise
 */
const _add_note = (new_note, meta_action, clicked = true) => {
    let b_result = true;

    if(clicked)
    {  
        // set cursor type
        _set_global_cursor_type('default');

        // get last add/drag location
        const {loc_x, loc_y} = _get_global_last_item_add_or_move_loc();  
        let new_loc_x = loc_x + 20;
        let new_loc_y = loc_y + 20;

        let note_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.STICKY_NOTE);
        if(null == note_id) return false;

        // this structure definition follows the format defined in taskboard_components_data_structure.txt 
        new_note.id = note_id;
        new_note.x1_pos = new_loc_x;
        new_note.y1_pos = new_loc_y;
        new_note.x2_pos = UNUSED;
        new_note.y2_pos = UNUSED;
        new_note.colour = SELECTED_COLOR_THEME.bg_colour;
        new_note.stroke_width = UNUSED;
        new_note.win_width_perc = STKNOTE_WIDTH_PERC_DEFAULT;
        new_note.text = "";
        new_note.highlighted = true;
        new_note.active = false;
        new_note.toolbar_show = true;
        new_note.toolbar_display_loc = {x: 200, y: 200};
        new_note.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]};
        new_note.filleted = UNUSED;

        _set_global_last_item_add_or_move_loc(new_loc_x, new_loc_y); // update last added location
        notes.push(new_note);
        
        // check for meta action and add activity
        if(meta_action === META_ACTIONS.NONE)
        {
            const activity = new Taskboard_Activity(new_note.taskboard_id, ACTIONS.ADD, new_note);
            const activity_tracker = new Taskboard_Activity_Tracker(new_note.taskboard_type);
            b_result = activity_tracker._add_activity(new_note.taskboard_type, activity);
        } 

    }
    else
    {
        // dragged
        if(meta_action === META_ACTIONS.NONE)
        {
            let note_id = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.STICKY_NOTE);
            if(null == note_id) return false;
            new_note.id = note_id;
            new_note.x2_pos = UNUSED;
            new_note.y2_pos = UNUSED;
            new_note.colour = SELECTED_COLOR_THEME.bg_colour;
            new_note.stroke_width = UNUSED;
            new_note.win_width_perc = STKNOTE_WIDTH_PERC_DEFAULT;
            new_note.text = "";
            new_note.highlighted = true;
            new_note.active = false;
            new_note.toolbar_show = true;
            new_note.toolbar_display_loc = {x: 200, y: 200};
            new_note.join_arrow_ids = {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]};
            new_note.filleted = UNUSED;
            
            notes.push(new_note);

            // add activity to activity tracker
            const activity = new Taskboard_Activity(new_note.taskboard_id, ACTIONS.ADD, new_note);
            const activity_tracker = new Taskboard_Activity_Tracker(new_note.taskboard_type);
            b_result = activity_tracker._add_activity(new_note.taskboard_type, activity);
        }
        else if(meta_action === META_ACTIONS.REDO || meta_action === META_ACTIONS.UNDO)
        {
            if(new_note.id !== null)
            {
                notes.push(new_note);
            }
        }
    }

    return b_result;
};

/**
 * delete note
 * @param {int} id - note id
 * @param {META_ACTIONS} meta_action - meta action (e.g., undo, redo etc.)
 * @return true if note deleted successfully, false otherwise
 */
const _delete_note = (id, meta_action) => {
    let b_result = false;

    const index = notes.findIndex(note => note.id === id);
    
    if (index !== -1) {
        b_result = true;

        let note = notes[index];

        notes.splice(index, 1);
        
        if(meta_action === META_ACTIONS.NONE)
        {
            // add action to activity tracker
            const delete_activity = new Taskboard_Activity(note.taskboard_id, ACTIONS.DELETE, note);
            const activity_tracker = new Taskboard_Activity_Tracker(note.taskboard_type);
            b_result = activity_tracker._add_activity(note.taskboard_type, delete_activity);
        }
    }

    return b_result;
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
            notes[i].x1_pos = int_x_cord;
            notes[i].y1_pos = int_y_cord;
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