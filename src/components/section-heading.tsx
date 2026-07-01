import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  tone?: 'dark' | 'light'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  tone = 'dark',
}: Props) {
  return (
    <Reveal
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow flex items-center gap-3', tone === 'light' && 'text-marble/50')}>
          <span className="h-px w-6 bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-3xl leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-[2.75rem]',
          tone === 'light' ? 'text-marble' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed text-pretty',
            tone === 'light' ? 'text-marble/60' : 'text-stone-muted',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
