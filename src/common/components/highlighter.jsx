import { useEffect, useState } from "react";
import { ARROW_JOIN_POINT, SELECTED_COLOR_THEME, HIGHLIGHT_DRAG_DIRECTION, 
    HIGHLIGHT_JOIN_POSITIONS } from "../globals";
import { TASKBOARD_STATES } from "../../taskboards/taskboard_globals";
import { _add_arrow, _update_arrow_start_pos, _update_arrow_end_pos } from "../../taskboards/use_arrow";
import { _set_current_joining_arrow_id, _get_current_joining_arrow_id,
    _set_current_joining_position, _get_current_joining_position,
    _get_last_hovered_joining_item_id, _set_last_hovered_joining_item_id,
    _get_last_hovered_joining_position, _set_last_hovered_joining_position } from "../globals";

/**
 * Generic highlighter component for displaying active/selected element
 * @param {float} props.item_top_left_pos top left cordinate of item to be highlighted over 
 * @param {int} props.item_width width of item to be highlighted over 
 * @param {int} props.item_height height of item to be highlighted over 
 * @param {int} props.z_index zIndex of item to be highlighted over 
 * @param {int} props.line_width line width of the highlighter 
 * @param {int} props.caller_id id of the caller component - used to identify the item to be highlighted over
 * @param {*} join_arrow_ids join arrow ids for the item to be highlighted over - structure:             
 * join_arrow_ids: {
 *  top: [-1, ARROW_JOIN_POINT.START_POINT], 
 *  bottom: [-1, ARROW_JOIN_POINT.START_POINT], 
 *  left: [-1, ARROW_JOIN_POINT.START_POINT], 
 *  right: [-1, ARROW_JOIN_POINT.START_POINT]
 * }
 * @param {TASKBOARD_STATES} props.overall_taskboard_state overall taskboard state
 * @returns 
 */
