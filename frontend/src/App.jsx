
import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy } from 'react';

const Registerpage = lazy(() => import('./components/register'));
const Loginpage = lazy(() => import('./components/login'));
const Userhome = lazy(() => import('./components/user/userhome'));
const Cartpage = lazy(() => import('./components/user/cartpage'));
const Orderpage = lazy(() => import('./components/user/orderpage'));
const AdminLogin = lazy(() => import('./components/admin/adminlogin'));
const Adminhome = lazy(() => import('./components/admin/adminhome'));
const Adminviewuser = lazy(() => import('./components/admin/adminviewuser'));
const Adminaddproducts = lazy(() => import('./components/admin/adminaddproducts'));
const AdminViewProducts = lazy(() => import('./components/admin/adminviewproducts'));
const Admineditproduct = lazy(() => import('./components/admin/admineditproduct'));
const Orderhistory = lazy(() => import('./components/user/orderhistory'));
const ViewOrdersAdmin = lazy(() => import('./components/admin/adminvieworders'));
import { Suspense } from 'react';
function App() {


  return (
    <>
    <Suspense fallback={<h1>Loading...</h1>}>
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
      <Route path="/adminvieworders" element={<ViewOrdersAdmin/>}/>
      <Route path="/cart" element={<Cartpage/>}/>
      <Route path="/order" element={<Orderpage/>}/>
      <Route path="/history" element={<Orderhistory/>}/>
     </Routes>
    </Suspense>
    </>
  )
}

export default App
