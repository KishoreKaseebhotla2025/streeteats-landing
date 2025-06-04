import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>StreetEats.ai – Coming Soon</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="bg-white text-[#222] font-[Montserrat]">
        {/* Header Section */}
        <section className="w-full py-[40px] px-[20px] text-center bg-[#fff8f0] border-none">
          <img
            src="/streeteats-logo.png"
            alt="StreetEats.ai pin logo with food cart"
            className="mx-auto max-w-[200px] h-auto"
          />
        </section>

        {/* Main Section */}
        <section className="w-full py-[40px] px-[20px] text-center border-t border-[#eee]">
          <h1 className="text-[2.5rem] mb-4 font-bold">StreetEats.ai</h1>
          <p className="text-[1.1rem] max-w-[600px] mx-auto mb-8">
            India’s tastiest street food discovery app is cooking! We're mapping vendors, stories,
            and flavors — right from the streets to your screen.
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
              className="px-4 py-[0.7rem] rounded border border-gray-300 w-[250px] max-w-full"
            />
            <button
              type="submit"
              className="px-[1.2rem] py-[0.7rem] bg-[#ff7a00] text-white font-bold rounded"
            >
              Notify Me
            </button>
          </form>
        </section>

        {/* Social Section */}
        <section className="w-full py-[40px] px-[20px] text-center bg-[#fef3e7] border-t border-[#eee]">
          <p className="font-bold mb-4">Follow us</p>
          <div className="flex justify-center gap-[30px] items-center">
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
        <footer className="text-sm text-[#999] bg-[#fff8f0] text-center py-5 border-t border-[#eee]">
          © 2025 StreetEats.ai
        </footer>
      </main>
    </>
  )
}
