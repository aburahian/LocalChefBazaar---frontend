import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fresh & Homemade",
      description: "Enjoy meals prepared with love and fresh ingredients, just like home.",
      icon: "🥗",
    },
    {
      title: "Support Local Chefs",
      description: "Empower local home cooks and discover hidden culinary gems in your area.",
      icon: "👩‍🍳",
    },
    {
      title: "Fast Delivery",
      description: "Get your favorite home-cooked meals delivered to your doorstep quickly.",
      icon: "🚚",
    },
    {
      title: "Secure Payments",
      description: "Experience hassle-free and secure transactions with our reliable payment system.",
      icon: "🔒",
    },
  ];

  return (
    <div className="py-12 bg-[#FFF8F0] rounded-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight mb-4">
          Why Choose LocalChefBazaar?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We bring the warmth of home-cooked meals directly to your table while supporting the community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center"
          >
            <div className="text-5xl mb-4 bg-lime-100 p-4 rounded-full w-20 h-20 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
