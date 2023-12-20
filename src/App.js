import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';

const App = () => {
  return (
    <>   
    <ToastContainer />
      <Home/>
    </>
  )
}

export default App;
