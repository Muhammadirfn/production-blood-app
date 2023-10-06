import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout'
import API from '../../services/Api'
import moment from 'moment'

const Donor = () => {
  const [data, setdata] = useState([])

  // get donors records
  const getDonars = async () => {
    try {
      const {data} = await API.get('/inventry/get-donars');
    if(data?.success){
      setdata(data?.donors)
    }
    } catch (error) {
      
    }
  }
  useEffect(() =>{
   getDonars()
  },[])
  return (
    <Layout>
             <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-black text-center">
    <thead>
      <tr>
        <th className="border border-black">Name</th>
        <th className="border border-black">Email</th>
        <th className="border border-black">Phone</th>
        
        <th className="border border-black"> Date</th>
      </tr>
    </thead>
    <tbody>
      {/* Your dynamic data rendering here */}
      {data.map((item) => (
  <tr key={item._id}>
    <td className="border border-black">{item.name || item.organisationName + "ORG"}</td>
    <td className="border border-black">{item.email}</td>
    <td className="border border-black">{item.phone}</td>
    
    <td className="border border-black">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
  </tr>
))}
    </tbody>
  </table>
</div>
    </Layout>
  )
}

export default Donor
