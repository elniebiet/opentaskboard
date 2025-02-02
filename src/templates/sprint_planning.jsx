import * as React from 'react';
import _templates_toolbar from '../toolbars/templates_toolbar';
import { useState, useEffect } from 'react';
import _gridlines_normal from '../gridlines/normal';
import _sticky_note from '../toolbars/components/sticky_note';
import { Button } from '@mui/material';

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
        const new_note = { id: Date.now(), text: "New Note", x_pos: new_loc_x, y_pos: new_loc_y };
        _set_note_location({loc_x: new_loc_x, loc_y: new_loc_y}); // update last added location
        _set_notes([...notes, new_note]);
      }
      else
      {
        // dragged
        const new_note = { id: Date.now(), text: "New Note", x_pos: pos_x, y_pos: pos_y };
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

    return (
        <div 
          id="sprint_planning_template_root"
          onDragOver={_handle_drag_over}
          style={{ 
            height: "100vh",
            width: "100vw",
            backgroundColor: "#f0f0f0",
          }}
        >
            <_gridlines_normal grid_size={100} line_color="#E6E6E6" z_index={0} />
            <_templates_toolbar pos={"top"} win_width={width} win_height={height} z_index={50} add_note_func={_add_note} set_note_loc_func={_set_note_loc_func} />
            <_templates_toolbar pos={"left"} win_width={width} win_height={height} z_index={50} add_note_func={_add_note} set_note_loc_func={_set_note_loc_func} />

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