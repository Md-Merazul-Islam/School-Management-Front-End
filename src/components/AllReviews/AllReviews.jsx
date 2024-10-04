import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = "https://school-management-five-iota.vercel.app";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    body: "",
    author: "",
    avatar: "",
    position: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isAuthorized, setIsAuthorized] = useState(false); 

  const handleOpenModal = () => {
    if (isAuthorized) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/accounts/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/academics/reviews/`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchUsers();
    fetchReviews();


    const token = localStorage.getItem("token"); 
    setIsAuthorized(!!token); 
  }, []);

  const getUsernameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "Unknown User";
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleAddReview = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/academics/reviews/`, {
        ...newReview,
        avatar: newReview.avatar || "https://i.ibb.co/Gk3Y0W0/3237472.png", 
      });

      setReviews([...reviews, response.data]);
      setNewReview({ body: '', author: '', avatar: '', position: '' });
      handleCloseModal();
    } catch (error) {
      console.error("Error adding review:", error);
      setErrorMessage("Failed to add review. Please try again."); 
    }
  };

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20 h-screen">
      <div className="px-4 mx-auto w-[1580px] sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 font-pj">
              {reviews.length} people have said how good Rareblocks
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              What Our Students Say
            </h2>
            {isAuthorized && ( 
              <button
                onClick={handleOpenModal}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add Review
              </button>
            )}
            {!isAuthorized && (
              <p className="mt-2 text-red-600">You must be logged in to add a review.</p>
            )}
            {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>} 
          </div>
        </div>
      </div>

      {/* Modal for Adding Review */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-md p-2"
              placeholder="Write your review..."
              value={newReview.body}
              onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
              type="text"
              placeholder="Your Name"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
              type="text"
              placeholder="Your Position (optional)"
              value={newReview.position}
              onChange={(e) => setNewReview({ ...newReview, position: e.target.value })}
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleAddReview}
            >
              Submit Review
            </button>
            <button
              className="mt-2 px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="slider-container py-12 max-w-[1588px] mx-auto">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="p-4">
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          className="w-5 h-5 text-[#FDB241]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <blockquote className="flex-1 mt-8">
                    <p className="text-lg leading-relaxed text-gray-900 font-pj">
                      “{review.body}”
                    </p>
                  </blockquote>

                  <div className="flex items-center mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                      src={review.avatar || "https://i.ibb.co/Gk3Y0W0/3237472.png"}
                      alt={review.name || "Student"}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900 font-pj">
                        {getUsernameById(review.author)}
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-gray-600">
                        {review.position || "Student"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default AllReviews;
