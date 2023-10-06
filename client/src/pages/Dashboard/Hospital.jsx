import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout'
import API from '../../services/Api'
import moment from 'moment'

const Hospital = () => {
  const [data, setdata] = useState([])

  // get donors records
  const getHospital = async () => {
    try {
      const {data} = await API.get('/inventry/get-hospital');
      console.log(data);
    if(data?.success){
      setdata(data?.hospitals)
    }
    } catch (error) {
      
    }
  }
  useEffect(() =>{
   getHospital()
  },[])
  return (

    <Layout>
    <div className="overflow-x-auto mt-4 ">
<table className="min-w-full border-collapse border border-red-300 text-center">
<thead>
<tr>
<th className="border border-red-300">Name</th>
<th className="border border-red-300">Email</th>
<th className="border border-red-300">Phone</th>
<th className="border border-red-300">Address</th>

<th className="border border-red-300"> Date</th>
</tr>
</thead>
<tbody>
{/* Your dynamic data rendering here */}
{data.map((item) => (
<tr key={item._id}>
<td className="border border-red-300">{item.name || item.hospitalName}</td>
<td className="border border-red-300">{item.email}</td>
<td className="border border-red-300">{item.phone}</td>
<td className="border border-red-300">{item.address}</td>

<td className="border border-red-300">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
</tr>
))}
</tbody>
</table>
</div>
</Layout>
)
}

export default Hospital
