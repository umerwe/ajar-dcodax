"use client";

import { usePathname, useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { categories } from "@/data/categories";

export function useLayoutVisibility() {
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  
  const localePrefix = `/${locale}`;
  const normalizedPath =
    pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : pathname;

  const segments = normalizedPath.split("/").filter(Boolean);
  const basePath = `/${segments.slice(0, 2).join("/")}`; // e.g., /listing/room567
  
  const isHomePage = normalizedPath === "/";
  const isDetailPage = segments.length > 2; // e.g., /listing/veh341/C6F0Y3
  
  // Check if it's a category page - either from static categories or dynamic route params
  const isCategoryPage = 
    categories.some((cat) => cat.link === basePath) || 
    (segments[0] === "listing" && segments[1] && !isDetailPage) ||
    (segments[0] === "listing" && params.category);

  return {
    showCategories: (isCategoryPage || segments[0] === "listing") && !isDetailPage,
    showSearchBar: (isHomePage || isCategoryPage || segments[0] === "listing") && !isDetailPage,
  };
}
