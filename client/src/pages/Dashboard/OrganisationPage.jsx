import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import API from '../../services/Api';
import moment from 'moment';
import { useSelector } from 'react-redux';

const OrganisationPage = () => {
  const { user } = useSelector(state => state.auth);
  const [data, setdata] = useState([]);

  // get organisations records based on user role
  const getORG = async () => {
    try {
      if (user?.role === 'donor') {
        const { data } = await API.get('/inventry/get-organisation');
        // console.log(data);
        if (data?.success) {
          setdata(data?.organisations);
        }
      }

      if (user?.role === 'hospital') {
        const { data } = await API.get('/inventry/get-organisation-for-hospital');
        console.log(data);
        if (data?.success) {
          setdata(data?.organisations);
        }
      }
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  useEffect(() => {
    getORG();
  }, [user]);

  return (
    <Layout>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse border  border-orange-600 text-center">
          <thead>
            <tr>
              <th className="border  border-orange-600">Name</th>
              <th className="border  border-orange-600">Email</th>
              <th className="border  border-orange-600">Phone</th>
              <th className="border  border-orange-600">Address</th>
              <th className="border  border-orange-600"> Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className=" border border-orange-600">{item.organisationName}</td>
                <td className="border  border-orange-600">{item.email}</td>
                <td className="border  border-orange-600">{item.phone}</td>
                <td className="border  border-orange-600">{item.address}</td>
                <td className="border  border-orange-600">
                  {moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrganisationPage;
