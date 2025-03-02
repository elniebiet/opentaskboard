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
import { SELECTED_COLOR_THEME } from '../common/globals';
import { SHAPES_TOOLBAR_ITEM_TYPE } from '../common/globals';
import { TASKBOARD_STATES } from './taskboard_definitions';
import _draggable_arrow from '../common/components/arrow';
import { _set_global_new_shape_id, _get_global_new_shape_id } from './taskboard_definitions';
import { _get_global_last_item_add_or_move_loc, _set_global_last_item_add_or_move_loc } from './taskboard_definitions';
import { _get_global_cursor_type, _set_global_cursor_type } from './taskboard_definitions';
import { _get_global_new_shape_type, _set_global_new_shape_type } from './taskboard_definitions';
import { _add_note } from './use_note';
import { _add_comment } from './use_comment';
import { _shape_selected_handler, _start_drawing, _update_drawing } from './use_shape';
import { _get_cursor_type } from '../common/utils';
import { CURSOR_TYPES } from './taskboard_definitions';
import _note_toolbar from '../toolbars/note_toolbar';

import notes from './notes_db_temp';        // temporary notes storage
import comments from './comments_db_temp';  // temporary comments storage
import arrows from './arrows_db_temp';      // temporary arrows storage

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
   * manually trigger a rerender of the page
   */
  const _trigger_taskboard_rerender = () => {
    _re_render_page((prev) => {
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
  const _select_pointer = (cursor_type = 'default') => 
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
        console.log("taskboard state " + taskboard_state);
        switch(taskboard_state)
        {
          // listen to page clicks when sub-toolbar is active, incase non of it's buttons were selected
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
                <_sticky_note key={note.id} id={note.id} text={note.text} win_width_perc={note.win_width_perc} tb_item_loc_update_func={_set_tb_item_loc_func} 
                  x_pos={note.x_pos} y_pos={note.y_pos} win_width={width} win_height={height} colour={note.colour} taskboard_rerender_func={_trigger_taskboard_rerender}/>
              ))}
            </div>

            <div>
              {comments.map((comment) => (
                <_comment key={comment.id} id={comment.id} text={comment.text} win_width_perc={comment.win_width_perc} tb_item_loc_update_func={_set_tb_item_loc_func} 
                x_pos={comment.x_pos} y_pos={comment.y_pos} win_width={width} win_height={height} colour={comment.colour} taskboard_rerender_func={_trigger_taskboard_rerender}/>
              ))}
            </div>
          </div>
          
          {/* display shapes */}
          <div>
              {/* display arrows */}
              {arrows.map((arrow) => (
                <_draggable_arrow start_pos_x1={arrow.x1_pos} start_pos_y1={arrow.y1_pos} start_pos_x2={arrow.x2_pos} start_pos_y2={arrow.y2_pos} colour={arrow.colour} stroke_width={arrow.stroke_width} />
              ))}
          </div>
              {/* display note toolbar */}
              <_note_toolbar pos={"top"} win_width={width} win_height={height} set_tb_item_loc_func={_set_tb_item_loc_func} taskboard_rerender_func={_trigger_taskboard_rerender} 
                request_taskboard_state={_request_taskboard_state}
              />
          <div>

          </div>

      </div>
  );
};

export default _taskboard_default;