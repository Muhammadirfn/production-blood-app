import React, { useState, useEffect } from 'react';
import Header from '../../components/shared/Header';
import API from '../../services/Api';
import moment from 'moment';
import { Card } from 'antd';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventrydata, setInventryData] = useState([]);
  const colors = ['#618264','#79AC78','#AE445A', '#662549' ,'#213555','#4F709C','#C70039', '#141E46','#FF6969'];
  const [loading, setLoading] = useState(true); // Added loading state

  // get all the blood record
  const getAllBlood = async () => {
    try {
      const response = await API.get('/analytic/analytics-blood');
      if (response.data?.success) {
        setData(response.data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getbloodRecord = async () => {
  //   try {
  //     const response = await API.get('/analytic/analytics-recent-blood');
  //     console.log(response);
  //     if (response?.data?.success) {
  //       setInventryData(response?.data?.inventry);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false); // Set loading to false regardless of success or error
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllBlood();
        await getbloodRecord();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      
      <div className='flex flex-row flex-wrap'>
        {data?.map((blood, i) => (
          <div className='m-2 p-1 w-72' key={i} style={{ backgroundColor: `${colors[i]}` }}>
            <div className="card-body">
              <h1 className="text-xl font-bold bg-white text-center mb-2">{`Blood Group: ${blood.bloodGroup}`}</h1>
              <p>{`Total Blood In: ${blood.totalbloodIn}`}</p> (ML)
              <p>{`Total Blood Out: ${blood.totalbloodOut}`}</p> (ML)
              <div className='bg-black text-white rounded-md px-2 py-2 text-center'>
                <p>{`Available Blood: ${blood.availableblood}`}</p> (ML)
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* <div className="container mt-2">
        <h1>Recent Blood Record Transaction</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border-collapse border border-pink-600 text-center">
            <thead>
              <tr>
                <th className="border border-blue-600">Blood Group</th>
                <th className="border border-blue-600">Inventory Type</th>
                <th className="border border-blue-600">Quantity</th>
                <th className="border border-blue-600">Donor Email</th>
                <th className="border border-blue-600">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventrydata.map((item) => (
                <tr key={item._id}>
                  <td className="border border-blue-600">{item.bloodGroup}</td>
                  <td className="border border-blue-600">{item.inventoryType}</td>
                  <td className="border border-blue-600">{item.quantity} (ML)</td>
                  <td className="border border-blue-600">{item.email}</td>
                  <td className="border border-blue-600">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </>
  );
};

export default Analytics;
