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
    queryKey: ["meals", currentPage, search, selectedCategory],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search,
            category: selectedCategory,
          },
        }
      );
      return res.data;
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto">
      {/* Mobile Filters */}
      <div className="md:hidden mb-6 space-y-4">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-1/4 bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-24 border border-gray-100">
          <h2 className="font-bold text-xl mb-6 text-gray-800">
            Categories
          </h2>

          <ul className="flex flex-col gap-2">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`cursor-pointer px-4 py-3 rounded-xl transition-all font-medium ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="font-bold text-xl mb-4 text-gray-800">
              Search
            </h2>
            <input
              type="text"
              placeholder="Search meals..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </aside>

        {/* Meals Grid */}
        <main className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <Card key={meal._id} meal={meal} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl font-semibold text-gray-600">
                  No meals found
                </p>
                <p className="text-gray-400 mt-2">
                  Try another category or keyword
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-auto">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-full bg-white border border-gray-200 disabled:opacity-50"
              >
                <AiOutlineLeft />
              </button>

              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full bg-white border border-gray-200 disabled:opacity-50"
              >
                <AiOutlineRight />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Meals;
