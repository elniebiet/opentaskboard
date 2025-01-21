import { useState } from 'react';
import './App.css';
import _router from './common/router';

function App() {

  const [main_route, _set_main_route] = useState("/");
  
  const _update_main_route = (_new_route) => 
  {
    console.log("route updated: " + _new_route);
    _set_main_route(_new_route);
  }

  return (
    <div>
      <_router _route={main_route} _on_update_route={ _update_main_route } />
    </div>
  )
}

export default App
