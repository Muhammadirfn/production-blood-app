import React, { useState, useEffect } from 'react';
import image from '../../assets/bg.jpg'; // Replace with the actual path to your 
import Form from '../../components/forms/Form';
import { useSelector } from 'react-redux';
import Spinner from '../../components/shared/Spinner';

const Register = () => {
  const {loading, error} = useSelector(state =>state.auth)
  return (
    <>
    {useEffect(() => {
    if (error) {
      alert("invalid Creditionals")
    }
  }, [error])}
    {loading ? <Spinner/> : (
        <div className="min-h-screen flex items-center justify-center">
        {/* Left Side (Image) */}
        <div className="flex-1 hidden lg:block">
          <img
            src={image}
            alt="Background"
            className="object-cover h-full w-full"
          />
        </div>
  
        {/* Right Side (Form) */}
        <div className="bg-white p-8 rounded shadow-md w-96">
         
          <Form formtitle={'Register Page'} submitButton={'button'} formType={'register'}/>
        </div>
      </div>

    )}
      
    </>
  )
}

export default Register
