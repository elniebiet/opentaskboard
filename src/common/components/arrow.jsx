import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { _set_global_toolbar_items_active_state } from "../../taskboards/taskboard_globals";
import { TASKBOARD_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { _get_max_z_index, _use_max_z_index } from "../globals";
import { _update_arrow_highlighted, _update_arrow_start_pos, _update_arrow_end_pos,
    _update_arrow_colour } from "../../taskboards/use_arrow";
import { SELECTED_COLOR_THEME } from "../globals";
import { ARROW_HLIGHT_DRAG_POS } from "../globals";

const _draggable_arrow = ({ id, start_pos_x1, start_pos_y1, start_pos_x2, start_pos_y2, colour = "black", stroke_width = 2, 
    is_highlighted, taskboard_rerender_func }) => {

    const [line_start_pos, _set_line_start_pos] = useState({ x: start_pos_x1, y: start_pos_y1 });
    const [line_end_pos, _set_line_end_pos] = useState({ x: start_pos_x2, y: start_pos_y2 });
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    const [arr_highlighted, _set_arr_highlighted] = useState(is_highlighted);
    const [selected_hlight_pos, _set_selected_hlight_pos] = useState(ARROW_HLIGHT_DRAG_POS.START);
    const [is_dragging_hlighter, _set_is_dragging_hlighter] = useState(false);
    const [is_dragging_arrow, _set_is_dragging_arrow] = useState(false); 
    
    const arrow_root_ref = useRef(null);
    const start_ref = useRef(null);
    const end_ref = useRef(null);

    const HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH = 2.0;

    // Update state when props change
    useEffect(() => {
        if(is_dragging_arrow === false)
        {
            _set_line_start_pos({ x: start_pos_x1, y: start_pos_y1 });
            _set_line_end_pos({ x: start_pos_x2, y: start_pos_y2 });
        }
    }, [start_pos_x1, start_pos_y1, start_pos_x2, start_pos_y2]);

    const _on_click_handler = () => {
         _set_z_index(_get_max_z_index());
        _use_max_z_index();
        _set_global_toolbar_items_active_state(TASKBOARD_TOOLBAR_ITEMS.TBI_SHAPE, true, true);
        _set_arr_highlighted(true);
        _update_arrow_highlighted(id, true);
    };

    const _on_drag_start = (e, data) => {
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
        _set_arr_highlighted(true);
        _update_arrow_highlighted(id, true);
    };

    const _on_drag_stop = (e, data) => {
        _set_is_dragging_arrow(true);
       
        if (start_ref.current) {
            const rect = start_ref.current.getBoundingClientRect();
            let start_x = (rect.left + (HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH * stroke_width));
            let start_y = (rect.top + (HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH * stroke_width));
            _update_arrow_start_pos(id, start_x , start_y);
        }

        if (end_ref.current) {
            const rect = end_ref.current.getBoundingClientRect();
            let end_x = (rect.left + (HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH * stroke_width));
            let end_y = (rect.top + (HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH * stroke_width));
            _update_arrow_end_pos(id, end_x , end_y);
        }

        taskboard_rerender_func();
    };

    const _on_drag = (e, data) => {
        // Update start and end positions based on drag movement
    };

    const _deactivate_arrow = (e) => { 
        _set_arr_highlighted(false);
        _update_arrow_highlighted(id, false);
    };

    const _hlight_start_mousedown = (e) => {
        _set_selected_hlight_pos(ARROW_HLIGHT_DRAG_POS.START);
        _set_is_dragging_hlighter(true);
    };

    const _hlight_end_mousedown = (e) => {
        _set_selected_hlight_pos(ARROW_HLIGHT_DRAG_POS.END);
        _set_is_dragging_hlighter(true);
    };
    

    /********************* Effects block begins ***************************/
    // Event listener to detect click outside arrow component
    useEffect(() => {
        const _handle_click_outside_arrow = (event) => {
            if (arrow_root_ref.current && !arrow_root_ref.current.contains(event.target)) {
                _deactivate_arrow();
            }
        };

        document.addEventListener("mousedown", _handle_click_outside_arrow);
        return () => {
            document.removeEventListener("mousedown", _handle_click_outside_arrow);
        };
    }, []);

    // Event listener to detect mouse up
    useEffect(() => {
        const _handle_mouse_up = (event) => {   
            if(is_dragging_hlighter === true)
            {
                if(selected_hlight_pos === ARROW_HLIGHT_DRAG_POS.START)
                {
                    const {clientX, clientY} = event;
                    _set_line_start_pos({x: clientX, y: clientY});
                    _set_is_dragging_hlighter(false);
                    _update_arrow_start_pos(id, clientX, clientY);
                }
                else if(selected_hlight_pos === ARROW_HLIGHT_DRAG_POS.END)
                {
                    const {clientX, clientY} = event;
                    _set_line_end_pos({x: clientX, y: clientY});
                    _set_is_dragging_hlighter(false);
                    _update_arrow_end_pos(id, clientX, clientY);
                }
            }
        };

        document.addEventListener("mouseup", _handle_mouse_up);
        return () => {
            document.removeEventListener("mouseup", _handle_mouse_up);
        };
    }, [is_dragging_hlighter]);
    /********************* Effects block ends *****************************/

    return (
        <div ref={arrow_root_ref} id="arrow_root">
            <Draggable
                onStart={(e, data) => { _on_drag_start(e, data); }}
                onStop={(e, data) => { _on_drag_stop(e, data); }}  
                onDrag={(e, data) => { _on_drag(e, data); }}
                cancel=".highlighter_circle"
            >
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

                        onClick={_on_click_handler}
                    >
                        {/* Arrowhead Definition */}
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill={colour} />
                            </marker>
                        </defs>
                        
                        {/* Arrow Line */}
                        <line
                            x1={line_start_pos.x}
                            y1={line_start_pos.y}
                            x2={line_end_pos.x}
                            y2={line_end_pos.y}
                            stroke={colour}
                            strokeWidth={stroke_width}
                            markerEnd="url(#arrowhead)"
                            style={{ cursor: "grab", pointerEvents: "all" }}
                        />

                        {/* display arrow highlighter */}

                        {/* Circle at the start of the line */}
                        {(arr_highlighted === true) ? (
                            <circle 
                                ref={start_ref}
                                className="highlighter_circle"
                                cx={line_start_pos.x} 
                                cy={line_start_pos.y} 
                                r={stroke_width * HLIGHT_CIRC_RADIUS_RATIO_TO_STROKEWIDTH} 
                                fill={SELECTED_COLOR_THEME.highlight_colour}
                                style={{ cursor: "ew-resize", pointerEvents: "all" }}
                                onMouseDown={(e) => { _hlight_start_mousedown(e); }}
                            />
                        ) : (<div></div>)}

                        {/* Circle at the end of the line */}
                        {(arr_highlighted === true) ? (
                            <circle
                                ref={end_ref} 
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
            </Draggable>
        </div>
    );
};

export default _draggable_arrow;
