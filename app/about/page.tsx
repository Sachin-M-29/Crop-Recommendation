import Link from "next/link";

export default function About() {
  return (

    
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-12">
        <Link
          href="/"
          className="inline-block mt-8 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
        >
          ← Back to Home
          </Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
          About Us
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our <span className="font-semibold">Crop Recommendation System</span>! <p>We&apos;re building something awesome.</p> experts and technology enthusiasts dedicated to transforming farming with smart, data-driven tools.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our system analyzes key factors like soil type, weather patterns, and regional data to provide personalized crop suggestions that maximize yield and sustainability.
        </p>
       
        <p className="text-lg leading-relaxed">
          Join us in making agriculture more efficient, informed, and future-ready.
        </p>
      </div>
    </div>
  );
}
