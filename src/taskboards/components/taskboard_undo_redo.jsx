import { COMPONENT_CLSID_PREFIXES } from "../../common/otb_component_class_id_prefixes";
import { _add_arrow, _delete_arrow, _update_arrow_general } from "../use_arrow";
import { Taskboard_Activity } from "./taskboard_activity";
import { ACTIONS, META_ACTIONS } from "../../common/globals";
import { _get_component_clsid_prefix } from "../../common/utils";
import { Taskboard_Comp_DS } from "../taskboard_components_data_structure";
import { _add_circle, _delete_circle, _update_circle_general } from "../use_circle";
import { _add_leftangle, _delete_leftangle, _update_leftangle_general } from "../use_leftangle";
import { _add_rectangle, _delete_rectangle, _update_rectangle_general } from "../use_rectangle";
import { _add_rightangle, _delete_rightangle, _update_rightangle_general } from "../use_rightangle";
import { _add_triangle, _delete_triangle, _update_triangle_general } from "../use_triangle";
import { _add_line, _delete_line, _update_line_general } from "../use_line";
import { _add_note, _delete_note, _update_note_general } from "../use_note";
import { _get_latest_activity_from_stack } from "./taskboard_activity_stacks_list";

/**
 * 
 * @param {*} taskboard_id 
 * @param {Taskboard_Activity} taskboard_activity 
 * @returns {boolean} true if undo action was successful, false otherwise
 */
const _undo_action = (taskboard_id, taskboard_activity) => {

    // NOTE:  
    // for the update condition we have just undone an update activity, we need to get the current latest activity 
    // if the current latest is also an update, proceed to restore this update
    // if it is an add or delete, do nothing for now, we should change this behaviour in the future

    let b_result = false;

    if(typeof taskboard_activity !== "object" || !(taskboard_activity instanceof Taskboard_Activity)) {
        console.error("Invalid taskboard_activity object provided.");
        return false;
    }
    
    let id = taskboard_activity._get_activity().taskboard_component_structure.id;
    if(id === null) return false;

    let component_clsid_prefix = _get_component_clsid_prefix(id);
    
    if(null === component_clsid_prefix || "" === component_clsid_prefix) return false;

    let action  = taskboard_activity._get_activity().action_type;
    if(action === null || action === undefined) return false;

    switch (component_clsid_prefix) {
        case COMPONENT_CLSID_PREFIXES.STICKY_NOTE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_note(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_note(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO, false);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_note_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.ARROW:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_arrow(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_arrow(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_arrow_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.LINE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_line(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_line(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_line_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.CIRCLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_circle(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_circle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_circle_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.LEFT_ANGLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_leftangle(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_leftangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_leftangle_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RIGHT_ANGLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_rightangle(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_rightangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_rightangle_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.TRIANGLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_triangle(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_triangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_triangle_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RECT:
        case COMPONENT_CLSID_PREFIXES.FILLETED_RECT:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _delete_rectangle(id, META_ACTIONS.UNDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _add_rectangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                let latest_activity = _get_latest_activity_from_stack(taskboard_id);
                let latest_activity_action = latest_activity._get_activity().action_type;
                if(latest_activity_action === ACTIONS.UPDATE)
                {
                    b_result = _update_rectangle_general(latest_activity._get_activity().taskboard_component_structure, META_ACTIONS.UNDO);
                }
            }
            break;
        }
 
        default:
        {
            console.warn(`Unknown component type: ${component_clsid_prefix}`);
            b_result = false;
            break;
        }
        
    }

    return b_result;
};

/**
 * redo a taskboard activity by adding it back to the taskboard
 * @param {*} taskboard_id 
 * @param {Taskboard_Activity} taskboard_activity 
 * @returns {boolean} true if redo action was successful, false otherwise
 */
const _redo_action = (taskboard_id, taskboard_activity) => {
    let b_result = false;

    if(typeof taskboard_activity !== "object" || !(taskboard_activity instanceof Taskboard_Activity)) {
        console.error("Invalid taskboard_activity object provided.");
        return false;
    }
    
    let id = taskboard_activity._get_activity().taskboard_component_structure.id;
    if(id === null) return false;

    let component_clsid_prefix = _get_component_clsid_prefix(id);
    
    if(null === component_clsid_prefix || "" === component_clsid_prefix) return false;

    let action  = taskboard_activity._get_activity().action_type;
    if(action === null || action === undefined) return false;

    switch (component_clsid_prefix) {
        case COMPONENT_CLSID_PREFIXES.STICKY_NOTE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_note(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO, false);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_note(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_note_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.ARROW:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_arrow(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_arrow(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_arrow_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.LINE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_line(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_line(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_line_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.CIRCLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_circle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_circle(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_circle_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.LEFT_ANGLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_leftangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_leftangle(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_leftangle_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RIGHT_ANGLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_rightangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_rightangle(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_rightangle_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.TRIANGLE:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_triangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_triangle(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_triangle_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RECT:
        case COMPONENT_CLSID_PREFIXES.FILLETED_RECT:
        {
            if (action === ACTIONS.ADD) 
            {
                b_result = _add_rectangle(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            } 
            else if (action === ACTIONS.DELETE) 
            {
                b_result = _delete_rectangle(id, META_ACTIONS.REDO);
            } 
            else if(action === ACTIONS.UPDATE) 
            {
                b_result = _update_rectangle_general(taskboard_activity._get_activity().taskboard_component_structure, META_ACTIONS.REDO);
            }
            break;
        }
        default:
        {
            console.warn(`Unknown component type: ${component_clsid_prefix}`);
            b_result = false;
            break;
        }
        
    }

    return b_result;
};

export {
    _undo_action,
    _redo_action,
};