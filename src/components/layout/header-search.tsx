'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

import { cn } from '@/lib/utils'

export function HeaderSearch({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) {
      setOpen(false)
      return
    }
    router.push(`/urunler?q=${encodeURIComponent(q)}`)
    setOpen(false)
    setQuery('')
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
      className="flex items-center"
    >
      <div
        className={cn(
          'overflow-hidden transition-[width,opacity] duration-300 ease-out',
          open ? 'w-40 opacity-100 sm:w-56' : 'w-0 opacity-0',
        )}
      >
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            if (!query.trim()) setOpen(false)
          }}
          placeholder="Ürün ara…"
          aria-label="Ürün ara"
          className={cn(
            'w-full border-b border-current/30 bg-transparent pb-1 text-sm outline-none placeholder:text-current/50',
            triggerClassName,
          )}
        />
      </div>
      <button
        type={open ? 'submit' : 'button'}
        onClick={() => {
          if (!open) setOpen(true)
        }}
        aria-label={open ? 'Ara' : 'Aramayı aç'}
        className={cn(
          'inline-flex size-9 items-center justify-center transition-colors',
          triggerClassName,
        )}
      >
        {open && !query ? <X className="size-5" /> : <Search className="size-5" />}
      </button>
    </form>
  )
}
