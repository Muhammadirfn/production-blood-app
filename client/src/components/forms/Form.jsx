import React, { useState } from 'react';
import InputType from './InputType';
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from '../../services/AuthService';

const Form = ({ formType, submitButton, formtitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  
  return (
    <>
      <form onSubmit={(e)=>{
        if(formType === 'login') return handleLogin(e, email,password, role)
        else if(formType === 'register') return handleRegister(
      e,
      role,
      name,
      email,
      password,
      organisationName,
      hospitalName,
      website,
      address,
      phone)
      }}>
        <h1 className='text-center'>{formtitle}</h1>
        <hr />
        <div className="flex mb-4 gap-2">
          <div className="form-check">
            <input
              type="radio"
              className="form-radio text-blue-500 border-blue-500 focus:ring-2 focus:ring-blue-300 h-4 w-4"
              name="role"
              id="donarRadio"
              value="donor" // Set your desired value
              onChange={(e) => setRole(e.target.value)}

            />
            <label htmlFor="donarRadio" className="ml-2 text-gray-600">Donor</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-radio text-blue-500 border-blue-500 focus:ring-2 focus:ring-blue-300 h-4 w-4"
              name="role"
              id="adminRadio"
              value="admin" // Set your desired value
              onChange={(e) => setRole(e.target.value)}

            />
            <label htmlFor="adminRadio" className="ml-2 text-gray-600">Admin</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-radio text-blue-500 border-blue-500 focus:ring-2 focus:ring-blue-300 h-4 w-4"
              name="role"
              id="organisationRadio"
              value="organisation" // Set your desired value
              onChange={(e) => setRole(e.target.value)}

            />
            <label htmlFor="organisationRadio" className="ml-2 text-gray-600">Organisation</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-radio text-blue-500 border-blue-500 focus:ring-2 focus:ring-blue-300 h-4 w-4"
              name="role"
              id="hospitalRadio"
              value="hospital" // Set your desired value
              onChange={(e) => setRole(e.target.value)}

            />
            <label htmlFor="hospitalRadio" className="ml-2 text-gray-600">
              Hospital</label>
          </div>
        </div>

        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donor") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

<div className='mb-4 p-2 flex justify-between items-center'>
  <div>
    {formType === 'login' ? (
      <p className='mb-4 cursor-pointer'>
        Not Registered Yet?  <Link to={'/register'} className='text-blue-400 border border-blue-600 underline px-1 py-1'>Register!</Link>
      </p>
    ) : (
      <p className='mb-4 cursor-pointer border-b-blue-400'>
        Not Logged In Yet?  <Link to={'/login'} className='text-blue-400 border border-blue-600 underline px-1 py-1'>Login!</Link>
      </p>
    )}
  </div>
  <button
    type='submit'
    className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
  >
    {submitButton}
  </button>
</div>
      </form>
    </>
  );
};

export default Form;
