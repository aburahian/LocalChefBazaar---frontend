import { Link } from "react-router";

const Categories = () => {
  const categories = [
    { name: "Breakfast", icon: "🥞", count: "25 meals" },
    { name: "Lunch", icon: "🍽️", count: "40 meals" },
    { name: "Dinner", icon: "🍛", count: "35 meals" },
    { name: "Dessert", icon: "🍰", count: "20 meals" },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight mb-4">
          Meal <span className="text-primary">Categories</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our diverse range of home-cooked meals across different
          categories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/meals?category=${category.name.toLowerCase()}`}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group border border-gray-100 dark:border-gray-700"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
              {category.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {category.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
