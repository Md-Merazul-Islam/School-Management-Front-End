import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Contact = () => {
  const [selectedMethod, setSelectedMethod] = useState('email');

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-24 z-10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10 "  data-aos="fade-right">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img
                  src="images/contact2.jpg"
                  alt="ContactUs tailwind section"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
                />
                <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                  Contact us
                </h1>
                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                  <div className="bg-white rounded-lg p-6 block">
                    <a href="javascript:;" className="flex items-center mb-6">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h5 className="text-black text-base font-normal leading-6 ml-5">
                        +8801653135353
                      </h5>
                    </a>
                    <a href="javascript:;" className="flex items-center mb-6">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h5 className="text-black text-base font-normal leading-6 ml-5">
                        cst.tech@gmail.com
                      </h5>
                    </a>
                    <a href="javascript:;" className="flex items-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                        />
                        <path
                          d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                        />
                      </svg>
                      <h5 className="text-black text-base font-normal leading-6 ml-5">
                        Gazipur, Dhaka, Bangladesh
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl"  data-aos="fade-left">
            <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">
              Send Us A Message
            </h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-9 gap-4">
              <div>
                <div className="relative mb-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 placeholder:leading-5 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black"
                  />
                </div>
                <div className="relative mb-5">
                  <input
                    type="text"
                    placeholder="Your Phone"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 placeholder:leading-5 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black"
                  />
                </div>
              </div>
              <div>
                <div className="relative mb-5">
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 placeholder:leading-5 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black"
                  />
                </div>
                <div className="relative mb-5">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 placeholder:leading-5 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black"
                  />
                </div>
              </div>
            </div>
            <div className="relative mb-5">
              <textarea
                placeholder="Message"
                className="w-full placeholder:text-gray-500 placeholder:leading-5 px-5 pt-3 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black h-[7.625rem]"
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1">
              <div className="relative mb-5">
                <label
                  className="font-normal text-base leading-6 text-gray-500"
                  htmlFor="email-radio"
                >
                  Preferred Contact Method
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="email-radio"
                    name="preferred-method"
                    value="email"
                    checked={selectedMethod === 'email'}
                    onChange={() => handleMethodChange('email')}
                    className="mr-2"
                  />
                  <label
                    htmlFor="email-radio"
                    className="text-base font-normal leading-6 text-black"
                  >
                    Email
                  </label>
                  <input
                    type="radio"
                    id="phone-radio"
                    name="preferred-method"
                    value="phone"
                    checked={selectedMethod === 'phone'}
                    onChange={() => handleMethodChange('phone')}
                    className="ml-4 mr-2"
                  />
                  <label
                    htmlFor="phone-radio"
                    className="text-base font-normal leading-6 text-black"
                  >
                    Phone
                  </label>
                </div>
              </div>
            </div>
            <button className="w-full h-[3.125rem] bg-indigo-600 text-white rounded-lg text-lg font-semibold leading-7 hover:bg-indigo-700">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;