import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Lacoste', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Lacoste_logo.svg' },
  { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_Logo.svg' },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Premium Brands, Delivered to You
        </h1>

        <p className="text-gray-600 max-w-xl mb-6">
          We purchase authentic products from official stores and deliver them to your door.
          No hassle, no risk — just premium shopping made simple.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>

          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </section>

      {/* 🔥 BRAND LOGOS (ANIMATED) */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-6">
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Trusted Brands We Work With
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear',
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[120px] opacity-70 hover:opacity-100 transition"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">100% Authentic</h3>
          <p className="text-gray-600 text-sm">
            We only buy from official brand websites.
          </p>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">We Handle Everything</h3>
          <p className="text-gray-600 text-sm">
            Ordering, payment, and delivery — all done for you.
          </p>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Get your items quickly and safely.
          </p>
        </Card>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">1. Choose Product</h4>
              <p className="text-gray-600 text-sm">
                Send us the product link from official websites.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. We Purchase</h4>
              <p className="text-gray-600 text-sm">
                We buy it for you securely.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. We Deliver</h4>
              <p className="text-gray-600 text-sm">
                Delivered directly to your address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">
          Start Shopping Smarter Today
        </h2>

        <p className="text-gray-600 mb-6">
          Access premium international brands with ease.
        </p>

        <Link to="/register">
          <Button size="lg">Create Account</Button>
        </Link>
      </section>

    </div>
  );
};

export default HomePage;