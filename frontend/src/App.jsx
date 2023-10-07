import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css';
import {LoginPage,SignUpPage} from './Routes.js'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/sign-up' element={<SignUpPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
