import * as React from 'react';
import _get_window_size from '../common/components/window_size';
import _taskboard_toolbar from '../toolbars/taskboard_toolbar';
import _shapes_sub_toolbar from '../toolbars/shapes_sub_toolbar';
import { useState, useEffect } from 'react';
import _gridlines_normal from '../gridlines/normal';
import _sticky_note from './components/sticky_note';
import _comment from './components/comment';
import board_marker_img_32 from '../../res/imgs/img_board_marker_32x32.png'; 
import fill_img_32 from '../../res/imgs/img_fill2_32x32.png'; 
import { TASKBOARD_STATES } from './taskboard_globals';
import _draggable_arrow from '../common/components/arrow';
import _draggable_line from '../common/components/line';
import _draggable_circle from '../common/components/circle';
import _draggable_rectangle from '../common/components/rectangle';
import { _set_global_new_shape_id, _get_global_new_shape_id } from './taskboard_globals';
import { _get_global_last_item_add_or_move_loc, _set_global_last_item_add_or_move_loc } from './taskboard_globals';
import { _get_global_cursor_type, _set_global_cursor_type } from './taskboard_globals';
import { _get_global_new_shape_type, _set_global_new_shape_type } from './taskboard_globals';
import { _add_note } from './use_note';
import { _add_comment } from './use_comment';
import { _shape_selected_handler, _start_drawing, _update_drawing } from './use_shape';
import { _get_cursor_type } from '../common/utils';
import { CURSOR_TYPES } from './taskboard_globals';
import _note_toolbar from '../toolbars/note_toolbar';
import { ARROW_JOIN_POINT } from '../common/globals';
import { _update_arrow_end_pos } from './use_arrow';
import { _get_current_joining_arrow_id, _get_last_hovered_joining_item_id, _set_last_hovered_joining_item_id, 
        _get_last_hovered_joining_position, _set_last_hovered_joining_position } from '../common/globals';
import { _otbf_update_item_join_arrow_id, _otbf_deactivate_item } from '../common/otb_finder';

import notes from '../db/taskboards/notes_db_temp';
import comments from '../db/taskboards/comments_db_temp';        // temporary comments storage
import arrows from '../db/taskboards/arrows_db_temp';            // temporary arrows storage
import lines from '../db/taskboards/lines_db_temp';              // temporary lines storage
import circles from '../db/taskboards/circles_db_temp';          // temporary circles storage
import rectangles from '../db/taskboards/rectangles_db_temp';    // temporary rectangles storage

/**
 * Default taskboard componen
 */
