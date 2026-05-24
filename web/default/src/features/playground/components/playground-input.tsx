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
import { useState } from 'react'
import {
  PaperclipIcon,
  FileIcon,
  ImageIcon,
  ScreenShareIcon,
  CameraIcon,
  GlobeIcon,
  SendIcon,
  SquareIcon,
  Sparkles,
  Code2,
  FileText,
  Lightbulb,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input'
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { ModelGroupSelector } from '@/components/model-group-selector'
import type { ModelOption, GroupOption } from '../types'

interface PlaygroundInputProps {
  onSubmit: (text: string) => void
  onStop?: () => void
  disabled?: boolean
  isGenerating?: boolean
  models: ModelOption[]
  modelValue: string
  onModelChange: (value: string) => void
  isModelLoading?: boolean
  groups: GroupOption[]
  groupValue: string
  onGroupChange: (value: string) => void
}

const suggestions = [
  { icon: Sparkles, text: 'Analyze data', color: '#818cf8' },
  { icon: Lightbulb, text: 'Surprise me', color: '#c084fc' },
  { icon: FileText, text: 'Summarize text', color: '#f472b6' },
  { icon: Code2, text: 'Write code', color: '#60a5fa' },
]

export function PlaygroundInput({
  onSubmit,
  onStop,
  disabled,
  isGenerating,
  models,
  modelValue,
  onModelChange,
  isModelLoading = false,
  groups,
  groupValue,
  onGroupChange,
}: PlaygroundInputProps) {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const isModelSelectDisabled =
    disabled || isModelLoading || models.length === 0
  const isGroupSelectDisabled = disabled || groups.length === 0

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim() || disabled) return
    onSubmit(message.text)
    setText('')
  }

  const handleFileAction = (action: string) => {
    toast.info(t('Feature in development'), {
      description: action,
    })
  }

  const handleSuggestionClick = (suggestion: string) => {
    onSubmit(suggestion)
  }

  return (
    <div className='grid shrink-0 gap-3 px-1 pb-2 md:pb-4'>
      <div className='mx-auto w-full max-w-4xl'>
        <PromptInput
          groupClassName='rounded-2xl border border-border/50 bg-card/80 shadow-lg shadow-black/5 dark:shadow-black/10 backdrop-blur-sm transition-all duration-300 focus-within:border-primary/30 focus-within:shadow-[0_0_24px_-8px_oklch(0.6_0.18_280_/0.15)]'
          onSubmit={handleSubmit}
        >
          <PromptInputTextarea
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck={false}
            className='px-5 py-4 md:text-base bg-transparent resize-none'
            disabled={disabled}
            onChange={(event) => setText(event.target.value)}
            placeholder={t('Ask anything...')}
            value={text}
            rows={1}
          />

          <PromptInputFooter className='px-3 py-2.5'>
            <PromptInputTools className='gap-1.5'>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <PromptInputButton
                      className='border-border/40 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:border-border/60 rounded-lg h-8 px-2.5'
                      disabled={disabled}
                      variant='outline'
                    />
                  }
                >
                  <PaperclipIcon size={15} />
                  <span className='hidden sm:inline text-xs'>{t('Attach')}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='rounded-xl'>
                  <DropdownMenuItem
                    onClick={() => handleFileAction('upload-file')}
                  >
                    <FileIcon className='mr-2' size={15} />
                    {t('Upload file')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFileAction('upload-photo')}
                  >
                    <ImageIcon className='mr-2' size={15} />
                    {t('Upload photo')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFileAction('take-screenshot')}
                  >
                    <ScreenShareIcon className='mr-2' size={15} />
                    {t('Take screenshot')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFileAction('take-photo')}
                  >
                    <CameraIcon className='mr-2' size={15} />
                    {t('Take photo')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <PromptInputButton
                className='border-border/40 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:border-border/60 rounded-lg h-8 px-2.5'
                disabled={disabled}
                onClick={() => toast.info(t('Search feature in development'))}
                variant='outline'
              >
                <GlobeIcon size={15} />
                <span className='hidden sm:inline text-xs'>{t('Search')}</span>
              </PromptInputButton>
            </PromptInputTools>

            <div className='flex items-center gap-2'>
              <ModelGroupSelector
                selectedModel={modelValue}
                models={models}
                onModelChange={onModelChange}
                selectedGroup={groupValue}
                groups={groups}
                onGroupChange={onGroupChange}
                disabled={isModelSelectDisabled || isGroupSelectDisabled}
              />

              {isGenerating && onStop ? (
                <PromptInputButton
                  className='text-foreground font-medium rounded-xl h-9 w-9 p-0 bg-muted hover:bg-muted/80 border border-border/40 transition-all duration-200'
                  onClick={onStop}
                  variant='secondary'
                >
                  <SquareIcon className='fill-current' size={14} />
                </PromptInputButton>
              ) : (
                <PromptInputButton
                  className='text-white font-medium rounded-xl h-9 w-9 p-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100'
                  disabled={disabled || !text.trim()}
                  type='submit'
                  variant='secondary'
                >
                  <SendIcon size={15} />
                </PromptInputButton>
              )}
            </div>
          </PromptInputFooter>
        </PromptInput>

        <Suggestions className='mt-3 justify-center'>
          {suggestions.map(({ icon: Icon, text, color }) => (
            <Suggestion
              className='text-xs font-normal rounded-full px-3 py-1.5 border border-border/30 bg-background/50 hover:bg-muted/80 hover:border-border/50 transition-all duration-200'
              key={text}
              onClick={() => handleSuggestionClick(text)}
              suggestion={text}
            >
              {Icon && <Icon size={14} style={{ color }} />}
              {text}
            </Suggestion>
          ))}
        </Suggestions>
      </div>
    </div>
  )
}
