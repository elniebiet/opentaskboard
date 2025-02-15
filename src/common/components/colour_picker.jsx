import { useState } from "react";
import { SELECTED_COLOR_THEME } from "../globals";

const _colour_picker_round = (props) => {
    const [color, _set_colour] = useState(props.colour);

    const _update_colour = (hex_colour_val) => {
        _set_colour(hex_colour_val);
        props.update_colour_func(hex_colour_val);
    };
    return (
    <div style={{ display: "flex", alignItems: "center" }}>
        <button
        style={{
            width: props.width + 'px',
            height: props.height + 'px',
            padding: "0",
            borderRadius: "50%",
            backgroundColor: color,
            border: "2px solid " + SELECTED_COLOR_THEME,
            cursor: "pointer",
        }}
        onClick={() => document.getElementById("colour_picker").click()}
        />

        {/* Hidden Color Input */}
        <input
        id="colour_picker"
        type="color"
        value={color}
        onChange={(e) => _update_colour(e.target.value)}
        style={{ display: "none" }} // Hide input
        />
    </div>
    );
};

export {
    _colour_picker_round
};
