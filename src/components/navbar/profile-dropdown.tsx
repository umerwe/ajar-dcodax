"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LogoutButton from "../auth/logout-btn";

const profileMenuItems = [
  { label: "View profile", href: "/profile" },
  { label: "Profile Settings", href: "/profile/settings" },
  { label: "Rental History", href: "/rental-history" },
  { label: "Notification", href: "/notifications" },
  { label: "Chat", href: "/chat" },
  { label: "Emergency Assistance", href: "/emergency" },
  { label: "Help Center", href: "/help-center" },
  { label: "Reports", href: "/reports/report-issue" },
  { label: "Security Settings", href: "/security" }
];

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        ref={buttonRef}
        className="flex items-center bg-white rounded-full pl-3 pr-2 py-1 space-x-2 w-fit hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
      >
        <BellIcon className="h-5 w-5 text-green-500" />
        <Image
          src="/profile-img.webp"
          alt="User Avatar"
          className="rounded-full"
          width={28}
          height={28}
          onClick={toggleDropdown}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 md:w-64"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/profile-img.webp"
                  alt="Olivia Rhye"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Olivia Rhye</p>
                <p className="text-xs text-gray-500 truncate">olivia@untitledui.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {profileMenuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm transition-colors duration-150 
                     text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
