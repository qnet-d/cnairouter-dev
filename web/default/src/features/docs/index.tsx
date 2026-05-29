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
import { type ComponentType } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Braces,
  Code2,
  KeyRound,
  Route,
  ShieldCheck,
  Terminal,
  WalletCards,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Footer } from '@/components/layout/components/footer'
import { PublicLayout } from '@/components/layout/components/public-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CopyButton } from '@/components/copy-button'
import { useStatus } from '@/hooks/use-status'

const FALLBACK_BASE_URL = 'https://api.cnairouter.com'

function normalizePublicBaseUrl(value: unknown) {
  if (typeof value !== 'string') return FALLBACK_BASE_URL

  const trimmed = value.trim().replace(/\/+$/, '')
  if (!trimmed || /localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]/i.test(trimmed)) {
    return FALLBACK_BASE_URL
  }
  return trimmed
}

function createQuickstartCode(baseUrl: string) {
  return `curl ${baseUrl}/v1/chat/completions \\
  -H "Authorization: Bearer $CNAIROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "Say hello in one sentence." }
    ]
  }'`
}

function createSdkCode(baseUrl: string) {
  return `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.CNAIROUTER_API_KEY,
  baseURL: "${baseUrl}/v1",
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-3-5-haiku",
  messages: [{ role: "user", content: "Summarize this pull request." }],
});

console.log(response.choices[0]?.message?.content);`
}

const RESPONSE_CODE = `{
  "id": "chatcmpl_...",
  "object": "chat.completion",
  "model": "anthropic/claude-3-5-haiku",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Your request was routed successfully."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 9,
    "total_tokens": 27
  }
}`

