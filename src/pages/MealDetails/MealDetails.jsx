import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import ReviewForm from "../../components/Form/ReviewForm";
import useStatus from "../../hooks/useStatus";
import Card from "../../components/Home/Card";

const MealDetails = () => {
  const { user } = useAuth();

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [status, isRoleLoading] = useStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const navigate = useNavigate();
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/${id}`);
      return res.data;
    },
  });

  const {
    foodName,
    foodImage,
    price,
    rating,
    ingredients = [],
    delivery_area,
    estimatedDeliveryTime,
    chefExperience,
    chefName,
    chefId,
  } = meal;

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!meal || !user) return;
    setIsFavorite(meal.favorites?.includes(user.email) || false);
  }, [meal, user]);

  const handleFavorite = async () => {
    if (!user) return;

    try {
      const res = await axiosSecure.post(`/meals/favorite/${meal._id}`, {
        userEmail: user.email,
      });

      if (res.data.success) {
        setIsFavorite(res.data.favorited);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="my-6 w-fit flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <div className="mx-auto flex flex-col my-6 lg:flex-row gap-12 w-full">
        {/* IMAGE SECTION */}
        <div className="flex-1">
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <img
              src={foodImage}
              alt={foodName}
              className="w-full h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-2xl font-bold text-primary">${price}</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{rating}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleFavorite}
              className={`flex-1 px-6 py-3 rounded-xl border-2 font-medium flex items-center justify-center gap-2 transition-all ${isFavorite
                ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                : "bg-white dark:bg-gray-800 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                }`}
            >
              {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
            </button>

            {status === "fraud" ? (
              <Button disabled label="Order Disabled" className="flex-1" />
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF4C29] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Order Now
              </button>
            )}
          </div>
        </div>

        {/* INFO & SPECIFICATIONS SECTION */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              {foodName}
            </h1>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <p className="text-lg font-medium">Chef: {chefName}</p>
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-orange-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Delivery Area</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{delivery_area}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-blue-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Delivery Time</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{estimatedDeliveryTime} Min</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-purple-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Chef Experience</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{chefExperience} Years</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-green-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Chef ID</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200 truncate">{chefId}</p>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="text-2xl">🥗</span> Ingredients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-gray-700 dark:text-gray-300">{ing}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="my-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-3xl text-gray-800 dark:text-gray-200 flex items-center gap-3">
            <span className="text-yellow-500 text-4xl">⭐</span> Customer Reviews
          </h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-md hover:shadow-lg"
          >
            Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <ReviewForm
              mealId={id}
              mealName={foodName}
              refetch={refetch}
              onClose={() => setShowReviewForm(false)}
            />
          </div>
        )}

        {/* Reviews Grid */}
        {reviews.length ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-600"
              >
                <div className="flex items-center gap-3 mb-4">
                  {rev.userImage ? (
                    <img
                      src={rev.userImage}
                      alt={rev.userName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {rev.userName?.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {rev.userName}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < rev.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                            }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No reviews yet
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>

      {/* RELATED ITEMS SECTION */}
      <div className="my-16">
        <h2 className="font-bold text-3xl text-gray-800 dark:text-gray-200 mb-8 flex items-center gap-3">
          <span className="text-primary text-4xl">🍲</span> Related Meals
        </h2>
        <RelatedMeals category={meal.category} currentMealId={meal._id} />
      </div>

      {/* PURCHASE MODAL */}
      <PurchaseModal meal={meal} closeModal={closeModal} isOpen={isOpen} />
    </Container>
  );
};

const RelatedMeals = ({ category, currentMealId }) => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["related-meals", category],
    enabled: !!category,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`, {
        params: { category, limit: 5 },
      });
      return res.data.meals.filter((m) => m._id !== currentMealId).slice(0, 4);
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (meals.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {meals.map((m) => (
        <Card key={m._id} meal={m} />
      ))}
    </div>
  );
};

export default MealDetails;
