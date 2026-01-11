import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Subscribed successfully!");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="py-12 bg-primary/5 rounded-3xl">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight mb-4">
          Stay <span className="text-primary">Updated</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Get the latest meal recommendations and exclusive offers delivered to
          your inbox
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-800 dark:text-gray-200"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
