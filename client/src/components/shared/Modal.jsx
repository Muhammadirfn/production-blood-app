import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import {useSelector} from 'react-redux'
import InputType from '../forms/InputType';
import API from '../../services/Api'

const AntdModal = () => {
  const {user} = useSelector(state =>state.auth)
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState();
  const [quantity, setQuantity] = useState();
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const ModelSubmit = async () => {
    try {
      if(!bloodGroup || !quantity ){
        return message.warning('Please Provides All Fields')
      }
      const selectedInventoryType = inventoryType === 'in' ? 'in' : 'out';
      const {data} = await API.post('inventry/create-inventry',{
       
        email,
        organisation: user?._id,
        bloodGroup,
        inventoryType: selectedInventoryType,
        quantity
      })
      if(data?.success){
        alert('New Record Created Successfull')
        window.location.reload()
      }
      
    } catch (error) {
      
     alert(error.response.data.message)
      console.log(error);
       window.location.reload()
      
    }
    
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="sm:ml-2">
      <Button onClick={showModal} className="mt-4">
        +Add Inventory
      </Button>
      <Modal
        title="Manage Blood Record"
        open={open}
       
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="cancel" className="bg-slate-500 text-white" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="ok" className="px-4" onClick={ModelSubmit}>
            Submit
          </Button>,
        ]}
      >
        <div className="flex flex-col">
          <label className="mt-2">Blood Type:</label>
          <div className="flex flex-wrap">
            <div className="form-check px-2 mt-1">
              <input
                type="radio"
                name="inRadio"
                value="in"
                defaultChecked
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="in" className="form-check-label p-1">
                IN
              </label>
            </div>
            <div className="form-check px-2 mt-1">
              <input
                type="radio"
                name="inRadio"
                value="out"
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="out" className="form-check-label p-1">
                OUT
              </label>
            </div>
          </div>
          <InputType 
          labelText={'Donar Email'}
          labelFor = {'donorEmail'}
          value={email}
          InputType={'Email'}
          onChange={(e) =>setEmail(e.target.value)}
          />
           <InputType 
          labelText={'Quantity (ML)'}
          labelFor = {'quantity'}
          
          inputType={'number'}
          value={quantity}
          onChange={(e) =>setQuantity(e.target.value)}
          />
          <label className="mt-2">Blood Group:</label>
          
          <select className="mt-1" onChange={(e) => setBloodGroup(e.target.value)}>
          <option defaultValue={"Open this select menu"}>
                  Open this select menu
                </option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
          </select>
         
        </div>
      </Modal>
    </div>
  );
};

export default AntdModal;
