import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewForm from "../../components/Form/ReviewForm";
import useStatus from "../../hooks/useStatus";

const MealDetails = () => {
  const { user } = useAuth();

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [status, isRoleLoading] = useStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
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
      const res = await axiosSecure.get(`/reviews/${id}`);
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
      <div className="mx-auto flex flex-col my-9 lg:flex-row gap-12 w-full">
        {/* IMAGE */}
        <div className="flex-1">
          <img
            src={foodImage}
            alt={foodName}
            className="w-full rounded-xl object-cover"
          />
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col gap-6">
          <Heading title={foodName} subtitle={`Chef: ${chefName}`} />

          <p className="text-gray-700 font-semibold">Chef ID: {chefId}</p>
          <p className="text-gray-700 font-medium">Price: ${price}</p>
          <p className="text-gray-700 font-medium">Rating: ⭐ {rating}</p>
          <p className="text-gray-700 font-medium">
            Delivery Area: {delivery_area}
          </p>
          <p className="text-gray-700 font-medium">
            Estimated Delivery: {estimatedDeliveryTime} Min
          </p>
          <p className="text-gray-700 font-medium">
            Chef Experience: {chefExperience} Year
          </p>

          <hr />

          {/* INGREDIENTS */}
          <div>
            <h3 className="font-semibold text-lg">Ingredients:</h3>
            <ul className="list-disc ml-6">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <hr />

          {/* FAVORITE BUTTON */}
          <button
            onClick={handleFavorite}
            className={`px-4 py-2 rounded-lg border w-fit flex items-center gap-2 
              ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white text-red-500 border-red-500"
              }
            `}
          >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
          </button>

          {/* ORDER NOW */}
          {status === "fraud" ? (
            <Button disabled label="Order Now" />
          ) : (
            <Button onClick={() => setIsOpen(true)} label="Order Now" />
          )}

          {/* PURCHASE MODAL */}
          <PurchaseModal meal={meal} closeModal={closeModal} isOpen={isOpen} />

          <hr className="my-6" />

          {/* REVIEWS */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Reviews:</h3>

            {/* REVIEW LIST */}
            {reviews.length ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {rev.userImage ? (
                        <img
                          src={rev.userImage}
                          alt={rev.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                          {rev.userName?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {rev.userName}
                        </p>
                        <p className="text-yellow-500 text-sm">
                          ⭐ {rev.rating}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No reviews yet. Be the first to review!
              </p>
            )}

            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg mt-4"
            >
              Write a Review
            </button>

            {/* REVIEW FORM */}
            {showReviewForm && (
              <ReviewForm
                mealId={id}
                mealName={foodName}
                refetch={refetch}
                onClose={() => setShowReviewForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MealDetails;
