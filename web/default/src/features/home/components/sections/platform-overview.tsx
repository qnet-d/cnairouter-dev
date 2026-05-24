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
import { Activity, BrainCircuit, Network, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ICONS = [Network, BrainCircuit, Activity, ShieldCheck]

export function PlatformOverview() {
  const { t } = useTranslation()

  const items = [
    {
      title: t('One endpoint for many providers'),
      description: t(
        'Route requests across OpenAI-compatible, Anthropic, Gemini, Bedrock, Azure, and more from a consistent API surface.'
      ),
    },
    {
      title: t('Model catalog with pricing context'),
      description: t(
        'Browse models by capability, vendor, endpoint type, and billing mode before you commit traffic.'
      ),
    },
    {
      title: t('Live usage and ranking visibility'),
      description: t(
        'Track model adoption, vendor share, spend, latency, and movement using platform-level analytics.'
      ),
    },
    {
      title: t('Operations-ready controls'),
      description: t(
        'Manage API keys, channels, quotas, guardrails, and team access from the same console.'
      ),
    },
  ]

  return (
    <section className='px-6 py-18 md:py-24'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('Platform Overview')}
          </p>
          <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
            {t('Built for teams that route serious AI traffic')}
          </h2>
          <p className='text-muted-foreground mt-3 text-sm leading-relaxed md:text-base'>
            {t(
              'cnairouter should feel less like a theme demo and more like an operational control plane. The public experience now mirrors that goal.'
            )}
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          {items.map((item, index) => {
            const Icon = ICONS[index]
            return (
              <Card
                key={item.title}
                className='bg-card/80 border-border/60 backdrop-blur-sm'
              >
                <CardHeader>
                  <div className='bg-primary/8 text-primary mb-3 flex size-10 items-center justify-center rounded-xl border border-current/10'>
                    <Icon />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='pt-0'>
                  <div className='bg-muted/50 text-muted-foreground rounded-lg border px-3 py-3 text-xs leading-relaxed'>
                    {index === 0 &&
                      t(
                        'Best suited for teams replacing one-off direct integrations with a central router.'
                      )}
                    {index === 1 &&
                      t(
                        'Pricing, modalities, and endpoint compatibility stay visible while comparing models.'
                      )}
                    {index === 2 &&
                      t(
                        'Usage data becomes a product surface, not just an afterthought buried in admin pages.'
                      )}
                    {index === 3 &&
                      t(
                        'The same platform can serve public traffic, internal teams, or a hosted gateway business.'
                      )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
