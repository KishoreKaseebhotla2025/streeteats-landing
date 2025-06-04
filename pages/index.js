import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://formspree.io/f/xeokqjdk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>StreetEats.ai – Coming Soon</title>
        <meta name="description" content="India's tastiest street food discovery app is cooking! We're mapping vendors, stories, and flavors — right from the streets to your screen." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
      </Head>

      <main>
        {/* Header */}
        <div className="section header-section">
          <Image 
            src="/streeteats-logo.png" 
            alt="StreetEats.ai pin logo with food cart" 
            width={200}
            height={100}
            priority
          />
        </div>

        {/* Main Content */}
        <div className="section main-section">
          <h1>StreetEats.ai</h1>
          <p>India's tastiest street food discovery app is cooking! We're mapping vendors, stories, and flavors — right from the streets to your screen.</p>
          
          <div className="email-box">
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Notify Me'}
              </button>
            </form>
            
            {submitStatus === 'success' && (
              <p className="success-message">Thank you! We'll notify you when we launch.</p>
            )}
            {submitStatus === 'error' && (
              <p className="error-message">Sorry, there was an error. Please try again.</p>
            )}
          </div>
        </div>

        {/* Social Section */}
        <div className="section social-section">
          <p style={{ fontWeight: 'bold' }}>Follow us</p>
          <a href="https://www.instagram.com/streeteats.ai/" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
              alt="Instagram" 
              width={40} 
              height={40} 
            />
          </a>
          <a href="https://www.youtube.com/@StreetEatsAI" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
              alt="YouTube" 
              width={55} 
              height={40} 
            />
          </a>
        </div>

        {/* Footer */}
        <div className="footer">© 2025 StreetEats.ai</div>
      </main>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          background: #ffffff;
          color: #222;
          padding: 0;
        }

        .section {
          width: 100%;
          padding: 40px 20px;
          text-align: center;
          border-top: 1px solid #eee;
        }

        .header-section {
          background-color: #fff8f0;
          border: none;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 2rem auto;
        }

        .email-box input[type="email"] {
          padding: 0.7rem;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 250px;
          max-width: 100%;
          margin-right: 10px;
        }

        .email-box input[type="email"]:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .email-box button {
          padding: 0.7rem 1.2rem;
          border-radius: 5px;
          border: none;
          background-color: #ff7a00;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .email-box button:hover:not(:disabled) {
          background-color: #e66a00;
        }

        .email-box button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          color: #28a745;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .error-message {
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .social-section {
          background-color: #fef3e7;
        }

        .social-section a {
          vertical-align: middle;
          margin: 0 15px;
        }

        .footer {
          padding: 20px;
          font-size: 0.85rem;
          color: #999;
          background-color: #fff8f0;
          border-top: 1px solid #eee;
          text-align: center;
        }

        @media (max-width: 768px) {
          .email-box input[type="email"] {
            width: 200px;
            margin-bottom: 10px;
          }
          
          .email-box button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
