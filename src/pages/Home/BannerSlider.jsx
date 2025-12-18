import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import { motion } from "framer-motion";

const bannerData = [
  {
    id: 1,
    image: "https://i.ibb.co.com/ccH0rs1X/delicious-food-delivery-top-view-23-2149182210.jpg",
    title: "Delicious Meals Delivered",
    subtitle: "Fresh & Tasty Food Every Day",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/wN8yf5N3/af5ed7e6-0d0f-4585-b30f-7df674f314c1.jpg",
    title: "Your Favorite Dishes",
    subtitle: "Order Now & Enjoy",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/mCynqNmH/66066981f2d884346df02cbc-deliver-packages-faster-HERO.webp",
    title: "Fast Delivery",
    subtitle: "Hot & Fresh at Your Doorstep",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/qYxvCrdF/images-q-tbn-ANd9-Gc-TMq-Si-F73jv-VCGHWjuu9u-CYwj4-Wt-Tb-O8-LZIDw-s.jpg",
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
    image: "https://i.ibb.co.com/jPYk3zMv/desserts-update.jpg",
    title: "Sweet Desserts",
    subtitle: "Treat Yourself Today",
  },
  {
    id: 8,
    image: "https://i.ibb.co.com/7x2cWrj5/beat-the-heat-with-refreshing-summer-drink-ideas-852782.jpg",
    title: "Refreshing Drinks",
    subtitle: "Cool & Energizing",
  },
  {
    id: 9,
    image: "https://i.ibb.co.com/YBhGNK4B/Recipes-2400-Pepperoni-Cup-Crips-Sweet-Spicy-Basil-Pep-Hot-Honey.jpg",
    title: "Hot Pizzas",
    subtitle: "Cheesy & Delicious",
  },
];
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BannerSlider = () => {
  return (
    <div className="w-full mt-4 md:mt-8 px-2 md:px-0">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        className="w-full md:w-11/12 h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-black/40 to-transparent flex items-center pl-8 md:pl-24">
                <motion.div
                  key={banner.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="max-w-2xl text-white"
                >
                  <motion.span
                    variants={itemVariants}
                    className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm font-semibold mb-4 backdrop-blur-sm"
                  >
                    Featured
                  </motion.span>

                  <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-lg"
                  >
                    {banner.title}
                  </motion.h2>

                  <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-2xl text-gray-200 mb-8 font-light tracking-wide drop-shadow-md"
                  >
                    {banner.subtitle}
                  </motion.p>

                  <motion.div variants={itemVariants}>
                    <Link to="/meals">
                      <button className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                        Order Now
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
