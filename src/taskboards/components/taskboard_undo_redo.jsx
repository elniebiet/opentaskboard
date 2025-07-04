import { COMPONENT_CLSID_PREFIXES } from "../../common/otb_component_class_id_prefixes";
import { _add_arrow, _delete_arrow } from "../use_arrow";
import { Taskboard_Activity } from "./taskboard_activity";
import { ACTIONS, META_ACTIONS } from "../../common/globals";
import { _get_component_clsid_prefix } from "../../common/utils";
import { Taskboard_Comp_DS } from "../taskboard_components_data_structure";
import { _add_circle, _delete_circle } from "../use_circle";

/**
 * 
 * @param {*} taskboard_id 
 * @param {*} taskboard_type 
 * @param {Taskboard_Activity} taskboard_activity 
 * @returns {boolean} true if undo action was successful, false otherwise
 */
const _undo_action = (taskboard_id, taskboard_type, taskboard_activity) => {
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
                ;
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.LINE:
        {
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
                ;
            }
            break;
        }
        case COMPONENT_CLSID_PREFIXES.LEFT_ANGLE:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RIGHT_ANGLE:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.TRIANGLE:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RECT:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.FILLETED_RECT:
        {
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
 * @param {*} taskboard_type 
 * @param {Taskboard_Activity} taskboard_activity 
 * @returns {boolean} true if redo action was successful, false otherwise
 */
const _redo_action = (taskboard_id, taskboard_type, taskboard_activity) => {
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
                ;
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.LINE:
        {
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
                ;
            }

            break;
        }
        case COMPONENT_CLSID_PREFIXES.LEFT_ANGLE:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RIGHT_ANGLE:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.TRIANGLE:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.RECT:
        {
            break;
        }
        case COMPONENT_CLSID_PREFIXES.FILLETED_RECT:
        {
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