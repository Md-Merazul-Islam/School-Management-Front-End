import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

// Helper function to check if the file is an image
const isImageFile = (fileUrl) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const extension = fileUrl.split(".").pop().toLowerCase();
  return imageExtensions.includes(extension);
};

// Spinner Component
const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
  </div>
);


const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });

    axios
      .get("http://amader-school.up.railway.app/academics/notices/")
      .then((response) => {
        setNotices(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the notices!", error);
        setLoading(false); // Ensure loading is set to false on error
      });
  }, []);

  // Fullscreen Modal Ref
  const imageModalRef = useRef(null);

  // Handle opening the full-screen image
  const openFullScreen = (fileUrl) => {
    setSelectedImage(fileUrl);
    imageModalRef.current.style.display = "flex";
  };

  // Handle closing the full-screen image
  const closeFullScreen = (e) => {
    // If clicked outside the image, close the modal
    if (e.target === imageModalRef.current) {
      imageModalRef.current.style.display = "none";
      setSelectedImage(null);
    }
  };

  // Close the modal when the close button is clicked
  const handleClose = () => {
    imageModalRef.current.style.display = "none";
    setSelectedImage(null);
  };

  // Helper function to format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return `${date.toLocaleDateString(undefined, options)}, ${date.toLocaleTimeString(
      undefined,
      timeOptions
    )}`;
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-slate-300 w-full">Official Notices</h1>
        {loading ? ( // Show spinner while loading
          <Spinner />
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
                data-aos="fade-up" // AOS animation
              >
                <h2 className="text-xl font-semibold mb-3 text-center">{notice.title}</h2>
                <p className="text-gray-700 mb-4 text-center">{notice.description}</p>

                {/* Check if the file is an image */}
                {/* {notice.file ? (
                  isImageFile(notice.file) ? (
                    <img
                      src={notice.file}
                      alt={notice.title}
                      className="w-full h-64 object-cover rounded mb-4 cursor-pointer"
                      onClick={() => openFullScreen(notice.file)} // Click to open full screen
                      data-aos="zoom-in" // AOS animation for image
                    />
                  ) : (
                    <a
                      href={notice.file}
                      className="block text-center bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                      download
                    >
                      Download File
                    </a>
                  )
                ) : null} */}

                <p className="text-sm text-gray-500 text-center">
                  Posted on: {formatDateTime(notice.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          ref={imageModalRef}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          style={{ display: "none" }}
          onClick={closeFullScreen} // Click outside the image to close
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full Screen"
              className="w-4/5 h-4/5 object-contain rounded-lg" // 80% width and height
            />
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;
