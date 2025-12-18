import { Link } from "react-router";
import LatestMeals from "../../components/Home/LatestMeals";
import BannerSlider from "./BannerSlider";
import Reviews from "./Reviews";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import WhyChooseUs from "./WhyChooseUs";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="space-y-16 pb-12 overflow-hidden">
      {/* Banner Slider */}
      <section className="relative">
        <BannerSlider />
      </section>

      {/* Latest Meals Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
              Latest <span className="text-primary">Meals</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Freshly cooked by your neighbors
            </p>
          </div>
          <Link
            to="/meals"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-linear-to-r from-[#FF6B35] to-[#FF4C29] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            See More
          </Link>
        </div>

        <LatestMeals />
      </section>
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <WhyChooseUs />
      </section>
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <Reviews />
      </section>
    </div>
  );
};

export default Home;
