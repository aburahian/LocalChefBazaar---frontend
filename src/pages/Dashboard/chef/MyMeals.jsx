import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UpdateMealModal from "../../../components/Modal/UpdateMealModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import MealCard from "./MealCard";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, refetch } = useQuery({
    queryKey: ["my_meals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-meals/${user?.email}`);
      return res.data;
    },
  });

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    const res = await axiosSecure.delete(`/meals/${id}`);

    if (res.data.deletedCount > 0) {
      Swal.fire("Deleted!", "Meal has been removed.", "success");
      refetch();
    }
  };

  const handleUpdate = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard
          key={meal._id}
          meal={meal}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}

      {isModalOpen && selectedMeal && (
        <UpdateMealModal
          meal={selectedMeal}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyMeals;
