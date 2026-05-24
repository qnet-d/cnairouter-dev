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
import { memo } from 'react'
import { ChevronRight, Copy, Cpu, Image, MessageSquare, Sparkles, Code } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { StatusBadge } from '@/components/status-badge'
import { DEFAULT_TOKEN_UNIT } from '../constants'
import {
  getDynamicDisplayGroupRatio,
  getDynamicPricingSummary,
} from '../lib/dynamic-price'
import { parseTags } from '../lib/filters'
import { isTokenBasedModel } from '../lib/model-helpers'
import { formatPrice, formatRequestPrice } from '../lib/price'
import type { PricingModel, TokenUnit } from '../types'
import { ModelPerfBadge, type ModelPerfBadgeData } from './model-perf-badge'

export interface ModelCardProps {
  model: PricingModel
  onClick: () => void
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
  showRechargePrice?: boolean
  perf?: ModelPerfBadgeData
}

// Map common endpoint types to icon components
const ENDPOINT_ICONS: Record<string, React.ReactNode> = {
  'chat': <MessageSquare className="size-3" />,
  'image': <Image className="size-3" />,
  'embedding': <Sparkles className="size-3" />,
  'audio': <Cpu className="size-3" />,
  'code': <Code className="size-3" />,
}

export const ModelCard = memo(function ModelCard(props: ModelCardProps) {
  const { t } = useTranslation()
  const { copyToClipboard } = useCopyToClipboard()
  const tokenUnit = props.tokenUnit ?? DEFAULT_TOKEN_UNIT
  const priceRate = props.priceRate ?? 1
  const usdExchangeRate = props.usdExchangeRate ?? 1
  const showRechargePrice = props.showRechargePrice ?? false
  const isTokenBased = isTokenBasedModel(props.model)
  const tokenUnitLabel = tokenUnit === 'K' ? '1K' : '1M'
  const tags = parseTags(props.model.tags)
  const groups = props.model.enable_groups || []
  const endpoints = props.model.supported_endpoint_types || []
  const vendorIcon = props.model.vendor_icon
    ? getLobeIcon(props.model.vendor_icon, 28)
    : null
  const initial = props.model.model_name?.charAt(0).toUpperCase() || '?'
  const isDynamicPricing =
    props.model.billing_mode === 'tiered_expr' &&
    Boolean(props.model.billing_expr)
  const hasCachedPrice = isTokenBased && props.model.cache_ratio != null
  const dynamicSummary = isDynamicPricing
    ? getDynamicPricingSummary(props.model, {
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate,
        groupRatioMultiplier: getDynamicDisplayGroupRatio(props.model),
      })
    : null

  const primaryGroup = groups[0]
  const hiddenCount =
    Math.max(groups.length - 1, 0) +
    Math.max(endpoints.length - 2, 0) +
    Math.max(tags.length - 2, 0)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyToClipboard(props.model.model_name || '')
  }

  return (
    <div
      className={cn(
        'model-card group relative flex flex-col rounded-xl border border-border/40 bg-card/60 p-4 transition-all duration-300 sm:p-5',
        'hover:bg-card hover:border-border/60 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20'
      )}
    >
      {/* Glow border effect */}
      <div
        className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.6 0.18 280 / 0.08), transparent 70%)',
        }}
      />

      {/* Content */}
      <div className='relative flex flex-1 flex-col'>
        {/* Header: icon + name + actions */}
        <div className='flex items-start justify-between gap-2.5'>
          <div className='flex min-w-0 items-start gap-3'>
            <div className='bg-muted/50 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/30 transition-all duration-300 group-hover:border-border/50 group-hover:shadow-[0_0_12px_-4px_oklch(0.6_0.18_280_/0.15)]'>
              {vendorIcon || (
                <span className='text-muted-foreground text-sm font-bold'>
                  {initial}
                </span>
              )}
            </div>
            <div className='min-w-0'>
              <h3 className='text-foreground truncate font-mono text-[15px] leading-tight font-bold tracking-tight'>
                {props.model.model_name}
              </h3>
              <p className='text-muted-foreground/70 mt-0.5 text-xs'>
                {props.model.vendor_name || t('Unknown provider')}
              </p>
            </div>
          </div>

          <div className='flex shrink-0 items-center gap-1'>
            <button
              type='button'
              onClick={handleCopy}
              className='text-muted-foreground/60 hover:text-foreground hover:bg-muted/80 rounded-md p-1.5 transition-all duration-200'
              title={t('Copy model ID')}
            >
              <Copy className='size-3.5' />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className='text-muted-foreground/80 mt-3 line-clamp-2 flex-1 text-[13px] leading-relaxed'>
          {props.model.description || t('No description available.')}
        </p>

        {/* Capability tags */}
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {endpoints.slice(0, 3).map((ep) => (
            <span
              key={ep}
              className='inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/30'
            >
              {ENDPOINT_ICONS[ep.toLowerCase()] || <Sparkles className="size-3" />}
              {ep}
            </span>
          ))}
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className='inline-flex items-center rounded-md bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary/80 border border-primary/10'
            >
              {tag}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className='inline-flex items-center rounded-md bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground/60'>
              +{hiddenCount}
            </span>
          )}
          {isDynamicPricing && (
            <StatusBadge
              label={t('Dynamic')}
              variant='warning'
              copyable={false}
              size='sm'
              className='text-[11px]'
            />
          )}
        </div>

        {/* Price section */}
        <div className='mt-4 grid grid-cols-2 gap-2'>
          {dynamicSummary ? (
            dynamicSummary.isSpecialExpression ? (
              <div className='col-span-2 rounded-lg bg-amber-500/5 border border-amber-500/10 px-3 py-2'>
                <span className='text-amber-700 dark:text-amber-300 text-xs font-medium'>
                  {t('Special billing expression')}
                </span>
              </div>
            ) : dynamicSummary.primaryEntries.length > 0 ? (
              dynamicSummary.primaryEntries.slice(0, 2).map((entry) => (
                <div
                  key={entry.key}
                  className='rounded-lg bg-muted/40 border border-border/30 px-3 py-2 transition-all duration-200 group-hover:bg-muted/60'
                >
                  <p className='text-muted-foreground/60 text-[10px] uppercase tracking-wider'>
                    {t(entry.shortLabel)}
                  </p>
                  <p className='text-foreground font-mono text-sm font-semibold tabular-nums mt-0.5'>
                    {entry.formatted}/{tokenUnitLabel}
                  </p>
                </div>
              ))
            ) : (
              <div className='col-span-2 rounded-lg bg-muted/40 border border-border/30 px-3 py-2'>
                <p className='text-muted-foreground text-xs'>{t('Dynamic Pricing')}</p>
              </div>
            )
          ) : isTokenBased ? (
            <>
              <div className='rounded-lg bg-muted/40 border border-border/30 px-3 py-2 transition-all duration-200 group-hover:bg-muted/60'>
                <p className='text-muted-foreground/60 text-[10px] uppercase tracking-wider'>
                  {t('Input')}
                </p>
                <p className='text-foreground font-mono text-sm font-semibold tabular-nums mt-0.5'>
                  {formatPrice(
                    props.model,
                    'input',
                    tokenUnit,
                    showRechargePrice,
                    priceRate,
                    usdExchangeRate
                  )}
                  <span className='text-muted-foreground/50 text-xs ml-0.5'>/{tokenUnitLabel}</span>
                </p>
              </div>
              <div className='rounded-lg bg-muted/40 border border-border/30 px-3 py-2 transition-all duration-200 group-hover:bg-muted/60'>
                <p className='text-muted-foreground/60 text-[10px] uppercase tracking-wider'>
                  {t('Output')}
                </p>
                <p className='text-foreground font-mono text-sm font-semibold tabular-nums mt-0.5'>
                  {formatPrice(
                    props.model,
                    'output',
                    tokenUnit,
                    showRechargePrice,
                    priceRate,
                    usdExchangeRate
                  )}
                  <span className='text-muted-foreground/50 text-xs ml-0.5'>/{tokenUnitLabel}</span>
                </p>
              </div>
            </>
          ) : (
            <div className='col-span-2 rounded-lg bg-muted/40 border border-border/30 px-3 py-2'>
              <p className='text-muted-foreground/60 text-[10px] uppercase tracking-wider'>
                {t('Per Request')}
              </p>
              <p className='text-foreground font-mono text-sm font-semibold tabular-nums mt-0.5'>
                {formatRequestPrice(
                  props.model,
                  showRechargePrice,
                  priceRate,
                  usdExchangeRate
                )}
              </p>
            </div>
          )}
        </div>

        {/* Release date */}
        {props.model.release_date && (
          <div className='mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground/50'>
            <span className='size-1 rounded-full bg-muted-foreground/30' />
            {t('Released')}: {props.model.release_date}
          </div>
        )}

        {/* Footer: group info + details button */}
        <div className='mt-3 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {primaryGroup && (
              <span className='text-muted-foreground/60 text-[11px]'>
                {primaryGroup}
                {groups.length > 1 && (
                  <span className='text-muted-foreground/40'> +{groups.length - 1}</span>
                )}
              </span>
            )}
            {hasCachedPrice && (
              <span className='text-muted-foreground/40 text-[11px]'>
                {t('Cache')}: {formatPrice(
                  props.model,
                  'cache',
                  tokenUnit,
                  showRechargePrice,
                  priceRate,
                  usdExchangeRate
                )}
              </span>
            )}
          </div>

          <button
            type='button'
            onClick={props.onClick}
            className='text-muted-foreground/70 hover:text-foreground hover:bg-muted/80 inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 border border-transparent hover:border-border/40'
          >
            {t('Details')}
            <ChevronRight className='size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
          </button>
        </div>

        {/* Performance badge */}
        <ModelPerfBadge perf={props.perf} className='absolute top-4 right-12' />
      </div>
    </div>
  )
})
