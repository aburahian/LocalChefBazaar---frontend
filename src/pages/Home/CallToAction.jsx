import { Link } from "react-router";

const CallToAction = () => {
  return (
    <div className="py-12 bg-linear-to-r from-primary to-orange-500 rounded-3xl text-white text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Ready to Taste Something <span className="text-white">Amazing?</span>
        </h1>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of food lovers who have discovered their new favorite
          meals through LocalChefBazaar
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/meals"
            className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Explore Meals
          </Link>
          <Link
            to="/signup"
            className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-primary transition-colors"
          >
            Become a Chef
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
