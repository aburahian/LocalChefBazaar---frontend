import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const FavoriteMeal = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch favorites
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await axiosSecure.get("/favorites");
      return res.data;
    },
  });

  // Delete mutation
  const deleteFavoriteMutation = useMutation({
    mutationFn: async (mealId) => {
      const res = await axiosSecure.delete(`/favorites/${mealId}`);
      return res.data;
    },
    onSuccess: (data, mealId) => {
      toast.success(data.message);
      queryClient.setQueryData(["favorites"], (oldData) =>
        oldData.filter((meal) => meal._id !== mealId)
      );
    },
    onError: () => toast.error("Failed to remove meal"),
  });

  if (isLoading) return <LoadingSpinner/>

  if (favorites.length === 0) return <p className="p-6">No favorite meals yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorite Meals</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Meal Name</th>
              <th className="border p-2">Chef Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Date Added</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((meal) => (
              <tr key={meal._id} className="hover:bg-[#FFF8F0]">
                <td className="border p-2">{meal.foodName}</td>
                <td className="border p-2">{meal.chefName}</td>
                <td className="border p-2">${meal.price || "-"}</td>
                <td className="border p-2">
                  {new Date(meal.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteFavoriteMutation.mutate(meal._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {favorites.map((meal) => (
          <div
            key={meal._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 border-l-4 border-orange-400"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{meal.foodName}</h3>
              <button
                onClick={() => deleteFavoriteMutation.mutate(meal._id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
            <p><span className="font-semibold">Chef:</span> {meal.chefName}</p>
            <p><span className="font-semibold">Price:</span> ${meal.price || "-"}</p>
            <p><span className="font-semibold">Added:</span> {new Date(meal.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMeal;
