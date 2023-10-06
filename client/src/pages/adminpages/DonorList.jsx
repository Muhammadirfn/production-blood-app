import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import API from '../../services/Api';
import moment from 'moment';

const DonorList = () => {
  const [data, setData] = useState([]);

  // get donors records
  const getDonors = async () => {
    try {
      const response = await API.get('/admin/donor-list');
      if (response?.data?.success) {
        setData(response?.data?.donarData);
      }
    } catch (error) {
      console.error('Error in getDonors:', error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  // for deleting the donors
  const handleDelete = async (id) => {
    try {
      const answer = window.prompt(`Are you sure to delete this donor`, 'ok');
      if (!answer) return;

      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);

      window.location.reload();
    } catch (error) {
      console.error('Error in handleDelete:', error);
      // Handle the error, show a user-friendly message, or log it as needed
    }
  };

  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-black text-center mt-2">
          <thead className="px-2 py-2">
            <tr>
              <th className="border border-black">Name</th>
              <th className="border border-black">Email</th>
              <th className="border border-black">Phone</th>
              <th className="border border-black">Date</th>
              <th className="border border-black">Action</th>
            </tr>
          </thead>
          <tbody className="m-2">
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td className="border border-black">{item.organisationName + 'ORG'}</td>
                  <td className="border border-black">{item.email}</td>
                  <td className="border border-black">{item.phone}</td>
                  <td className="border border-black hidden sm:table-cell">
                    {moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}
                  </td>
                  <td className="border border-black mt-2">
                    <button className="bg-red-500 p-2 rounded cursor-pointer hover:bg-yellow-300" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-black text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DonorList;
