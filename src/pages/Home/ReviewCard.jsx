// ReviewCard.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, comment, userImage, rating } = review;

  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-orange-400 flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
      <div className="shrink-0 relative">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400">
          <img
            src={userImage}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2 flex-col sm:flex-row sm:gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {userName}
          </h3>
          <div className="flex gap-1 text-yellow-400 mt-1 sm:mt-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < rating
                    ? "fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }
              />
            ))}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{comment}</p>
      </div>

      <div className="absolute top-4 right-4 text-orange-400 text-3xl font-bold opacity-20">
        “
      </div>
    </div>
  );
};

export default ReviewCard;
