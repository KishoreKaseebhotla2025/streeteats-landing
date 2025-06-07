// pages/index.js
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';

const SearchableVendorMap = dynamic(() => import('../components/SearchableVendorMap'), { ssr: false });

export default function HomePage() {
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.fontFamily = `'Montserrat', sans-serif`;
    document.body.style.background = '#ffffff';
    document.body.style.color = '#222';
    document.body.style.padding = 0;
  }, []);

  return (
    <>
      <Head>
        <title>StreetEats.ai – Coming Soon to your favorite city!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="section header-section bg-orange-100 text-center py-8">
        <img
          src="/streeteats-logo.png"
          alt="StreetEats.ai pin logo with food cart"
          className="mx-auto max-w-xs h-auto"
        />
      </div>

      <div className="section main-section text-center px-4">
        <h1 className="text-4xl font-bold mb-4">StreetEats.ai</h1>
        <p className="text-lg max-w-xl mx-auto mb-8">
          India’s tastiest street food discovery app is cooking! We're mapping vendors, stories,
          and flavors — right from the streets to your screen.
        </p>

        <SearchableVendorMap />

        <div className="email-box text-center mt-8">
          <form action="https://formspree.io/f/xeokqjdk" method="POST" className="flex flex-wrap justify-center gap-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2 border border-gray-300 rounded w-64 max-w-full"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>

      <div className="section social-section bg-orange-50 text-center py-6">
        <p className="font-bold text-lg mb-4">Follow us</p>
        <div className="inline-flex gap-6 justify-center items-center">
          <a href="https://www.instagram.com/streeteats.ai/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-10 h-10 hover:scale-110 hover:opacity-80 transition-transform duration-300 cursor-pointer"
            />
          </a>
          <a href="https://www.youtube.com/@StreetEatsAI" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube"
              className="w-[55px] h-10 hover:scale-110 hover:opacity-80 transition-transform duration-300 cursor-pointer"
            />
          </a>
          <a href="https://x.com/StreetEatsAI" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023.svg"
              alt="Twitter / X"
              className="w-10 h-10 hover:scale-110 hover:opacity-80 transition-transform duration-300 cursor-pointer"
            />
          </a>
        </div>
      </div>

      <div className="footer py-4 text-sm text-gray-500 bg-orange-100 border-t border-gray-200 text-center">
        © 2025 StreetEats.ai
      </div>
    </>
  );
}
