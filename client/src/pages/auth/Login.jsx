import React, { useEffect } from 'react';
import { message } from 'antd';
import image from '../../assets/bg.jpg';
import Form from '../../components/forms/Form';
import { useSelector } from 'react-redux';
import Spinner from '../../components/shared/Spinner';

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  // Show an Ant Design message if there is an error
  useEffect(() => {
    if (error) {
      message.error('Invalid Credentials');
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
            <Form formtitle={'Login Page'} submitButton={'button'} formType={'login'} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
