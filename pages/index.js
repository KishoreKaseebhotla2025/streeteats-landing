import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const VendorCard = dynamic(() => import('../components/VendorCard'), { ssr: false })

export default function Home() {
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    import('../data/vendors.json').then((mod) => {
      setVendors(mod.default)
    })
  }, [])

  return (
    <main className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-8">
        StreetEats.ai (Dev Preview)
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {vendors.map((vendor, index) => (
          <VendorCard key={index} vendor={vendor} />
        ))}
      </div>
    </main>
  )
}
