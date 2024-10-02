import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faUser,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [newReview, setNewReview] = useState({ body: "" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const token = localStorage.getItem("token");
  const author_id = localStorage.getItem("user_id");
  const API_BASE_URL = "https://school-management-five-iota.vercel.app";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get("https://school-management-five-iota.vercel.app/accounts/users/");
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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Change to 4000 milliseconds for 4 seconds

    return () => clearInterval(interval);
  }, [activeIndex, reviews]); // Depend on activeIndex and reviews

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % Math.ceil(reviews.length / 3));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3));
  };

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewWithAuthor = { ...newReview, author: parseInt(author_id) };

    try {
      if (editingReviewId === null) {
        const response = await axios.post(`${API_BASE_URL}/academics/reviews/`, reviewWithAuthor, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        setReviews([...reviews, response.data]);
      } else {
        const response = await axios.put(`${API_BASE_URL}/academics/reviews/${editingReviewId}/`, reviewWithAuthor, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        setReviews(
          reviews.map((review) =>
            review.id === editingReviewId ? response.data : review
          )
        );
        setEditingReviewId(null);
      }
      setNewReview({ body: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API_BASE_URL}/academics/reviews/${reviewId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditClick = (review) => {
    setNewReview({ body: review.body });
    setEditingReviewId(review.id);
  };

  const getVisibleReviews = () => {
    const start = activeIndex * 3;
    return reviews.slice(start, start + 3);
  };

  const getUsernameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "Unknown User";
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 justify-center space-y-8 p-8">
      <div className="relative max-w-[1535px]">
        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getVisibleReviews().map((review) => (
                <div
                  key={review.id}
                  className="p-6 bg-white shadow-md rounded-lg text-gray-800"
                >
                  <div className="flex items-start space-x-2">
                    <FontAwesomeIcon
                      icon={faQuoteLeft}
                      className="text-2xl text-pink-500"
                    />
                    <p className="text-lg italic">{review.body}</p>
                  </div>
                  <div className="flex justify-between items-center space-x-2 mt-4">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-sm text-gray-500"
                      />
                      <p className="text-sm text-gray-600">{getUsernameById(review.author)}</p>
                    </div>
                    {review.author === parseInt(author_id) && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(review)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="absolute inset-0 flex items-center justify-between">
                <button
                  className="bg-gray-300 text-gray-800 p-2 rounded-full hover:bg-gray-400"
                  onClick={handlePrev}
                >
                  &lt;
                </button>
                <button
                  className="bg-gray-300 text-gray-800 p-2 rounded-full hover:bg-gray-400"
                  onClick={handleNext}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-100 p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingReviewId ? "Edit Review" : "Add Review"}
        </h2>
        <textarea
          name="body"
          value={newReview.body}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Write your review here..."
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editingReviewId ? "Update Review" : "Submit Review"}
        </button>
      </form>


      <img src="https://ibb.co.com/TrcjZVM" alt="" />
    </div>
  );
};

export default TestimonialCarousel;
