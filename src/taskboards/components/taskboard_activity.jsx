import { ACTIONS } from "../../common/globals";

export class Taskboard_Activity {
  #activity = {};

  /**
   * 
   * @param {string} owning_component_id 
   * @param {ACTIONS} action 
   * @param {*} activity_taskboard_component_structure defined in taskboard_components_data_structure.txt
   */
  constructor(owning_component_id, action, activity_taskboard_component_structure) {
    let act_type = ACTIONS.NONE;

    // validate action type
    if((Object.values(ACTIONS).includes(action)))
    {
      act_type = action;
    }
    
    const item = {
        owning_component_id: owning_component_id,
        action_type: act_type,

        taskboard_component_structure: {
          id: activity_taskboard_component_structure.id,
          x1_pos: activity_taskboard_component_structure.x1_pos,
          y1_pos: activity_taskboard_component_structure.y1_pos,
          x2_pos: activity_taskboard_component_structure.x2_pos,
          y2_pos: activity_taskboard_component_structure.y2_pos,
          colour: activity_taskboard_component_structure.colour,
          stroke_width: activity_taskboard_component_structure.stroke_width, 
          win_width_perc: activity_taskboard_component_structure.win_width_perc,
          height: activity_taskboard_component_structure.height,
          width: activity_taskboard_component_structure.width,
          text: activity_taskboard_component_structure.text,
          highlighted: false,
          active: false,
          toolbar_show: activity_taskboard_component_structure.toolbar_show,
          toolbar_display_loc: activity_taskboard_component_structure.toolbar_display_loc,
          join_arrow_ids: activity_taskboard_component_structure.join_arrow_ids,
          filleted: activity_taskboard_component_structure.filleted,
          taskboard_type: activity_taskboard_component_structure.taskboard_type,
          taskboard_id: activity_taskboard_component_structure.taskboard_id,
        }
    };

    this.#activity = item;
  }

  _get_activity(){
    return this.#activity;
  }
}
