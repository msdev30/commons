"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for dark mode preference
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(darkMode)
  }, [])

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            isDark
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg.jpg-GMCOdVzCMOjUZ7g8Trht0uazdNggau.jpeg"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg.jpg-wq7tqQXMMBl09Mx7jq32B3VKKA1nR0.jpeg"
          }
          alt="404 Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 404 Layered Text */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative w-96 h-48">
          {/* Layer 1 - "4" */}
          <div className="absolute inset-0">
            <Image
              src={
                isDark
                  ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer01-q4YhITIQUdMYjwP483cs5XcuLLTxLw.png"
                  : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer01-186E1rKp2GhUrzNzMyfsUQlp9usG00.png"
              }
              alt="404 Layer 1"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Layer 2 - "0" */}
          <div className="absolute inset-0">
            <Image
              src={
                isDark
                  ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer02-G7fIWo2ioNnD3ZFpscIBA8dEHsPeaU.png"
                  : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer02-7z8pII01XEKgUKXeXXXTVBbBscHqPT.png"
              }
              alt="404 Layer 2"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Layer 3 - "4" */}
          <div className="absolute inset-0">
            <Image
              src={
                isDark
                  ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer03-kBSXLq5bsLqWcZ6sBufNNZFOimR695.png"
                  : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer03-NYlOK8gFEcI1geSRuhZRDpntfYd5L2.png"
              }
              alt="404 Layer 3"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 text-center z-20">
        {/* Erudyte Commons Logo */}
        <div className="mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/erudyte-logo-dmm3SiboydR6bY9VBh0oBhFVLLmBhS.png"
            alt="Erudyte Commons"
            width={300}
            height={60}
            className="mx-auto"
          />
        </div>

        <h1 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Page Not Found</h1>

        <p className={`text-lg mb-8 max-w-md mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Sorry, we couldn't find the educational resource you're looking for. Let's get you back to learning!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Home
          </Link>

          <Link
            href="/search"
            className={`border-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isDark
                ? "border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900"
                : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            Search Courses
          </Link>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`mt-8 p-2 rounded-full transition-colors duration-200 ${
            isDark ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  )
}