export function Docs() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const baseUrl = normalizePublicBaseUrl(
    status?.server_address ?? status?.data?.server_address
  )
  const quickstartCode = createQuickstartCode(baseUrl)
  const sdkCode = createSdkCode(baseUrl)

  const steps = [
    {
      icon: KeyRound,
      title: t('Create one API key'),
      description: t(
        'Sign up, add credits, and generate a key from the developer console.'
      ),
    },
    {
      icon: Route,
      title: t('Pick a model or route by price'),
      description: t(
        'Use a specific model name or compare providers from the model directory before sending traffic.'
      ),
    },
    {
      icon: Terminal,
      title: t('Use OpenAI-compatible clients'),
      description: t(
        'Point existing SDKs to the gateway base URL without rewriting your app.'
      ),
    },
  ]

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/chat/completions',
      label: t('OpenAI-compatible chat'),
    },
    {
      method: 'POST',
      path: '/v1/responses',
      label: t('Responses-style workflows'),
    },
    {
      method: 'POST',
      path: '/v1/messages',
      label: t('Anthropic-compatible messages'),
    },
    {
      method: 'POST',
      path: '/v1/embeddings',
      label: t('Embedding models'),
    },
  ]

  return (
    <PublicLayout showMainContainer={false}>
      <section className='px-6 pt-28 pb-14 md:pt-36 md:pb-20'>
        <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center'>
          <div>
            <Badge
              variant='outline'
              className='mb-5 rounded-full px-3 py-1 text-xs'
            >
              <BookOpen className='mr-1.5 size-3.5' />
              {t('Developer Quickstart')}
            </Badge>
            <h1 className='text-[clamp(2.25rem,5.8vw,4.5rem)] leading-[1.02] font-semibold tracking-tight'>
              {t('One API key for low-cost AI model routing')}
            </h1>
            <p className='text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed md:text-base'>
              {t(
                'Build against an OpenAI-compatible gateway, compare model pricing, and route traffic across GPT, Claude, Gemini, DeepSeek, Qwen, Llama, image, audio, and embedding models.'
              )}
            </p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <Button render={<Link to='/sign-up' />}>
                {t('Create API key')}
                <ArrowRight className='size-4' />
              </Button>
              <Button variant='outline' render={<Link to='/pricing' />}>
                {t('Compare model prices')}
              </Button>
            </div>
          </div>

          <CodePanel title={t('Quickstart')} code={quickstartCode} />
        </div>
      </section>

      <section className='border-border/50 border-y bg-muted/20 px-6 py-12'>
        <div className='mx-auto grid max-w-6xl gap-4 md:grid-cols-3'>
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card key={step.title} className='bg-background/80'>
                <CardHeader>
                  <div className='bg-primary/8 text-primary mb-3 flex size-10 items-center justify-center rounded-lg border border-current/10'>
                    <Icon className='size-5' />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      <section className='px-6 py-16 md:py-24'>
        <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
          <div>
            <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
              {t('Compatible Endpoints')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
              {t('Keep your existing SDKs and switch the base URL')}
            </h2>
            <p className='text-muted-foreground mt-4 text-sm leading-relaxed'>
              {t(
                'The gateway preserves familiar API shapes while centralizing credits, usage logs, provider keys, quota controls, and model pricing.'
              )}
            </p>

            <div className='mt-6 grid gap-3'>
              {[
                t('Transparent per-model pricing'),
                t('Usage logs and spend visibility'),
                t('Team-ready API key management'),
                t('Fallback-friendly provider routing'),
              ].map((item) => (
                <div key={item} className='flex items-center gap-3 text-sm'>
                  <BadgeCheck className='text-primary size-4 shrink-0' />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className='bg-card/80'>
            <CardHeader>
              <CardTitle>{t('Gateway endpoints')}</CardTitle>
              <CardDescription>
                {t(
                  'Start with OpenAI-compatible chat, then expand to specialized routes as needed.'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-3'>
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.path}
                  className='grid gap-2 rounded-lg border p-3 sm:grid-cols-[76px_minmax(0,1fr)] sm:items-center'
                >
                  <Badge variant='secondary' className='w-fit font-mono'>
                    {endpoint.method}
                  </Badge>
                  <div className='min-w-0'>
                    <code className='block truncate text-sm'>
                      {endpoint.path}
                    </code>
                    <p className='text-muted-foreground mt-1 text-xs'>
                      {endpoint.label}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='px-6 pb-20 md:pb-28'>
        <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-2'>
          <CodePanel title={t('Node.js SDK')} code={sdkCode} icon={Code2} />
          <CodePanel
            title={t('Usage Response')}
            code={RESPONSE_CODE}
            icon={Braces}
          />
        </div>
      </section>

      <section className='px-6 pb-20'>
        <div className='mx-auto max-w-6xl rounded-2xl border bg-card/80 p-6 md:p-8'>
          <div className='grid gap-6 md:grid-cols-[1fr_auto] md:items-center'>
            <div>
              <div className='mb-3 flex items-center gap-2 text-sm font-medium'>
                <ShieldCheck className='text-primary size-4' />
                {t('Production checklist')}
              </div>
              <p className='text-muted-foreground max-w-2xl text-sm leading-relaxed'>
                {t(
                  'Before moving real traffic, configure upstream channels, test model availability, set rate limits, enable billing, and review usage logs from the dashboard.'
                )}
              </p>
            </div>
            <Button variant='outline' render={<Link to='/enterprise' />}>
              <WalletCards className='size-4' />
              {t('Enterprise controls')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </PublicLayout>
  )
}

function CodePanel(props: {
  title: string
  code: string
  icon?: ComponentType<{ className?: string }>
}) {
  const { t } = useTranslation()
  const Icon = props.icon

  return (
    <Card className='overflow-hidden bg-[#0b1020] text-slate-100 shadow-xl shadow-slate-950/10'>
      <CardHeader className='border-b border-white/10 pb-3'>
        <div className='flex items-center justify-between gap-3'>
          <CardTitle className='flex items-center gap-2 text-sm text-slate-100'>
            {Icon ? <Icon className='size-4' /> : <Terminal className='size-4' />}
            {props.title}
          </CardTitle>
          <CopyButton
            value={props.code}
            className='size-8 text-slate-300 hover:bg-white/10 hover:text-white'
            iconClassName='size-4'
            tooltip={t('Copy code')}
            successTooltip={t('Copied')}
          />
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <pre className='overflow-x-auto p-4 text-xs leading-6 text-slate-200 md:text-[13px]'>
          <code>{props.code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
