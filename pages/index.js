// pages/index.js
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';

const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

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

      <div className="section header-section">
        <img
          src="/assets/streeteats-logo.png"
          alt="StreetEats.ai pin logo with food cart"
          style={{ maxWidth: '200px', height: 'auto' }}
        />
      </div>

      <div className="section main-section">
        <h1 style={{ fontSize: '2.6rem', marginBottom: '1rem' }}>StreetEats.ai</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem auto' }}>
          India’s tastiest street food discovery app is cooking! We're mapping vendors, stories,
          and flavors — right from the streets to your screen.
        </p>

        <div style={{ height: 500, margin: '2rem auto', maxWidth: 960 }}>
          <LeafletMap />
        </div>

        <div className="email-box">
          <form action="https://formspree.io/f/xeokqjdk" method="POST">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                padding: '0.7rem',
                borderRadius: 5,
                border: '1px solid #ccc',
                width: 250,
                marginRight: 10,
                maxWidth: '100%'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.7rem 1.2rem',
                borderRadius: 5,
                border: 'none',
                backgroundColor: '#ff7a00',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>

      <div className="section social-section" style={{ backgroundColor: '#fef3e7' }}>
        <p style={{ fontWeight: 'bold' }}>Follow us</p>
        <a href="https://www.instagram.com/streeteats.ai/" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            width="40"
            height="40"
            style={{ margin: '0 15px' }}
          />
        </a>
        <a href="https://www.youtube.com/@StreetEatsAI" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            width="55"
            height="40"
            style={{ margin: '0 15px' }}
          />
        </a>
      </div>

      <div className="footer" style={{
        padding: 20,
        fontSize: '0.85rem',
        color: '#999',
        backgroundColor: '#fff8f0',
        borderTop: '1px solid #eee',
        textAlign: 'center'
      }}>
        © 2025 StreetEats.ai
      </div>
    </>
  );
}
