import Image from "next/image";
import React from "react";

export default function EmailBuilder() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center justify-center">
          <button className="bg-gray-500/30 px-4 py-2 rounded-xl text-black hover:bg-gray-500 hover:text-white transition">
            Add Logo
          </button>
          <div className="py-10 flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Email has never been easier
            </h1>
            <p className="text-sm sm:text-base lg:text-lg max-w-3xl">
              Create beautiful and sophisticated emails in minutes with minimal
              setup. The way email should be.
            </p>
            <section className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-4">
              <button className="px-4 py-2 w-full sm:w-auto rounded-xl text-white bg-black hover:bg-gray-800 transition">
                Get Started
              </button>
              <button className="border-2 px-4 py-2 w-full sm:w-auto rounded-xl hover:bg-gray-100 transition">
                Learn more
              </button>
            </section>

            <section className="py-10 w-full flex justify-center">
              <Image
                width={700}
                height={700}
                src="/person-with-laptop.jpg"
                alt="email-marketting"
                className="rounded-xl max-w-full h-auto"
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
