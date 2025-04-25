
import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Registerpage from './components/register'
import Loginpage from './components/login'
import Userhome from './components/user/userhome'
import AdminLogin from './components/admin/adminlogin';
import Adminhome from './components/admin/adminhome';

function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
      <Route path="/userhome" element={<Userhome/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/adminhome" element={<Adminhome/>}/>
     </Routes>
    </>
  )
}

export default App
