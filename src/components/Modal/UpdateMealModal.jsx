import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { imageUpload } from "../../utils";

const UpdateMealModal = ({ meal, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(meal.foodImage || "");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: meal.foodName,
      price: meal.price,
      rating: meal.rating,
      ingredients: meal.ingredients?.join(", "),
      deliveryTime: meal.estimatedDeliveryTime,
    },
  });

  useEffect(() => {
    reset({
      name: meal.foodName,
      price: meal.price,
      rating: meal.rating,
      ingredients: meal.ingredients?.join(", "),
      deliveryTime: meal.estimatedDeliveryTime,
    });
    setPreview(meal.foodImage || "");
  }, [meal, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = meal.foodImage;
      if (data.imageFile?.[0]) {
        imageUrl = await imageUpload(data.imageFile[0]);
      }

      const updatedMeal = {
        foodName: data.name,
        price: data.price,
        rating: data.rating || 0,
        estimatedDeliveryTime: data.deliveryTime || 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        foodImage: imageUrl,
      };

      const res = await axiosSecure.put(`/meals/${meal._id}`, updatedMeal);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Meal updated successfully", "success");
        refetch();
        closeModal();
      } else {
        Swal.fire("Info", "No changes were made", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  return (
  <Dialog open={true} onClose={closeModal} className="relative z-50">
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <Dialog.Title className="text-xl font-bold mb-4">
        Update Meal
      </Dialog.Title>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label className="font-medium">Meal Name</label>
        <input {...register("name", { required: true })} placeholder="Meal Name" className="input input-bordered" />

        <label className="font-medium">Price</label>
        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered" />

        <label className="font-medium">Rating</label>
        <input {...register("rating")} type="number" placeholder="Rating" className="input input-bordered" />

        <label className="font-medium">Ingredients</label>
        <input {...register("ingredients")} placeholder="Ingredients (comma separated)" className="input input-bordered" />

        <label className="font-medium">Estimated Delivery Time (min)</label>
        <input {...register("deliveryTime")} type="number" placeholder="Estimated Delivery Time" className="input input-bordered" />

        <label className="font-medium">Meal Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("imageFile")}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="input input-bordered"
        />
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />}

        <div className="flex justify-between mt-3">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update
          </button>
          <button type="button" onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </Dialog.Panel>
  </div>
</Dialog>

  );
};

export default UpdateMealModal;
