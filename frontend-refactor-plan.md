# CnaiRouter 前端全面重构方案

## 设计灵感来源

以 [OpenRouter.ai](https://openrouter.ai/) 为设计蓝本，打造一个现代化、深色优先、具有科技感的 AI 网关前端界面。

---

## 一、设计系统 (Design System)

### 1.1 色彩系统

OpenRouter 采用**深色优先**的设计理念，以深邃的暗色为底，搭配紫蓝渐变的霓虹光效，营造科技感与专业感。

#### 核心色板

| Token | Light Mode | Dark Mode (OpenRouter Style) | 用途 |
|-------|-----------|------------------------------|------|
| `--background` | `#ffffff` | `#0a0a0f` | 主背景色，深邃暗色 |
| `--foreground` | `#0a0a0f` | `#f0f0f5` | 主文字色，高对比度 |
| `--card` | `#ffffff` | `#13131f` | 卡片背景，略浅于主背景 |
| `--popover` | `#ffffff` | `#1a1a2e` | 弹出层背景 |
| `--primary` | `#0a0a0f` | `#6366f1` | 主色调，靛蓝紫 |
| `--primary-foreground` | `#ffffff` | `#ffffff` | 主色上的文字 |
| `--secondary` | `#f4f4f5` | `#1e1e2d` | 次要背景 |
| `--accent` | `#f4f4f5` | `#2d2d44` | 强调色背景 |
| `--muted` | `#f4f4f5` | `#1a1a2e` | 静音/禁用背景 |
| `--muted-foreground` | `#71717a` | `#8b8b9e` | 次要文字 |
| `--border` | `#e4e4e7` | `#2a2a3c` | 边框色 |
| `--ring` | `#a1a1aa` | `#6366f1` | 聚焦光环 |
| `--destructive` | `#ef4444` | `#ef4444` | 危险色 |
| `--success` | `#22c55e` | `#22c55e` | 成功色 |
| `--warning` | `#f59e0b` | `#f59e0b` | 警告色 |
| `--info` | `#3b82f6` | `#60a5fa` | 信息色 |

#### 渐变光效系统

OpenRouter 的标志性视觉元素是背景中的**紫蓝渐变光晕**。

```css
/* Hero 区域背景光效 */
--gradient-purple: radial-gradient(ellipse 60% 50% at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
--gradient-blue: radial-gradient(ellipse 50% 40% at 80% 15%, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
--gradient-cyan: radial-gradient(ellipse 40% 35% at 50% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 70%);

/* 文字渐变 */
--text-gradient: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
```

#### Glassmorphism 层级

```css
/* 玻璃拟态卡片 */
.glass-card {
  background: rgba(19, 19, 31, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* 玻璃拟态导航 */
.glass-nav {
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
```

### 1.2 字体系统

| 层级 | 大小 | 字重 | 行高 | 字间距 | 用途 |
|------|------|------|------|--------|------|
| Display | `clamp(3rem, 8vw, 5rem)` | 700 | 1.05 | -0.03em | Hero 主标题 |
| H1 | `clamp(2.25rem, 5vw, 3.5rem)` | 700 | 1.1 | -0.02em | 页面标题 |
| H2 | `clamp(1.5rem, 3vw, 2rem)` | 600 | 1.2 | -0.01em | 区块标题 |
| H3 | `1.125rem` | 600 | 1.4 | 0 | 卡片标题 |
| Body | `0.9375rem` | 400 | 1.65 | 0 | 正文 |
| Small | `0.8125rem` | 400 | 1.5 | 0 | 辅助文字 |
| Caption | `0.75rem` | 500 | 1.4 | 0.02em | 标签、徽章 |

### 1.3 间距与圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | `0.375rem` | 小按钮、标签 |
| `--radius-md` | `0.625rem` | 输入框、小卡片 |
| `--radius-lg` | `0.875rem` | 卡片、面板 |
| `--radius-xl` | `1.25rem` | 大卡片、模态框 |
| `--radius-2xl` | `1.5rem` | 特殊卡片 |
| `--radius-full` | `9999px` | 按钮、头像 |

### 1.4 动画系统

| 动画 | 时长 | 缓动 | 用途 |
|------|------|------|------|
| Fade Up | `0.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` | 元素入场 |
| Scale In | `0.5s` | `cubic-bezier(0.16, 1, 0.3, 1)` | 卡片展开 |
| Slide | `0.3s` | `cubic-bezier(0.4, 0, 0.2, 1)` | 侧边栏、抽屉 |
| Hover | `0.2s` | `ease` | 悬停状态 |
| Glow Pulse | `3s` | `ease-in-out` | 光效呼吸 |

---

## 二、布局系统 (Layout System)

### 2.1 公共页面布局 (Public Layout)

参考 OpenRouter 首页布局：

```
┌─────────────────────────────────────────────┐
│  [Floating Navbar - 滚动时变形为胶囊]          │
├─────────────────────────────────────────────┤
│                                             │
│           ┌─────────────────┐               │
│           │   Hero Section  │               │
│           │  (Gradient Glow)│               │
│           └─────────────────┘               │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │        Content Section               │    │
│  │     (Models / Features / Stats)      │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │        CTA / Footer Section          │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**导航栏行为：**
- 初始状态：全宽透明导航
- 滚动后：`max-width: 52rem` 的浮动胶囊，带 `backdrop-blur-2xl` 和微弱边框

### 2.2 应用内布局 (App Layout)

参考 OpenRouter Dashboard / Chat 布局：

```
┌─────────────────────────────────────────────────────┐
│  [App Header - Minimal, with Breadcrumb & Actions]   │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │         Main Content Area                │
│ (Collapsible, │   - Models Grid / Table              │
│  Icon-only)   │   - Chat Interface                   │
│          │   - Dashboard Cards                    │
│          │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

**侧边栏设计：**
- 折叠状态：仅显示图标，宽度 `4rem`
- 展开状态：图标 + 文字，宽度 `16rem`
- 悬浮显示子菜单
- 当前项高亮：左侧 2px 紫色指示条 + 背景高亮

### 2.3 聊天界面布局 (Chat Layout)

参考 OpenRouter Chat：

```
┌──────────┬──────────────────────────────────────────┐
│          │  [Model Selector Bar]                    │
│  Chat    ├──────────────────────────────────────────┤
│  History │                                          │
│          │         Message Area                     │
│  - Chat 1│         ┌─────────────┐                  │
│  - Chat 2│         │ User Msg    │                  │
│  - Chat 3│         └─────────────┘                  │
│          │              ┌──────────────────┐        │
│          │              │ Assistant Msg    │        │
│          │              └──────────────────┘        │
│          │                                          │
│          ├──────────────────────────────────────────┤
│          │  [Input Area with Suggestions]           │
│          │  ┌────────────────────────────────────┐  │
│          │  │  Ask anything...              [Send]│  │
│          │  └────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────┘
```

---

## 三、页面重构方案

### 3.1 首页 (Home Page)

#### Hero 区域重构

**当前：** 简单的渐变背景 + 标题 + 按钮

**目标 (OpenRouter 风格)：**
- **背景**：多层紫蓝渐变光晕 + 微妙的网格点阵图案
- **标题**：超大号粗体，关键词使用紫粉渐变文字
- **副标题**：半透明白色，限制最大宽度
- **状态徽章**：顶部的实时状态指示器（绿色圆点 + 文字）
- **CTA 按钮**：主按钮使用紫色渐变背景，悬停时光晕增强
- **终端演示**：保留现有终端动画，增加 glassmorphism 边框

```tsx
// Hero 新设计元素
<section className="relative overflow-hidden">
  {/* 多层渐变光晕背景 */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]" />
    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px]" />
  </div>

  {/* 网格点阵 */}
  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

  {/* 内容 */}
  <div className="relative z-10 text-center">
    <Badge variant="glow">AI gateway, model directory, and observability</Badge>
    <h1 className="text-gradient">A unified AI gateway</h1>
    <p className="text-muted-foreground max-w-lg mx-auto">...</p>
    <div className="flex gap-3 justify-center">
      <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">Get Started</Button>
      <Button variant="outline">View Pricing</Button>
    </div>
  </div>
</section>
```

#### Stats 区域重构

**目标：**
- 横向排列的统计卡片
- 数字使用大字重 + 渐变文字效果
- 卡片使用 glassmorphism 效果
- 添加计数动画

#### Features 区域重构

**当前：** Bento Grid 布局

**目标：**
- 保留 Bento Grid，增强视觉层次
- 每个卡片增加 hover 时的光晕边框效果
- 图标使用渐变背景圆形
- 添加 micro-interactions

### 3.2 模型目录页 (Pricing/Models Page)

参考 OpenRouter `/models` 页面：

#### 页面头部

```
┌────────────────────────────────────────────────────────────┐
│  MODELS DIRECTORY                                          │
│  Compare models before you route traffic                   │
│  [Search Bar____________________________________] [Filters]│
│  [All] [Text] [Image] [Audio] [Free only] [Sorted by: ▼]   │
└────────────────────────────────────────────────────────────┘
```

#### 模型卡片设计 (Grid View)

```
┌─────────────────────────────────────┐
│ [Provider Logo]  Model Name         │
│                  provider/model-id   │
│                                     │
│  [Vision] [Tools] [JSON] [🟢 Fast]  │
│                                     │
│  Context: 128K                      │
│                                     │
│  ┌─────────────┐  ┌─────────────┐   │
│  │ $0.50/M     │  │ $1.50/M     │   │
│  │ Input       │  │ Output      │   │
│  └─────────────┘  └─────────────┘   │
│                                     │
│  [Try] [API]                        │
└─────────────────────────────────────┘
```

**卡片设计要点：**
- 深色背景 + 微弱边框
- Hover 时边框变为紫色渐变
- 顶部有提供商图标/标识
- 能力标签使用小圆点 + 文字
- 价格信息清晰突出
- 悬停时微微上浮 + 阴影增强

#### 表格视图 (Table View)

- 深色表头
- 悬停行高亮
- 价格列右对齐，等宽字体
- 能力列使用图标表示

#### 筛选面板

- 左侧固定筛选面板（桌面端）
- 移动端使用抽屉
- 筛选器：提供商、能力、价格范围、排序
- 实时结果计数

### 3.3 聊天界面 (Playground/Chat)

参考 OpenRouter `/chat`：

#### 侧边栏设计

```
┌────────┐
│ [Logo] │
├────────┤
│ [+ New]│  ← 新建对话按钮，突出显示
├────────┤
│ Today  │
│ ├ Chat │
│ ├ Chat │
│ Yesterday│
│ ├ Chat │
│ ├ Chat │
├────────┤
│ [⚙️]   │  ← 设置
│ [👤]   │  ← 用户
└────────┘
```

#### 消息区域

**用户消息：**
- 右对齐
- 深色背景胶囊形状
- 无头像

**助手消息：**
- 左对齐
- 透明背景
- 模型图标/头像在左侧
- 流式输出时光标闪烁

**消息操作栏：**
- 复制、重新生成、编辑、删除
- 默认隐藏，hover 时显示
- 最后一条消息始终显示操作栏

#### 输入区域

```
┌──────────────────────────────────────────────────┐
│  [Model: GPT-4 ▼]  [Group: default ▼]           │
├──────────────────────────────────────────────────┤
│                                                  │
│  Ask anything...                            [➤] │
│                                                  │
│  [📎] [🔍] [💡 Analyze] [💡 Code] [💡 More]     │
│                                                  │
└──────────────────────────────────────────────────┘
```

**输入框设计：**
- 圆角大输入框
- 底部工具栏：附件、搜索、快捷建议
- 发送按钮在右侧，紫色渐变
- 生成中时显示停止按钮

### 3.4 Rankings 页面

参考 OpenRouter 排行榜设计：
- 深色表格，交替行背景
- 趋势指示器（上升/下降箭头 + 颜色）
- 图表区域使用渐变填充
- 时间选择器使用胶囊按钮组

---

## 四、组件重构清单

### 4.1 新增组件

| 组件名 | 用途 | 位置 |
|--------|------|------|
| `GradientBadge` | 带渐变光效的徽章 | `components/ui/` |
| `GradientText` | 渐变文字效果 | `components/ui/` |
| `GlowCard` | 带光晕边框的卡片 | `components/ui/` |
| `ModelCard` | 模型展示卡片 | `features/pricing/components/` |
| `ModelFilter` | 模型筛选面板 | `features/pricing/components/` |
| `ChatSidebar` | 聊天历史侧边栏 | `features/chat/components/` |
| `ChatInput` | 聊天输入框 | `features/chat/components/` |
| `MessageBubble` | 消息气泡 | `features/chat/components/` |
| `FloatingNav` | 浮动导航栏 | `components/layout/` |

### 4.2 改造组件

| 组件 | 改造内容 |
|------|---------|
| `PublicHeader` | 增强滚动动画，优化胶囊变形效果 |
| `Hero` | 增强渐变光晕，优化排版层级 |
| `Features` | 增加 hover 光效，优化 Bento Grid |
| `PricingTable` | 深色表格样式，行悬停效果 |
| `PlaygroundInput` | 更现代化的输入框设计 |
| `PlaygroundChat` | 消息气泡样式优化 |
| `Footer` | 增加渐变分割线 |
| `AppSidebar` | 增加当前项指示条 |

---

## 五、动效与交互

### 5.1 页面加载动画

- 内容区域依次 fade-up 进入
- 使用 stagger delay：`0ms, 80ms, 160ms, 240ms`
- 缓动函数：`cubic-bezier(0.16, 1, 0.3, 1)`

### 5.2 滚动触发动画

- 使用 Intersection Observer
- 元素进入视口时触发 `fade-up` 或 `scale-in`
- 表格行依次进入（stagger）

### 5.3 Hover 效果

- 卡片：上浮 2px + 阴影增强 + 边框光晕
- 按钮：背景渐变位移 / 缩放 0.98（按下）
- 链接：下划线动画
- 表格行：背景色过渡

### 5.4 光效动画

- Hero 区域光晕缓慢呼吸（`3s ease-in-out infinite`）
- 渐变背景缓慢旋转（可选）
- 状态指示器脉冲动画

---

## 六、响应式适配

### 断点定义

| 断点 | 宽度 | 适配策略 |
|------|------|---------|
| `sm` | `640px` | 移动端基础 |
| `md` | `768px` | 平板竖屏 |
| `lg` | `1024px` | 平板横屏 / 小桌面 |
| `xl` | `1280px` | 标准桌面 |
| `2xl` | `1536px` | 大桌面 |

### 各页面响应式策略

- **Home Hero**：字体使用 `clamp()` 自适应，按钮在小屏堆叠
- **Models Grid**：`grid-cols-1` → `md:grid-cols-2` → `xl:grid-cols-3` → `2xl:grid-cols-4`
- **Chat Sidebar**：移动端使用抽屉，桌面端固定
- **Pricing Table**：小屏横向滚动

---

## 七、实施优先级

### Phase 1: 基础设计系统 (高优先级)
1. [ ] 更新 `theme.css` 色彩变量
2. [ ] 更新 `index.css` 工具类与动画
3. [ ] 创建 `GradientBadge`, `GradientText`, `GlowCard` 组件

### Phase 2: 布局与导航 (高优先级)
4. [ ] 重构 `PublicHeader` 滚动动画
5. [ ] 重构 `Footer` 样式
6. [ ] 优化 `AppSidebar` 交互

### Phase 3: 核心页面 (中优先级)
7. [ ] 重构 `Hero` 组件
8. [ ] 重构 `Features` 组件
9. [ ] 重构 `Pricing/Models` 页面
10. [ ] 重构 `Playground` 聊天界面

### Phase 4: 细节优化 (低优先级)
11. [ ] 添加页面加载动画
12. [ ] 优化所有 hover 效果
13. [ ] 添加滚动触发动画
14. [ ] 响应式细节调优

---

## 八、参考截图与样式

### OpenRouter 首页特征
- 深邃黑色背景 (`#0a0a0f`)
- 紫色/蓝色渐变光晕在背景中
- 中央大标题使用渐变文字
- 简洁的导航，滚动后变为浮动胶囊
- 卡片使用深色背景 + 微妙边框

### OpenRouter Models 页特征
- 大型搜索框居中
- 筛选标签横向排列
- 模型卡片网格布局
- 卡片内显示模型名、提供商、能力标签、价格
- 能力标签：Vision, Tools, JSON Mode 等

### OpenRouter Chat 页特征
- 左侧窄边栏（聊天历史）
- 顶部模型选择器
- 中央消息区域
- 底部大输入框
- 消息使用简洁的气泡样式
- 用户消息右对齐，助手消息左对齐带头像
