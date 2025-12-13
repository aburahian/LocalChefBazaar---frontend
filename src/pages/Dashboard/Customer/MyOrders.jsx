import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PaymentModal from "../../../components/Modal/PaymentModal";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/my-orders");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <img
                src={order.mealImage}
                alt={order.mealName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold">{order.mealName}</h3>

              <div className="text-gray-600 mt-3 space-y-1 text-sm">
                <p>
                  <strong>Price:</strong> ${order.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Delivery Time:</strong>{" "}
                  {order.estimatedDeliveryTime || "N/A"}
                </p>
                <p>
                  <strong>Chef:</strong> {order.chefName}
                </p>
                <p>
                  <strong>Order Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.orderStatus === "accepted"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              {/* ===== ACTION STATES ===== */}

              {/* Pay Now */}
              {order.orderStatus === "accepted" &&
                order.paymentStatus === "pending" && (
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Pay Now
                  </button>
                )}

              {/* Waiting after payment */}
              {order.paymentStatus === "paid" && (
                <div className="mt-4 w-full text-center bg-yellow-100 text-yellow-800 py-2 rounded-lg font-semibold">
                  ⏳ Payment received. Waiting for delivery
                </div>
              )}

              {/* Waiting for acceptance */}
              {order.orderStatus === "pending" && (
                <div className="mt-4 w-full text-center bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold">
                  Waiting for chef acceptance
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
