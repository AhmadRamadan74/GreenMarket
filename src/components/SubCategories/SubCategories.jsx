import React from "react";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function SubCategories() {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const categoryName = location.state?.categoryName || "Category";

  async function getSubCategories() {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    return response.data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["subCategories", categoryId],
    queryFn: getSubCategories,
    enabled: !!categoryId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading subcategories</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-green-600 transition"
        >
          <i className="fas fa-arrow-left text-2xl"></i>
        </button>
        <h1 className="text-4xl font-bold text-gray-800">
          {categoryName} <span className="text-green-600">Subcategories</span>
        </h1>
      </div>

      {/* Subcategories Grid */}
      {data?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.data.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
            >
              <div className="flex items-center justify-center h-32 mb-4">
                <i className="fas fa-tag text-6xl text-green-500"></i>
              </div>
              <h3 className="text-center text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
                {sub.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-xl">No subcategories found for this category</p>
        </div>
      )}
    </div>
  );
}