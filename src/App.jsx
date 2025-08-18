import { useState, useContext, useEffect } from 'react';
import './App.css';
import _router from './common/router';
import { _global_state_context } from './common/global_state_context';
import { URL_MAIN, OTB_LS_ROUTE_NAME } from './common/globals';

function App() {

  // Use the global state context to get the current route and the function to update it
  const { global_route, _set_global_route } = useContext(_global_state_context);

  // On mount, check for saved route in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved_route = window.localStorage.getItem(OTB_LS_ROUTE_NAME);
      if (saved_route && saved_route !== global_route) {
        _set_global_route(saved_route);
      }
    }
  }, []);

  const _update_global_route = (_new_route) => 
  {
    console.log("route updated to: " + _new_route);
    _set_global_route(_new_route);

    if(typeof window !== 'undefined' && window.history) {
      // Update the browser's URL without reloading the page
      // This is useful for single-page applications (SPAs)
      // It allows us to change the URL while keeping the app state intact
      
      if( _new_route === "/")
      {
        window.history.replaceState(null, '', `/`);
      }
      else
      {
        window.history.replaceState(null, '', `/${_new_route}`);
      }
    }
  }

  return (
      <_router _route={global_route} _on_update_route={ _update_global_route } />
  )
}

export default App
