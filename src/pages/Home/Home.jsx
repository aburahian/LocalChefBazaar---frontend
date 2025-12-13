import { Link } from "react-router";
import LatestMeals from "../../components/Home/LatestMeals";
import BannerSlider from "./BannerSlider";

const Home = () => {
  return (
    <div className="space-y-10">
      {/* Banner Slider */}
      <section>
        <BannerSlider />
      </section>

      {/* Latest Meals Section */}
      <section className="px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
          Latest Meals
        </h1>
        <LatestMeals />

        {/* See More Button */}
        <div className="mt-6 text-center md:text-center">
          <Link
            to="/meals"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            See More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
