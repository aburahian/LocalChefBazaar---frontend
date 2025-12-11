import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editingReview, setEditingReview] = useState(null);  
  const [updatedRating, setUpdatedRating] = useState(0);
  const [updatedComment, setUpdatedComment] = useState("");


  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-reviews"); 
      return res.data;
    },
  });


  const deleteMutation = useMutation({
    mutationFn: async (reviewId) => {
      const res = await axiosSecure.delete(`/reviews/${reviewId}`);
      return res.data;
    },
    onSuccess: (data, reviewId) => {
      toast.success("Review deleted successfully");
      queryClient.setQueryData(["myReviews"], (oldData) =>
        oldData.filter((rev) => rev._id !== reviewId)
      );
    },
    onError: () => toast.error("Failed to delete review"),
  });


  const updateMutation = useMutation({
    mutationFn: async (review) => {
      const res = await axiosSecure.put(`/reviews/${review._id}`, review);
      return res.data;
    },
    onSuccess: (data, review) => {
      toast.success("Review updated successfully");
      queryClient.setQueryData(["myReviews"], (oldData) =>
        oldData.map((rev) => (rev._id === review._id ? review : rev))
      );
      setEditingReview(null);
    },
    onError: () => toast.error("Failed to update review"),
  });

  if (isLoading) return <p>Loading...</p>;

  const handleEdit = (review) => {
    setEditingReview(review);
    setUpdatedRating(review.rating);
    setUpdatedComment(review.comment);
  };

  const handleUpdateSubmit = () => {
    updateMutation.mutate({
      ...editingReview,
      rating: updatedRating,
      comment: updatedComment,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white shadow-md rounded p-4 flex flex-col gap-2"
            >
              <p>
                <strong>Meal:</strong> {rev.mealName}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {rev.rating}
              </p>
              <p>
                <strong>Comment:</strong> {rev.comment}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this review?")) {
                      deleteMutation.mutate(rev._id);
                    }
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(rev)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Update Review</h3>
            <label className="block mb-2">
              Rating:
              <input
                type="number"
                min={1}
                max={5}
                value={updatedRating}
                onChange={(e) => setUpdatedRating(Number(e.target.value))}
                className="border rounded w-full p-1 mt-1"
              />
            </label>
            <label className="block mb-4">
              Comment:
              <textarea
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
                className="border rounded w-full p-1 mt-1"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingReview(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
