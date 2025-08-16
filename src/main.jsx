import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { _global_state_context, _global_state_provider } from './common/global_state_context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <_global_state_provider>
      <App />
    </_global_state_provider>
  </StrictMode>,
)
