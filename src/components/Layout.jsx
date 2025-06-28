
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../styles/Layout.css';
import { Bell, UserCircle2 } from 'lucide-react'; //  lucide-react icons
import { ArrowLeft } from 'lucide-react';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content-area">
        <div className="header-strip">
          <div className="header-left">
             <ArrowLeft size={18} /> Profile Setup
          </div>
          <div className="header-right">
            <Bell size={20} className="header-icon" />
            <UserCircle2 size={24} className="header-icon" />
          </div>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
