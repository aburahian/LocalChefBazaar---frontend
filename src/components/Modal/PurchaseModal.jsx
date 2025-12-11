import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PurchaseModal = ({ closeModal, isOpen, meal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const {
    _id: foodId,
    foodName,
    foodImage,
    chefName,
    price,
    chefId
  } = meal || {};



  const totalPrice = price * quantity;

  const handleConfirmOrder = async () => {
    if (!address) {
      return Swal.fire("Error", "Please enter your address!", "error");
    }

    // Confirm popup
    const confirm = await Swal.fire({
      title: "Confirm Order?",
      text: `Your total price is $${totalPrice}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const orderData = {
      foodId,
      
      mealName: foodName,
      mealImage:foodImage,
      price,
      quantity,
      chefName,
      chefId,
      paymentStatus: "pending",
      userEmail: user?.email,
      userAddress: address,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post(`/orders`, orderData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Order placed successfully!", "success");
        closeModal();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
          <DialogTitle className="text-xl font-semibold text-center">
            Confirm Your Order
          </DialogTitle>

          <div className="mt-4 space-y-3">
            <p><strong>Meal:</strong> {foodName}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Chef ID:</strong> {chefId}</p>
            <p><strong>Your Email:</strong> {user?.email}</p>

            {/* Quantity */}
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border p-2 rounded-lg"
              placeholder="Quantity"
            />

            {/* Address */}
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter delivery address"
            ></textarea>

            <p className="font-semibold text-lg mt-2">
              Total: ${totalPrice}
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleConfirmOrder}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Order
            </button>

            <button
              onClick={closeModal}
              className="bg-red-200 text-red-800 px-4 py-2 rounded hover:bg-red-300"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
