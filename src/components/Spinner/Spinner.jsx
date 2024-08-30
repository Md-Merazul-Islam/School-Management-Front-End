// // Spinner.jsx
// import React, { createContext, useContext, useState, CSSProperties } from "react";
// import ClipLoader from "react-spinners/ClipLoader";

// // Define a context to manage the loading state globally
// const LoadingContext = createContext({
//   loading: false,
//   setLoading: () => {},
// });

// // Custom hook to use the loading context
// export const useLoading = () => useContext(LoadingContext);

// // Spinner component provider
// export const LoadingProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false); // State to control loading
//   const [color, setColor] = useState("#ffffff"); // Spinner color

//   // Spinner style override
//   const override = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

//   return (
//     <LoadingContext.Provider value={{ loading, setLoading }}>
//       {loading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <ClipLoader
//             color={color}
//             loading={loading}
//             cssOverride={override}
//             size={150}
//             aria-label="Loading Spinner"
//             data-testid="loader"
//           />
//         </div>
//       )}
//       {children}
//     </LoadingContext.Provider>
//   );
// };





// // Spinner.js
// import React, { createContext, useContext, useState } from 'react';
// import ClipLoader from 'react-spinners/ClipLoader';
// import "./Spinner.css"

// // Create a context for the loading state
// const LoadingContext = createContext();

// export const useLoading = () => useContext(LoadingContext);

// export const LoadingProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);

//   return (
//     <LoadingContext.Provider value={{ loading, setLoading }}>
//       {children}
//       {loading && (
//         <div className="loading-overlay">
//           <ClipLoader size={150} color={"#123abc"} loading={loading} />
//         </div>
//       )}
//     </LoadingContext.Provider>
//   );
// };


import React from "react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex space-x-2 justify-center items-center">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
