/** This module should implement search and update functionality for the otb
 *  otb components should have unique ids e.g. arrows, notes, etc 
 *  the finder should be able to search for a component in an efficient fashion.
*/

/////////////////////////////////////////////////////////////////////////////////////////////
// ALL LINES IN THIS BLOCK ARE TEMPORARY - to be replaced with the original code
/////////////////////////////////////////////////////////////////////////////////////////////

import notes from "../db/taskboards/notes_db_temp";
import arrows from "../db/taskboards/arrows_db_temp";
import circles from "../db/taskboards/circles_db_temp";
import rectangles from "../db/taskboards/rectangles_db_temp";
import { HIGHLIGHT_JOIN_POSITIONS, ARROW_JOIN_POINT } from "../common/globals";
import { _update_note_active_state, _update_note_highlighted } from "../taskboards/use_note";
import { _update_circle_active_state, _update_circle_highlighted } from "../taskboards/use_circle";
import { _update_rectangle_active_state, _update_rectangle_highlighted } from "../taskboards/use_rectangle";

/**
 * update join arrow id
 * @param {int} id - note id
 * @param {HIGHLIGHT_JOIN_POSITIONS} join_arrow_position join arrow position
 * @param {ARROW_JOIN_POINT} arrow_join_point - arrow join point
 * @param {int} join_arrow_id - join arrow id
 */
const _otbf_update_item_join_arrow_id = (id, join_arrow_position, join_arrow_id, arrow_join_point) => {
    let item_found = false;

    // search notes for the item with the given id
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            item_found = true;
            switch(join_arrow_position)
            {
                case HIGHLIGHT_JOIN_POSITIONS.TOP:
                    notes[i].join_arrow_ids.top[0] = join_arrow_id;
                    notes[i].join_arrow_ids.top[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.BOTTOM:
                    notes[i].join_arrow_ids.bottom[0] = join_arrow_id;
                    notes[i].join_arrow_ids.bottom[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.LEFT:
                    notes[i].join_arrow_ids.left[0] = join_arrow_id;
                    notes[i].join_arrow_ids.left[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.RIGHT:
                    notes[i].join_arrow_ids.right[0] = join_arrow_id;
                    notes[i].join_arrow_ids.right[1] = arrow_join_point;
                    break;
                default:
                    break;
            }

            break;
        }
    }

    if(item_found) return;

    // search circles for the item with the given id
    for(let i=0; i<circles.length; i++)
    {
        if(circles[i].id === id)
        {
            item_found = true;
            switch(join_arrow_position)
            {
                case HIGHLIGHT_JOIN_POSITIONS.TOP:
                    circles[i].join_arrow_ids.top[0] = join_arrow_id;
                    circles[i].join_arrow_ids.top[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.BOTTOM:
                    circles[i].join_arrow_ids.bottom[0] = join_arrow_id;
                    circles[i].join_arrow_ids.bottom[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.LEFT:
                    circles[i].join_arrow_ids.left[0] = join_arrow_id;
                    circles[i].join_arrow_ids.left[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.RIGHT:
                    circles[i].join_arrow_ids.right[0] = join_arrow_id;
                    circles[i].join_arrow_ids.right[1] = arrow_join_point;
                    break;
                default:
                    break;
            }

            break;
        }
    }

    if(item_found) return;

    // search rectangles for the item with the given id
    for(let i=0; i<rectangles.length; i++)
    {
        if(rectangles[i].id === id)
        {
            item_found = true;
            switch(join_arrow_position)
            {
                case HIGHLIGHT_JOIN_POSITIONS.TOP:
                    rectangles[i].join_arrow_ids.top[0] = join_arrow_id;
                    rectangles[i].join_arrow_ids.top[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.BOTTOM:
                    rectangles[i].join_arrow_ids.bottom[0] = join_arrow_id;
                    rectangles[i].join_arrow_ids.bottom[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.LEFT:
                    rectangles[i].join_arrow_ids.left[0] = join_arrow_id;
                    rectangles[i].join_arrow_ids.left[1] = arrow_join_point;
                    break;
                case HIGHLIGHT_JOIN_POSITIONS.RIGHT:
                    rectangles[i].join_arrow_ids.right[0] = join_arrow_id;
                    rectangles[i].join_arrow_ids.right[1] = arrow_join_point;
                    break;
                default:
                    break;
            }

            break;
        }
    }

    if(item_found) return;

};

/**
 * deactivate item
 * @param {int} id - note id
 */
const _otbf_deactivate_item = (id) => {
    let item_found = false;

    // search notes for the item with the given id
    for(let i=0; i<notes.length; i++)
    {
        if(notes[i].id === id)
        {
            item_found = true;
            _update_note_active_state(id, false);
            _update_note_highlighted(id, false);
            console.log("deactivate item id: ", id);
            break;
        }
    }

    if(item_found) return;

    // search circles for the item with the given id
    for(let i=0; i<circles.length; i++)
    {
        if(circles[i].id === id)
        {
            item_found = true;
            _update_circle_active_state(id, false);
            _update_circle_highlighted(id, false);
            console.log("deactivate item id: ", id);
            break;
        }
    }

    if(item_found) return;

    // search rectangles for the item with the given id
    for(let i=0; i<rectangles.length; i++)
    {
        if(rectangles[i].id === id)
        {
            item_found = true;
            _update_rectangle_active_state(id, false);
            _update_rectangle_highlighted(id, false);
            console.log("deactivate item id: ", id);
            break;
        }
    }

    if(item_found) return;
};

/////////////////////////////////////////////////////////////////////////////////////////////
// ALL LINES IN THIS BLOCK ARE TEMPORARY - to be replaced with the original code
/////////////////////////////////////////////////////////////////////////////////////////////

export {
    _otbf_update_item_join_arrow_id,
    _otbf_deactivate_item,
};

