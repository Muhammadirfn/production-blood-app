import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/Api";




export const userlogin = createAsyncThunk(
  '/auth/login',
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      // Check if any required field is empty
      if (!role || !email || !password) {
       
        return rejectWithValue("Please fill in all required fields.");
      }

      const { data } = await API.post('/auth/login', { role, email, password });

    

      // Store token
      if (data.success) {
        localStorage.setItem('token', data.token);
       
      alert("User Login Successfull")
        window.location.replace('/');
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userRegister = createAsyncThunk(
  '/auth/register',
  async ({
    role,
    name,
    email,
    password,
    organisationName,
    hospitalName,
    website,
    address,
    phone
  }, { rejectWithValue }) => {
    try {
      // Check if any required field is empty
      if (!role || !website || !phone  || !email || !password || (!name && role === "admin") || (!organisationName && role === "organisation") || (!hospitalName && role === "hospital")) {
        
        return rejectWithValue("Please fill in all required fields.");
      }

      const { data } = await API.post('/auth/register', {
        role,
        name,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone
      });

   

      if (data.success) {
        alert("User Register Successfull");
        // Optionally, you can redirect to the login page here
        window.location.replace('/login');
        return data; // Return data when successful
      } else {
        return rejectWithValue(data.message); // Handle registration failure
      }
    } catch (error) {
      console.error('There is an error while registration:', error);
      return rejectWithValue('There was an error during registration'); // Handle network or other errors
    }
  }
);
// get current user 
//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);