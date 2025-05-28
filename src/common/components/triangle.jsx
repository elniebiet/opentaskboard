import { useState, useEffect, useRef } from "react";
import { _set_global_toolbar_items_active_state } from "../../taskboards/taskboard_globals";
import { TASKBOARD_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { _get_max_z_index, _use_max_z_index } from "../globals";
import { _update_triangle_highlighted, _update_triangle_start_pos, _update_triangle_end_pos,
    _update_triangle_colour, _update_triangle_toolbar_show, _update_triangle_toolbar_loc,
    _delete_triangle, _increase_triangle_width, _decrease_triangle_width } from "../../taskboards/use_triangle";
import { LINE_HLIGHT_DRAG_POS } from "../globals";
import _line_toolbar from "../../toolbars/line_toolbar";
import { RECTANGLE_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { TASKBOARD_STATES } from "../../taskboards/taskboard_globals";
import _highlighter from "./highlighter";
import { HIGHLIGHT_DRAG_DIRECTION } from "../globals";
import { _otbf_update_item_join_arrow_id } from "../otb_finder";
import { ARROW_JOIN_POINT } from "../globals";
import { HIGHLIGHT_PARAMS } from "../globals";
import { SELECTED_COLOR_THEME } from "./use_colour_themes";

/**
 * *****************************************************************************************
 * _draggable_triangle - Draggable triangle component
 * *****************************************************************************************
 * PLEASE NOTE: This component uses the generic highlighter (Outside highlighter for 
 * joining and resizing the triangle)) as well as a custom highlighter (at the triangle mid point
 * useful for dragging the triangle around).)
 * *****************************************************************************************
 * ***************************************************************************************** 
 * @param {int} id - triangle ID
 * @param {float} start_pos_x - triangle start x position
 * @param {float} start_pos_y - triangle start y position
 * @param {float} end_pos_x - triangle end x position
 * @param {float} end_pos_y - triangle end y position
 * @param {string} colour - triangle colour
 * @param {int} stroke_width - triangle stroke width
 * @param {boolean} is_highlighted - triangle highlighted state
 * @param {function} taskboard_rerender_func - Function to trigger taskboard re-render
 * @param {boolean} show_toolbar - triangle toolbar visibility
 * @param {int} win_width - Window width
 * @param {int} win_height - Window height
 * @param {function} request_taskboard_state - Function to request taskboard state
 * @param {boolean} active - triangle active state
 * @param {array} join_arrow_ids - Array of join arrow IDs
 * @returns 
 */

const _draggable_triangle = ({ 
    id, start_pos_x, start_pos_y, end_pos_x, 
    end_pos_y, colour = "black", stroke_width = 2, 
    is_highlighted, taskboard_rerender_func, show_toolbar, 
    win_width, win_height, request_taskboard_state, 
    active, join_arrow_ids, overall_taskboard_state, 
    main_page_click_counter, main_page_last_click_event_target,
    filleted }) => {

    const [triangle_start_pos, _set_triangle_start_pos] = useState({ x: start_pos_x, y: start_pos_y });
    const [triangle_end_pos, _set_triangle_end_pos] = useState({ x: end_pos_x, y: end_pos_y });
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    const [arr_highlighted, _set_arr_highlighted] = useState(is_highlighted);   // arr_highlighted is the local version of is_highlighted
    const [display_toolbar, _set_display_toolbar] = useState(show_toolbar);     // display_toolbar is the local version of show_toolbar
    const [is_dragging_triangle, _set_is_dragging_triangle] = useState(false); 
    const [prevent_triangle_deactivation, _set_prevent_triangle_deactivation] = useState(false); 
    const [joining_show_highlighter, _set_joining_show_highlighter] = useState(false); 
    const [local_param_triangle_active, _set_local_param_triangle_active] = useState(true); // local param to track triangle active state
    
    // custom highlighter vars begin
    const [selected_hlight_pos, _set_selected_hlight_pos] = useState(LINE_HLIGHT_DRAG_POS.MID);
    const [is_dragging_hlighter, _set_is_dragging_hlighter] = useState(false);
    // custom highlighter vars end

    const triangle_root_ref = useRef(null);
    
    const HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH   = 0.02;
    const TOOLBAR_DISTANCE_TOP_PERC                 = 0.1; // percentage of the window height
    const RECT_FILLET_PERCENTAGE                    = 0.2; // percentage of the triangle width/height for fillet radius

    
    // Update triangle props when they are changed change
    useEffect(() => {
        if(is_dragging_triangle === false)
        {
            _set_triangle_start_pos({ x: start_pos_x, y: start_pos_y });
            _set_triangle_end_pos({ x: end_pos_x, y: end_pos_y });
        }
    }, [start_pos_x , start_pos_y, end_pos_x, end_pos_y]);

    const _deactivate_triangle = (event_target) => { 
        // e.preventDefault();  // might be needed for some other component (need to pass in the event to use this
                                // not the event target)

        if(prevent_triangle_deactivation === false)
        {
            _set_arr_highlighted(false);
            _update_triangle_highlighted(id, false);
            _set_display_toolbar(false);
            _update_triangle_toolbar_show(id, false);
            taskboard_rerender_func();

            _set_local_param_triangle_active(false);
        }
        else
        {
            _set_prevent_triangle_deactivation(false);
        }
    };

    // Custom highlighter: drag mid point
    const _hlight_mid_mousedown = (e) => {
        _set_selected_hlight_pos(LINE_HLIGHT_DRAG_POS.MID);
        _set_is_dragging_hlighter(true);
    };

    const _get_rect_diagonal_length = () => {
        const dx = triangle_end_pos.x - triangle_start_pos.x;
        const dy = triangle_end_pos.y - triangle_start_pos.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const _toolbar_item_clicked_notif = (triangle_tb_item_index) => {
        switch(triangle_tb_item_index)
        {
            case RECTANGLE_TOOLBAR_ITEMS.ATBI_COLOUR:
            {
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case RECTANGLE_TOOLBAR_ITEMS.ATBI_INCREASE_RECTANGLE_WIDTH:
            {
                _increase_triangle_width(id);
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case RECTANGLE_TOOLBAR_ITEMS.ATBI_DECREASE_RECTANGLE_WIDTH:
            {
                _decrease_triangle_width(id);
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case RECTANGLE_TOOLBAR_ITEMS.ATBI_DELETE:
            {
                _delete_triangle(id);
                break;
            }
            default:
            {
                break;
            }
        }

        taskboard_rerender_func();
    };

    const _update_colour = (updated_hex_colour_val) => {
        _update_triangle_colour(id, updated_hex_colour_val);
        taskboard_rerender_func();
    };

    const _get_toolbar_position = () => {
        let toolbar_distance_top = TOOLBAR_DISTANCE_TOP_PERC * win_height;
        
        let x = (triangle_start_pos.x + triangle_end_pos.x) / 2;
        let y = 0; 
        
        if(triangle_start_pos.y < triangle_end_pos.y)
        {
            y = triangle_start_pos.y - toolbar_distance_top;
        }
        else
        {
            y = triangle_end_pos.y - toolbar_distance_top;
        } 

        y = (y < 0) ? 0 : y;

        return { toolbar_x_pos: x, toolbar_y_pos: y };
    };

    const _highlighter_drag_mouse_down = (drag_direction) => {
        _set_prevent_triangle_deactivation(true);
        taskboard_rerender_func();

        switch(drag_direction)
        {
            case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT:
            {                
                break;
            }
            default:
            {
                break;
            }
         }
    };

    const _highlighter_drag_mouse_up = (drag_direction, width_increase_pixels, height_increase_pixels) => 
    {
        _set_prevent_triangle_deactivation(true);
        taskboard_rerender_func();

        switch(drag_direction)
        {
            case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT:
            {
                // calculate new width and height
                _update_triangle_end_pos(id, triangle_end_pos.x + width_increase_pixels, triangle_end_pos.y + height_increase_pixels);          
                taskboard_rerender_func();
                break;
            }
            case HIGHLIGHT_DRAG_DIRECTION.TOP_LEFT:
            {
                // calculate new width and height
                _update_triangle_start_pos(id, triangle_start_pos.x - width_increase_pixels, triangle_start_pos.y - height_increase_pixels);
                taskboard_rerender_func();
                break;
            }
            case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_LEFT:
            {
                // not used for this component, should not get here
                taskboard_rerender_func();
                break;
            }
            case HIGHLIGHT_DRAG_DIRECTION.TOP_RIGHT:
            {
                // not used for this component, should not get here
                taskboard_rerender_func();
                break;
            };
            default:
            {
                break;
            }
        }
    };

    /**
     * highlighter join started event handler, called when joining is started
     * @param {HIGHLIGHT_JOIN_POSITIONS} join_position e.g., top, right ...
     * @param {*} arrow_id created arrow id
     */
    const _highlighter_join_started = (join_position, arrow_id) => {
        _set_prevent_triangle_deactivation(true);
        // associate arrow id with note
        _otbf_update_item_join_arrow_id(id, join_position, arrow_id, ARROW_JOIN_POINT.START_POINT);
        taskboard_rerender_func();
    };

    const _on_mouse_hover = (e) => {
        if(overall_taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED)
        {
            _set_joining_show_highlighter(true); // show highlighter on hover
        }
    };

    const _on_mouse_down = (e) => {
        e.preventDefault();
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
        _set_global_toolbar_items_active_state(TASKBOARD_TOOLBAR_ITEMS.TBI_SHAPE, true, true);
        _set_arr_highlighted(true);
        _update_triangle_highlighted(id, true);
        _set_local_param_triangle_active(true);
        
        _set_display_toolbar(true);
        _update_triangle_toolbar_show(id, true);
        taskboard_rerender_func();
    };

    /********************* Effects block begins ***************************/
    // Subscribe for main page click event
    useEffect(() => {
        if (triangle_root_ref.current && !triangle_root_ref.current.contains(main_page_last_click_event_target)) {
            // clicked outside of the triangle component, deactivate triangle  
            if(local_param_triangle_active === true)
            {
                _deactivate_triangle(main_page_last_click_event_target);
            }
        }
    }, [main_page_click_counter]);
    
    // monitor highlighted param change
    useEffect(() => {
        if(is_highlighted === false)
        {
            _set_joining_show_highlighter(false); // hide highlighter on hover
        }
    }, [is_highlighted]);

    // Custom highlighter: Event listener to detect highlighter point mouse up
    useEffect(() => {
        const _handle_mouse_up = (event) => {   
            if(is_dragging_hlighter === true)
            {
                if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.MID)
                {
                    const {clientX, clientY} = event;
                    const mid_x = (triangle_start_pos.x + triangle_end_pos.x) / 2;
                    const mid_y = (triangle_start_pos.y + triangle_end_pos.y) / 2;
                    const dx = clientX - mid_x;
                    const dy = clientY - mid_y;

                    _set_triangle_start_pos({x: triangle_start_pos.x + dx, y: triangle_start_pos.y + dy});
                    _set_triangle_end_pos({x: triangle_end_pos.x + dx, y: triangle_end_pos.y + dy});
                    _set_is_dragging_hlighter(false);
                    _update_triangle_start_pos(id, triangle_start_pos.x + dx, triangle_start_pos.y + dy);
                    _update_triangle_end_pos(id, triangle_end_pos.x + dx, triangle_end_pos.y + dy);
                }
                
                taskboard_rerender_func();
            }
        };

        document.addEventListener("mouseup", _handle_mouse_up);
        return () => {
            document.removeEventListener("mouseup", _handle_mouse_up);
        };
    }, [is_dragging_hlighter]);

    // Custom highlighter: Event listener to detect highlighter point mouse move
    useEffect(() => {
        const _handle_mouse_move = (event) => {   
            if(is_dragging_hlighter === true)
            {
                if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.MID)
                {
                    const {clientX, clientY} = event;
                    const mid_x = (triangle_start_pos.x + triangle_end_pos.x) / 2;
                    const mid_y = (triangle_start_pos.y + triangle_end_pos.y) / 2;
                    const dx = clientX - mid_x;
                    const dy = clientY - mid_y;

                    _set_triangle_start_pos({x: triangle_start_pos.x + dx, y: triangle_start_pos.y + dy});
                    _set_triangle_end_pos({x: triangle_end_pos.x + dx, y: triangle_end_pos.y + dy});
                    _update_triangle_start_pos(id, triangle_start_pos.x + dx, triangle_start_pos.y + dy);
                    _update_triangle_end_pos(id, triangle_end_pos.x + dx, triangle_end_pos.y + dy);
                }
                
                taskboard_rerender_func();
            }
        };

        document.addEventListener("mousemove", _handle_mouse_move);
        return () => {
            document.removeEventListener("mousemove", _handle_mouse_move);
        };
    }, [is_dragging_hlighter]);
    /********************* Effects block ends *****************************/

    
    // calculate toolbar position
    const { toolbar_x_pos, toolbar_y_pos } = _get_toolbar_position();

    // calculate triangle top left position
    const overall_top_left = {
        x: Math.min(triangle_start_pos.x, triangle_end_pos.x),
        y: Math.min(triangle_start_pos.y, triangle_end_pos.y)
    };

    return (
        <div 
            ref={triangle_root_ref} 
            id="triangle_root"
            onMouseEnter={(e) => { _on_mouse_hover(e); }}    
            onMouseDown = {(e) => { _on_mouse_down(e); }}
        >
            {/* display triangle toolbar */}
            <div>
                {(display_toolbar === true) ? (
                    <_line_toolbar id={id} win_width={win_width} win_height={win_height} 
                        x_pos={toolbar_x_pos} y_pos={toolbar_y_pos} taskboard_rerender_func={taskboard_rerender_func} 
                        line_toolbar_item_clicked={_toolbar_item_clicked_notif} line_update_colour_func={_update_colour} 
                        line_bg_colour={colour}
                    />
                    ) : (<div></div>)
                }
            </div>
            {/* display highlighter */}
            <div>
                {(is_highlighted === true || joining_show_highlighter === true) ? (
                    <_highlighter 
                        caller_id={id} 
                        gap={HIGHLIGHT_PARAMS.highlight_gap} 
                        line_width={HIGHLIGHT_PARAMS.highlight_line_width} 
                        item_top_left_pos={{x: overall_top_left.x, y: overall_top_left.y}} 
                        item_width={Math.abs(triangle_end_pos.x - triangle_start_pos.x)} 
                        item_height={Math.abs(triangle_end_pos.y - triangle_start_pos.y)} 
                        z_index={z_index} 
                        highlighter_drag_mouse_down={_highlighter_drag_mouse_down}
                        highlighter_drag_mouse_up={_highlighter_drag_mouse_up} 
                        highlighter_join_started={_highlighter_join_started} 
                        join_arrow_ids={join_arrow_ids} 
                        request_taskboard_state={request_taskboard_state} 
                        overall_taskboard_state={overall_taskboard_state} 
                        taskboard_rerender_func={taskboard_rerender_func}
                        show_top_left_resizer={true}
                        show_top_right_resizer={false}
                        show_bottom_left_resizer={false}
                        show_bottom_right_resizer={true}
                    />
                    ) : (<div></div>)}
            </div>

            {/* display triangle */}
            <div>
                <svg 
                    width="100%" 
                    height="100%"

                    style={{ 
                        position: "absolute", 
                        top: 0, 
                        left: 0, 
                        pointerEvents: "none",
                        zIndex: z_index, 
                    }}
                >
                    {/* Main triangle */}
                    <polygon
                        points={`
                            ${(triangle_start_pos.x + triangle_end_pos.x) / 2},${Math.min(triangle_start_pos.y, triangle_end_pos.y)} 
                            ${Math.min(triangle_start_pos.x, triangle_end_pos.x)},${Math.max(triangle_start_pos.y, triangle_end_pos.y)} 
                            ${Math.max(triangle_start_pos.x, triangle_end_pos.x)},${Math.max(triangle_start_pos.y, triangle_end_pos.y)}
                        `}
                        fill="none"
                        stroke={colour}
                        strokeWidth={stroke_width}
                        strokeOpacity={1.0}
                        style={{ cursor: "grab", pointerEvents: "all" }}
                    />

                    {/* Custom highlighter: Circle at the middle of the center line */}
                    {(arr_highlighted === true) ? (
                        <circle 
                            className="highlighter_triangle"
                            cx={(triangle_start_pos.x + triangle_end_pos.x) / 2} 
                            cy={(triangle_start_pos.y + triangle_end_pos.y) / 2} 
                            r={_get_rect_diagonal_length() * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH} 
                            fill={SELECTED_COLOR_THEME.highlight_colour}
                            style={{ cursor: "move", pointerEvents: "all" }}
                            onMouseDown={(e) => { _hlight_mid_mousedown(e); }}
                        />
                    ) : (<div></div>)}

                </svg>
            </div>
        </div>
    );
};

export default _draggable_triangle;
