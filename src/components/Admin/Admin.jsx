import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

const Admin = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar appears on the left side, collapses on mobile */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Admin;
