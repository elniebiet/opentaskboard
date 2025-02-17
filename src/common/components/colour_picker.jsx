import { useState } from "react";
import { SELECTED_COLOR_THEME } from "../globals";
import { _get_complement_colour } from "../utils";

const _colour_picker_round = (props) => {
    const [color, _set_colour] = useState(props.colour);

    const colour_picker_id = "cp" + props.id;
    
    const _update_colour = (hex_colour_val) => {
        _set_colour(hex_colour_val);
        props.update_colour_func(hex_colour_val);
    };

    const _cp_btn_clicked = () => {
        props.onclick_func();
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
                width: props.width + 'px',
                height: props.height + 'px',
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
                left: props.x_pos,
                top: props.y_pos, 
                opacity: 0,
            }}
        />
    </div>
    );
};

export {
    _colour_picker_round
};
