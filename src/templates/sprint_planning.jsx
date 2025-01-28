import * as React from 'react';
import _templates_toolbar from '../toolbars/templates_toolbar';
import { useState, useEffect } from 'react';
import _gridlines_normal from '../gridlines/normal';

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
            <_gridlines_normal grid_size={100} line_color="#E6E6E6" />
            <_templates_toolbar pos={"top"} win_width={width} win_height={height} />
            <_templates_toolbar pos={"left"} win_width={width} win_height={height} />
        </div>
    );
};

export default _sprint_planning_template;