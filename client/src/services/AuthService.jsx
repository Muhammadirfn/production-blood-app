import { message } from 'antd';
import store from '../redux/store';
import { userRegister, userlogin } from '../redux/features/auth/AuthAction';

export const handleLogin = async (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return message.warning('Please Fill All the Required Fields');
    } 

    // Dispatch the userlogin action with the correct payload structure
    await store.dispatch(userlogin({ email, password, role }));
    

    // message.success("User Login Successful");
    // After dispatching, you can redirect or perform other actions if needed.
    // Example: Redirect to a dashboard page.
    // history.push('/dashboard');
  } catch (error) {
    console.error('Login Error:', error);
    // Handle login error (display a message, show an error alert, etc.)
    // message.error('Login failed. Please try again.');
  }
};

export const handleRegister = async (
  e,
  role,
  name,
  email,
  password,
  organisationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();
  try {
    // if (!role || !email || !password || !name || !organisationName || !hospitalName || !address || !phone || !website) {
    //   return message.warning('Please Fill All the Required Fields');
    // }
    
    // Dispatch the userRegister action with the correct payload structure
    await store.dispatch(
      userRegister({
        role,
        email,
        password,
        name,
        organisationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
    // message.success("User Registered Successfully");
    // After dispatching, you can redirect or perform other actions if needed.
    // Example: Redirect to a login page.
    // history.push('/login');
  } catch (error) {
    console.error('Registration Error:', error);
    // Handle registration error (display a message, show an error alert, etc.)
    // message.error('Registration failed. Please try again.');
  }
};
