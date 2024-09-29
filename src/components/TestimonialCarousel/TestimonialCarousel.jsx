import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faUser,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom"; 

const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ body: "" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null); // Track which review is being edited
  const token = localStorage.getItem("token"); // Auth token from localStorage
  const author_id = localStorage.getItem("user_id"); // Logged-in user's ID
  const API_BASE_URL = "http://127.0.0.1:8000" ;

  // Fetch reviews from the API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/academics/reviews/`) // Use the base URL here
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  // Auto-slide functionality with 2-second interval (only when reviews.length >= 3)
  useEffect(() => {
    if (reviews.length >= 3) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 3) % reviews.length);
      }, 2000);

      return () => clearInterval(interval); // Clear interval when component unmounts
    }
  }, [reviews]);

  // Handle next/previous carousel buttons
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 3) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex - 3 + reviews.length) % reviews.length);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for both creating and editing reviews
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewWithAuthor = { ...newReview, author: parseInt(author_id) };

    // If editingReviewId is null, it's a new review, otherwise it's an update
    if (editingReviewId === null) {
      axios
        .post(`${API_BASE_URL}/academics/reviews/`, reviewWithAuthor, {
          headers: {
            Authorization: `Token  ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setReviews([...reviews, response.data]);
          setNewReview({ body: "" });
          console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Error submitting review:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      axios
        .put(
          `${API_BASE_URL}/academics/reviews/${editingReviewId}/`,
          reviewWithAuthor,
          {
            headers: {
              Authorization: `Token  ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setReviews(
            reviews.map((review) =>
              review.id === editingReviewId ? response.data : review
            )
          );
          setEditingReviewId(null); // Reset after editing
          setNewReview({ body: "" });
        })
        .catch((error) => {
          console.error(
            "Error updating review:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  // Handle delete review
  const handleDelete = (reviewId) => {
    axios
      .delete(`${API_BASE_URL}/academics/reviews/${reviewId}/`, {
        headers: {
          Authorization: `Token  ${token}`,
        },
      })
      .then(() => {
        // Remove the deleted review from the state
        setReviews(reviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  // Handle edit button click
  const handleEditClick = (review) => {
    setNewReview({ body: review.body });
    setEditingReviewId(review.id); // Set the review being edited
  };

  // Get three reviews to display per slide
  const getVisibleReviews = () => {
    const start = activeIndex;
    const end = (activeIndex + 3) % reviews.length;
    if (start < end) {
      return reviews.slice(start, end);
    } else {
      return [...reviews.slice(start), ...reviews.slice(0, end)];
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 justify-center space-y-8 p-8">
      {/* Carousel Section */}
      <div className="relative w-full">
        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getVisibleReviews().map((review) => (
                <div
                  key={review.id} // Use review.id for key
                  className="p-6 bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 shadow-md rounded-lg text-gray-800"
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
                      <p className="text-sm text-gray-600">
                        {review.author_name}
                      </p>
                    </div>
                    {/* Conditionally render Edit/Delete buttons for the review author */}
                    {review.author === parseInt(author_id) && (
                      <div className="flex space-x-2">
                        {/* Edit Button */}
                        <Link to={`edit/${review.id}`} className="text-blue-500 hover:text-blue-700">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </Link>

                        {/* Delete Button */}
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

            {/* Carousel controls */}
            {reviews.length > 3 && ( // Only show controls if there are more than 3 reviews
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

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-100 p-6 shadow-md rounded-lg"
      >
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
    </div>
  );
};

export default TestimonialCarousel;
