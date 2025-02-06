import * as React from 'react';
import _templates_toolbar from '../toolbars/templates_toolbar';
import _shapes_sub_toolbar from '../toolbars/shapes_sub_toolbar';
import { useState, useEffect } from 'react';
import _gridlines_normal from '../gridlines/normal';
import _sticky_note from '../toolbars/components/sticky_note';
import board_marker_img_32 from '../../res/imgs/img_board_marker_32x32.png'; 
import fill_img_32 from '../../res/imgs/img_fill2_32x32.png'; 
import { SHAPES_TOOLBAR_ITEM_TYPE } from '../common/globals';

const _use_window_size = () => {
    const [window_size, _set_window_size] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    useEffect(() => {
      const _handle_resize = () => {
        _set_window_size({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      window.addEventListener('resize', _handle_resize);
      return () => {
        window.removeEventListener('resize', _handle_resize);
      };
    }, []);
  
    return window_size;
};

const _sprint_planning_template = () => {
    const { width, height } = _use_window_size();

    const _handle_drag_over = (e) => {
      e.preventDefault(); // prevent the default "red stop circle" cursor
    };
    
    /****************** sticky note begins ************************/
    const [notes, _set_notes] = useState([]);
    const [note_location, _set_note_location] = useState({loc_x: 100, loc_y: 100}); // last location a note was added

    const _add_note = (clicked = true, pos_x = 100, pos_y = 100) => {
      if(clicked)
      {
        // get last add/drag location
        const {loc_x, loc_y} = note_location;  
        let new_loc_x = loc_x + 20;
        let new_loc_y = loc_y + 20;
        const new_note = { id: Date.now(), text: "", x_pos: new_loc_x, y_pos: new_loc_y };
        _set_note_location({loc_x: new_loc_x, loc_y: new_loc_y}); // update last added location
        _set_notes([...notes, new_note]);
      }
      else
      {
        // dragged
        const new_note = { id: Date.now(), text: "", x_pos: pos_x, y_pos: pos_y };
        _set_notes([...notes, new_note]);
      }
    };

    const _delete_note = (id) => {
      _set_notes(notes.filter((note) => note.id !== id));
    };

    const _set_note_loc_func = (x, y) => {
      _set_note_location({loc_x: x, loc_y: y});
    };
    /************** sticky note ends ******************************/

    /************** Pointer selection begins **************************/
    const [cursor_type, _set_cursor_type] = useState("default");
    
    const _select_cursor_type = (cursor_type = 'default') => 
    {
      _set_cursor_type(cursor_type);
    };
    /************** Pointer selection ends ****************************/

    /************** Marker drawing begins ************************/
    const _draw_with_marker = () => 
    {
      let cursor_type = `url(${board_marker_img_32}) 10 10, auto`;
      _set_cursor_type(cursor_type);

      // TODO: draw
    };

    /************** Marker drawing ends ************************/

    /************** Add fill begins **********************************/
    const _add_fill = () => 
    {
      let cursor_type = `url(${fill_img_32}) 10 10, auto`;
      _set_cursor_type(cursor_type);

      // TODO: fill
    };
    /************** Add fill ends **********************************/

    /************** Shapes selection begins *********************/
    const [shapes_sub_toolbar_active, _set_shapes_sub_toolbar_active] = useState(false);
    const [sub_tb_item_clicked, _set_sub_tb_item_clicked] = useState(false);
    let initial_click = true;
    const _show_shape_options = (click_loc_x, click_loc_y) => 
    {
      initial_click = true;
      console.log('shapes selected, button location: ' + click_loc_x, click_loc_y); 
      _set_shapes_sub_toolbar_active(true);
      _set_sub_tb_item_clicked(false);
    };

    const _shape_clicked = (e, shape_type) => 
    {
      // sub toolbar_item was clicked
      _set_sub_tb_item_clicked(true);
    };

    const _deactivate_shapes_sub_tb = () => 
    {
      _set_shapes_sub_toolbar_active(false);
    };

    /************** Shapes selection ends *********************/

    /************** Page listener begins **********************/
    const _page_click_listener = () => {
      useEffect(() => {
          const _handle_page_click = (e) => {
          console.log("page clicked at:", e.clientX, e.clientY);
          
          // listen to page clicks when sub-toolbar is active, incase non of it's buttons were selected
          if((shapes_sub_toolbar_active === true) && (sub_tb_item_clicked === false))
          {
            // sub-toolbar is active, toolbar item not clicked 
            if(initial_click) // ignore on initial click from listener - we need the next click
            {
              initial_click = false;
            }
            else  // next click we are interested in
            {
              _set_shapes_sub_toolbar_active(false); 
              initial_click = true;
            }
          }
        };
    
        document.addEventListener("click", _handle_page_click);
    
        // cleanup function to remove the listener on unmount
        return () => {
          document.removeEventListener("click", _handle_page_click);
        };
      }, []);
    
      return (
        null
      );
    };
    /**************** Page listener ends **************************/

    return (
        <div 
          id="sprint_planning_template_root"
          onDragOver={_handle_drag_over}
          style={{ 
            height: "100vh",
            width: "100vw",
            backgroundColor: "#f0f0f0",
            cursor: cursor_type,
          }}
        >
            <_page_click_listener />

            <_gridlines_normal grid_size={100} line_color="#E6E6E6" z_index={0} />
            
            <_templates_toolbar pos={"top"} win_width={width} win_height={height} z_index={50} add_note_func={_add_note} set_note_loc_func={_set_note_loc_func} 
              select_cursor_func={_select_cursor_type} marker_draw_func={_draw_with_marker} add_fill_func={_add_fill} shapes_selected_func={_show_shape_options} />
            
            <_templates_toolbar pos={"left"} win_width={width} win_height={height} z_index={50} add_note_func={_add_note} set_note_loc_func={_set_note_loc_func} 
              select_cursor_func={_select_cursor_type} marker_draw_func={_draw_with_marker} add_fill_func={_add_fill} shapes_selected_func={_show_shape_options} />
            
            {(shapes_sub_toolbar_active === true) && (
              <_shapes_sub_toolbar shapes_tb_item_clicked_func={_shape_clicked} pos={"top"} win_width={width} win_height={height} z_index={50} deactivate_shapes_sub_tb={_deactivate_shapes_sub_tb} />
            )}

            {(shapes_sub_toolbar_active === true) && (
              <_shapes_sub_toolbar shapes_tb_item_clicked_func={_shape_clicked} pos={"left"} win_width={width} win_height={height} z_index={50} deactivate_shapes_sub_tb={_deactivate_shapes_sub_tb} />
            )}

            <div>
              <div
                style={{
                  top: "20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  position: 'absolute',
                }}
              >
              </div>
              <div>
                {notes.map((note) => (
                  <_sticky_note key={note.id} id={note.id} text={note.text} on_delete={_delete_note} note_update_func={_set_note_loc_func} 
                    x_pos={note.x_pos} y_pos={note.y_pos} win_width={width} win_height={height}/>
                ))}
              </div>
            </div>

        </div>
    );
};

export default _sprint_planning_template;