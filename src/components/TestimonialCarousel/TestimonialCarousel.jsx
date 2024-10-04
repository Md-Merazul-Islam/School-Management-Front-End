import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://school-management-five-iota.vercel.app";

const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

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
  }, []);

  const getUsernameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "Unknown User";
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
   autoplaySpeed: 1500,
  };




  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 font-pj">
              {reviews.length} people have said how good Rareblocks
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              What Our Students Say
            </h2>
          </div>
        </div>
      </div>

      {/* slider start  */}
      <div className="relative mt-10 md:mt-24 md:order-2 z-20">
      <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
        <div
       className="w-full h-full max-w-[1588px] mx-auto rounded-3xl opacity-20 blur-lg filter"
       style={{
            background:
              "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
          }}
        ></div>
      </div>

      <div className="slider-container py-12 max-w-[1580px] mx-auto">
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
                      “
                      {review.body.length > 100
                        ? `${review.body.slice(0, 150)}...`
                        : review.body}
                      ”
                    </p>
                  </blockquote>

                  <div className="flex items-center mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                      src={
                        review.avatar || "https://i.ibb.co/Gk3Y0W0/3237472.png"
                      }
                      alt={review.name || "Student"}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900 font-pj">
                        {getUsernameById(review.author)}{" "}
                        {/* Updated to use review name */}
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-gray-600">
                        {review.position || "Student"}{" "}
                        {/* Optional: Add a position field if available */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
       </Slider>
      </div>
      </div>

      {/* slider end  */}

      <div className="mt-8 text-center md:mt-16 md:order-3">
        <Link to={"allReviews/"}
          href="#"
          title=""
          className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
        >
          Check all {reviews.length} reviews and Add your Review
        </Link>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
