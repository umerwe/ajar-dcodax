import { useState, useRef, useEffect, MutableRefObject } from "react";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useCategories } from "@/hooks/categories";

interface Category {
  _id?: string;
  name: string;
  slug?: string;
  icon?: string | { src: string };
}

const Categories = () => {
  const { data = [] }: { data?: Category[] } = useCategories();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = useLocale();

  const localePrefix = `/${locale}`;
  const normalizedPathname =
    pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : pathname;

  const categoryParam =
    searchParams.get("category_id") || (params.category_id as string | null);

  const allCategory: Category = {
    name: "All",
    slug: "all",
    icon: "/all-icon.svg",
  };

  const categoriesWithAll: Category[] = [allCategory, ...data];

  const activeCategory: Category = (() => {
    if (categoryParam) {
      const foundCategory = categoriesWithAll.find(
        (item) => item._id === categoryParam
      );
      return foundCategory || allCategory;
    }
    if (
      normalizedPathname === "/" ||
      normalizedPathname === "/listing" ||
      !categoryParam
    ) {
      return allCategory;
    }
    return allCategory;
  })();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = () => {
    setIsDropdownOpen(false);
  };

  const getCategoryHref = (category: Category) => {
    if (category.slug === "all") {
      return "/listing";
    }
    return `/listing/${category._id}`;
  };

  const isCategoryActive = (category: Category) => {
    if (category.slug === "all") {
      return !categoryParam || categoryParam === "all";
    }
    return categoryParam === category._id;
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 md:px-9 my-4">
      {/* Desktop */}
      <div className="hidden md:flex flex-wrap gap-3 flex-grow">
        {categoriesWithAll.map((item, index) => {
          const isActive = isCategoryActive(item);
          const isAllCategory = item.slug === "all";

          return (
            <Link
              key={index}
              href={getCategoryHref(item)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                isActive
                  ? isAllCategory
                    ? "text-[#01c89b] border-2 border-t-[#01c89b] border-r-[#01c89b] border-b-[#059afc] border-l-[#059afc] bg-transparent"
                    : "text-cyan-500 border-2 border-cyan-400 bg-cyan-50"
                  : "bg-gray-100 text-gray-400 border border-transparent hover:border-[#01c89b] hover:text-[#01c89b]"
              }`}
            >
              <Image
                width={20}
                height={20}
                src={
                  typeof item.icon === "string"
                    ? item.icon
                    : item.icon?.src || "/placeholder.svg"
                }
                alt={`${item.name} icon`}
                className={`w-5 h-5 ${
                  isActive
                    ? isAllCategory
                      ? "filter-[#01c89b]"
                      : "filter-cyan"
                    : "text-gray-500"
                }`}
                style={
                  isActive
                    ? isAllCategory
                      ? {
                          filter:
                            "hue-rotate(160deg) saturate(1.5) brightness(1.2)",
                        }
                      : {
                          filter:
                            "hue-rotate(180deg) saturate(1.2) brightness(1.1)",
                        }
                    : {}
                }
              />
              <span className="text-sm font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile */}
      <div
        className="md:hidden flex-grow max-w-50 relative"
        ref={dropdownRef as MutableRefObject<HTMLDivElement>}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center justify-between gap-3 px-5 py-3 rounded-lg border-2 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm ${
            activeCategory.slug === "all"
              ? "border-t-[#01c89b] border-r-[#01c89b] border-b-[#059afc] border-l-[#059afc]"
              : "border-cyan-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <Image
              width={20}
              height={20}
              src={
                typeof activeCategory.icon === "string"
                  ? activeCategory.icon
                  : activeCategory.icon?.src || "/placeholder.svg"
              }
              alt={`${activeCategory.name} icon`}
              className="w-5 h-5"
              style={
                activeCategory.slug === "all"
                  ? {
                      filter:
                        "hue-rotate(160deg) saturate(1.5) brightness(1.2)",
                    }
                  : {
                      filter:
                        "hue-rotate(180deg) saturate(1.2) brightness(1.1)",
                    }
              }
            />
            <span
              className={`text-sm font-semibold ${
                activeCategory.slug === "all"
                  ? "text-[#01c89b]"
                  : "text-cyan-500"
              }`}
            >
              {activeCategory.name}
            </span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="py-2">
              {categoriesWithAll.map((item, index) => {
                const isActive = isCategoryActive(item);
                const isAllCategory = item.slug === "all";

                return (
                  <Link
                    key={index}
                    href={getCategoryHref(item)}
                    onClick={handleCategorySelect}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                      isActive
                        ? isAllCategory
                          ? "bg-blue-50 border-r-4 border-[#01c89b] text-[#01c89b]"
                          : "bg-cyan-50 border-r-4 border-cyan-400 text-cyan-500"
                        : ""
                    }`}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={
                        typeof item.icon === "string"
                          ? item.icon
                          : item.icon?.src || "/placeholder.svg"
                      }
                      alt={`${item.name} icon`}
                      className="w-5 h-5"
                      style={
                        isActive
                          ? isAllCategory
                            ? {
                                filter:
                                  "hue-rotate(160deg) saturate(1.5) brightness(1.2)",
                              }
                            : {
                                filter:
                                  "hue-rotate(180deg) saturate(1.2) brightness(1.1)",
                              }
                          : {}
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? isAllCategory
                            ? "text-[#01c89b]"
                            : "text-cyan-500"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <div
                        className={`ml-auto w-2 h-2 rounded-full ${
                          isAllCategory ? "bg-[#01c89b]" : "bg-cyan-400"
                        }`}
                      ></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filter Icon */}
      <div className="flex-shrink-0 ml-4">
        <button className="p-2 rounded-lg border-2 border-t-[#01c89b] border-r-[#01c89b] border-b-[#059afc] border-l-[#059afc] bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-[#01c89b]" />
        </button>
      </div>
    </div>
  );
};

export default Categories;
