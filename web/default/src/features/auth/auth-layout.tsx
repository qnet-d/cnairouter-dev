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
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeSwitch } from '@/components/theme-switch'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='bg-background relative min-h-svh overflow-hidden'>
      <div className='absolute top-4 right-4 z-20 flex items-center gap-2 sm:top-6 sm:right-6'>
        <ThemeSwitch />
        <LanguageSwitcher />
      </div>

      <div className='grid min-h-svh lg:grid-cols-[minmax(20rem,25vw)_1fr]'>
        <aside className='bg-muted relative hidden overflow-hidden lg:block'>
          <img
            src='/cover-4.webp'
            alt=''
            aria-hidden='true'
            className='absolute inset-0 h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-black/15' aria-hidden='true' />
          <Link
            to='/'
            className='absolute top-6 left-6 z-10 flex items-center gap-2 text-white transition-opacity hover:opacity-80'
          >
            <div className='relative h-8 w-8'>
              {loading ? (
                <Skeleton className='absolute inset-0 rounded-lg bg-white/30' />
              ) : (
                <img
                  src={logo}
                  alt={t('Logo')}
                  className='h-8 w-8 rounded-lg object-contain'
                />
              )}
            </div>
            {loading ? (
              <Skeleton className='h-5 w-24 bg-white/30' />
            ) : (
              <h1 className='text-lg font-semibold'>{systemName}</h1>
            )}
          </Link>
        </aside>

        <div className='relative flex min-h-svh items-center justify-center px-4 py-20 sm:px-8 lg:px-12'>
          <Link
            to='/'
            className='absolute top-5 left-5 z-10 flex items-center gap-2 transition-opacity hover:opacity-80 lg:hidden'
          >
            <div className='relative h-8 w-8'>
              {loading ? (
                <Skeleton className='absolute inset-0 rounded-lg' />
              ) : (
                <img
                  src={logo}
                  alt={t('Logo')}
                  className='h-8 w-8 rounded-lg object-contain'
                />
              )}
            </div>
            {loading ? (
              <Skeleton className='h-5 w-24' />
            ) : (
              <h1 className='text-lg font-semibold'>{systemName}</h1>
            )}
          </Link>

          <div
            className='from-background via-background pointer-events-none absolute inset-0 bg-linear-to-br to-cyan-50/50 dark:to-cyan-950/20'
            aria-hidden='true'
          />
          <div className='relative mx-auto flex w-full max-w-[420px] flex-col justify-center space-y-2'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
