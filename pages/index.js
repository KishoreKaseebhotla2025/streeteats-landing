// pages/index.js
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const SearchableVendorMap = dynamic(() => import('../components/SearchableVendorMap'), { 
  ssr: false,
  loading: () => <div className={styles.mapContainer} style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>
});

export default function HomePage() {
  useEffect(() => {
    // Set body styles
    if (typeof document !== 'undefined') {
      document.body.style.margin = '0';
      document.body.style.fontFamily = `'Montserrat', sans-serif`;
      document.body.style.background = '#ffffff';
      document.body.style.color = '#222';
      document.body.style.padding = '0';
    }

    // Register service worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>StreetEats.ai – Coming Soon to your favorite city!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#ff7a00" />
        <meta name="description" content="India's tastiest street food discovery app. We're mapping vendors, stories, and flavors from the streets to your screen." />
        
        {/* PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StreetEats.ai" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ff7a00" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <div className={styles.container}>
        <header className={styles.headerSection}>
          <img
            src="/streeteats-logo.png"
            alt="StreetEats.ai pin logo with food cart"
            className={styles.logo}
          />
        </header>
        
        <main className={styles.mainSection}>
          <h1 className={styles.title}>StreetEats.ai</h1>
          <p className={styles.description}>
            India's tastiest street food discovery app is cooking! We're mapping vendors, stories,
            and flavors — right from the streets to your screen.
          </p>
          
          <div className={styles.mapContainer}>
            <SearchableVendorMap />
          </div>
          
          <div className={styles.emailBox}>
            <form action="https://formspree.io/f/xeokqjdk" method="POST" className={styles.emailForm}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className={styles.emailInput}
              />
              <button type="submit" className={styles.submitButton}>
                Notify Me
              </button>
            </form>
          </div>
        </main>
        
        <section className={styles.socialSection}>
          <p className={styles.followText}>Follow us</p>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/streeteats.ai/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className={styles.socialIcon}
              />
            </a>
            <a href="https://x.com/StreetEatsAI" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
                alt="X (Twitter)"
                className={styles.socialIcon}
              />
            </a>
            <a href="https://www.youtube.com/@StreetEatsAI" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                alt="YouTube"
                className={`${styles.socialIcon} ${styles.youtubeIcon}`}
              />
            </a>
          </div>
        </section>
        
        <footer className={styles.footer}>
          © 2025 StreetEats.ai
        </footer>
      </div>
    </>
  );
}
