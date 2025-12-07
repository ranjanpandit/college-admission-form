"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          ABC College
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Menu Items */}
        <div
          className={`md:flex gap-8 font-medium text-gray-700 absolute md:static left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 transition-all ${
            open ? "top-16" : "top-[-400px]"
          }`}
        >
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/courses" className="hover:text-blue-600">
            Courses
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>

          <Link
            href="/register" target="new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 md:ml-4"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
