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
import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
  className?: string
}

export function SearchBar(props: SearchBarProps) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={cn('relative group', props.className)}>
      <Search className='text-muted-foreground/50 pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 transition-colors duration-200 group-focus-within:text-primary/60' />
      <input
        ref={inputRef}
        type='text'
        placeholder={props.placeholder || t('Search models...')}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={cn(
          'border-border/50 bg-background/80 placeholder:text-muted-foreground/40',
          'hover:border-border/70 hover:bg-background',
          'focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:bg-background',
          'h-12 w-full rounded-xl border pr-16 pl-12 text-base transition-all duration-300 outline-none shadow-sm'
        )}
        aria-label={t('Search models')}
      />
      <div className='absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1'>
        {props.value ? (
          <Button
            variant='ghost'
            size='icon'
            onClick={props.onClear}
            className='text-muted-foreground/50 hover:text-foreground hover:bg-muted size-8 rounded-lg'
            aria-label={t('Clear search')}
          >
            <X className='size-4' />
          </Button>
        ) : (
          <kbd className='bg-muted/80 text-muted-foreground/60 pointer-events-none hidden rounded-lg border border-border/40 px-2 py-1 font-mono text-[11px] sm:inline-block'>
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  )
}
