import { useForm, useFieldArray } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TbFidgetSpinner } from "react-icons/tb";
import useStatus from "../../hooks/useStatus";

const AddMealForm = () => {
  const { user } = useAuth();
  const [status, isRoleLoading] = useStatus();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ingredients: [{ name: "" }],
      rating: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/meals", payload),
    onSuccess: () => {
      toast.success("Meal added successfully!");
      reset();
    },
    onError: () => toast.error("Failed to add meal"),
  });

  const { data: chefUser } = useQuery({
    queryKey: ["chefUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.foodImage[0];
      const imageUrl = await imageUpload(imageFile);

      const payload = {
        foodName: data.foodName,
        chefName: user?.displayName,
        foodImage: imageUrl,
        category: data.category,
        price: Number(data.price),
        rating: Number(data.rating),
        ingredients: data.ingredients.map((i) => i.name),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        delivery_area: data.delivery_area,
        chefId: chefUser?.chefId,
        chefEmail: user?.email,
        createdAt: new Date().toISOString(),
      };

      await mutateAsync(payload);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading image or submitting meal");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Add New Meal
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Food Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Food Name</label>
          <input
            type="text"
            placeholder="Grilled Chicken Salad"
            {...register("foodName", { required: true })}
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
          />
          {errors.foodName && (
            <span className="text-red-500 text-sm mt-1">
              Food Name is required
            </span>
          )}
        </div>

        {/* Food Image */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Food Image</label>
          <input
            type="file"
            {...register("foodImage", { required: true })}
            className="px-4 py-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-lime-400 focus:outline-none"
          />
          {errors.foodImage && (
            <span className="text-red-500 text-sm mt-1">
              Food Image is required
            </span>
          )}
        </div>

        {/* Price & Category & Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              placeholder="12.99"
              {...register("price", { required: true, min: 0 })}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1">
                Price must be positive
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Category</label>
            <select
              {...register("category", { required: true })}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
            >
              <option value="">Select category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm mt-1">
                Category is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Rating</label>
            <input
              type="number"
              placeholder="4.5"
              {...register("rating", { min: 0, max: 5 })}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Ingredients</label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col sm:flex-row gap-2 mb-2"
            >
              <input
                {...register(`ingredients.${index}.name`, { required: true })}
                placeholder="Ingredient"
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FFF8F0] transition w-max"
          >
            Add Ingredient
          </button>
        </div>

        {/* Estimated Delivery & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              placeholder="30 minutes"
              {...register("estimatedDeliveryTime", { required: true })}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
            />
            {errors.estimatedDeliveryTime && (
              <span className="text-red-500 text-sm mt-1">Required</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Chef Experience
            </label>
            <input
              type="text"
              placeholder="5 years Mediterranean cuisine"
              {...register("chefExperience", { required: true })}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
            />
            {errors.chefExperience && (
              <span className="text-red-500 text-sm mt-1">Required</span>
            )}
          </div>
        </div>

        {/* Delivery Area */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">
            Delivery Area
          </label>
          <input
            type="text"
            placeholder="Dhaka"
            {...register("delivery_area", { required: true })}
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
          />
          {errors.delivery_area && (
            <span className="text-red-500 text-sm mt-1">Required</span>
          )}
        </div>

        {status === "fraud" ? (
          <button
            type="submit"
            className="w-full py-3 bg-[#FF6B35] disabled text-white font-semibold rounded-xl  transition flex justify-center items-center gap-2"
          >
            Add Meal
          </button>
        ) : (
          <button
            type="submit"
            className="w-full py-3 bg-[#FF6B35] text-white font-semibold rounded-xl transition flex justify-center items-center gap-2"
          >
            {isLoading && <TbFidgetSpinner className="animate-spin" />}
            {isLoading ? "Submitting..." : "Add Meal"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddMealForm;
