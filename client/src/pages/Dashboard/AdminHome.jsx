import React from 'react';
import Layout from '../../components/shared/Layout';
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Layout>
      <div className="container mx-auto flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-500 mb-2">Welcome, {user?.name}</h1>
          <h3 className="text-2xl font-semibold mb-4">Manage Blood Bank App</h3>
          <hr />
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt impedit recusandae,
            suscipit tempora laudantium pariatur sint neque doloribus porro dolore sit illum, nobis
            dicta excepturi?
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
