import { useState } from 'react'

import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PrivateRoute from './components/Routes/PrivateRoute'
import PublicRoute from './components/Routes/PublicRoute'
import Donor from './pages/Dashboard/Donor'
import Hospital from './pages/Dashboard/Hospital'
import OrganisationPage from './pages/Dashboard/OrganisationPage'
import Consumer from './pages/Dashboard/Consumer'
import Donation from './pages/Dashboard/Donation'
import Analytics from './pages/Dashboard/Analytics'
import DonorList from './pages/adminpages/DonorList'
import HospitalList from './pages/adminpages/HospitalList'
import OrganisationList from './pages/adminpages/OrganisationList'
import AdminHome from './pages/Dashboard/AdminHome'

function App() {
 

  return (
    <>
    <Routes>
    <Route path='/' 
    element={<PrivateRoute><HomePage /></PrivateRoute>} />
     <Route path='/donor' 
    element={<PrivateRoute><Donor /></PrivateRoute>} />
     <Route path='/hospital' 
    element={<PrivateRoute><Hospital /></PrivateRoute>} />
     <Route path='/analytics' 
    element={<PrivateRoute><Analytics /></PrivateRoute>} />
     <Route path='/consumer' 
    element={<PrivateRoute><Consumer /></PrivateRoute>} />
     <Route path='/donation' 
    element={<PrivateRoute><Donation /></PrivateRoute>} />
      <Route path='/organisation' 
    element={<PrivateRoute><OrganisationPage /></PrivateRoute>} />
    {/* admin pages route */}
    <Route path='/admin' 
    element={<PrivateRoute><AdminHome /></PrivateRoute>} />
    <Route path='/donor-list' 
    element={<PrivateRoute><DonorList /></PrivateRoute>} />
     <Route path='/hospital-list' 
    element={<PrivateRoute><HospitalList /></PrivateRoute>} />

<Route path='/org-list' 
    element={<PrivateRoute><OrganisationList /></PrivateRoute>} />
      
    
      <Route path='/login' 
      element = { <PublicRoute><Login/></PublicRoute>}/>
      
      <Route path='/register' 
      element = {<PublicRoute><Register/></PublicRoute> }/>
    </Routes>
   
    </>
  )
}

export default App
