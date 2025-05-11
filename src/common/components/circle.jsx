import { useState, useEffect, useRef } from "react";
import { _set_global_toolbar_items_active_state } from "../../taskboards/taskboard_globals";
import { TASKBOARD_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { _get_max_z_index, _use_max_z_index } from "../globals";
import { _update_circle_highlighted, _update_circle_start_pos, _update_circle_end_pos,
    _update_circle_colour, _update_circle_toolbar_show, _update_circle_toolbar_loc,
    _delete_circle, _increase_circle_width, _decrease_circle_width } from "../../taskboards/use_circle";
import { SELECTED_COLOR_THEME, CIRCLE_HLIGHT_DRAG_POS } from "../globals";
import _circle_toolbar from "../../toolbars/circle_toolbar";
import { CIRCLE_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { TASKBOARD_STATES } from "../../taskboards/taskboard_globals";

/**
 * _draggable_circle - Draggable circle component
 * *****************************************************************************************
 * PLEASE NOTE: THIS COMPONENT USES THE GENERIC HIGHLIGHTER AS WELL AS A CUSTOM HIGHLIGHTER.
 * ************ THE CUSTOM HIGHLIGHTER IS USEFUL FOR DRAGGING THE CIRCLE *******************
 * ***************************************************************************************** 
 * @param {int} id - circle ID
 * @param {float} start_pos_x - circle start x position
 * @param {float} start_pos_y - circle start y position
 * @param {float} end_pos_x - circle end x position
 * @param {float} end_pos_y - circle end y position
 * @param {string} colour - circle colour
 * @param {int} stroke_width - circle stroke width
 * @param {boolean} is_highlighted - circle highlighted state
 * @param {function} taskboard_rerender_func - Function to trigger taskboard re-render
 * @param {boolean} show_toolbar - circle toolbar visibility
 * @param {int} win_width - Window width
 * @param {int} win_height - Window height
 * @param {function} request_taskboard_state - Function to request taskboard state
 * @returns 
 */

const _draggable_circle = ({ id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour = "black", stroke_width = 2, 
    is_highlighted, taskboard_rerender_func, show_toolbar, win_width, win_height, request_taskboard_state }) => {

    const [circle_start_pos, _set_circle_start_pos] = useState({ x: start_pos_x, y: start_pos_y });
    const [circle_end_pos, _set_circle_end_pos] = useState({ x: end_pos_x, y: end_pos_y });
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    const [arr_highlighted, _set_arr_highlighted] = useState(is_highlighted);   // arr_highlighted is the local version of is_highlighted
    const [display_toolbar, _set_display_toolbar] = useState(show_toolbar);     // display_toolbar is the local version of show_toolbar
    const [selected_hlight_pos, _set_selected_hlight_pos] = useState(CIRCLE_HLIGHT_DRAG_POS.START);
    const [is_dragging_hlighter, _set_is_dragging_hlighter] = useState(false);
    const [is_dragging_circle, _set_is_dragging_circle] = useState(false); 
    
    const circle_root_ref = useRef(null);
    
    const HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH   = 2.0;
    const TOOLBAR_DISTANCE_TOP_PERC                 = 0.1; // percentage of the window height

    
    // Update state when props change
    useEffect(() => {
        if(is_dragging_circle === false)
        {
            _set_circle_start_pos({ x: start_pos_x, y: start_pos_y });
            _set_circle_end_pos({ x: end_pos_x, y: end_pos_y });
        }
    }, [start_pos_x , start_pos_y, end_pos_x, end_pos_y]);

    const _deactivate_circle = (e) => { 
        _set_arr_highlighted(false);
        _update_circle_highlighted(id, false);
        _set_display_toolbar(false);
        _update_circle_toolbar_show(id, false);
    };

    const _hlight_start_mousedown = (e) => {
        _set_selected_hlight_pos(CIRCLE_HLIGHT_DRAG_POS.START);
        _set_is_dragging_hlighter(true);
    };

    const _hlight_mid_mousedown = (e) => {
        _set_selected_hlight_pos(CIRCLE_HLIGHT_DRAG_POS.MID);
        _set_is_dragging_hlighter(true);
    };

    const _hlight_end_mousedown = (e) => {
        _set_selected_hlight_pos(CIRCLE_HLIGHT_DRAG_POS.END);
        _set_is_dragging_hlighter(true);
    };
    
    const _get_circle_diameter = () => {
        const dx = circle_end_pos.x - circle_start_pos.x;
        const dy = circle_end_pos.y - circle_start_pos.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const _toolbar_item_clicked_notif = (circle_tb_item_index) => {
        switch(circle_tb_item_index)
        {
            case CIRCLE_TOOLBAR_ITEMS.ATBI_COLOUR:
            {
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case CIRCLE_TOOLBAR_ITEMS.ATBI_INCREASE_CIRCLE_WIDTH:
            {
                _increase_circle_width(id);
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case CIRCLE_TOOLBAR_ITEMS.ATBI_DECREASE_CIRCLE_WIDTH:
            {
                _decrease_circle_width(id);
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case CIRCLE_TOOLBAR_ITEMS.ATBI_DELETE:
            {
                _delete_circle(id);
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
        _update_circle_colour(id, updated_hex_colour_val);
        taskboard_rerender_func();
    };

    const _get_toolbar_position = () => {
        let toolbar_distance_top = TOOLBAR_DISTANCE_TOP_PERC * win_height;
        
        let x = (circle_start_pos.x + circle_end_pos.x) / 2;
        let y = 0; 
        
        if(circle_start_pos.y < circle_end_pos.y)
        {
            y = circle_start_pos.y - toolbar_distance_top;
        }
        else
        {
            y = circle_end_pos.y - toolbar_distance_top;
        } 

        y = (y < 0) ? 0 : y;

        return { toolbar_x_pos: x, toolbar_y_pos: y };
    };

    /********************* Effects block begins ***************************/
    // Event listener to detect click outside circle component
    useEffect(() => {
        const _handle_click_outside_circle = (event) => {
            if (circle_root_ref.current && !circle_root_ref.current.contains(event.target)) {
                // clicked outside the circle component                
                _deactivate_circle();
            }
            else
            {
                _set_z_index(_get_max_z_index());
                _use_max_z_index();
                _set_global_toolbar_items_active_state(TASKBOARD_TOOLBAR_ITEMS.TBI_SHAPE, true, true);
                _set_arr_highlighted(true);
                _update_circle_highlighted(id, true);
                
                _set_display_toolbar(true);
                _update_circle_toolbar_show(id, true);
                taskboard_rerender_func();
            }
        };

        document.addEventListener("mousedown", _handle_click_outside_circle);
        return () => {
            document.removeEventListener("mousedown", _handle_click_outside_circle);
        };
    }, []);

    // Event listener to detect highlighter point mouse up
    useEffect(() => {
        const _handle_mouse_up = (event) => {   
            if(is_dragging_hlighter === true)
            {
                if(selected_hlight_pos === CIRCLE_HLIGHT_DRAG_POS.START)
                {
                    const {clientX, clientY} = event;
                    _set_circle_start_pos({x: clientX, y: clientY});
                    _set_is_dragging_hlighter(false);
                    _update_circle_start_pos(id, clientX, clientY);                    
                }
                else if(selected_hlight_pos === CIRCLE_HLIGHT_DRAG_POS.MID)
                {
                    const {clientX, clientY} = event;
                    const mid_x = (circle_start_pos.x + circle_end_pos.x) / 2;
                    const mid_y = (circle_start_pos.y + circle_end_pos.y) / 2;
                    const dx = clientX - mid_x;
                    const dy = clientY - mid_y;

                    _set_circle_start_pos({x: circle_start_pos.x + dx, y: circle_start_pos.y + dy});
                    _set_circle_end_pos({x: circle_end_pos.x + dx, y: circle_end_pos.y + dy});
                    _set_is_dragging_hlighter(false);
                    _update_circle_start_pos(id, circle_start_pos.x + dx, circle_start_pos.y + dy);
                    _update_circle_end_pos(id, circle_end_pos.x + dx, circle_end_pos.y + dy);
                }
                else if(selected_hlight_pos === CIRCLE_HLIGHT_DRAG_POS.END)
                {
                    const {clientX, clientY} = event;
                    _set_circle_end_pos({x: clientX, y: clientY});
                    _set_is_dragging_hlighter(false);
                    _update_circle_end_pos(id, clientX, clientY);
                }

                taskboard_rerender_func();
            }
        };

        document.addEventListener("mouseup", _handle_mouse_up);
        return () => {
            document.removeEventListener("mouseup", _handle_mouse_up);
        };
    }, [is_dragging_hlighter]);

    // Event listener to detect highlighter point mouse move
    useEffect(() => {
        const _handle_mouse_move = (event) => {   
            if(is_dragging_hlighter === true)
            {
                if(selected_hlight_pos === CIRCLE_HLIGHT_DRAG_POS.START)
                {
                    const {clientX, clientY} = event;
                    _set_circle_start_pos({x: clientX, y: clientY});
                    _update_circle_start_pos(id, clientX, clientY);                    
                }
                else if(selected_hlight_pos === CIRCLE_HLIGHT_DRAG_POS.MID)
                {
                    const {clientX, clientY} = event;
                    const mid_x = (circle_start_pos.x + circle_end_pos.x) / 2;
                    const mid_y = (circle_start_pos.y + circle_end_pos.y) / 2;
                    const dx = clientX - mid_x;
                    const dy = clientY - mid_y;

                    _set_circle_start_pos({x: circle_start_pos.x + dx, y: circle_start_pos.y + dy});
                    _set_circle_end_pos({x: circle_end_pos.x + dx, y: circle_end_pos.y + dy});
                    _update_circle_start_pos(id, circle_start_pos.x + dx, circle_start_pos.y + dy);
                    _update_circle_end_pos(id, circle_end_pos.x + dx, circle_end_pos.y + dy);
                }
                else if(selected_hlight_pos === CIRCLE_HLIGHT_DRAG_POS.END)
                {
                    const {clientX, clientY} = event;
                    _set_circle_end_pos({x: clientX, y: clientY});
                    _update_circle_end_pos(id, clientX, clientY);
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

    return (
        <div ref={circle_root_ref} id="circle_root">
            {/* display circle toolbar */}
            <div>
                {(display_toolbar === true) ? (
                    <_circle_toolbar id={id} win_width={win_width} win_height={win_height} 
                        x_pos={toolbar_x_pos} y_pos={toolbar_y_pos} taskboard_rerender_func={taskboard_rerender_func} 
                        circle_toolbar_item_clicked={_toolbar_item_clicked_notif} circle_update_colour_func={_update_colour} 
                        circle_bg_colour={colour}
                    />
                    ) : (<div></div>)
                }
            </div>

            {/* display circle */}
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
                    {/* Main Circle */}
                    <circle 
                        cx={(circle_start_pos.x + circle_end_pos.x) / 2} 
                        cy={(circle_start_pos.y + circle_end_pos.y) / 2}  
                        r={(_get_circle_diameter() / 2)} 
                        fill="none" 
                        stroke={colour}
                        strokeWidth={stroke_width}
                        strokeOpacity={0.4}
                    />

                    {/* Transparent line drawn in center of the circle  */}
                    <line
                        x1={circle_start_pos.x}
                        y1={circle_start_pos.y}
                        x2={circle_end_pos.x}
                        y2={circle_end_pos.y}
                        stroke={colour}
                        strokeWidth={(_get_circle_diameter())}
                        style={{ cursor: "grab", pointerEvents: "all" }}
                        strokeOpacity={0.0}
                    />

                    {/* Custom highlighter: drawn on the centre line */}

                    {/* Circle at the start of the center line */}
                    {(arr_highlighted === true) ? (
                        <circle 
                            className="highlighter_circle"
                            cx={circle_start_pos.x} 
                            cy={circle_start_pos.y} 
                            r={stroke_width * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH} 
                            fill={SELECTED_COLOR_THEME.highlight_colour}
                            style={{ cursor: "ew-resize", pointerEvents: "all" }}
                            onMouseDown={(e) => { _hlight_start_mousedown(e); }}
                        />
                    ) : (<div></div>)}

                    {/* Circle at the middle of the center line */}
                    {(arr_highlighted === true) ? (
                        <circle 
                            className="highlighter_circle"
                            cx={(circle_start_pos.x + circle_end_pos.x) / 2} 
                            cy={(circle_start_pos.y + circle_end_pos.y) / 2} 
                            r={stroke_width * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH} 
                            fill={SELECTED_COLOR_THEME.highlight_colour}
                            style={{ cursor: "move", pointerEvents: "all" }}
                            onMouseDown={(e) => { _hlight_mid_mousedown(e); }}
                        />
                    ) : (<div></div>)}

                    {/* Circle at the end of the center line */}
                    {(arr_highlighted === true) ? (
                        <circle
                            className="highlighter_circle"
                            cx={circle_end_pos.x} 
                            cy={circle_end_pos.y} 
                            r={stroke_width * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH}
                            fill={SELECTED_COLOR_THEME.highlight_colour} 
                            style={{ cursor: "ew-resize", pointerEvents: "all" }} 
                            onMouseDown={(e) => { _hlight_end_mousedown(e); }}
                        />
                    ) : (<div></div>)}

                </svg>
            </div>
        </div>
    );
};

export default _draggable_circle;
