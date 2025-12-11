import { FaTrash, FaEdit } from "react-icons/fa";

const MealCard = ({ meal, onDelete, onUpdate }) => {
  console.log(meal);

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-3 justify-between">
      {/* Image */}
      <img
        src={meal.foodImage}
        alt={meal.name}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Name */}
      <h2 className="text-lg font-semibold">{meal.foodName}</h2>

      {/* Price + Rating */}
      <p className="text-gray-700">Price: ${meal.price}</p>
      <p className="text-gray-700">Rating: {meal.rating}</p>

      {/* Ingredients */}
      <p className="text-gray-600">
        <span className="font-medium">Ingredients:</span>{" "}
        {meal.ingredients?.join(", ")}
      </p>

      {/* Delivery Time */}
      <p className="text-gray-700">
        Delivery: {meal.estimatedDeliveryTime} min
      </p>

      {/* Chef Info */}
      <p className="text-gray-700">Chef: {meal.chefName}</p>
      <p className="text-gray-500 text-sm">Chef ID: {meal.chefId}</p>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => onDelete(meal._id)}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          <FaTrash /> Delete
        </button>

        <button
          onClick={() => onUpdate(meal)}
          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          <FaEdit /> Update
        </button>
      </div>
    </div>
  );
};

export default MealCard;
