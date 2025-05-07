
import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Registerpage from './components/register'
import Loginpage from './components/login'
import Userhome from './components/user/userhome'
import AdminLogin from './components/admin/adminlogin';
import Adminhome from './components/admin/adminhome';
import Adminviewuser from './components/admin/adminviewuser';
import Adminaddproducts from './components/admin/adminaddproducts';
import AdminViewProducts from './components/admin/adminviewproducts';
import Admineditproduct from './components/admin/admineditproduct';
import Cartpage from './components/user/cartpage';
import Orderpage from './components/user/orderpage';
import Orderhistory from './components/user/orderhistory';

function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
      <Route path="/userhome" element={<Userhome/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/adminhome" element={<Adminhome/>}/>
      <Route path="/viewuser" element={<Adminviewuser/>}/>
      <Route path="/addproduct" element={<Adminaddproducts/>}/>
      <Route path='/adminviewproducts' element={<AdminViewProducts/>}/>
      <Route path="/admineditproduct/:id" element={<Admineditproduct/>}/>
      <Route path="/cart" element={<Cartpage/>}/>
      <Route path="/order" element={<Orderpage/>}/>
      <Route path="/history" element={<Orderhistory/>}/>
     </Routes>
    </>
  )
}

export default App
