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
import { Link } from '@tanstack/react-router'
import {
  BadgeCheck,
  BarChart3,
  Building2,
  CreditCard,
  Route,
  Shield,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Footer } from '@/components/layout/components/footer'
import { PublicLayout } from '@/components/layout/components/public-layout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Enterprise() {
  const { t } = useTranslation()

  const capabilities = [
    {
      icon: Route,
      title: t('Routing abstraction'),
      description: t(
        'Present OpenAI-compatible, Anthropic, Gemini, open-weight, and multimodal providers through one stable API surface.'
      ),
    },
    {
      icon: Shield,
      title: t('Governance and access'),
      description: t(
        'Combine quotas, user roles, API keys, passkeys, and risk controls in the same product surface.'
      ),
    },
    {
      icon: BarChart3,
      title: t('Usage intelligence'),
      description: t(
        'Surface pricing, adoption, usage logs, rankings, and channel health as first-class product features.'
      ),
    },
    {
      icon: CreditCard,
      title: t('Flexible billing story'),
      description: t(
        'Support transparent markup, recharge flows, subscriptions, enterprise billing, and operational cost monitoring.'
      ),
    },
  ]

  const trustItems = [
    t('Self-hosted friendly'),
    t('Team and tenant aware'),
    t('OpenAI-compatible entrypoints'),
    t('Operational analytics built in'),
  ]

  return (
    <PublicLayout showMainContainer={false}>
      <section className='px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-8 lg:grid-cols-[1.15fr_0.85fr]'>
            <div>
              <div className='mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur'>
                <Building2 className='size-3.5' />
                {t('Enterprise')}
              </div>
              <h1 className='text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-semibold tracking-tight'>
                {t('Give teams one controlled gateway for every AI model API')}
              </h1>
              <p className='text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed md:text-base'>
                {t(
                  'cnairouter can front multiple providers, centralize access control, expose transparent model discovery, and give operators a clean place to watch spend, traffic, and reliability.'
                )}
              </p>
              <div className='mt-7 flex flex-wrap gap-3'>
                <Button render={<Link to='/sign-up' />}>
                  {t('Create API key')}
                </Button>
                <Button variant='outline' render={<Link to='/pricing' />}>
                  {t('Browse Models')}
                </Button>
              </div>
            </div>

            <Card className='bg-card/80 border-border/60 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle>{t('Enterprise-ready without hiding the developer flow')}</CardTitle>
                <CardDescription>
                  {t(
                    'Personal developers can start with one key, while teams can layer on quota groups, billing visibility, passkeys, and provider controls.'
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col gap-3'>
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 rounded-xl border px-3 py-3 text-sm'
                  >
                    <BadgeCheck className='text-primary size-4 shrink-0' />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='px-6 pb-20 md:pb-24'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-8 max-w-2xl'>
            <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
              {t('Capabilities')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
              {t('What enterprise teams actually need from an AI gateway')}
            </h2>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {capabilities.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className='bg-card/80 border-border/60'>
                  <CardHeader>
                    <div className='bg-primary/8 text-primary mb-3 flex size-10 items-center justify-center rounded-xl border border-current/10'>
                      <Icon />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </PublicLayout>
  )
}
