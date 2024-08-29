import React, { useState } from 'react';
import { register } from '../Authentication/Authentication';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password1, password2);
      setIsModalOpen(true); 
    } catch (error) {
      setError('Sign Up Failed, Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign up
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                {/* Social Sign-Up Buttons */}
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className="bg-white p-2 rounded-full">
                    {/* Google Icon */}
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>

                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                >
                  <div className="bg-white p-1 rounded-full">
                    {/* GitHub Icon */}
                  </div>
                  <span className="ml-4">Sign Up with GitHub</span>
                </button>
              </div>

              <div className="pos my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>

              <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>
                  and its
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center p-12 bg-gradient-to-br  rounded-br-lg">
          <div className="max-w-md text-center ">
            <h2 className="text-white text-4xl font-extrabold mb-6 leading-tight">
              Get started with
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-blue-400">
                Welcome To Our Website 
              </span>
            </h2>
            <p className="text-white text-lg font-medium">
              You’ll be creating beautiful websites in no time. Our simple, yet powerful platform will help you make the most out of your skills.
            </p>
            <img src="images/Register.png" alt="register image" />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
            <p className="mb-6">Please check your email for confirmation.</p>
            <button
              onClick={closeModal}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              Ok, thanks
            </button>
          </div>
        </div>
      )}
    </div>

   
    </div>


  );
};

export default Signup;
