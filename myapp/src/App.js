import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css';
import {LoginPage,SignUpPage,ActivationPage} from './Routes.js'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { server } from './server.js';
import axios from 'axios';

function App() {


  useEffect(()=>{
    axios.get(`${server}/user/me`,{withCredentials:true})
    .then(res=>toast.success(res.data.message))
    .catch(err=>toast.error(err.response.data.message))
  })

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/sign-up' element={<SignUpPage/>} />
        <Route path='/activation/:activation_token' element={<ActivationPage/>} />
      </Routes>
      <ToastContainer
      position='bottom-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
       />
    </Router>
    </>
  );
}

export default App;
