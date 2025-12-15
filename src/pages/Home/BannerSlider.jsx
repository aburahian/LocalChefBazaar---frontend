import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const bannerData = [
  {
    id: 1,
    image: "https://i.ibb.co/4t6xZ7s/banner1.jpg",
    title: "Delicious Meals Delivered",
    subtitle: "Fresh & Tasty Food Every Day",
  },
  {
    id: 2,
    image: "https://i.ibb.co/5R3pP9D/banner2.jpg",
    title: "Your Favorite Dishes",
    subtitle: "Order Now & Enjoy",
  },
  {
    id: 3,
    image: "https://i.ibb.co/Y42Ddf94/banner3.jpg",
    title: "Fast Delivery",
    subtitle: "Hot & Fresh at Your Doorstep",
  },
  {
    id: 4,
    image: "https://i.ibb.co/XYZ/banner4.jpg",
    title: "Tasty Breakfasts",
    subtitle: "Start Your Day Right",
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/spFcQMHH/Healthy-Cobb-Salad-3.jpg",
    title: "Healthy Salads",
    subtitle: "Fresh & Green Choices",
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/SXNTYmzQ/Juicy-Hamburgers7.jpg",
    title: "Juicy Burgers",
    subtitle: "Grilled to Perfection",
  },
  {
    id: 7,
    image: "https://i.ibb.co/XYZ/banner7.jpg",
    title: "Sweet Desserts",
    subtitle: "Treat Yourself Today",
  },
  {
    id: 8,
    image: "https://i.ibb.co/XYZ/banner8.jpg",
    title: "Refreshing Drinks",
    subtitle: "Cool & Energizing",
  },
  {
    id: 9,
    image: "https://i.ibb.co/XYZ/banner9.jpg",
    title: "Hot Pizzas",
    subtitle: "Cheesy & Delicious",
  },
];

const BannerSlider = () => {
  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    
    gsap.fromTo(".banner-content",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
  };

  return (
    <div className="w-full mt-4 md:mt-8 px-2 md:px-0">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect={'fade'}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        onSlideChange={handleSlideChange}
        className="w-full md:w-11/12 h-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-full relative"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-black/40 to-transparent flex flex-col justify-center items-start pl-8 md:pl-24 text-white">
                <div className="banner-content max-w-2xl">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm font-semibold mb-4 backdrop-blur-sm">
                    Featured
                  </span>
                  <h2 className="text-4xl md:text-7xl font-bold mb-4 font-outfit leading-tight drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-200 mb-8 font-inter font-light tracking-wide drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <Link to="/meals">
                    <button className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-all duration-300 transform flex items-center gap-2 group">
                      Order Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
