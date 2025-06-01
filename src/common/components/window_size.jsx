import { useEffect, useState } from "react";
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

const _get_screen_size = () => {
  return {
        width: window.screen.width,  
        height: window.screen.height,
    };
};

export
{ 
  _get_window_size,
  _get_screen_size,
};