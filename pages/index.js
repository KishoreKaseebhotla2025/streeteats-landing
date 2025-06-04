// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>StreetEats.ai – Coming Soon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="font-[Montserrat] text-[#222] bg-white">
        {/* Header */}
        <section className="w-full py-10 bg-[#fff8f0] text-center">
          <img src="/streeteats-logo.png" alt="StreetEats.ai logo" className="mx-auto max-w-[200px]" />
        </section>

        {/* Main Section */}
        <section className="w-full py-12 px-6 text-center border-t border-gray-200">
          <h1 className="text-4xl font-bold mb-4">StreetEats.ai</h1>
          <p className="text-lg max-w-xl mx-auto mb-6">
            India’s tastiest street food discovery app is cooking! We're mapping vendors,
            stories, and flavors — right from the streets to your screen.
          </p>
          <form
            action="https://formspree.io/f/xeokqjdk"
            method="POST"
            className="flex flex-col sm:flex-row justify-center items-center gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="px-4 py-2 rounded border border-gray-300 w-[250px] max-w-full"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#ff7a00] text-white font-bold rounded"
            >
              Notify Me
            </button>
          </form>
        </section>

        {/* Social Section */}
        <section className="w-full py-10 text-center bg-[#fef3e7] border-t border-gray-200">
          <p className="font-semibold mb-4">Follow us</p>
          <div className="flex justify-center gap-6">
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
        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-gray-500 bg-[#fff8f0] border-t border-gray-200">
          © 2025 StreetEats.ai
        </footer>
      </main>
    </>
  )
}