const _highlighter = (props) => {

    let hlight_left_pos = props.item_top_left_pos.x - props.gap;
    let hlight_top_pos = props.item_top_left_pos.y - props.gap;
    let hlight_width = props.item_width + (props.gap * 2);
    let hlight_height = props.item_height + (props.gap * 2);

    let edge_circle_diameter = 0.05 * hlight_width;

    const [is_resizing, _set_is_resizing] = useState(false);
    const [current_drag_dir, _set_current_drag_dir] = useState(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT);
    
    let bottom_right_circle_style = {
        width: edge_circle_diameter + 'px',
        height: edge_circle_diameter + 'px',
        backgroundColor: SELECTED_COLOR_THEME.highlight_colour,
        borderRadius: "50%",
        position: "absolute",
        left: ((hlight_left_pos + hlight_width) - (edge_circle_diameter / 2) + props.line_width) + 'px',
        top: ((hlight_top_pos + hlight_height) - (edge_circle_diameter / 2) + props.line_width) + 'px',
        zIndex: props.z_index,
        cursor: "nwse-resize",
    };
    
    let bottom_left_circle_style = {
        width: edge_circle_diameter + 'px',
        height: edge_circle_diameter + 'px',
        backgroundColor: SELECTED_COLOR_THEME.highlight_colour,
        borderRadius: "50%",
        position: "absolute",
        left: (hlight_left_pos - (edge_circle_diameter / 2) + props.line_width) + 'px',
        top: ((hlight_top_pos + hlight_height) - (edge_circle_diameter / 2) + props.line_width) + 'px',
        zIndex: props.z_index,
        cursor: "nesw-resize",
    };
    
    let top_left_circle_style = {
        width: edge_circle_diameter + 'px',
        height: edge_circle_diameter + 'px',
        backgroundColor: SELECTED_COLOR_THEME.highlight_colour,
        borderRadius: "50%",
        position: "absolute",
        left: (hlight_left_pos - (edge_circle_diameter / 2) + props.line_width) + 'px',
        top: (hlight_top_pos - (edge_circle_diameter / 2) + props.line_width) + 'px',
        zIndex: props.z_index,
        cursor: "nwse-resize",
    };
    
    let top_right_circle_style = {
        width: edge_circle_diameter + 'px',
        height: edge_circle_diameter + 'px',
        backgroundColor: SELECTED_COLOR_THEME.highlight_colour,
        borderRadius: "50%",
        position: "absolute",
        left: ((hlight_left_pos + hlight_width) - (edge_circle_diameter / 2) + props.line_width) + 'px',
        top: (hlight_top_pos - (edge_circle_diameter / 2) + props.line_width) + 'px',
        zIndex: props.z_index,
        cursor: "nesw-resize",
    };

    const _hlight_bottom_right_mousedown = (e) => {
        _set_current_drag_dir(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT);
        _set_is_resizing(true);
        props.highlighter_mouse_down(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT);
    };

    const _hlight_bottom_right_mouseup = (e) => {
        const {clientX, clientY} = e;
        let new_width = clientX - hlight_left_pos;
        let width_change = (new_width - hlight_width);
        let new_height = clientY - hlight_top_pos;
        let height_change = (new_height - hlight_height);
        props.highlighter_mouse_up(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT, width_change, height_change);
    };

    const _hlight_top_left_mousedown = (e) => {
        _set_current_drag_dir(HIGHLIGHT_DRAG_DIRECTION.TOP_LEFT);
        _set_is_resizing(true);
        props.highlighter_mouse_down(HIGHLIGHT_DRAG_DIRECTION.TOP_LEFT);
    };

    const _hlight_top_left_mouseup = (e) => {
        const {clientX, clientY} = e;
        let width_change = hlight_left_pos - clientX;
        let height_change = hlight_top_pos - clientY;
        props.highlighter_mouse_up(HIGHLIGHT_DRAG_DIRECTION.TOP_LEFT, width_change, height_change);
    };

    const _hlight_bottom_left_mousedown = (e) => {
        _set_current_drag_dir(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_LEFT);
        _set_is_resizing(true);
        props.highlighter_mouse_down(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_LEFT);
    };

    const _hlight_bottom_left_mouseup = (e) => {
        const {clientX, clientY} = e;
        let width_change = hlight_left_pos - clientX;
        let height_change = clientY - hlight_top_pos;
        props.highlighter_mouse_up(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_LEFT, width_change, height_change);
    };

    const _hlight_top_right_mousedown = (e) => {
        _set_current_drag_dir(HIGHLIGHT_DRAG_DIRECTION.TOP_RIGHT);
        _set_is_resizing(true);
        props.highlighter_mouse_down(HIGHLIGHT_DRAG_DIRECTION.TOP_RIGHT);
    };

    const _hlight_top_right_mouseup = (e) => {
        const {clientX, clientY} = e;
        let width_change = clientX - (hlight_left_pos + hlight_width);
        let height_change = hlight_top_pos - clientY;
        props.highlighter_mouse_up(HIGHLIGHT_DRAG_DIRECTION.TOP_RIGHT, width_change, height_change);
    };

    /**
     * hover over a join position handler
     * @param {event} e hover event
     * @param {HIGHLIGHT_JOIN_POSITIONS} position join position
     */
    const _on_join_position_hover = (e, position) => {
        if(props.overall_taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED)
        {
            _set_last_hovered_joining_item_id(props.caller_id);
            _set_last_hovered_joining_position(position);
        }
    };

    /**
     * mouse down over a join position handler
     * @param {event} e mouse down event
     * @param {HIGHLIGHT_JOIN_POSITIONS} position join position
     */
    const _on_join_position_mouse_down = (e, position) => {
        let arrow_id = Date.now();
        _add_arrow(arrow_id, e.clientX, e.clientY, e.clientX + 10, e.clientY+10, SELECTED_COLOR_THEME.highlight_colour, 2);
        _set_current_joining_arrow_id(arrow_id);
        _set_current_joining_position(position);
        props.highlighter_join_started(position, arrow_id);

        props.request_taskboard_state(TASKBOARD_STATES.TBS_JOINING_STARTED);
    };

    /**
     * calculate and update join arrow positions
     */
    const _update_join_arrow_positions = () => {
        
        let arrow_id = 0;
        let arrow_join_point = ARROW_JOIN_POINT.START_POINT;
        let x_pos = 0;
        let y_pos = 0;

        // top position
        if(props.join_arrow_ids.top[0] !== -1)
        {
            arrow_id = props.join_arrow_ids.top[0];
            arrow_join_point = props.join_arrow_ids.top[1];
            x_pos = hlight_left_pos + (hlight_width / 2);
            y_pos = hlight_top_pos - 10;

            if(arrow_join_point === ARROW_JOIN_POINT.START_POINT)
            {
                _update_arrow_start_pos(arrow_id, x_pos, y_pos);
            }
            else if(arrow_join_point === ARROW_JOIN_POINT.END_POINT)
            {
                _update_arrow_end_pos(arrow_id, x_pos, y_pos);
            }
        }

        // bottom position
        if(props.join_arrow_ids.bottom[0] !== -1)
        {
            arrow_id = props.join_arrow_ids.bottom[0];
            arrow_join_point = props.join_arrow_ids.bottom[1];
            x_pos = hlight_left_pos + (hlight_width / 2);
            y_pos = hlight_top_pos + hlight_height + 15; //10

            if(arrow_join_point === ARROW_JOIN_POINT.START_POINT)
            {
                _update_arrow_start_pos(arrow_id, x_pos, y_pos);
            }
            else if(arrow_join_point === ARROW_JOIN_POINT.END_POINT)
            {
                _update_arrow_end_pos(arrow_id, x_pos, y_pos);
            }
        }

        // left position
        if(props.join_arrow_ids.left[0] !== -1)
        {
            arrow_id = props.join_arrow_ids.left[0];
            arrow_join_point = props.join_arrow_ids.left[1];
            x_pos = hlight_left_pos - 10;
            y_pos = hlight_top_pos + (hlight_height / 2);

            if(arrow_join_point === ARROW_JOIN_POINT.START_POINT)
            {
                _update_arrow_start_pos(arrow_id, x_pos, y_pos);
            }
            else if(arrow_join_point === ARROW_JOIN_POINT.END_POINT)
            {
                _update_arrow_end_pos(arrow_id, x_pos, y_pos);
            }
        }

        // right position
        if(props.join_arrow_ids.right[0] !== -1)
        {
            arrow_id = props.join_arrow_ids.right[0];
            arrow_join_point = props.join_arrow_ids.right[1];
            x_pos = hlight_left_pos + hlight_width + 10;
            y_pos = hlight_top_pos + (hlight_height / 2);

            if(arrow_join_point === ARROW_JOIN_POINT.START_POINT)
            {
                _update_arrow_start_pos(arrow_id, x_pos, y_pos);
            }
            else if(arrow_join_point === ARROW_JOIN_POINT.END_POINT)
            {
                _update_arrow_end_pos(arrow_id, x_pos, y_pos);
            }
        }

    };
    
    /********************* Effects block begins ***********************/
    // mouse up resizing
    useEffect(() => {
        const _mouse_up_resizing = (e) => {
            if(is_resizing)
            {
                switch(current_drag_dir)
                {
                    case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT:
                    {
                        _hlight_bottom_right_mouseup(e);
                        break;
                    }
                    case HIGHLIGHT_DRAG_DIRECTION.TOP_LEFT:
                    {
                        _hlight_top_left_mouseup(e);
                        break;
                    }
                    case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_LEFT:
                    {
                        _hlight_bottom_left_mouseup(e);
                        break;
                    }
                    case HIGHLIGHT_DRAG_DIRECTION.TOP_RIGHT:
                    {
                        _hlight_top_right_mouseup(e);
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
                
                _set_is_resizing(false);
            }
        };
    
        window.addEventListener('mouseup', _mouse_up_resizing);
        return () => {
            window.removeEventListener('mouseup', _mouse_up_resizing);
        };
        }, [is_resizing]
    );

    // joining over mouse up event
    useEffect(() => {
            const _on_joining_over_mouse_up = (e) => {
                if(props.overall_taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED)
                {
                    // might want to do something here: mouse up after a join
                    // typically handled by the taskboard component
                }
            };
        
            window.addEventListener('mouseup', _on_joining_over_mouse_up);
            return () => {
                window.removeEventListener('mouseup', _on_joining_over_mouse_up);
            };
        }, [props.overall_taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED]
    );

    // Detect Highlighter Props change - update components that need to be updated e.g., joining arrows
    useEffect(() => {
        _update_join_arrow_positions();
        // rerender
        props.taskboard_rerender_func();
    }, [props.item_top_left_pos.x , props.item_top_left_pos.y, props.item_width, props.item_height]);
    
    /********************* Effects block ends ***********************/

    return (
        <div>
            {/* highlighter rectangle */}
            <div 
                style={{
                    position: 'absolute', 
                    left: hlight_left_pos + 'px', 
                    top: hlight_top_pos + 'px',
                    width: hlight_width + 'px',
                    height: hlight_height + 'px',
                    border: props.line_width + 'px ' + 'solid ' + SELECTED_COLOR_THEME.highlight_colour,
                    zIndex: props.z_index,
                }}
            >
            </div>
            {/* highlighter edge circles */}
            <div>
                {/* bottom right edge circle */}
                <div style={bottom_right_circle_style} onMouseDown={_hlight_bottom_right_mousedown} />  
                {/* bottom left edge circle */}
                <div style={bottom_left_circle_style} onMouseDown={_hlight_bottom_left_mousedown}/>
                {/* top left edge circle */}
                <div style={top_left_circle_style} onMouseDown={_hlight_top_left_mousedown} />
                {/* top right edge circle */}
                <div style={top_right_circle_style} onMouseDown={_hlight_top_right_mousedown}/>
            </div>
            {/* Join Arrow triangles */}
            <div>
                <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: props.z_index + 1 }}>
                    {/* Top triangle - now pointing down */}
                    <polygon
                        points={`
                            ${hlight_left_pos + hlight_width / 2 - 5},${hlight_top_pos - 2}
                            ${hlight_left_pos + hlight_width / 2 + 5},${hlight_top_pos - 2}
                            ${hlight_left_pos + hlight_width / 2},${hlight_top_pos - 10}
                        `}
                        fill={SELECTED_COLOR_THEME.highlight_colour}
                        onMouseEnter={(e) => {_on_join_position_hover(e, HIGHLIGHT_JOIN_POSITIONS.TOP)}}
                        onMouseDown={(e) => {_on_join_position_mouse_down(e, HIGHLIGHT_JOIN_POSITIONS.TOP)}}
                        style={{ 
                            pointerEvents: "auto",
                            cursor: "pointer",
                        }}
                    />
                    
                    {/* Right triangle - now pointing left */}
                    <polygon
                        points={`
                            ${hlight_left_pos + hlight_width + 7},${hlight_top_pos + hlight_height / 2 - 5}
                            ${hlight_left_pos + hlight_width + 7},${hlight_top_pos + hlight_height / 2 + 5}
                            ${hlight_left_pos + hlight_width + 17},${hlight_top_pos + hlight_height / 2}
                        `}
                        fill={SELECTED_COLOR_THEME.highlight_colour}
                        onMouseEnter={(e) => {_on_join_position_hover(e, HIGHLIGHT_JOIN_POSITIONS.RIGHT)}}
                        onMouseDown={(e) => {_on_join_position_mouse_down(e, HIGHLIGHT_JOIN_POSITIONS.RIGHT)}}
                        style={{ 
                            pointerEvents: "auto", 
                            cursor: "pointer",
                        }}
                    />


                    {/* Bottom triangle - now pointing up */}
                    <polygon
                        points={`
                            ${hlight_left_pos + hlight_width / 2 - 5},${hlight_top_pos + hlight_height + 7}
                            ${hlight_left_pos + hlight_width / 2 + 5},${hlight_top_pos + hlight_height + 7}
                            ${hlight_left_pos + hlight_width / 2},${hlight_top_pos + hlight_height + 15}
                        `}
                        fill={SELECTED_COLOR_THEME.highlight_colour}
                        onMouseEnter={(e) => {_on_join_position_hover(e, HIGHLIGHT_JOIN_POSITIONS.BOTTOM)}}
                        onMouseDown={(e) => {_on_join_position_mouse_down(e, HIGHLIGHT_JOIN_POSITIONS.BOTTOM)}}
                        style={{ 
                            pointerEvents: "auto", 
                            cursor: "pointer",
                        }}
                    />


                    {/* Left triangle - now pointing right */}
                    <polygon
                        points={`
                            ${hlight_left_pos - 2},${hlight_top_pos + hlight_height / 2 - 5}
                            ${hlight_left_pos - 2},${hlight_top_pos + hlight_height / 2 + 5}
                            ${hlight_left_pos - 10},${hlight_top_pos + hlight_height / 2}
                        `}
                        fill={SELECTED_COLOR_THEME.highlight_colour}
                        onMouseEnter={(e) => {_on_join_position_hover(e, HIGHLIGHT_JOIN_POSITIONS.LEFT)}}
                        onMouseDown={(e) => {_on_join_position_mouse_down(e, HIGHLIGHT_JOIN_POSITIONS.LEFT)}}
                        style={{ 
                            pointerEvents: "auto", 
                            cursor: "pointer",
                        }}
                    />
                </svg>
            </div>
        </div>
    );
};

export default _highlighter;