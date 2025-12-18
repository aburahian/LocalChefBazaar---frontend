import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageURL = await imageUpload(imageFile);

      await createUser(data.email, data.password);

      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        image: imageURL,
        address: data.address,
      });

      await updateUserProfile(data.name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        address: "",
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF8F0] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-500">Create your LocalChefBazaar account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:outline-none bg-[#FFF8F0]"
              {...register("name", { required: "Name is required", maxLength: 20 })}
            />
            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Address</label>
            <input
              type="text"
              placeholder="Your Address"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 bg-[#FFF8F0]"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address.message}</span>}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer px-4 py-2 rounded-lg border-2 border-dashed border-lime-300 bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-lime-400"
              {...register("image", { required: "Profile image is required" })}
            />
            {errors.image && <span className="text-xs text-red-500 mt-1">{errors.image.message}</span>}
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (max 2MB)</p>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 bg-[#FFF8F0]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="******"
              autoComplete="new-password"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2  bg-[#FFF8F0]"
              {...register("password", { required: "Password is required", minLength: 6 })}
            />
            {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="******"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2  bg-[#FFF8F0]"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <span className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6B35] hover:bg-[#e85a2b] text-white py-3 rounded-lg font-semibold transition flex justify-center items-center"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Sign In */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-lg cursor-pointer hover:bg-[#FFF8F0] transition"
        >
          <FcGoogle size={28} />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF6B35] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
