import { Toaster } from 'react-hot-toast';
import { registerSW, unregisterSW, checkControlled } from "./App.controller.js";
import './App.styles.css';

function App() {

  return (
    <>
      <div className='controls'>
        <button onClick={registerSW}>Register SW</button>
        <button onClick={unregisterSW}>Un-register SW</button>
        <button onClick={checkControlled}>Check if page is controlled by SW</button>
      </div>
      <p className="read-the-docs">
        Click the controls...
      </p>
      <Toaster position="top-right" />
    </>
  )
}

export default App
