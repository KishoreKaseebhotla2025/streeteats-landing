import Head from 'next/head';
import VendorCard from '../components/VendorCard';
import vendors from '../data/vendors.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Head>
        <title>StreetEats.ai</title>
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Discover Street Food Vendors
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Curated from YouTube and Instagram
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}
