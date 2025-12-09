import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Modules from './pages/Modules';
import Vendors from './pages/Vendors';
import Products from './pages/Products';
import Users from './pages/Users';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

export default function App(){
 return (
  <BrowserRouter>
   <Routes>
     <Route path='/admin/login' element={<AdminLogin/>}/>
     <Route path='/admin' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='modules' element={<Modules/>}/>
        <Route path='vendors' element={<Vendors/>}/>
        <Route path='categories' element={<Categories/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='users' element={<Users/>}/>
        <Route path='orders' element={<Orders/>}/>
     </Route>
   </Routes>
  </BrowserRouter>
 );
}
