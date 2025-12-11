import { useQuery, useMutation } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner"

const OrderRequests = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  // Fetch orders for this chef
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["chef-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/manage-orders/${user?.email}`)
      return res.data
    },
  })

  // Mutation for status update
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/update-order-status/${id}`, { status })
    },
    onSuccess: () => refetch(),
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {orders.map((order) => {
        const isCancelled = order.orderStatus === "cancelled"
        const isAccepted = order.orderStatus === "accepted"
        const isDelivered = order.orderStatus === "delivered"
        const pending = order.orderStatus === "pending"

        return (
          <div
            key={order._id}
            className="border rounded-xl p-5 shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">
              {order.mealName}
            </h2>

            <div className="text-gray-600 space-y-1 text-sm mt-2">
              <p><strong>Price:</strong> ${order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>User:</strong> {order.userEmail}</p>
              <p><strong>Address:</strong> {order.userAddress}</p>
              <p><strong>Order Time:</strong> {order.orderTime}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">

              {/* Cancel */}
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg disabled:bg-gray-300"
                disabled={!pending}
                onClick={() =>
                  updateStatus.mutate({ id: order._id, status: "cancelled" })
                }
              >
                Cancel
              </button>

              {/* Accept */}
              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-300"
                disabled={!pending}
                onClick={() =>
                  updateStatus.mutate({ id: order._id, status: "accepted" })
                }
              >
                Accept
              </button>

              {/* Deliver */}
              <button
                className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:bg-gray-300"
                disabled={!isAccepted}
                onClick={() =>
                  updateStatus.mutate({ id: order._id, status: "delivered" })
                }
              >
                Deliver
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrderRequests
