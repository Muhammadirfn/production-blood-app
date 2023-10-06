import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const SidebarMenu = () => {
  const location = useLocation();
  const {user} = useSelector(state => state.auth)

  return (
    <div className="sidebar item-center overflow-hidden overflow-y-hidden sm:p-0 h-screen w-48 border-r border-sky-500 bg-slate-500 shadow text-white">

      {user?.role === 'organisation' && (
        <>
        <Link to={'/'} className={`menu-item p-4 ${location.pathname === '/' && ''}`}>
      <div className='mt-8 ml-2'>
        <i className='fa-solid fa-warehouse'></i>
        <span className='ml-2'>Inventory</span>
      </div>
    </Link>

    <Link to={'/donor'} className={`menu-item p-4 ${location.pathname === '/donor' && ''}`}>
      <div className='mt-8 ml-2'>
        <i className='fas fa-hand-holding-medical'></i>
        <span className='ml-2'>Donor</span>
      </div>
    </Link>

    <Link to={'/hospital'} className={`menu-item p-4 ${location.pathname === '/hospital' && ''}`}>
      <div className='mt-8 ml-2'>
        <i className='fa fa-hospital'></i>
        <span className='ml-2'>Hospital</span>
      </div>
    </Link>
        
        </>
      )}

    {(user?.role === 'donor' || user?.role === 'hospital') && (
       <Link to={'/organisation'} className={`menu-item p-4 ${location.pathname === '/organisation' && ''}`}>
       <div className='mt-8 ml-2'>
         <i className='fa-sharp fa-solid fa-building-ngo'></i>
         <span className='ml-2'>Organisation</span>
       </div>
     </Link>

    )}
     {user?.role === 'hospital' && (
       <Link to={'/consumer'} className={`menu-item p-4 ${location.pathname === '/consumer' && ''}`}>
       <div className='mt-8 ml-2'>
         <i className='fa-sharp fa-solid fa-building-ngo'></i>
         <span className='ml-2'>Consumer</span>
       </div>
     </Link>

    )}
   {user?.role === 'donor' && (
  <Link to={'/donation'} className={`menu-item p-4 ${location.pathname === '/donation' && ''}`}>
    <div className='mt-8 ml-2'>
      <i className='fa-sharp fa-solid fa-building-ngo'></i>
      <span className='ml-2'>Donation</span>
    </div>
  </Link>
)}
   {user?.role === 'admin' && (
    <>
  <Link to={'/donor-list'} className={`menu-item p-4 ${location.pathname === '/donor-list' && ''}`}>
    <div className='mt-8 ml-2'>
      <i className='fa-sharp fa-solid fa-building-ngo'></i>
      <span className='ml-2'>Donar List</span>
    </div>
  </Link>
   <Link to={'/hospital-list'} className={`menu-item p-4 ${location.pathname === '/hospital-list' && ''}`}>
   <div className='mt-8 ml-2'>
     <i className='fa-sharp fa-solid fa-building-ngo'></i>
     <span className='ml-2'>Hospital List</span>
   </div>
 </Link>
 <Link to={'/org-list'} className={`menu-item p-4 ${location.pathname === '/org-list' && ''}`}>
   <div className='mt-8 ml-2'>
     <i className='fa-sharp fa-solid fa-building-ngo'></i>
     <span className='ml-2'>Organisation List</span>
   </div>
 </Link>
 </>
)}

    

   

       
    


    </div>
  );
};

export default SidebarMenu;
