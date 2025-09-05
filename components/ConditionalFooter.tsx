'use client'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')
  
  // Hide footer on auth pages (signin/signup), show on all other pages
  if (isAuthPage) return null
  return <Footer />
}