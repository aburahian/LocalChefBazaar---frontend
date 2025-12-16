import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import coverImg from "../../../assets/images/logo-flat.png";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaUserTag, FaUtensils, FaUserShield } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, isRoleLoading, requestStatus] = useRole();
  const axiosSecure = useAxiosSecure();
  const [requestLoading, setRequestLoading] = useState(false);

  // Fetch user data from server
  const { data: dbUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  if (authLoading || isRoleLoading || isUserLoading || !user) return <LoadingSpinner />;

  const handleRequest = async (type) => {
    setRequestLoading(true);
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
      setRequestLoading(false);
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
                src={dbUser?.image || user?.photoURL}
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg z-10 relative bg-white"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white z-20" title="Active"></div>
            </motion.div>
          </div>

          {/* User Info Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              {dbUser?.name || user?.displayName}
              {role === 'chef' || role === 'admin' ? <MdVerified className="text-blue-500 text-xl" /> : null}
            </h2>
            <p className="text-gray-500 flex items-center justify-center gap-1 mt-1">
              <FaEnvelope className="text-xs" /> {dbUser?.email || user?.email}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium flex items-center gap-2 border border-orange-200 uppercase">
                <FaUserTag /> {role}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex items-center gap-2 border border-blue-200 uppercase">
                STATUS: {dbUser?.status || "active"}
              </span>
            </div>
            {role === "chef" && dbUser?.chefId && (
              <p className="mt-2 text-sm text-gray-500">Chef ID: <span className="font-mono bg-gray-100 px-1 rounded">{dbUser.chefId}</span></p>
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
                <p className="text-gray-800 font-medium">{dbUser?.name || user?.displayName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Email</p>
                <p className="text-gray-800 font-medium">{dbUser?.email || user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                <FaMapMarkerAlt />
              </div>
              <div className="w-full">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Address</p>
                <p className="text-gray-800 font-medium">{dbUser?.address || "No address provided"}</p>
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
              {requestStatus === 'pending' ? (
                <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-xl border border-yellow-200 font-semibold w-full text-center">
                  Request Pending... Please Wait for Admin Approval.
                </div>
              ) : (
                <>
                  <button
                    disabled={requestLoading}
                    onClick={() => handleRequest("chef")}
                    className="flex-1 group bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center gap-2"
                  >
                    <FaUtensils className="group-hover:rotate-12 transition-transform" />
                    Request to be Chef
                  </button>
                  <button
                    disabled={requestLoading}
                    onClick={() => handleRequest("admin")}
                    className="flex-1 group bg-linear-to-r from-gray-700 to-black text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-gray-500/30 transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center gap-2"
                  >
                    <FaUserShield className="group-hover:scale-110 transition-transform" />
                    Request to be Admin
                  </button>
                </>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
