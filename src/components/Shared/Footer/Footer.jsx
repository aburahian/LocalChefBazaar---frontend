import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-10 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@localchefbazaar.com</p>
          <p>Phone: +880 1234 567 890</p>
          <p>Location: Satkhira, Bangladesh</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meals" className="hover:text-primary transition">
                Meals
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/localchefbazaar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-neutral-800 hover:bg-green-500 hover:text-black transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/localchefbazaar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-neutral-800 hover:bg-green-500 hover:text-black transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/localchefbazaar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-neutral-800 hover:bg-green-500 hover:text-black transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com/@localchefbazaar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-neutral-800 hover:bg-green-500 hover:text-black transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Working Hours
          </h3>
          <p>Monday – Friday: 9 AM – 9 PM</p>
          <p>Saturday: 10 AM – 6 PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Branding */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            LocalChef<span className="text-primary">Bazaar</span>
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
