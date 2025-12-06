import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl glass">
        <h1 className="text-3xl font-bold text-white mb-4">Registration Form</h1>
        <p className="text-white/80 mb-6">A demo multi-tab registration UI built with Next.js (App Router) + TailwindCSS.</p>
        <Link href="/register" className="inline-block px-5 py-2 rounded-lg bg-white/20 text-white">Open Registration</Link>
      </div>
    </main>
  )
}
