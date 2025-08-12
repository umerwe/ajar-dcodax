import { useState } from "react";
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/categories";

interface CategoriesProps {
  _id?: string;
  name: string;
  slug?: string;
  icon?: string | { src: string };
}

const Categories = () => {
  const { data = [] } = useCategories();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchParams = useSearchParams();
  const params = useParams();

  const categoryParam = searchParams.get("category_id") || (params.category_id as string | null);

  const allCategory = { name: "All", slug: "all", icon: "/ai-logo.png" };
  const categories = [allCategory, ...data];

  const activeCategory =
    categoryParam && categories.find((c) => c._id === categoryParam) ?
      categories.find((c) => c._id === categoryParam)! :
      allCategory;

  const getHref = (category: CategoriesProps) => category.slug === "all" ? "/listing" : `/listing/${category._id}`;
  const isActive = (category: CategoriesProps) =>
    category.slug === "all" ? !categoryParam || categoryParam === "all" : categoryParam === category._id;

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 md:px-9 my-4">
      {/* Desktop */}
      <div className="hidden md:flex flex-wrap gap-3 flex-grow">
        {categories.map((cat, i) => {
          const active = isActive(cat);
          return (
            <Link
              key={i}
              href={getHref(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${active
                ? "text-aqua border-2 border-t-aqua border-r-aqua border-b-blue border-l-blue bg-transparent"
                : "bg-gray-100 text-gray-400 border border-transparent hover:border-aqua hover:text-aqua"
                }`}
            >
              <Image
                width={20}
                height={20}
                src={cat?.icon || "/ai-logo.png"}
                alt={`${cat.name} icon`}
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold">{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex-grow max-w-50 relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 
            rounded-lg border-2 bg-white hover:bg-gray-50 transition-colors
             duration-200 shadow-sm border-t-aqua border-r-aqua border-b-blue
              border-l-blue"
        >
          <div className="flex items-center gap-3">
            <Image
              width={20}
              height={20}
              src={activeCategory.icon || "/ai-logo.png"}
              alt={`${activeCategory.name} icon`}
              className="w-5 h-5"
            />
            <span className="text-sm font-semibold text-[#01c89b]">
              {activeCategory.name}
            </span>
          </div>
          <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="py-2">
              {categories.map((cat, i) => {
                const active = isActive(cat);
                return (
                  <Link
                    key={i}
                    href={getHref(cat)}
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${active
                      && "bg-blue-50 border-r-4 border-aqua text-aqua"
                      }`}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={cat?.icon || "/ai-logo.png"}
                      alt={`${cat.name} icon`}
                      className="w-5 h-5"
                    />
                    <span className={`text-sm font-medium text-gray-500 ${active && "text-aqua"} `}>
                      {cat.name}
                    </span>
                    {active && <div className="ml-auto w-2 h-2 rounded-full bg-aqua"></div>}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filter Button */}
      <div className="flex-shrink-0 ml-4">
        <button className="p-2 rounded-lg border-2 border-t-aqua border-r-aqua border-b-blue border-l-blue bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-aqua" />
        </button>
      </div>
    </div>
  );
};

export default Categories;
