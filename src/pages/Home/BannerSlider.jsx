import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    image: "https://i.ibb.co/XYZ/banner5.jpg",
    title: "Healthy Salads",
    subtitle: "Fresh & Green Choices",
  },
  {
    id: 6,
    image: "https://i.ibb.co/XYZ/banner6.jpg",
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
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-11/12 h-[400px] md:h-[500px] rounded-2xl"
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
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                {banner.title}
              </h2>
              <p className="text-lg md:text-2xl">{banner.subtitle}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
