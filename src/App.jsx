import { useState, useContext } from 'react';
import './App.css';
import _router from './common/router';
import { _global_state_context } from './common/global_state_context';

function App() {

  // Use the global state context to get the current route and the function to update it
  const { global_route, _set_global_route } = useContext(_global_state_context);

  const _update_global_route = (_new_route) => 
  {
    console.log("route updated: " + _new_route);
    _set_global_route(_new_route);
  }

  return (
      <_router _route={global_route} _on_update_route={ _update_global_route } />
  )
}

export default App
