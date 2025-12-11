import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ReviewForm = ({ mealId,mealName, refetch, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    if (!user) return alert("You must be logged in to submit a review.");
console.log(user);

    try {
      await axiosSecure.post("/reviews", {
        mealId,
        mealName,
        userImage:user.photoURL,
        userName: user.displayName,
        userEmail:user.email,
        rating: Number(data.rating),
        comment: data.comment,
      });

      toast.success("Review submitted!");
      reset();

      // Refetch reviews if provided
      if (refetch) refetch();

      // Close form if onClose provided
      if (onClose) onClose();

    } catch (err) {
      console.error(err);
      toast("Failed to submit review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 mt-4 border p-4 rounded-lg"
    >
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

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
        >
          Submit
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
