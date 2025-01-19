import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './home/homepage';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import _router from './common/router';

function App() {
  const [current_route, _set_current_route] = useState("/");
  const _update_current_route = (_new_route) => 
  {
    _set_current_route(_new_route);
  }

  return (
    <>
      <div>
        <_router new_route={current_route} _update_route={_update_current_route}/>
      </div>
    </>
  )
}

export default App
