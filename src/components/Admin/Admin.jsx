import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

const Admin = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar appears on the left side, collapses on mobile */}
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Admin;
