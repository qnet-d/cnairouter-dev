/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Construction, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { Markdown } from '@/components/ui/markdown'
import { Skeleton } from '@/components/ui/skeleton'
import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAboutContent } from './api'

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isLikelyHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

function EmptyAboutState() {
  const { t } = useTranslation()

  return (
    <div className='mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6 py-12'>
      <div className='grid gap-4 lg:grid-cols-[1fr_0.9fr]'>
        <div className='space-y-4'>
          <p className='text-muted-foreground text-xs font-medium tracking-widest uppercase'>
            {t('About')}
          </p>
          <h1 className='text-3xl font-semibold tracking-tight md:text-5xl'>
            {t('A clearer public story for cnairouter')}
          </h1>
          <p className='text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base'>
            {t(
              'This page now serves as a trust and origin page for the project, rather than a fallback-only screen.'
            )}
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <Button render={<Link to='/pricing' />}>
              {t('Browse Models')}
              <ArrowRight />
            </Button>
            <Button variant='outline' render={<Link to='/enterprise' />}>
              {t('Enterprise')}
            </Button>
          </div>
        </div>

        <Card className='bg-card/80 border-border/60'>
          <CardHeader>
            <div className='bg-primary/8 text-primary mb-3 flex size-10 items-center justify-center rounded-xl border border-current/10'>
              <Construction />
            </div>
            <CardTitle>{t('Project identity')}</CardTitle>
            <CardDescription>
              {t(
                'The project keeps its existing identity, but the public presentation is now more product-oriented and easier to understand.'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <div className='flex items-center gap-3 rounded-xl border px-3 py-3 text-sm'>
              <ShieldCheck className='text-primary size-4 shrink-0' />
              {t('Transparent routing and billing story')}
            </div>
            <div className='flex items-center gap-3 rounded-xl border px-3 py-3 text-sm'>
              <Sparkles className='text-primary size-4 shrink-0' />
              {t('Clean public pages and high-signal analytics')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: getAboutContent,
  })

  const rawContent = data?.data?.trim() ?? ''
  const hasContent = rawContent.length > 0
  const isUrl = hasContent && isValidUrl(rawContent)
  const isHtml = hasContent && !isUrl && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout showMainContainer={false}>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    return (
      <PublicLayout showMainContainer={false}>
        <EmptyAboutState />
        <Footer />
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className='h-[calc(100vh-3.5rem)] w-full border-0'
          title={t('About')}
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false}>
      <div className='mx-auto max-w-6xl px-6 py-8 md:py-12'>
        {isHtml ? (
          <div
            className='prose prose-neutral dark:prose-invert max-w-none'
            dangerouslySetInnerHTML={{ __html: rawContent }}
          />
        ) : (
          <Markdown className='prose-neutral dark:prose-invert max-w-none'>
            {rawContent}
          </Markdown>
        )}
      </div>
      <Footer />
    </PublicLayout>
  )
}
