import React, { useState } from "react";
import axios from "axios";
import Card from "../../components/Home/Card";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Meals = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = ["all", "breakfast", "lunch", "dinner", "dessert"];

  const { data, isLoading } = useQuery({
    queryKey: ['meals', currentPage, search, selectedCategory],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/meals`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: search,
          category: selectedCategory
        }
      });
      return result.data;
    },
    keepPreviousData: true,
  });

  const meals = data?.meals || [];
  const totalPages = data?.totalPages || 1;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1); 
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen">
      {/* Sidebar Categories */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-24 border border-gray-100">
        <h2 className="font-bold text-xl mb-6 text-gray-800">Categories</h2>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer px-4 py-3 rounded-xl transition-all font-medium ${selectedCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-gray-100 text-gray-600"
                }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4 text-gray-800">Search</h2>
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Meals Grid & Pagination */}
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <Card key={meal._id} meal={meal} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl font-semibold text-gray-600">No meals found.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or category.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-auto py-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              <AiOutlineLeft className="w-5 h-5" />
            </button>

            <span className="font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              <AiOutlineRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;
