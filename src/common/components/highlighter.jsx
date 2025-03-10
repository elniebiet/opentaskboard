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
        cursor: "nwse-resize",
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
        cursor: "nwse-resize",
    };

    const _hlight_bottom_right_mousedown = (e) => {
        console.log("bottom right clicked");
        props.highlighter_mouse_down(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT);
    };
    
    const _hlight_bottom_right_mousedrag = (e) => {
        console.log("bottom right clicked");
        const {clientX, clientY} = e;
        let perc_width_incr = 0; // TODO: calculate percentage width increase
        let perc_height_incr = 0; // TODO: calculate percentage height increase
        props.highlighter_mouse_drag(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT, perc_width_incr, perc_height_incr);
    };

    const _hlight_bottom_right_mouseup = (e) => {
        console.log("bottom right clicked");
        const {clientX, clientY} = e;
        let perc_width_incr = 0; // TODO: calculate percentage width increase
        let perc_height_incr = 0; // TODO: calculate percentage height increase
        props.highlighter_mouse_up(HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT, perc_width_incr, perc_height_incr);
    };

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
                <div style={bottom_left_circle_style} />
                {/* top left edge circle */}
                <div style={top_left_circle_style} />
                {/* top right edge circle */}
                <div style={top_right_circle_style} />
                  
                  
            </div>
        </div>
    );
};

export default _highlighter;