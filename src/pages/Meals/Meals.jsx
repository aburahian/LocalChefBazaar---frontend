import React, { useState } from "react";
import axios from "axios";
import Card from "../../components/Home/Card";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";


const Meals = () => {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "breakfast", "lunch", "dinner", "dessert"];

    const { data: meals = [], isLoading } = useQuery({
      queryKey: ['meals'],
      queryFn: async () => {
        const result = await axios(`${import.meta.env.VITE_API_URL}/meals`)
        return result.data
      },
    })

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;
    const matchesSearch = meal.foodName
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
if(isLoading)return<LoadingSpinner></LoadingSpinner>
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar Categories */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded shadow-md">
        <h2 className="font-bold text-xl mb-4">Categories</h2>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer px-3 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Meals Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <Card key={meal._id} meal={meal}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No meals found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Meals;
