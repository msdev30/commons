"use client"
import type * as React from "react"
import Link from "next/link"

export default function DetailLayout({
  breadcrumb,
  title,
  subtitle,
  meta,
  actions,
  children,
  related,
}: {
  breadcrumb: { label: string; href: string }
  title: string
  subtitle?: string
  meta?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  related?: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-2">
          <Link href={breadcrumb.href} className="text-sm text-gray-600 hover:underline">
            ← {breadcrumb.label}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          {(meta || actions) && (
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {meta && <div className="text-sm text-gray-600">{meta}</div>}
              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>
          )}
        </div>

        <article className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">{children}</article>

        {related && (
          <section className="pb-8">
            <h2 className="text-lg font-semibold mb-3">Related</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{related}</div>
          </section>
        )}
      </main>
    </div>
  )
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-1 text-xs font-semibold">
      {children}
    </span>
  )
}

export function PrimaryBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
    />
  )
}
export function SecondaryLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50"
    />
  )
}
