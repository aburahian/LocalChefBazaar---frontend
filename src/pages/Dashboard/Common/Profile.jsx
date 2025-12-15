import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import coverImg from "../../../assets/images/logo-flat.png";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaUserTag, FaUtensils, FaUserShield } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [status, setStatus] = useState("active");
  const [chefId, setChefId] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  if (isRoleLoading || !role) return <LoadingSpinner />;


  const handleRequest = async (type) => {
    setLoading(true);
    try {
      const payload = {
        requestType: type,
      };

      const res = await axiosSecure.post("/role-request", payload);

      toast.success(res.data.message || `Request to become ${type} submitted.`);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 409) {
        toast.error("You already have a pending request.");
      } else {
        toast.error("Failed to send request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 flex justify-center items-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/50"
      >
        {/* Header / Cover */}
        <div className="relative h-48 bg-linear-to-r from-orange-400 to-orange-600 overflow-hidden">
          <img
            src={coverImg}
            alt="Cover"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Avatar */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
              className="relative"
            >
              <img
                alt="profile"
                src={user?.photoURL}
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg z-10 relative bg-white"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white z-20" title="Active"></div>
            </motion.div>
          </div>

          {/* User Info Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              {user?.displayName}
              <MdVerified className="text-blue-500 text-xl" />
            </h2>
            <p className="text-gray-500 flex items-center justify-center gap-1 mt-1">
              <FaEnvelope className="text-xs" /> {user?.email}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium flex items-center gap-2 border border-orange-200">
                <FaUserTag /> {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex items-center gap-2 border border-blue-200">
                STATUS: {status.toUpperCase()}
              </span>
            </div>
            {role === "chef" && chefId && (
              <p className="mt-2 text-sm text-gray-500">Chef ID: <span className="font-mono bg-gray-100 px-1 rounded">{chefId}</span></p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50 rounded-2xl p-6 border border-white/60 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <FaUser />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Full Name</p>
                <p className="text-gray-800 font-medium">{user?.displayName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Email</p>
                <p className="text-gray-800 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <FaMapMarkerAlt />
              </div>
              <div className="w-full">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Address</p>
                <p className="text-gray-800 font-medium">{user?.address || "No address provided"}</p>
              </div>
            </div>
          </div>


          {/* Action Buttons for Customer */}
          {role === "customer" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                disabled={loading}
                onClick={() => handleRequest("chef")}
                className="flex-1 group bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center gap-2"
              >
                <FaUtensils className="group-hover:rotate-12 transition-transform" />
                Request to be Chef
              </button>
              <button
                disabled={loading}
                onClick={() => handleRequest("admin")}
                className="flex-1 group bg-linear-to-r from-gray-700 to-black text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-gray-500/30 transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center gap-2"
              >
                <FaUserShield className="group-hover:scale-110 transition-transform" />
                Request to be Admin
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
