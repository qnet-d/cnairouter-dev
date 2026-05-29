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
import { ArrowRight, BookOpen, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      {/* Multi-layer gradient background - OpenRouter style */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
      >
        {/* Purple blob */}
        <div
          className='absolute top-[5%] left-[15%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-30 dark:opacity-[0.15]'
          style={{
            background: 'radial-gradient(circle, oklch(0.6 0.2 300 / 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Blue blob */}
        <div
          className='absolute top-[0%] right-[10%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-25 dark:opacity-[0.12]'
          style={{
            background: 'radial-gradient(circle, oklch(0.6 0.15 250 / 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Cyan blob */}
        <div
          className='absolute bottom-[10%] left-[40%] w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full opacity-20 dark:opacity-[0.08]'
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.12 200 / 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 hero-grid opacity-[0.4] dark:opacity-[0.15]'
      />

      {/* Fade mask at bottom */}
      <div
        aria-hidden
        className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent -z-10'
      />

      <div className='flex max-w-4xl flex-col items-center text-center'>
        {/* Status badge with glow */}
        <div
          className='landing-animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 dark:bg-[rgba(13,13,22,0.6)] px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md'
          style={{ animationDelay: '0ms' }}
        >
          <span className='relative flex size-2'>
            <span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-40' />
            <span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
          </span>
          {t('OpenAI-compatible gateway for global AI model APIs')}
        </div>

        {/* Main heading with gradient */}
        <h1
          className='landing-animate-fade-up text-[clamp(2.25rem,6vw,4rem)] leading-[1.08] font-bold tracking-tight'
          style={{ animationDelay: '80ms' }}
        >
          {t('One API key for')}
          <br />
          <span className='text-gradient'>
            {t('500+ low-cost AI models')}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className='landing-animate-fade-up text-muted-foreground/80 mt-5 max-w-lg text-base leading-relaxed opacity-0 md:text-lg'
          style={{ animationDelay: '160ms' }}
        >
          {t('Route GPT, Claude, Gemini, DeepSeek, Qwen, Llama, image, audio, and embedding requests through one developer-friendly gateway with transparent pricing.')}
        </p>

        {/* CTA buttons */}
        <div
          className='landing-animate-fade-up mt-8 flex flex-col sm:flex-row items-center gap-3 opacity-0'
          style={{ animationDelay: '240ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='group h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='group h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='h-11 rounded-xl border-border/60 bg-background/50 px-6 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:bg-accent/50 hover:border-border/80'
                render={<Link to='/pricing' />}
              >
                <Zap className='mr-1.5 size-4 text-amber-500' />
                {t('View Pricing')}
              </Button>
              <Button
                variant='ghost'
                className='h-11 rounded-xl px-6 text-sm font-medium'
                render={<Link to='/docs' />}
              >
                <BookOpen className='mr-1.5 size-4' />
                {t('Read Docs')}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Terminal demo */}
      <div
        className='landing-animate-fade-up w-full opacity-0'
        style={{ animationDelay: '400ms' }}
      >
        <HeroTerminalDemo />
      </div>
    </section>
  )
}
