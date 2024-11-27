import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [selectedMethod, setSelectedMethod] = useState("email");

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section className="py-11 z-10 relative overflow-hidden">
        <div
          className="text-center mx-auto pb-12"
          style={{ maxWidth: '800px' }}
          data-aos="fade-up"
        >
          <h4 className="text-blue-500">Get in Touch</h4>
          <h1 className="text-5xl mb-4">We're Here to Help</h1>
          <p className="mb-0 mx-1">
            Whether you have questions about our programs, admissions, or anything else, we're here to assist you. Please fill out the form below, and our team will get back to you shortly.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:gap-8">
            <div className="lg:mb-0 mb-10" data-aos="fade-right">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src="images/contact2.jpg"
                    alt="ContactUs tailwind section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block">
                      <a href="javascript:;" className="flex items-center mb-6">
                        {/* SVG icon here */}
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          +8801653135353
                        </h5>
                      </a>
                      <a href="javascript:;" className="flex items-center mb-6">
                        {/* SVG icon here */}
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          cst.tech@gmail.com
                        </h5>
                      </a>
                      <a href="javascript:;" className="flex items-center">
                        {/* SVG icon here */}
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          Gazipur, Dhaka, Bangladesh
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl"
              data-aos="fade-left"
            >
              <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">
                Send Us A Message
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:gap-8">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black mb-5"
                  />
                  <input
                    type="text"
                    placeholder="Your Phone"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black mb-5"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full h-[3.125rem] placeholder:text-gray-500 px-5 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black"
                  />
                </div>
              </div>
              <div className="pt-5">
                <textarea
                  placeholder="Message"
                  className="w-full placeholder:text-gray-500 px-5 pt-3 bg-white rounded-lg border border-indigo-600 focus:outline-none focus:border-blue-400 text-black h-[7.625rem] mb-5"
                ></textarea>
              </div>
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
                    checked={selectedMethod === "email"}
                    onChange={() => handleMethodChange("email")}
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
                    checked={selectedMethod === "phone"}
                    onChange={() => handleMethodChange("phone")}
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
              <button className="w-full h-[3.125rem] bg-indigo-600 text-white rounded-lg text-lg font-semibold leading-7 hover:bg-indigo-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
