import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get the current path
import Sidebar from "../Sidebar/Sidebar";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Admin = ({ children }) => {
  const location = useLocation(); // Get the current route path
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // X-axis labels
    datasets: [
      {
        label: "Performance",
        data: [65, 59, 80, 81, 56, 55, 90], // Data points
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Performance Score",
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar appears on the left side, collapses on mobile */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          {/* Show welcome message only on the /admin route */}
          {location.pathname === "/admin" && (
            <div className="bg-gray-100 min-h-screen p-6">
              {/* Header Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {["Students", "Teachers", "Classes", "Activities"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
                    >
                      <div className="flex items-center space-x-2">
                        {/* Icon Placeholder */}
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold">{item[0]}</span>
                        </div>
                        <span className="font-bold text-lg">{item}</span>
                      </div>
                      <div className="text-gray-600 mt-2">Total Count</div>
                      {/* Display dynamic data */}
                      <div className="text-2xl font-semibold">
                        {
                          {
                            Students: 500,
                            Teachers: 50,
                            Classes: 20,
                            Activities: 10,
                          }[item]
                        }
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* School Performance Section */}
                <div className="md:col-span-2 bg-white p-6 shadow-md rounded-lg">
                  <h2 className="text-xl font-bold mb-4">School Performance</h2>
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-gray-600">Overall Grade</div>
                      <div className="text-2xl font-semibold">A</div>
                      <div className="text-green-500">High Performance</div>
                    </div>
                    {/* Date Range Dropdown */}
                    <div>
                      <select className="bg-gray-100 p-2 rounded border border-gray-300">
                        <option>Last Semester</option>
                        <option>Last Year</option>
                      </select>
                    </div>
                  </div>
                  {/* Growth Chart */}
                  <div className="h-60 rounded-lg">
                    <Line data={data} options={options} />
                  </div>
                </div>

                {/* Announcements Section */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Announcements</h2>
                  <ul className="space-y-4">
                    {[
                      "School Reopens",
                      "Sports Day",
                      "Parent-Teacher Meeting",
                    ].map((announcement, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{announcement}</span>
                        <div className="text-sm text-gray-600">Upcoming</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Admin;
