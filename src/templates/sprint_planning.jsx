import * as React from 'react';
import _taskboard_toolbar from '../toolbars/taskboard_toolbar';
import _shapes_sub_toolbar from '../toolbars/shapes_sub_toolbar';
import { useState, useEffect } from 'react';
import _gridlines_normal from '../gridlines/normal';
import _sticky_note from '../taskboards/components/sticky_note';
import _comment from '../taskboards/components/comment';
import board_marker_img_32 from '../../res/imgs/img_board_marker_32x32.png'; 
import fill_img_32 from '../../res/imgs/img_fill2_32x32.png'; 
import { STKNOTE_WIDTH_PERC_DEFAULT } from '../taskboards/taskboard_globals';
import { COMMENT_WIDTH_PERC_DEFAULT } from '../taskboards/taskboard_globals';
import { _get_selected_color_theme } from '../common/components/global_settings';

/*********************** TEMPORARY SPRINT PLANNING COMPONENNT *************************************/
/************************ REMOVE THIS COMMENT WHEN UPDATED ****************************************/

/****************** Effects block begin ***************************/
/**
 * Gets current window size
 * @returns {{width, height}} - current window width and height.
 */
const _get_window_size = () => {
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
/****************** Effects block ends ***************************/

/**
 * Default taskboard component
 */
const _sprint_planning_template = () => {

  return (
    <div style={{marginLeft: '30%'}}>
      Sprint planning component not implemented
    </div>
  );
};

export default _sprint_planning_template;