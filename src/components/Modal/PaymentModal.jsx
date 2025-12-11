import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useState } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentModal = ({ order, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const isOpen = !!order;
  if (!order) return null;

  const handlePayment = async () => {
    setLoading(true);
    const paymentInfo = {
      cost: order?.price,
      mealId: order?.mealId,
      customer: { email: order?.userEmail },
      orderId: order?._id?.toString(),
      mealName: order?.mealName,
      quantity: order?.quantity,
      image: order?.mealImage,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle className="text-lg font-medium text-gray-900">
              Pay for {order.name}
            </DialogTitle>
            <div className="mt-2 text-sm text-gray-500">
              <p>Price: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
            </div>
            <hr className="mt-4" />
            <div className="flex mt-4 justify-around">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Redirecting..." : "Pay Now"}
              </button>
              <button
                onClick={onClose}
                className="bg-red-100 text-red-900 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
