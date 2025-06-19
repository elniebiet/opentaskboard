import { useState } from "react";
import { SELECTED_COLOR_THEME } from "./use_colour_themes";
import { _get_complement_colour } from "../utils";

/**
 * round colour picker with button component.
 * @param {variable} props - includes {
 *  - id, 
 *  - update_colour_func(), 
 *  - colour  (default colour)
 *  - update_colour_func (colour update function)
 *  - id  (colour picker id)
 *  - onclick_func (colour picker button clicked handler)
 *  - width ( colour picker button width)
 *  - height ( colour picker button height )
 *  - x_pos (colour picker x location)
 *  - y_pos (colour picker y location)
 *  - }
 */
const _colour_picker_round = ({
    id, 
    colour, 
    width,
    height, 
    x_pos, 
    y_pos, 
    update_colour_func, 
    onclick_func,
}) => {
    const [color, _set_colour] = useState(colour);

    const colour_picker_id = id;
    
    const _update_colour = (hex_colour_val) => {
        _set_colour(hex_colour_val);
        update_colour_func(hex_colour_val);
    };

    const _cp_btn_clicked = () => {
        onclick_func();
        document.getElementById(colour_picker_id).click()
    };

    return (
    <div 
        style={{ 
            display: "flex", 
            alignItems: "center", 
        }}
    >
        <button
            style={{
                width: width + 'px',
                height: height + 'px',
                padding: "0",
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid " + _get_complement_colour(color),
                cursor: "pointer",
            }}
            onClick={() => _cp_btn_clicked()}
        />

        {/* Hidden Color Input */}
        <input
            id={colour_picker_id}
            type="color"
            value={color}
            onChange={(e) => _update_colour(e.target.value)}
            style={{ 
                position: "absolute",
                left: x_pos,
                top: y_pos, 
                opacity: 0,
            }}
        />
    </div>
    );
};

/**
 * colour picker to use with external button from caller
 * @param {variable} props - includes {id, update_colour_func(), 
 *  onclick_func(), width, height}
 * @returns 
 */
const _colour_picker_no_button = ({
    id, 
    colour, 
    width, 
    height,
    update_colour_func,
    onclick_func, 
 }) => {
    const [color, _set_colour] = useState(colour);
    const colour_picker_id = id;

    const _update_colour = (hex_colour_val) => {
        _set_colour(hex_colour_val);
        update_colour_func(hex_colour_val);
    };
    
    const _cp_btn_clicked = () => {
        onclick_func();
        document.getElementById(colour_picker_id).click()
    };

    return (
        <div 
            style={{ 
                display: "flex", 
                alignItems: "center", 
            }}
        >
            {/* Color Input */}
            <input
                id={colour_picker_id}
                type="color"
                value={color}
                onChange={(e) => _update_colour(e.target.value)}
                style={{ 
                    width: width + 'px',
                    height: height + 'px',
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    cursor: 'pointer',
                    position: 'relative',
                }}
                onClick={() => {_cp_btn_clicked()}}
            />
        </div>
    );
};

export {
    _colour_picker_round,
    _colour_picker_no_button,
};
