import React from 'react';
import Header from './Header';
import SidebarMenu from '../shared/SidebarMenu';

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="flex">
        <div className="flex-col ">
          <SidebarMenu />
        </div>
        <div className="flex-grow flex-wrap sm:flex-col">
  {children}
</div>

      </div>
    </>
  );
};

export default Layout;
