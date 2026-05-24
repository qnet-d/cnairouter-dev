import fs from 'node:fs/promises'
import path from 'node:path'

const LOCALES_DIR = path.resolve('web/default/src/i18n/locales')

function stableStringify(obj) {
  return JSON.stringify(obj, null, 2) + '\n'
}

const newKeys = {
  en: {
    Enterprise: 'Enterprise',
    Resources: 'Resources',
    Community: 'Community',
    Product: 'Product',
    Support: 'Support',
    Models: 'Models',
    'Browse Models': 'Browse Models',
    'Learn More': 'Learn More',
    'Unified AI gateway for routing, pricing, and observability.':
      'Unified AI gateway for routing, pricing, and observability.',
    'AI gateway, model directory, and observability in one place':
      'AI gateway, model directory, and observability in one place',
    'A unified AI gateway for': 'A unified AI gateway for',
    'routing, pricing, and control': 'routing, pricing, and control',
    'Compare models before you route traffic':
      'Compare models before you route traffic',
    'Browse pricing, capabilities, endpoint support, and vendor coverage in one place.':
      'Browse pricing, capabilities, endpoint support, and vendor coverage in one place.',
    'Available models in the current directory':
      'Available models in the current directory',
    'Distinct upstream providers': 'Distinct upstream providers',
    'Filters currently shaping the result set':
      'Filters currently shaping the result set',
    Vendors: 'Vendors',
    'Active filters': 'Active filters',
    'Top model': 'Top model',
    'Leading vendor': 'Leading vendor',
    'Tracked volume': 'Tracked volume',
    'Aggregated token usage in the selected period':
      'Aggregated token usage in the selected period',
    'Platform Overview': 'Platform Overview',
    'Built for teams that route serious AI traffic':
      'Built for teams that route serious AI traffic',
    'cnairouter should feel less like a theme demo and more like an operational control plane. The public experience now mirrors that goal.':
      'cnairouter should feel less like a theme demo and more like an operational control plane. The public experience now mirrors that goal.',
    'One endpoint for many providers': 'One endpoint for many providers',
    'Route requests across OpenAI-compatible, Anthropic, Gemini, Bedrock, Azure, and more from a consistent API surface.':
      'Route requests across OpenAI-compatible, Anthropic, Gemini, Bedrock, Azure, and more from a consistent API surface.',
    'Model catalog with pricing context':
      'Model catalog with pricing context',
    'Browse models by capability, vendor, endpoint type, and billing mode before you commit traffic.':
      'Browse models by capability, vendor, endpoint type, and billing mode before you commit traffic.',
    'Live usage and ranking visibility':
      'Live usage and ranking visibility',
    'Track model adoption, vendor share, spend, latency, and movement using platform-level analytics.':
      'Track model adoption, vendor share, spend, latency, and movement using platform-level analytics.',
    'Operations-ready controls': 'Operations-ready controls',
    'Manage API keys, channels, quotas, guardrails, and team access from the same console.':
      'Manage API keys, channels, quotas, guardrails, and team access from the same console.',
    'Best suited for teams replacing one-off direct integrations with a central router.':
      'Best suited for teams replacing one-off direct integrations with a central router.',
    'Pricing, modalities, and endpoint compatibility stay visible while comparing models.':
      'Pricing, modalities, and endpoint compatibility stay visible while comparing models.',
    'Usage data becomes a product surface, not just an afterthought buried in admin pages.':
      'Usage data becomes a product surface, not just an afterthought buried in admin pages.',
    'The same platform can serve public traffic, internal teams, or a hosted gateway business.':
      'The same platform can serve public traffic, internal teams, or a hosted gateway business.',
    'A gateway that works for internal teams and customer-facing products':
      'A gateway that works for internal teams and customer-facing products',
    'Use cnairouter as a hosted AI edge layer with controlled access, unified billing, observability, and predictable routing.':
      'Use cnairouter as a hosted AI edge layer with controlled access, unified billing, observability, and predictable routing.',
    'Security and access control': 'Security and access control',
    'API keys, passkeys, roles, and routing rules stay in one place.':
      'API keys, passkeys, roles, and routing rules stay in one place.',
    'Operational visibility': 'Operational visibility',
    'Track usage, health, and cost signals without switching tools.':
      'Track usage, health, and cost signals without switching tools.',
    'Productized routing': 'Productized routing',
    'Present model routing as a product surface with a clean public story.':
      'Present model routing as a product surface with a clean public story.',
    'This section intentionally mirrors the clean, data-first trust language used by OpenRouter-style public pages.':
      'This section intentionally mirrors the clean, data-first trust language used by OpenRouter-style public pages.',
    'Build an AI gateway that feels like a product, not just a proxy':
      'Build an AI gateway that feels like a product, not just a proxy',
    'cnairouter can front multiple providers, centralize access control, expose transparent model discovery, and give operators a clean place to watch spend and traffic.':
      'cnairouter can front multiple providers, centralize access control, expose transparent model discovery, and give operators a clean place to watch spend and traffic.',
    'Why this page exists now': 'Why this page exists now',
    'OpenRouter succeeds because the public product story is clear. cnairouter needs the same clarity when presenting its routing, pricing, and control capabilities.':
      'OpenRouter succeeds because the public product story is clear. cnairouter needs the same clarity when presenting its routing, pricing, and control capabilities.',
    'Self-hosted friendly': 'Self-hosted friendly',
    'Team and tenant aware': 'Team and tenant aware',
    'OpenAI-compatible entrypoints': 'OpenAI-compatible entrypoints',
    'Operational analytics built in': 'Operational analytics built in',
    Capabilities: 'Capabilities',
    'What enterprise teams actually need from an AI gateway':
      'What enterprise teams actually need from an AI gateway',
    'Routing abstraction': 'Routing abstraction',
    'Present multiple upstream providers through one stable API surface and operational control layer.':
      'Present multiple upstream providers through one stable API surface and operational control layer.',
    'Governance and access': 'Governance and access',
    'Combine quotas, user roles, API keys, and risk controls in the same product surface.':
      'Combine quotas, user roles, API keys, and risk controls in the same product surface.',
    'Usage intelligence': 'Usage intelligence',
    'Surface pricing, adoption, rankings, and channel health as first-class product features.':
      'Surface pricing, adoption, rankings, and channel health as first-class product features.',
    'Flexible billing story': 'Flexible billing story',
    'Support transparent markup, recharge flows, subscriptions, and operational cost monitoring.':
      'Support transparent markup, recharge flows, subscriptions, and operational cost monitoring.',
    'A clearer public story for cnairouter':
      'A clearer public story for cnairouter',
    'This page now serves as a trust and origin page for the project, rather than a fallback-only screen.':
      'This page now serves as a trust and origin page for the project, rather than a fallback-only screen.',
    'Project identity': 'Project identity',
    'The project keeps its existing identity, but the public presentation is now more product-oriented and easier to understand.':
      'The project keeps its existing identity, but the public presentation is now more product-oriented and easier to understand.',
    'Transparent routing and billing story':
      'Transparent routing and billing story',
    'Clean public pages and high-signal analytics':
      'Clean public pages and high-signal analytics',
  },
  zh: {
    Enterprise: '企业方案',
    Resources: '资源',
    Community: '社区',
    Product: '产品',
    Support: '支持',
    Models: '模型',
    'Browse Models': '浏览模型',
    'Learn More': '了解更多',
    'Unified AI gateway for routing, pricing, and observability.':
      '面向路由、定价与可观测性的统一 AI 网关。',
    'AI gateway, model directory, and observability in one place':
      '把 AI 网关、模型目录和可观测性放到同一个入口',
    'A unified AI gateway for': '一个统一的 AI 网关，用于',
    'routing, pricing, and control': '路由、定价与控制',
    'Compare models before you route traffic':
      '在分发流量前先比较模型',
    'Browse pricing, capabilities, endpoint support, and vendor coverage in one place.':
      '在一个页面里查看价格、能力、接口支持和供应商覆盖范围。',
    'Available models in the current directory': '当前目录中的可用模型数',
    'Distinct upstream providers': '不同上游提供商数量',
    'Filters currently shaping the result set': '当前生效的筛选条件数',
    Vendors: '厂商',
    'Active filters': '生效筛选',
    'Top model': '榜首模型',
    'Leading vendor': '领先厂商',
    'Tracked volume': '追踪流量',
    'Aggregated token usage in the selected period':
      '所选周期内聚合的 token 用量',
    'Platform Overview': '平台概览',
    'Built for teams that route serious AI traffic':
      '为需要认真处理 AI 流量的团队而设计',
    'cnairouter should feel less like a theme demo and more like an operational control plane. The public experience now mirrors that goal.':
      'cnairouter 不该像一个主题演示，而应更像一个运营控制平面。公开站现在也开始贴近这个目标。',
    'One endpoint for many providers': '一个入口对接多个提供商',
    'Route requests across OpenAI-compatible, Anthropic, Gemini, Bedrock, Azure, and more from a consistent API surface.':
      '通过一致的 API 界面在 OpenAI-compatible、Anthropic、Gemini、Bedrock、Azure 等多家上游之间路由请求。',
    'Model catalog with pricing context': '带定价上下文的模型目录',
    'Browse models by capability, vendor, endpoint type, and billing mode before you commit traffic.':
      '在真正导流之前，先按能力、厂商、端点类型和计费方式浏览模型。',
    'Live usage and ranking visibility': '实时使用与排行可见性',
    'Track model adoption, vendor share, spend, latency, and movement using platform-level analytics.':
      '通过平台级分析追踪模型采用率、厂商份额、花费、延迟和趋势变化。',
    'Operations-ready controls': '面向运营的控制能力',
    'Manage API keys, channels, quotas, guardrails, and team access from the same console.':
      '在同一控制台中管理 API Key、渠道、配额、护栏和团队访问。',
    'Best suited for teams replacing one-off direct integrations with a central router.':
      '适合把零散的直连集成替换成统一路由层的团队。',
    'Pricing, modalities, and endpoint compatibility stay visible while comparing models.':
      '比较模型时，价格、多模态能力和端点兼容性会始终可见。',
    'Usage data becomes a product surface, not just an afterthought buried in admin pages.':
      '使用数据将成为产品界面的一部分，而不只是埋在后台页里的附属信息。',
    'The same platform can serve public traffic, internal teams, or a hosted gateway business.':
      '同一平台既可以服务公开流量，也能服务内部团队，或作为托管网关业务。',
    'A gateway that works for internal teams and customer-facing products':
      '同时适用于内部团队和面向客户产品的网关',
    'Use cnairouter as a hosted AI edge layer with controlled access, unified billing, observability, and predictable routing.':
      '把 cnairouter 用作托管式 AI 边缘层，提供受控访问、统一计费、可观测性和可预期路由。',
    'Security and access control': '安全与访问控制',
    'API keys, passkeys, roles, and routing rules stay in one place.':
      'API Key、Passkey、角色和路由规则统一收敛在一个地方。',
    'Operational visibility': '运营可见性',
    'Track usage, health, and cost signals without switching tools.':
      '无需切换工具即可追踪使用情况、健康状态和成本信号。',
    'Productized routing': '产品化路由',
    'Present model routing as a product surface with a clean public story.':
      '把模型路由做成一个对外表达清晰的产品界面。',
    'This section intentionally mirrors the clean, data-first trust language used by OpenRouter-style public pages.':
      '这一部分刻意采用了类似 OpenRouter 公开页那种简洁、数据优先的信任表达方式。',
    'Build an AI gateway that feels like a product, not just a proxy':
      '构建一个更像产品、而不只是代理层的 AI 网关',
    'cnairouter can front multiple providers, centralize access control, expose transparent model discovery, and give operators a clean place to watch spend and traffic.':
      'cnairouter 可以承接多个提供商、集中访问控制、对外展示透明的模型发现能力，并为运营者提供清晰的流量和成本视图。',
    'Why this page exists now': '为什么现在需要这个页面',
    'OpenRouter succeeds because the public product story is clear. cnairouter needs the same clarity when presenting its routing, pricing, and control capabilities.':
      'OpenRouter 的公开产品叙事非常清晰。cnairouter 在展示自己的路由、定价和控制能力时，也需要同样的清晰度。',
    'Self-hosted friendly': '适合自托管',
    'Team and tenant aware': '支持团队与租户场景',
    'OpenAI-compatible entrypoints': '兼容 OpenAI 风格入口',
    'Operational analytics built in': '内建运营分析',
    Capabilities: '能力',
    'What enterprise teams actually need from an AI gateway':
      '企业团队真正需要的 AI 网关能力',
    'Routing abstraction': '路由抽象',
    'Present multiple upstream providers through one stable API surface and operational control layer.':
      '通过一个稳定的 API 表面和运维控制层承载多个上游提供商。',
    'Governance and access': '治理与访问',
    'Combine quotas, user roles, API keys, and risk controls in the same product surface.':
      '把配额、用户角色、API Key 和风控控制整合到同一个产品界面中。',
    'Usage intelligence': '使用智能',
    'Surface pricing, adoption, rankings, and channel health as first-class product features.':
      '把价格、采用率、排行和渠道健康度直接做成一等产品能力。',
    'Flexible billing story': '灵活的计费体系',
    'Support transparent markup, recharge flows, subscriptions, and operational cost monitoring.':
      '支持透明加价、充值流程、订阅制以及运营成本监控。',
    'A clearer public story for cnairouter':
      '为 cnairouter 建立更清晰的公开叙事',
    'This page now serves as a trust and origin page for the project, rather than a fallback-only screen.':
      '这个页面现在承担项目的信任与来源说明，而不再只是一个兜底占位页。',
    'Project identity': '项目身份',
    'The project keeps its existing identity, but the public presentation is now more product-oriented and easier to understand.':
      '项目保持既有身份不变，但公开呈现方式会更产品化，也更容易理解。',
    'Transparent routing and billing story': '透明的路由与计费叙事',
    'Clean public pages and high-signal analytics': '更干净的公开页与高信号分析视图',
  },
}

const passthroughLocales = ['fr', 'ja', 'ru', 'vi']

async function main() {
  for (const locale of ['en', 'zh', ...passthroughLocales]) {
    const filePath = path.join(LOCALES_DIR, `${locale}.json`)
    const json = JSON.parse(await fs.readFile(filePath, 'utf8'))
    const incoming =
      locale === 'zh' ? newKeys.zh : locale === 'en' ? newKeys.en : newKeys.en

    for (const [key, value] of Object.entries(incoming)) {
      json.translation[key] = value
    }

    json.translation = Object.fromEntries(
      Object.entries(json.translation).sort(([a], [b]) => a.localeCompare(b))
    )

    await fs.writeFile(filePath, stableStringify(json), 'utf8')
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
