import { useState } from "react";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PaymentModal from "../../../components/Modal/PaymentModal";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-orders`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="rounded-xl p-5 shadow hover:shadow-lg transition bg-white"
        >
          <img
            src={order.mealImage}
            alt={order.mealName}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h2 className="text-xl font-semibold">{order.mealName}</h2>

          <div className="text-gray-600 mt-2 space-y-1">
            <p>
              <strong>Price:</strong> ${order.price}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Delivery Time:</strong> {order.deliveryTime || "N/A"}
            </p>
            <p>
              <strong>Chef:</strong> {order.chefName}
            </p>
            <p>
              <strong>Chef ID:</strong> {order.chefId}
            </p>
            <p>
              <strong>Order Status:</strong>{" "}
              <span
                className={`font-bold ${
                  order.orderStatus === "accepted"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {order.orderStatus}
              </span>
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              <span
                className={`font-bold ${
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {order.paymentStatus}
              </span>
            </p>
          </div>

          {order.orderStatus === "accepted" &&
            order.paymentStatus === "pending" && (
              <button
                onClick={() => setSelectedOrder(order)}
                className="block mt-4 w-full text-center bg-green-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Pay Now
              </button>
            )}
          {order.orderStatus === "pending" && (
            <button
              disabled
              className="block mt-4 w-full text-center bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
            >
              Wait for Acceptance
            </button>
          )}
        </div>
      ))}

      {/* Payment Modal */}
      {selectedOrder && (
        <PaymentModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrders;
