import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = "https://school-management-dusky.vercel.app";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    body: "",
    author: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleOpenModal = () => {
    if (isAuthorized) {
      setIsModalOpen(true);
    } else {
      window.location.replace("/login");
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddReview = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    let author_id = localStorage.getItem("user_id"); // Get user ID from localStorage
  
    // Convert author_id to an integer
    author_id = parseInt(author_id, 10); 
  
    if (!token) {
      setErrorMessage("You must be logged in to add a review.");
      return;
    }
  
    // Log the request body to ensure correct data format
    console.log("Sending review data:", {
      body: newReview.body,
      author: author_id,
      avatar: newReview.avatar || "https://i.ibb.co/Gk3Y0W0/3237472.png",
    });
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/academics/reviews/`,
        {
          body: newReview.body,
          author: author_id, // This is now an integer
          avatar: newReview.avatar || "https://i.ibb.co/Gk3Y0W0/3237472.png",
        },
        {
          headers: {
            Authorization: `Token ${token}`, // Add token to Authorization header
          },
        }
      );
  
      // Log the response data
      console.log("Review added successfully:", response.data);
  
      // Update the review list
      setReviews([...reviews, response.data]);
  
      // Clear the newReview input
      setNewReview({ body: "", author: "" });
  
      // Close the modal
      handleCloseModal();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error:", error);
      }
      setErrorMessage("Failed to add review. Please try again.");
    }
  };
  
  

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-11 ">
      <div className="px-4 mx-auto w-full max-w-[1580px] sm:px-6 lg:px-8 my-8">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600 font-pj">
            {reviews.length} people have said how good Rareblocks
          </p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            What Our Students Say
          </h2>
          
          {!isAuthorized && (
            <p className="mt-2 text-red-600">
              You must be logged in to add a review.
            </p>
          )}
          {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-md shadow-md w-full max-w-lg mx-4 sm:mx-6">
            <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
              {/* Success or error messages */}
              {errorMessage && (
                      <p className="text-red-600 mb-4">{errorMessage}</p>
                    )}
                    {newReview.successMessage && (
                      <p className="text-green-600 mb-4">{newReview.successMessage}</p>
                    )}


            <textarea
              className="w-full h-24 border border-gray-300 rounded-md p-2"
              placeholder="Write your review..."
              value={newReview.body}
              onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="px-4 mx-auto w-full max-w-[1580px] sm:px-6 lg:px-8">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-4">
              <div className="relative flex flex-col items-center justify-center p-8 transition-all bg-white rounded-md shadow-md hover:shadow-xl">
                <img
                  className="object-cover w-24 h-24 mb-4 rounded-full"
                  src={review.avatar || "https://i.ibb.co/Gk3Y0W0/3237472.png"}
                  alt="User Avatar"
                />
                <p className="text-lg font-medium text-gray-600 font-pj">
                  “ {review.body} ”
                </p>
                <p className="text-sm font-medium text-gray-900 font-pj mt-2">
                  - {getUsernameById(review.author)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>


    <div className="flex justify-center  mt-20 " >
    {isAuthorized && (
            <button
              onClick={handleOpenModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md "
            >
              Add Review
            </button>
          )}
    </div>
    </section>
  );
};

export default AllReviews;
