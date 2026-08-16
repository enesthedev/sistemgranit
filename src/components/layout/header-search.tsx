'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, X, Loader2, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { searchProducts, suggestedProducts, type SearchHit } from '@/app/actions/search-products'
import { PayloadImage } from '@/components/media/payload-image'

function HitRow({ hit, onSelect }: { hit: SearchHit; onSelect: () => void }) {
  return (
    <li role="option" aria-selected={false}>
      <Link
        href={`/urunler/${hit.slug}`}
        onClick={onSelect}
        className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-marble-raised"
      >
        <span className="relative size-11 shrink-0 overflow-hidden rounded bg-secondary">
          <PayloadImage
            media={hit.cover}
            size="thumbnail"
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">{hit.title}</span>
          {hit.categoryName && (
            <span className="block truncate font-mono text-xs uppercase tracking-wide text-stone-muted">
              {hit.categoryName}
            </span>
          )}
        </span>
      </Link>
    </li>
  )
}

export function HeaderSearch({ transparent = false }: { transparent?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [results, setResults] = useState<SearchHit[]>([])
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchHit[]>([])

  const debounced = useDebouncedValue(value, 250)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const requestId = useRef(0)
  const loadedSuggestions = useRef(false)

  // Run the debounced search, ignoring out-of-order responses.
  useEffect(() => {
    const q = debounced.trim()
    if (q.length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    const id = ++requestId.current
    setLoading(true)
    searchProducts(q)
      .then((hits) => {
        if (id === requestId.current) setResults(hits)
      })
      .finally(() => {
        if (id === requestId.current) setLoading(false)
      })
  }, [debounced])

  // Lazy-load the default suggestions once, on first focus.
  const loadSuggestions = () => {
    if (loadedSuggestions.current) return
    loadedSuggestions.current = true
    suggestedProducts().then(setSuggestions)
  }

  // Close the panel when navigating to a new page (keep the input mounted).
  useEffect(() => {
    setFocused(false)
    setValue('')
  }, [pathname])

  // Close the panel on outside click / Escape.
  useEffect(() => {
    if (!focused) return
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setFocused(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocused(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [focused])

  const goToResults = () => {
    const q = value.trim()
    router.push(q ? `/urunler?q=${encodeURIComponent(q)}` : '/urunler')
  }

  const q = debounced.trim()
  const querying = q.length >= 2
  const showPanel = focused && (querying || suggestions.length > 0)

  return (
    <div ref={containerRef} className="relative flex items-center">
      <div
        className={cn(
          'flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors',
          transparent
            ? 'border-marble/30 bg-graphite/30 backdrop-blur-sm focus-within:border-marble/60'
            : 'border-vein bg-marble-raised focus-within:border-brand',
        )}
      >
        <Search className="size-4 shrink-0 opacity-70" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            setFocused(true)
            loadSuggestions()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') goToResults()
          }}
          placeholder="Ürün ara…"
          aria-label="Ürün ara"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="header-search-results"
          autoComplete="off"
          spellCheck={false}
          className={cn(
            'w-36 bg-transparent text-sm outline-none sm:w-56',
            transparent ? 'placeholder:text-marble/70' : 'placeholder:text-stone-muted',
          )}
        />
        {value && (
          <button
            type="button"
            aria-label="Aramayı temizle"
            onClick={() => {
              setValue('')
              inputRef.current?.focus()
            }}
            className="inline-flex size-5 shrink-0 items-center justify-center text-stone-muted transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showPanel && (
        <div
          id="header-search-results"
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-vein bg-marble text-foreground shadow-xl"
        >
          {querying ? (
            loading && results.length === 0 ? (
              <div className="flex items-center gap-2 px-4 py-6 text-sm text-stone-muted">
                <Loader2 className="size-4 animate-spin" />
                Aranıyor…
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-6 text-sm text-stone-muted">
                “{q}” için sonuç bulunamadı.
              </div>
            ) : (
              <ul className="max-h-[70vh] overflow-y-auto py-1">
                {results.map((hit) => (
                  <HitRow key={hit.id} hit={hit} onSelect={() => setFocused(false)} />
                ))}
              </ul>
            )
          ) : (
            <>
              <p className="px-4 pb-1 pt-3 font-mono text-xs uppercase tracking-[0.18em] text-stone-muted">
                Önerilen ürünler
              </p>
              <ul className="max-h-[70vh] overflow-y-auto py-1">
                {suggestions.map((hit) => (
                  <HitRow key={hit.id} hit={hit} onSelect={() => setFocused(false)} />
                ))}
              </ul>
            </>
          )}

          <button
            type="button"
            onClick={goToResults}
            className="flex w-full items-center justify-between gap-2 border-t border-vein px-4 py-2.5 text-sm font-medium text-stone-muted transition-colors hover:bg-marble-raised hover:text-foreground"
          >
            {querying ? `“${q}” için tüm sonuçlar` : 'Tüm ürünleri gör'}
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
