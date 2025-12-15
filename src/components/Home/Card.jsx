import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Card = ({ meal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    chefName,

    delivery_area,
  } = meal || {};

  const handleDetails = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate(`/meals/${_id}`);
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={foodImage}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
          alt="Meal"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
          ⭐ {rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <div className="grow space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {foodName}
            </h2>
            <span className="text-lg font-bold text-primary shrink-0">${price}</span>
          </div>

          <div className="text-sm text-gray-500 space-y-1 pt-2">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              By <span className="font-medium text-gray-700">{chefName}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              Area: {delivery_area}
            </p>
          </div>
        </div>

        {/* See Details */}
        <button
          onClick={handleDetails}
          className="mt-6 w-full py-2.5 bg-linear-to-r from-[#FF6B35] to-[#FF4C29] text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
