import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Card = ({ meal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
console.log(meal);

  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    chefName,
    chefId,
    delivery_area,
  } = meal || {};

  const handleDetails = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate(`/meals/${_id}`);
  };

  return (
    <div className="col-span-1 shadow-xl p-4 rounded-xl bg-white group">
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl mb-3">
        <img
          src={foodImage}
          className="object-cover w-full h-full group-hover:scale-110 transition"
          alt="Meal"
        />
      </div>

      {/* Text */}
      <h2 className="font-bold text-xl">{foodName}</h2>

      <p className="text-gray-600">
        <span className="font-semibold">Chef:</span> {chefName}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Chef ID:</span> {chefId}
      </p>

      <p className="text-gray-700 font-medium">Price: ${price}</p>
      <p className="text-gray-700">Rating: ⭐ {rating}</p>
      <p className="text-gray-700">Delivery Area: {delivery_area}</p>

      {/* See Details */}
      <button
        onClick={handleDetails}
        className="mt-3 w-full py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition"
      >
        See Details
      </button>
    </div>
  );
};

export default Card;
