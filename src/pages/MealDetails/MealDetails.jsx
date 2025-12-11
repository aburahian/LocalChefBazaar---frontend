import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MealDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();


  if (!user) navigate("/login");

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meals/${id}`
      );
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
      const res = await axiosSecure.get(
        `/reviews/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <div className="mx-auto flex flex-col my-9 lg:flex-row gap-12 w-full">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={foodImage}
            alt={foodName}
            className="w-full rounded-xl object-cover"
          />
        </div>

        {/* Info Section */}
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

          <hr className="my-4" />

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-lg">Ingredients:</h3>
            <ul className="list-disc ml-6">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <hr className="my-4" />

          {/* Order Button */}
          <Button onClick={() => setIsOpen(true)} label="Order Now" />

          {/* Purchase Modal */}
          <PurchaseModal meal={meal} closeModal={closeModal} isOpen={isOpen} />

          <hr className="my-6" />

          {/* Reviews Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Reviews:</h3>
            {/* List of reviews */}
            {reviews?.length ? (
              <ul className="space-y-3">
                {reviews.map((rev, idx) => (
                  <li key={idx} className="border p-3 rounded-lg">
                    <p className="font-semibold">{rev.userName}</p>
                    <p>Rating: ⭐ {rev.rating}</p>
                    <p>{rev.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}

            {/* Add Review Form */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Submit Your Review:</h4>
              <ReviewForm mealId={id} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Simple Review Form Component
const ReviewForm = ({ mealId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    if (!user) return alert("You must be logged in to submit a review.");
    try {
      await axiosSecure.post(`/reviews`, {
        mealId,
        userName: user.displayName,
        rating: Number(data.rating),
        comment: data.comment,
      });
      alert("Review submitted!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Rating (0-5)"
        min={0}
        max={5}
        {...register("rating", { required: true })}
        className="px-3 py-2 border rounded-lg"
      />
      <textarea
        placeholder="Write your review"
        {...register("comment", { required: true })}
        className="px-3 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default MealDetails;
