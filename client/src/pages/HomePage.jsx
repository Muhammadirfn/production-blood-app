import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { message } from 'antd';
import Layout from '../components/shared/Layout';
import AntdModal from '../components/shared/Modal';
import API from '../services/Api';
import moment from 'moment'

const HomePage = () => {
  const [data, setdata] = useState([])
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  // get all blood record
  const getbloodRecord = async() =>{
    try {
      const {data} = await API.get('/inventry/get-inventry')
      if(data?.success){
        setdata(data?.inventry)
        // console.log(data);
      }

    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getbloodRecord()
    if (!loading && !error) {
      // Redirect to the home page after successful authentication
      // navigate('/admin');
    }
  }, [loading, error,navigate]);

  return (
    <Layout>
      {user?.role === 'admin' && navigate('/admin')}
      {error && message.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <>
       
          <AntdModal />
          <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border  border-pink-600 text-center">
    <thead>
      <tr>
        <th className="border  border-blue-600">Blood Group</th>
        <th className="border  border-blue-600">Inventory Type</th>
        <th className="border  border-blue-600">Quantity</th>
        <th className="border  border-blue-600">Donor Email</th>
        <th className="border  border-blue-600">Time & Date</th>
      </tr>
    </thead>
    <tbody>
      {/* Your dynamic data rendering here */}
      {data.map((item) => (
  <tr key={item._id}>
    <td className="border  border-blue-600">{item.bloodGroup}</td>
    <td className="border  border-blue-600">{item.inventoryType}</td>
    <td className="border  border-blue-600">{item.quantity} (ML)</td>
    <td className="border  border-blue-600">{item.email}</td>
    <td className="border  border-blue-600">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
  </tr>
))}
    </tbody>
  </table>
</div>



        </>
      )}
    </Layout>
  );
};

export default HomePage;
