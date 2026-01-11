import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Statistics = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const statistics = [
    { label: "Total Meals", value: stats?.totalMeals || 120, icon: "🍽️" },
    { label: "Happy Customers", value: stats?.totalUsers || 500, icon: "👥" },
    {
      label: "Orders Delivered",
      value: stats?.ordersDelivered || 1000,
      icon: "🚚",
    },
    { label: "Local Chefs", value: stats?.totalChefs || 50, icon: "👨‍🍳" },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 rounded-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight mb-4">
          Our <span className="text-primary">Impact</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Numbers that speak for themselves - connecting food lovers with local
          chefs
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-primary mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
