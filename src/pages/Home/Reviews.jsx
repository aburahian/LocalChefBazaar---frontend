// Reviews.jsx
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Reviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='w-11/12 mx-auto my-24'>
      <div className='text-center mb-16'>
        <h3 className="text-3xl font-bold my-8">Reviews</h3>
        <p className="max-w-2xl mx-auto">
          See what our customers are saying about their favorite meals. Honest feedback from real food lovers helps you choose the best dishes to try!
        </p>
      </div>

      <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 30,
          stretch: 50,
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },   // mobile
          768: { slidesPerView: 2 },   // tablet
          1024: { slidesPerView: 3 },  // desktop
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
