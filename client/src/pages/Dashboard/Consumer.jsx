import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/shared/Layout';
import API from '../../services/Api';
import moment from 'moment';

const Consumer = () => {
  const [data, setdata] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // get donors records
  const getDonars = async () => {
    try {
      let inventoryType;
  
      if (user?.role === 'hospital') {
        // Fetch both incoming and outgoing records for hospitals
        inventoryType = { $in: ['in', 'out'] };
      } else if (user?.role === 'consumer') {
        // Fetch only incoming records for consumers
        inventoryType = 'in';
      }
  
      const response = await API.post('/inventry/get-inventry-hospital', {
        filters: {
          inventoryType,
          hospital: user?._id,
        },
      });
  
      if (response?.data?.success) {
        setdata(response?.data?.inventory);
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  useEffect(() => {
    getDonars();
  }, [user]); // Include user in the dependency array to trigger the effect when user changes

  return (
    <Layout>
    <div className="overflow-x-auto">
  <table className="min-w-full border-Collapse border border-green-900 mt-4 divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="border border-green-600">Blood Group</th>
        <th className="border border-green-600">Inventory Type</th>
        <th className="border border-green-600">Quantity</th>
        <th className="border border-green-600">Email</th>
        <th className="border border-green-600">Date</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((record) => (
        <tr key={record._id}>
          <td className="border border-green-600">{record.bloodGroup}</td>
          <td className="border border-green-600">{record.inventoryType}</td>
          <td className="border border-green-600">{record.quantity}</td>
          <td className="border border-green-600">{record.email}</td>
          <td  className="border border-green-600">
            {moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    </Layout>
  );
};

export default Consumer;
