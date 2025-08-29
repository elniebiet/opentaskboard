// This class defines the generic data structure for taskboard components e.g note component,
// every taskboard component must use this structure for data handling 

/*
[
    - id: (string)
    - x1_pos: (float)
    - y1_pos: (float)
    - x2_pos: (float)
    - y2_pos: (float)
    - colour: (hex string)
    - stroke_width: (float) 
    - win_width_perc: (float)
    - height: (float)
    - width: (float)
    - text: (string)
    - highlighted: (boolean)
    - active: (boolean)
    - toolbar_show: (boolean)
    - toolbar_display_loc: ({x: float, y: float} structure)
    - join_arrow_ids:
        (sample:       
            join_arrow_ids: {top: [-1, ARROW_JOIN_POINT.START_POINT], bottom: [-1, ARROW_JOIN_POINT.START_POINT], left: [-1, ARROW_JOIN_POINT.START_POINT], right: [-1, ARROW_JOIN_POINT.START_POINT]},
        )
    - filleted: (boolean):
]
*/

/**
 * Generic Taskboard component datastructure 
 */
export class Taskboard_Comp_DS {
    constructor() {
        this.id = 0;
        this.x1_pos = 0;
        this.y1_pos = 0;
        this.x2_pos = 0;
        this.y2_pos = 0;
        this.colour = "#000000";
        this.stroke_width = 0;
        this.win_width_perc = 0;
        this.height = 0;
        this.width = 0;
        this.text = "";
        this.highlighted = false;
        this.active = false;
        this.toolbar_show = false;
        this.toolbar_display_loc = { x: 0, y: 0 };
        this.join_arrow_ids = null;
        this.filleted = false;
        this.taskboard_type = null;
        this.taskboard_id = null;
    }
}