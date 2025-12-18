import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../utils";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // Hooks must be called first
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const { user } = await signIn(email, password);
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        status: "active",
      });
      navigate(from, { replace: true });
      toast.success("Login Successful");
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
      });
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };

  // Conditional rendering only after hooks
  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF8F0] p-4">
      <div className="flex flex-col max-w-md p-6 rounded-3xl sm:p-10 bg-white shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-gray-900">Log In</h1>
          <p className="text-sm text-gray-500">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-400 focus:outline-none bg-[#FFF8F0] text-gray-900"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-400 focus:outline-none bg-[#FFF8F0] text-gray-900"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6B35] hover:bg-[#e85a2b] text-white py-3 rounded-lg font-semibold flex justify-center items-center"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" /> : "Continue"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-xs text-gray-500 hover:text-[#FF6B35] underline">
            Forgot password?
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-lg cursor-pointer hover:bg-[#FFF8F0] transition"
        >
          <FcGoogle size={28} />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don&apos;t have an account yet?{" "}
          <Link to="/signup" className="text-[#FF6B35] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