const _taskboard_default = () => {

  /***************** Misc block begins *************************/
  const { width, height } = _get_window_size();

  // Taskboard state
  const [taskboard_state, _set_taskboard_state] = useState(TASKBOARD_STATES.TBS_NORMAL);
  
  const [start_draw_pos, _set_start_draw_pos] = useState({x_pos: 100, y_pos: 100});
  
  const [, _re_render_page] = useState(0);

  /** 
   * click counter incremented each time there is a page click 
   * useful to inform other components of clicks
   */
  const [click_counter, _set_click_counter] = useState(0);

  /**
   * click event target for the last active click event
   */
  const [click_event_target, _set_click_event_target] = useState(null);

  /**
   * manually trigger a rerender of the page
   */
  const _trigger_taskboard_rerender = () => {
    _re_render_page((prev) => {
      return ((prev >= 1000000) ? 0 : (prev + 1));
    });
  };

  /**
   * manually increment click counter to inform other components of clicks
   */
  const _increment_click_counter = () => {
    _set_click_counter((prev) => {
    return ((prev >= 1000000) ? 0 : (prev + 1));
    });
  };

  /**
   * set toolbar item location function
   */
  const _set_tb_item_loc_func = (x, y) => {
    _set_global_last_item_add_or_move_loc(x, y);
  };

  /**
   * Toolbar item drag over to prevent the default "red stop circle" cursor 
   */
  const _handle_drag_over = (e) => {
    e.preventDefault(); // prevent the default "red stop circle" cursor
  };

  /**
   * Request taskboard state
   * - call this function to request a new state for the taskboard
   */
  const _request_taskboard_state = (tb_state = TASKBOARD_STATES.TBS_NORMAL) => {
    if(tb_state > TASKBOARD_STATES.TBS_NONE && tb_state < TASKBOARD_STATES.TBS_LAST)
    {
      _set_taskboard_state(tb_state);
    }
  };
  /***************** Misc block ends *************************/

  /************** Pointer selection begins **************************/
  const _select_pointer = (cursor_type = CURSOR_TYPES.CT_DEFAULT) => 
  {
    console.log("pointer selected: taskboard_state " + taskboard_state);
    _set_global_cursor_type(cursor_type);
    _request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
  };
  /************** Pointer selection ends ****************************/

  /************** Marker drawing begins ************************/
  const _draw_with_marker = () => 
  {
    let cursor_type = `url(${board_marker_img_32}) 10 10, auto`;
    _set_global_cursor_type(cursor_type);
    _trigger_taskboard_rerender();

    // TODO: draw, move block to separate module
  };
  /************** Marker drawing ends ************************/

  /************** Add fill begins **********************************/
  const _add_fill = () => 
  {
    let cursor_type = `url(${fill_img_32}) 10 10, auto`;
    _set_global_cursor_type(cursor_type);
    _trigger_taskboard_rerender();

    // TODO: fill, move block to separate module
  };
  /************** Add fill ends **********************************/

  /************** Page listener begins **********************/
  /**
   * page mouse listener 
   * this page listener listens for all page clicks
   * it handles the overall taskboard state changes 
   */
  const _page_mouse_down_listener = () => {
    useEffect(() => {
        const _handle_page_click = (e) => {
        console.log("page clicked at:", e.clientX, e.clientY);
        _increment_click_counter();
        _set_click_event_target(e.target);

        console.log("taskboard state " + taskboard_state);
        switch(taskboard_state)
        {
          // listen to page clicks when main sub-toolbar is active, incase non of it's buttons were selected
          case (TASKBOARD_STATES.TBS_NORMAL):
          {
            let cursor_type = _get_global_cursor_type();
            if(cursor_type !== CURSOR_TYPES.CT_DEFAULT)
            {
              _set_global_cursor_type(CURSOR_TYPES.CT_DEFAULT);
              _trigger_taskboard_rerender();
            }

            break;  
          }
          case (TASKBOARD_STATES.TBS_SUB_TOOLBAR_ACTIVE):
          {
            break;
          }
          case (TASKBOARD_STATES.TBS_WAITING_DRAW_SHAPE):
          {
            _request_taskboard_state(TASKBOARD_STATES.TBS_BEGIN_DRAWING_SHAPE);
            break;
          }
          case (TASKBOARD_STATES.TBS_BEGIN_DRAWING_SHAPE):
          {
            // ignore if cursor type is not as expected i.e., hovering over non-drawable object
            if(_get_cursor_type(e.target) !== CURSOR_TYPES.CT_DRAW_SHAPE_FULL_PATH)
            {
              _request_taskboard_state(TASKBOARD_STATES.TBS_BEGIN_DRAWING_SHAPE);
              break;
            }

            _set_start_draw_pos({x_pos: e.clientX, y_pos: e.clientY});
            _set_global_new_shape_id(Date.now());
            _start_drawing({
              shape_id: _get_global_new_shape_id(), 
              start_pos_x: e.clientX, 
              start_pos_y: e.clientY, 
              end_pos_x: e.clientX, 
              end_pos_y: e.clientY, 
              colour: "#0000ff", 
              stroke_width: 3
            });
            _trigger_taskboard_rerender();
            _request_taskboard_state(TASKBOARD_STATES.TBS_DRAWING_SHAPE);
            break;
          }
          case (TASKBOARD_STATES.TBS_JOINING_STARTED):
          {
            // joining started, clicked at: e.clientX, e.clientY)
            break; 
          }
          
          default:
          {
            break;
          }
        }
      };
  
      document.addEventListener("mousedown", _handle_page_click);
  
      // cleanup function to remove the listener on unmount
      return () => {
        document.removeEventListener("mousedown", _handle_page_click);
      };
    }, []);
  
    return (
      null
    );
  };
  /**************** Page listener ends **************************/


  /*************** Effects Begin ***************************/  
  // draw shape over mousemove event 
  useEffect(() => {
    /**
     * draw shape mousemove event
     * this function will trigger the wait for mouse up event
     * @param {event} e
     */
    const _drawing_shape_mousemove = (e) => {
        if(taskboard_state === TASKBOARD_STATES.TBS_DRAWING_SHAPE)
        {
          // draw shape
          _update_drawing({e: e, shape_type: _get_global_new_shape_type()});
          _trigger_taskboard_rerender();
        }
    };

      window.addEventListener('mousemove', _drawing_shape_mousemove);
      return () => {
        window.removeEventListener('mousemove', _drawing_shape_mousemove);
      };
    }, [taskboard_state === TASKBOARD_STATES.TBS_DRAWING_SHAPE]
  );

  // drawing shape over mouseup event 
  useEffect(() => {
    /**
     * draw shape mouse up event
     * @param {event} e
     */
    const _drawing_shape_over_mouseup = (e) => {
        if(taskboard_state === TASKBOARD_STATES.TBS_DRAWING_SHAPE)
        {
          // draw shape
          _update_drawing({e: e, shape_type: _get_global_new_shape_type()});
          console.log("drew " + _get_global_new_shape_type() + " at this point: " + start_draw_pos.x_pos + ", " + start_draw_pos.y_pos + " to this point: " + e.clientX  + ", " + e.clientY);

          // done drawing
          _set_start_draw_pos({x_pos: 100, y_pos: 100});
          _set_global_new_shape_id(0);
          _request_taskboard_state(TASKBOARD_STATES.TBS_BEGIN_DRAWING_SHAPE);
        }
    };
  
      window.addEventListener('mouseup', _drawing_shape_over_mouseup);
      return () => {
        window.removeEventListener('mouseup', _drawing_shape_over_mouseup);
      };
    }, [taskboard_state === TASKBOARD_STATES.TBS_DRAWING_SHAPE]
  );

  // joining over mouseup event 
  useEffect(() => {
    /**
     * joining over mouse up event
     * @param {event} e
     */
    const _joining_over_mouseup = (e) => {
        if(taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED)
        {
          let current_joining_arrow_id = _get_current_joining_arrow_id();
          _update_arrow_end_pos(current_joining_arrow_id, e.clientX, e.clientY);

          // update the last hovered item with new arrow properties
          let last_hovered_joining_item_id = _get_last_hovered_joining_item_id();
          let last_hovered_joining_position = _get_last_hovered_joining_position();
          _otbf_update_item_join_arrow_id(last_hovered_joining_item_id, last_hovered_joining_position, current_joining_arrow_id, ARROW_JOIN_POINT.END_POINT);

          // clear the last hovered item id
          _set_last_hovered_joining_item_id(-1);

          // deactivate item
          _otbf_deactivate_item(last_hovered_joining_item_id);
          
          // revert to normal state
          _request_taskboard_state(TASKBOARD_STATES.TBS_NORMAL);
        }
    };
  
      window.addEventListener('mouseup', _joining_over_mouseup);
      return () => {
        window.removeEventListener('mouseup', _joining_over_mouseup);
      };
    }, [taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED]
  );

  // joining arrow mousemove event 
  useEffect(() => {
    /**
     * joining arrow mousemove event
     * this function be triggered during a mousemove when drawing a join arrow
     * @param {event} e
     */
    const _joining_arrow_mousemove = (e) => {
        if(taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED)
        {
          let current_joining_arrow_id = _get_current_joining_arrow_id();
          _update_arrow_end_pos(current_joining_arrow_id, e.clientX, e.clientY);
          _trigger_taskboard_rerender();
        }
    };

      window.addEventListener('mousemove', _joining_arrow_mousemove);
      return () => {
        window.removeEventListener('mousemove', _joining_arrow_mousemove);
      };
    }, [taskboard_state === TASKBOARD_STATES.TBS_JOINING_STARTED]
  );
  /*************** Effects Ends ***************************/

  return (
      <div 
        id="taskboard_default_root"
        onDragOver={_handle_drag_over}
        style={{ 
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f0f0f0",
          cursor: _get_global_cursor_type(),
        }}
      >
          <_page_mouse_down_listener />

          <_gridlines_normal grid_size={50} line_color="#E6E6E6" />
          
          <_taskboard_toolbar pos={"top"} win_width={width} win_height={height} add_note_func={_add_note} set_tb_item_loc_func={_set_tb_item_loc_func} 
            select_cursor_func={_select_pointer} marker_draw_func={_draw_with_marker} add_fill_func={_add_fill} add_comment_func={_add_comment} 
            taskboard_rerender_func={_trigger_taskboard_rerender} request_taskboard_state={_request_taskboard_state}
          />
          
          <_taskboard_toolbar pos={"left"} win_width={width} win_height={height} add_note_func={_add_note} set_tb_item_loc_func={_set_tb_item_loc_func} 
            select_cursor_func={_select_pointer} marker_draw_func={_draw_with_marker} add_fill_func={_add_fill} add_comment_func={_add_comment} 
            taskboard_rerender_func={_trigger_taskboard_rerender} request_taskboard_state={_request_taskboard_state}
          />
          
          {(taskboard_state === TASKBOARD_STATES.TBS_SUB_TOOLBAR_ACTIVE) && (
            <_shapes_sub_toolbar shapes_tb_item_clicked_func={_shape_selected_handler} pos={"top"} win_width={width} win_height={height} 
            taskboard_rerender_func={_trigger_taskboard_rerender} request_taskboard_state={_request_taskboard_state} />
          )}

          {(taskboard_state === TASKBOARD_STATES.TBS_SUB_TOOLBAR_ACTIVE) && (
            <_shapes_sub_toolbar shapes_tb_item_clicked_func={_shape_selected_handler} pos={"left"} win_width={width} win_height={height} 
            taskboard_rerender_func={_trigger_taskboard_rerender} request_taskboard_state={_request_taskboard_state} />
          )}

          <div>
            {/* display notes and comments */}
            <div>
              {notes.map((note) => (
                <div>
                  <div>
                    <_sticky_note key={note.id} id={note.id} text={note.text} win_width_perc={note.win_width_perc} tb_item_loc_update_func={_set_tb_item_loc_func} 
                      x_pos={note.x_pos} y_pos={note.y_pos} win_width={width} win_height={height} colour={note.colour} taskboard_rerender_func={_trigger_taskboard_rerender}
                      show_toolbar={note.toolbar_show} highlighted={note.highlighted} join_arrow_ids={note.join_arrow_ids} request_taskboard_state={_request_taskboard_state} 
                      overall_taskboard_state={taskboard_state} main_page_click_counter={click_counter} main_page_last_click_event_target={click_event_target}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              {comments.map((comment) => (
                <_comment key={comment.id} id={comment.id} text={comment.text} win_width_perc={comment.win_width_perc} tb_item_loc_update_func={_set_tb_item_loc_func} 
                x_pos={comment.x_pos} y_pos={comment.y_pos} win_width={width} win_height={height} colour={comment.colour} taskboard_rerender_func={_trigger_taskboard_rerender}
                request_taskboard_state={_request_taskboard_state} overall_taskboard_state={taskboard_state} />
              ))}
            </div>
          </div>
          
          {/* display shapes */}
          <div>
              {/* display arrows */}
              <div>
                {arrows.map((arrow) => (
                  <_draggable_arrow key={arrow.id} id={arrow.id} start_pos_x={arrow.x1_pos} start_pos_y={arrow.y1_pos} end_pos_x={arrow.x2_pos} end_pos_y={arrow.y2_pos} 
                  colour={arrow.colour} stroke_width={arrow.stroke_width} is_highlighted={arrow.highlighted} taskboard_rerender_func={_trigger_taskboard_rerender} 
                  show_toolbar={arrow.toolbar_show} win_width={width} win_height={height} request_taskboard_state={_request_taskboard_state} overall_taskboard_state={taskboard_state}
                  />
                ))}
              </div>

              {/* display lines */}
              <div>
                {lines.map((line) => (
                  <_draggable_line key={line.id} id={line.id} start_pos_x={line.x1_pos} start_pos_y={line.y1_pos} end_pos_x={line.x2_pos} end_pos_y={line.y2_pos} 
                  colour={line.colour} stroke_width={line.stroke_width} is_highlighted={line.highlighted} taskboard_rerender_func={_trigger_taskboard_rerender} 
                  show_toolbar={line.toolbar_show} win_width={width} win_height={height} request_taskboard_state={_request_taskboard_state} overall_taskboard_state={taskboard_state}
                  />
                ))}
              </div>

              {/* display circles */}
              <div>
                {circles.map((circle) => (
                  <_draggable_circle key={circle.id} id={circle.id} start_pos_x={circle.x1_pos} start_pos_y={circle.y1_pos} end_pos_x={circle.x2_pos} end_pos_y={circle.y2_pos} 
                  colour={circle.colour} stroke_width={circle.stroke_width} is_highlighted={circle.highlighted} taskboard_rerender_func={_trigger_taskboard_rerender}
                  active={circle.active} join_arrow_ids={circle.join_arrow_ids} 
                  show_toolbar={circle.toolbar_show} win_width={width} win_height={height} request_taskboard_state={_request_taskboard_state} overall_taskboard_state={taskboard_state}
                  main_page_click_counter={click_counter} main_page_last_click_event_target={click_event_target}
                  />
                ))}
              </div>

              {/* display rectangles */}
              <div>
                {rectangles.map((rectangle) => (
                  <_draggable_rectangle key={rectangle.id} id={rectangle.id} start_pos_x={rectangle.x1_pos} start_pos_y={rectangle.y1_pos} end_pos_x={rectangle.x2_pos} end_pos_y={rectangle.y2_pos} 
                  colour={rectangle.colour} stroke_width={rectangle.stroke_width} is_highlighted={rectangle.highlighted} taskboard_rerender_func={_trigger_taskboard_rerender}
                  active={rectangle.active} join_arrow_ids={rectangle.join_arrow_ids} 
                  show_toolbar={rectangle.toolbar_show} win_width={width} win_height={height} request_taskboard_state={_request_taskboard_state} overall_taskboard_state={taskboard_state}
                  main_page_click_counter={click_counter} main_page_last_click_event_target={click_event_target}
                  />
                ))}
              </div>

          </div>
      </div>
  );
};

export default _taskboard_default;