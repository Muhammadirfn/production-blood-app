import React from 'react';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate,useLocation,Link } from 'react-router-dom';
import { Badge } from 'antd';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation()

  // handlelogout
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout Successfull');
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="text-white text-xl font-bold flex items-center">
            <BiDonateBlood className="text-red-500 mr-2" />
            Blood Collection
          </div>
          <ul className="flex items-center">
            <li className="mx-2 text-white  lg:block">
              <p className="cursor-pointer flex items-center">
                <BiUserCircle className="mr-2" />Welcome{' '}
                {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
                <span>
                  <Badge count={user?.role} className="ml-1" />
                </span>
              </p>
            </li>
            {
              (location.pathname === '/' || location.pathname === '/donor') || location.pathname === '/hospital' ? (
                <li className="mx-2 text-white  lg:block">
              <Link to={'/analytics'} className="cursor-pointer flex items-center">
              
               Analytics
              </Link>
            </li>
              ):(
                <li className="mx-2 text-white  lg:block">
                <Link to={'/'} className="cursor-pointer flex items-center">
                
                 Home
                </Link>
              </li>
              )
            }
            <li className="mx-2">
              <button className="bg-red-500 rounded-md py-1 px-4 text-white hover:bg-yellow-300" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
