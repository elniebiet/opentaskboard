import { useState, useEffect, useRef } from "react";
import { _set_global_toolbar_items_active_state } from "../../taskboards/taskboard_globals";
import { TASKBOARD_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { _get_max_z_index, _use_max_z_index } from "../globals";
import { _update_line_highlighted, _update_line_start_pos, _update_line_end_pos,
    _update_line_colour, _update_line_toolbar_show, _update_line_toolbar_loc,
    _delete_line, _increase_line_width, _decrease_line_width } from "../../taskboards/use_line";
import { SELECTED_COLOR_THEME, LINE_HLIGHT_DRAG_POS } from "../globals";
import _line_toolbar from "../../toolbars/line_toolbar";
import { LINE_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { TASKBOARD_STATES } from "../../taskboards/taskboard_globals";

/**
 * _draggable_line - Draggable line component (functions very similar to the draggable line component)
 * PLEASE NOTE: THIS COMPONENT ALSO IMPLEMENTS ITS OWN HIGHLIGHTER
 * @param {int} id - line ID
 * @param {float} start_pos_x - line start x position
 * @param {float} start_pos_y - line start y position
 * @param {float} end_pos_x - line end x position
 * @param {float} end_pos_y - line end y position
 * @param {string} colour - line colour
 * @param {int} stroke_width - line stroke width
 * @param {boolean} is_highlighted - line highlighted state
 * @param {function} taskboard_rerender_func - Function to trigger taskboard re-render
 * @param {boolean} show_toolbar - line toolbar visibility
 * @param {int} win_width - Window width
 * @param {int} win_height - Window height
 * @param {function} request_taskboard_state - Function to request taskboard state
 * @returns 
 */

const _draggable_line = ({ id, start_pos_x, start_pos_y, end_pos_x, end_pos_y, colour = "black", stroke_width = 2, 
    is_highlighted, taskboard_rerender_func, show_toolbar, win_width, win_height, request_taskboard_state }) => {

    const [line_start_pos, _set_line_start_pos] = useState({ x: start_pos_x, y: start_pos_y });
    const [line_end_pos, _set_line_end_pos] = useState({ x: end_pos_x, y: end_pos_y });
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    const [arr_highlighted, _set_arr_highlighted] = useState(is_highlighted);   // arr_highlighted is the local version of is_highlighted
    const [display_toolbar, _set_display_toolbar] = useState(show_toolbar);     // display_toolbar is the local version of show_toolbar
    const [selected_hlight_pos, _set_selected_hlight_pos] = useState(LINE_HLIGHT_DRAG_POS.START);
    const [is_dragging_hlighter, _set_is_dragging_hlighter] = useState(false);
    const [is_dragging_line, _set_is_dragging_line] = useState(false); 
    
    const line_root_ref = useRef(null);
    
    const HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH   = 2.0;
    const TOOLBAR_DISTANCE_TOP_PERC                 = 0.1; // percentage of the window height

    
    // Update state when props change
    useEffect(() => {
        if(is_dragging_line === false)
        {
            _set_line_start_pos({ x: start_pos_x, y: start_pos_y });
            _set_line_end_pos({ x: end_pos_x, y: end_pos_y });
        }
    }, [start_pos_x , start_pos_y, end_pos_x, end_pos_y]);

    const _deactivate_line = (e) => { 
        _set_arr_highlighted(false);
        _update_line_highlighted(id, false);
        _set_display_toolbar(false);
        _update_line_toolbar_show(id, false);
    };

    const _hlight_start_mousedown = (e) => {
        _set_selected_hlight_pos(LINE_HLIGHT_DRAG_POS.START);
        _set_is_dragging_hlighter(true);
    };

    const _hlight_mid_mousedown = (e) => {
        _set_selected_hlight_pos(LINE_HLIGHT_DRAG_POS.MID);
        _set_is_dragging_hlighter(true);
    };

    const _hlight_end_mousedown = (e) => {
        _set_selected_hlight_pos(LINE_HLIGHT_DRAG_POS.END);
        _set_is_dragging_hlighter(true);
    };
    
    const _get_line_length = () => {
        const dx = line_end_pos.x - line_start_pos.x;
        const dy = line_end_pos.y - line_start_pos.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const _toolbar_item_clicked_notif = (line_tb_item_index) => {
        switch(line_tb_item_index)
        {
            case LINE_TOOLBAR_ITEMS.ATBI_COLOUR:
            {
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case LINE_TOOLBAR_ITEMS.ATBI_INCREASE_LINE_WIDTH:
            {
                _increase_line_width(id);
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case LINE_TOOLBAR_ITEMS.ATBI_DECREASE_LINE_WIDTH:
            {
                _decrease_line_width(id);
                request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
                break;
            }
            case LINE_TOOLBAR_ITEMS.ATBI_DELETE:
            {
                _delete_line(id);
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
        _update_line_colour(id, updated_hex_colour_val);
        taskboard_rerender_func();
    };

    const _get_toolbar_position = () => {
        let toolbar_distance_top = TOOLBAR_DISTANCE_TOP_PERC * win_height;
        
        let x = (line_start_pos.x + line_end_pos.x) / 2;
        let y = 0; 
        
        if(line_start_pos.y < line_end_pos.y)
        {
            y = line_start_pos.y - toolbar_distance_top;
        }
        else
        {
            y = line_end_pos.y - toolbar_distance_top;
        } 

        y = (y < 0) ? 0 : y;

        return { toolbar_x_pos: x, toolbar_y_pos: y };
    };

    /********************* Effects block begins ***************************/
    // Event listener to detect click outside line component
    useEffect(() => {
        const _handle_click_outside_line = (event) => {
            if (line_root_ref.current && !line_root_ref.current.contains(event.target)) {
                // clicked outside the line component                
                _deactivate_line();
            }
            else
            {
                _set_z_index(_get_max_z_index());
                _use_max_z_index();
                _set_global_toolbar_items_active_state(TASKBOARD_TOOLBAR_ITEMS.TBI_SHAPE, true, true);
                _set_arr_highlighted(true);
                _update_line_highlighted(id, true);
                
                _set_display_toolbar(true);
                _update_line_toolbar_show(id, true);
                taskboard_rerender_func();
            }
        };

        document.addEventListener("mousedown", _handle_click_outside_line);
        return () => {
            document.removeEventListener("mousedown", _handle_click_outside_line);
        };
    }, []);

    // Event listener to detect highlighter point mouse up
    useEffect(() => {
        const _handle_mouse_up = (event) => {   
            if(is_dragging_hlighter === true)
            {
                if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.START)
                {
                    const {clientX, clientY} = event;
                    _set_line_start_pos({x: clientX, y: clientY});
                    _set_is_dragging_hlighter(false);
                    _update_line_start_pos(id, clientX, clientY);                    
                }
                else if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.MID)
                {
                    const {clientX, clientY} = event;
                    const mid_x = (line_start_pos.x + line_end_pos.x) / 2;
                    const mid_y = (line_start_pos.y + line_end_pos.y) / 2;
                    const dx = clientX - mid_x;
                    const dy = clientY - mid_y;

                    _set_line_start_pos({x: line_start_pos.x + dx, y: line_start_pos.y + dy});
                    _set_line_end_pos({x: line_end_pos.x + dx, y: line_end_pos.y + dy});
                    _set_is_dragging_hlighter(false);
                    _update_line_start_pos(id, line_start_pos.x + dx, line_start_pos.y + dy);
                    _update_line_end_pos(id, line_end_pos.x + dx, line_end_pos.y + dy);
                }
                else if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.END)
                {
                    const {clientX, clientY} = event;
                    _set_line_end_pos({x: clientX, y: clientY});
                    _set_is_dragging_hlighter(false);
                    _update_line_end_pos(id, clientX, clientY);
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
                if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.START)
                {
                    const {clientX, clientY} = event;
                    _set_line_start_pos({x: clientX, y: clientY});
                    _update_line_start_pos(id, clientX, clientY);                    
                }
                else if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.MID)
                {
                    const {clientX, clientY} = event;
                    const mid_x = (line_start_pos.x + line_end_pos.x) / 2;
                    const mid_y = (line_start_pos.y + line_end_pos.y) / 2;
                    const dx = clientX - mid_x;
                    const dy = clientY - mid_y;

                    _set_line_start_pos({x: line_start_pos.x + dx, y: line_start_pos.y + dy});
                    _set_line_end_pos({x: line_end_pos.x + dx, y: line_end_pos.y + dy});
                    _update_line_start_pos(id, line_start_pos.x + dx, line_start_pos.y + dy);
                    _update_line_end_pos(id, line_end_pos.x + dx, line_end_pos.y + dy);
                }
                else if(selected_hlight_pos === LINE_HLIGHT_DRAG_POS.END)
                {
                    const {clientX, clientY} = event;
                    _set_line_end_pos({x: clientX, y: clientY});
                    _update_line_end_pos(id, clientX, clientY);
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
        <div ref={line_root_ref} id="line_root">
            {/* display line toolbar */}
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
            {/* display line */}
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
                    {/* Line */}
                    <line
                        x1={line_start_pos.x}
                        y1={line_start_pos.y}
                        x2={line_end_pos.x}
                        y2={line_end_pos.y}
                        stroke={colour}
                        strokeWidth={stroke_width}
                        style={{ cursor: "grab", pointerEvents: "all" }}
                    />

                    {/* display line highlighter */}

                    {/* Circle at the start of the line */}
                    {(arr_highlighted === true) ? (
                        <circle 
                            className="highlighter_circle"
                            cx={line_start_pos.x} 
                            cy={line_start_pos.y} 
                            r={stroke_width * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH} 
                            fill={SELECTED_COLOR_THEME.highlight_colour}
                            style={{ cursor: "ew-resize", pointerEvents: "all" }}
                            onMouseDown={(e) => { _hlight_start_mousedown(e); }}
                        />
                    ) : (<div></div>)}

                    {/* Circle at the middle of the line */}
                    {(arr_highlighted === true) ? (
                        <circle 
                            className="highlighter_circle"
                            cx={(line_start_pos.x + line_end_pos.x) / 2} 
                            cy={(line_start_pos.y + line_end_pos.y) / 2} 
                            r={stroke_width * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH} 
                            fill={SELECTED_COLOR_THEME.highlight_colour}
                            style={{ cursor: "move", pointerEvents: "all" }}
                            onMouseDown={(e) => { _hlight_mid_mousedown(e); }}
                        />
                    ) : (<div></div>)}

                    {/* Circle at the end of the line */}
                    {(arr_highlighted === true) ? (
                        <circle
                            className="highlighter_circle"
                            cx={line_end_pos.x} 
                            cy={line_end_pos.y} 
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

export default _draggable_line;
