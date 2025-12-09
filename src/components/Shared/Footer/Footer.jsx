const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-10 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@localchefbazaar.com</p>
          <p>Phone: +880 1234 567 890</p>
          <p>Location: Satkhira, Bangladesh</p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-green-400 duration-200">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-green-400 duration-200">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-green-400 duration-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-green-400 duration-200">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Working Hours</h3>
          <p>Monday – Friday: 9 AM – 9 PM</p>
          <p>Saturday: 10 AM – 6 PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Branding */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            LocalChefBazaar
          </h3>
          <p>Your local hub for healthy, homemade meals.</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-neutral-800 pt-5">
        © {new Date().getFullYear()} LocalChefBazaar. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
