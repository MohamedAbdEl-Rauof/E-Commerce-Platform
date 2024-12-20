import { FaArrowRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  image: string;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          console.log(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      className={`mt-14 mb-10 grid gap-4 w-[90%] mx-auto ${
        categories.length <= 3
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {categories.map((category, index) => (
        <div
          key={category.id || index}
          className="relative overflow-hidden rounded-md group"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-60 object-cover transition-transform duration-300 transform group-hover:scale-105"
          />
          {/* Background overlay appears only on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category name and link always visible */}
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-lg font-bold text-white">{category.name}</h1>
            <u className="flex items-center mt-1 text-black font-bold cursor-pointer shad">
              <Link href="/pages/Shop">Shop Now</Link>
              <FaArrowRight className="ml-1" />
            </u>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Categories;
