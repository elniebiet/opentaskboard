import { useEffect, useState } from "react";
import { SELECTED_COLOR_THEME } from "../globals";
import { HIGHLIGHT_DRAG_DIRECTION } from "../globals";

/**
 * highlighter component for displaying active/selected element
 * @param {float} props.item_top_left_pos top left cordinate of item to be highlighted over 
 * @param {int} props.item_width width of item to be highlighted over 
 * @param {int} props.item_height height of item to be highlighted over 
 * @param {int} props.z_index zIndex of item to be highlighted over 
 * @param {int} props.line_width line width of the highlighter 
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
        console.log("bottom right clicked");
        _set_current_drag_dir(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT);
        _set_is_resizing(true);
        props.highlighter_mouse_down(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT);
    };
    
    const _hlight_bottom_right_mousedrag = (e) => {
        console.log("bottom right dragging...");
        let perc_width_incr = 0; 
        let perc_height_incr = 0;
        
        // TODO: update on drag

        props.highlighter_mouse_drag(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT, perc_width_incr, perc_height_incr);
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
        </div>
    );
};

export default _highlighter;