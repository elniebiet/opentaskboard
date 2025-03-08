import { SELECTED_COLOR_THEME } from "../globals";

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

    return (
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
    );
};

export default _highlighter;