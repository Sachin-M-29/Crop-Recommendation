'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  
  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link
  href="/"
  className="inline-block mt-8 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
>
  ← Back to Home
  </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-700">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          We'd love to hear from you! Whether you have a question, feedback, or just want to connect — drop us a message below.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              
              
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
             
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
             
                          required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
