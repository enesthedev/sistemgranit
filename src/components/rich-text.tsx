import type { ComponentProps } from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

type RichTextData = ComponentProps<typeof LexicalRichText>['data']

export function RichText({
  data,
  className,
}: {
  data?: RichTextData | null
  className?: string
}) {
  if (!data) return null
  return <LexicalRichText data={data} className={cn('rich-text', className)} />
}
