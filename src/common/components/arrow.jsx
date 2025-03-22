import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { _set_global_toolbar_items_active_state } from "../../taskboards/taskboard_globals";
import { TASKBOARD_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { _get_max_z_index, _use_max_z_index } from "../globals";
import { _update_arrow_highlighted } from "../../taskboards/use_arrow";

const _arrow_highlighter = (arr_start_x_pos, arr_start_y_pos, arr_end_x_pos, arr_end_y_pos) => {
    //TODO: implement arrow highlighter
    return (
        <div></div>
    );
};

const _draggable_arrow = ({ id, start_pos_x1, start_pos_y1, start_pos_x2, start_pos_y2, colour = "black", stroke_width = 2, is_highlighted }) => {
    const [start, setStart] = useState({ x: start_pos_x1, y: start_pos_y1 });
    const [end, setEnd] = useState({ x: start_pos_x2, y: start_pos_y2 });
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    const [arr_highlighted, _set_arr_highlighted] = useState(is_highlighted);

    // Update state when props change
    useEffect(() => {
        setStart({ x: start_pos_x1, y: start_pos_y1 });
        setEnd({ x: start_pos_x2, y: start_pos_y2 });
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
        console.log("Drag Stop");
    };

    const _on_drag = (e, data) => {
        console.log("Dragging");
        console.log(data);
        console.log(id);
        // _set_z_index(_get_max_z_index());
        // _use_max_z_index();
        // setStart(prev => ({ x: prev.x + data.deltaX, y: prev.y + data.deltaY }));
        // setEnd(prev => ({ x: prev.x + data.deltaX, y: prev.y + data.deltaY }));
    };

    return (
        <div>
            {/* display arrow highlighter */}
            <div>
                {(arr_highlighted === true) ? (
                    <_arrow_highlighter
                        arr_start_x_pos={start.x}
                        arr_start_y_pos={start.y}
                        arr_end_x_pos={end.x}
                        arr_end_y_pos={end.y} />
                ) : (<div></div>)}
            </div>
            <div id="arrow_root">
                <Draggable
                    onStart={(e, data) => { _on_drag_start(e, data); }}
                    onStop={(e, data) => { _on_drag_stop(e, data); }}  
                    onDrag={(e, data) => { _on_drag(e, data); }}
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
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            stroke={colour}
                            strokeWidth={stroke_width}
                            markerEnd="url(#arrowhead)"
                            style={{ cursor: "grab", pointerEvents: "all" }}
                        />
                    </svg>
                </Draggable>
            </div>
        </div>
    );
};

export default _draggable_arrow;
