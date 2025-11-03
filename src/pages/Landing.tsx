import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Globe, MessageSquare, ChevronsRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🇹🇹 Jogania</h1>
        <nav className="flex items-center gap-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link to="/signup" className="px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full font-semibold hover:opacity-90 transition shadow-lg">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
        {/* Background Particles */}
        <div className="absolute inset-0 z-0">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="hero-title mb-6">
            The AI Platform for Trinidad & Tobago Businesses
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Instantly train an AI on your business data and deploy it to WhatsApp or your website.
            Automate customer service, generate leads, and save time.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full font-bold text-lg hover:opacity-90 transition shadow-2xl flex items-center gap-3"
            >
              Start Your Free Trial
              <ChevronsRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-gray-700/50 border border-gray-600 rounded-full font-bold text-lg hover:bg-gray-700 transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">Why Businesses Choose Jogania</h3>
          <p className="text-lg text-gray-400 mb-12">
            We're built for the unique needs of the Caribbean market.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8">
              <MessageSquare className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
              <h4 className="text-2xl font-semibold mb-2">WhatsApp First</h4>
              <p className="text-gray-400">
                Deploy your AI agent directly to WhatsApp, where your customers are most active.
              </p>
            </div>
            <div className="glass p-8">
              <Zap className="w-12 h-12 text-teal-400 mb-4 mx-auto" />
              <h4 className="text-2xl font-semibold mb-2">Instant Training</h4>
              <p className="text-gray-400">
                Simply provide your website URL, and our AI will learn everything about your business in minutes.
              </p>
            </div>
            <div className="glass p-8">
              <Globe className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h4 className="text-2xl font-semibold mb-2">Proudly Local</h4>
              <p className="text-gray-400">
                Designed for Trinidad & Tobago, with local support and an understanding of our unique market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Jogania. Built with ❤️ in Port of Spain, Trinidad & Tobago.</p>
      </footer>
    </div>
  );
}
