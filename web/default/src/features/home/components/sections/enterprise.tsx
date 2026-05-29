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
import { ArrowRight, Shield, Sparkles, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function EnterpriseSection() {
  const { t } = useTranslation()

  return (
    <section className='px-6 py-18 md:py-24'>
      <div className='mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='rounded-3xl border bg-linear-to-br from-card to-muted/20 p-8 shadow-sm md:p-10'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('For Teams')}
          </p>
          <h2 className='text-2xl font-semibold tracking-tight md:text-4xl'>
            {t('A gateway that works for solo builders, teams, and customer-facing products')}
          </h2>
          <p className='text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed md:text-base'>
            {t(
              'Use cnairouter as a hosted AI edge layer with controlled access, unified billing, usage visibility, and predictable routing.'
            )}
          </p>

          <div className='mt-6 flex flex-wrap gap-3'>
            <Button render={<Link to='/sign-up' />}>
              {t('Create API key')}
              <ArrowRight />
            </Button>
            <Button variant='outline' render={<Link to='/enterprise' />}>
              {t('Team controls')}
            </Button>
          </div>
        </div>

        <div className='grid gap-4'>
          {[
            {
              icon: Shield,
              title: t('Security and access control'),
              description: t(
                'API keys, passkeys, roles, quota groups, and routing rules stay in one place.'
              ),
            },
            {
              icon: Workflow,
              title: t('Operational visibility'),
              description: t(
                'Track model usage, upstream health, and cost signals without switching tools.'
              ),
            },
            {
              icon: Sparkles,
              title: t('Productized routing'),
              description: t(
                'Present model routing as a clean developer product instead of a hidden proxy.'
              ),
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className='bg-card/80 border-border/60'>
                <CardHeader className='pb-2'>
                  <div className='bg-primary/8 text-primary mb-3 flex size-10 items-center justify-center rounded-xl border border-current/10'>
                    <Icon />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='pt-0'>
                  <p className='text-muted-foreground rounded-lg border border-dashed px-3 py-3 text-xs leading-relaxed'>
                    {t('Designed for transparent usage, predictable billing, and provider flexibility as traffic grows.')}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
