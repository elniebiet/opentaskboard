import React, { useEffect, useState } from 'react';
import { KEYPRESSES } from './keypress_list';

/**
 * listens for keypresses, up to 4 keys can be provided 
 * @param {KEYPRESSES} key1
 * @param {KEYPRESSES} key2
 * @param {KEYPRESSES} key3  
 * @param {KEYPRESSES} key4  
 * @returns 
 */
const _keypress_listener = ({keypress_handler_func, key1=null, key2=null, key3=null, key4=null}) => {
  const [pressed_keys, _set_pressed_keys] = useState(new Set());

  useEffect(() => {
    const _handle_key_down = (event) => {
      const new_set = new Set(pressed_keys);
      new_set.add(event.key.toLowerCase());

      if (event.ctrlKey) new_set.add('ctrl');

      // single key handler
      if((key1 !== null) && (key2 === null) && (key3 === null) && (key4 === null))
      {
        if (new_set.has(key1)) 
        {
            event.preventDefault();
            keypress_handler_func();
            _set_pressed_keys(new Set()); // Clear the set after trigger
            return;
        }
      }
      // two keys handler
      else if((key1 !== null) && (key2 !== null) && (key3 === null) && (key4 === null))
      {
        if (new_set.has(key1) && new_set.has(key2)) 
        {
            event.preventDefault();
            keypress_handler_func();
            _set_pressed_keys(new Set()); // Clear the set after trigger
            return;
        }
      }
      // three keys handler
      else if((key1 !== null) && (key2 !== null) && (key3 !== null) && (key4 === null))
      {
        if (new_set.has(key1) && new_set.has(key2) && new_set.has(key3)) 
        {
            event.preventDefault();
            keypress_handler_func();
            _set_pressed_keys(new Set()); // Clear the set after trigger
            return;
        }
      }
      // four keys handler
      else if((key1 !== null) && (key2 !== null) && (key3 !== null) && (key4 !== null))
      {
        if (new_set.has(key1) && new_set.has(key2) && new_set.has(key3) && new_set.has(key4)) 
        {
            event.preventDefault();
            keypress_handler_func();
            _set_pressed_keys(new Set()); // Clear the set after trigger
            return;
        }
      }
        
      

      _set_pressed_keys(new_set);
    };

    const _handle_key_up = (event) => {
      const new_set = new Set(pressed_keys);
      new_set.delete(event.key.toLowerCase());
      if (event.key.toLowerCase() === 'control') new_set.delete('ctrl');
      _set_pressed_keys(new_set);
    };

    window.addEventListener('keydown', _handle_key_down);
    window.addEventListener('keyup', _handle_key_up);
    return () => {
      window.removeEventListener('keydown', _handle_key_down);
      window.removeEventListener('keyup', _handle_key_up);
    };
  }, [pressed_keys]);

  return (
    <>
    </>
  );
};

export default _keypress_listener;
