import React from "react";

import Container from "../../components/Shared/Container";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".contact-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation of form submission
    alert("Thank you for your message! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <div ref={containerRef} className="pt-28 pb-20 overflow-hidden">
      <Container>
        <div className="text-center mb-16 contact-item">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question about our meals or want to become a chef? Reach out
            to us, and we'll be happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 contact-item">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                      Call Us
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      +880 1234 567 890
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                      Email Us
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      support@localchefbazaar.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                      Visit Us
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      123 Chef Street, Satkhira, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-3xl overflow-hidden shadow-sm border border-gray-100 contact-item">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.50495116742!2d89.01166308647248!3d22.724128084501254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff7299a918a385%3A0xe9f79998054041a7!2sSatkhira!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-50 contact-item">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center gap-2">
              Send us a Message{" "}
              <FaPaperPlane className="text-primary text-xl" />
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">
                  Message
                </label>
                <textarea
                  required
                  rows="5"
                  placeholder="Your message here..."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-primary to-[#FF4C29] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
