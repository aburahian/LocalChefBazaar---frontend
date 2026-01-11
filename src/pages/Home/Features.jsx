const Features = () => {
  const features = [
    {
      title: "Fresh Ingredients",
      description:
        "All meals are prepared with the freshest, locally sourced ingredients for maximum flavor and nutrition.",
      icon: "🥕",
    },
    {
      title: "Local Support",
      description:
        "Support your local community by ordering from neighborhood chefs and home cooks.",
      icon: "🏘️",
    },
    {
      title: "Custom Orders",
      description:
        "Have dietary restrictions or preferences? Our chefs can accommodate special requests.",
      icon: "✨",
    },
    {
      title: "Quality Assurance",
      description:
        "Every meal goes through quality checks to ensure it meets our high standards.",
      icon: "⭐",
    },
    {
      title: "Fast Delivery",
      description:
        "Hot, fresh meals delivered to your doorstep within the estimated time.",
      icon: "⚡",
    },
    {
      title: "Secure Payments",
      description:
        "Safe and secure payment processing with multiple payment options available.",
      icon: "🔒",
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight mb-4">
          Why Choose <span className="text-primary">LocalChefBazaar</span>?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the unique advantages that make our platform the perfect
          choice for food lovers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
