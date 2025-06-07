// pages/offline.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Offline - StreetEats.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
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
          <h1 className={styles.title}>You're Offline</h1>
          <p className={styles.description}>
            Looks like you've lost your internet connection. Don't worry - StreetEats.ai will be 
            here when you're back online to help you discover amazing street food!
          </p>
          
          <div className={styles.emailBox}>
            <button 
              onClick={handleRetry}
              className={styles.submitButton}
              style={{ marginTop: '2rem' }}
            >
              Try Again
            </button>
          </div>
        </main>
        
        <footer className={styles.footer}>
          © 2025 StreetEats.ai
        </footer>
      </div>
    </>
  );
}
