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
      .get("https://school-management-five-iota.vercel.app/academics/notices/") // HTTPS
      .then((response) => {
        setNotices(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching notices!", error);
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
    const options = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `${date.toLocaleDateString(undefined, options)}, ${date.toLocaleTimeString(
      undefined,
      timeOptions
    )}`;
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r bg-slate-50 min-h-screen p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-10 text-white bg-gradient-to-r from-blue-500  via-purple-700 to-blue-500 p-5 rounded-lg shadow-lg">
          Official Notices
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
              >
                <h2 className="text-2xl font-semibold mb-3 text-center text-indigo-800">
                  {notice.title}
                </h2>
                <p className="text-gray-700 mb-4 text-center">
                  {notice.description}
                </p>

                {/* Check if the file is an image */}
                {notice.file ? (
                  isImageFile(notice.file) ? (
                    <img
                      src={notice.file}
                      alt={notice.title}
                      className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity duration-300"
                      onClick={() => openFullScreen(notice.file)}
                      data-aos="zoom-in"
                    />
                  ) : (
                    <a
                      href={notice.file}
                      className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 transition-colors duration-300"
                      download
                    >
                      Download File
                    </a>
                  )
                ) : null}

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
          onClick={closeFullScreen}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full Screen"
              className="w-full h-auto max-w-screen-lg object-contain rounded-lg"
            />
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-300"
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
