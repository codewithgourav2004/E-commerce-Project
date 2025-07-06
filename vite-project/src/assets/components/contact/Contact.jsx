import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_640qilw",        // Your actual Service ID
        "template_myjoqu6",       //  Your actual Template ID
        form.current,
        "WFgNb_4tIVrxmurGA"       //  Your actual Public Key
      )
      .then(
        () => {
          alert(" Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert(" Failed to send message: " + error.text);
          console.error(error);
        }
      );
  };

  return (
    <>
      <Header />
      <div className="flex items-start justify-center min-h-[700px] bg-white px-4 py-10">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold">
                Get in touch
              </h1>
              <p className="text-lg font-medium text-gray-600 mt-2">
                Fill in the form to start a conversation
              </p>
              <div className="mt-6 space-y-4 text-gray-600">
                <div className="flex items-start">
                  <p className="ml-3 font-semibold">Your Company, City, ZIP</p>
                </div>
                <div className="flex items-start">
                  <p className="ml-3 font-semibold">+91 9876543210</p>
                </div>
                <div className="flex items-start">
                  <p className="ml-3 font-semibold">yourmail@example.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              ref={form}
              onSubmit={sendEmail}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center"
            >
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
                className="w-full mt-2 py-3 px-4 mb-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
              />

              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
                className="w-full mt-2 py-3 px-4 mb-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
              />

              <input
                type="tel"
                name="user_phone"
                placeholder="Telephone Number"
                required
                className="w-full mt-2 py-3 px-4 mb-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className="w-full mt-2 py-3 px-4 mb-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
              />

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
