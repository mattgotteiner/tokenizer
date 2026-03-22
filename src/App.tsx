import { useEffect, useMemo, useState } from 'react'
import {
  AppShell,
  Panel,
  ThemeProvider,
  TopBar,
  useTheme,
} from '@mattgotteiner/spa-ui-controls'
import './App.css'
import { SettingsButton } from './components/SettingsButton/SettingsButton'
import { SettingsSidebar } from './components/SettingsSidebar/SettingsSidebar'
import { TokenInput } from './components/TokenInput/TokenInput'
import { TokenResults } from './components/TokenResults/TokenResults'
import { SettingsProvider, useSettingsContext } from './context/SettingsContext'
import { getEncodingDefinition } from './types'
import type { Theme } from './types'
import { tokenizeText } from './utils/tokenization'

interface ThemeSettingsSyncProps {
  theme: Theme
}

function ThemeSettingsSync({ theme }: ThemeSettingsSyncProps): React.ReactElement | null {
  const { setTheme, theme: activeTheme } = useTheme()

  useEffect(() => {
    if (activeTheme !== theme) {
      setTheme(theme)
    }
  }, [activeTheme, setTheme, theme])

  return null
}

function AppContent(): React.ReactElement {
  const { settings, resetSettings, updateSettings } = useSettingsContext()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [inputText, setInputText] = useState(
    'Azure OpenAI tokenization is easiest to reason about when you can inspect the pieces, not just the count.',
  )

  const result = useMemo(
    () => tokenizeText(inputText, settings.modelId),
    [inputText, settings.modelId],
  )

  const activeEncoding = getEncodingDefinition(result.encoding)

  return (
    <ThemeProvider initialTheme={settings.theme} persist={false}>
      <ThemeSettingsSync theme={settings.theme} />
      <AppShell
        header={
          <TopBar
            title={
              <div className="app-title-block">
                <h1>Tokenizer</h1>
              </div>
            }
            subtitle="Paste text, switch tokenizer families, and inspect how common Azure OpenAI GPT deployments tokenize input locally in the browser."
            trailing={
                <SettingsButton onClick={() => setIsSettingsOpen(true)} />
            }
          />
        }
      >
          <div className="app-layout">
            <Panel as="section">
              <TokenInput
                inputText={inputText}
                onClear={() => setInputText('')}
                onInputChange={setInputText}
                onLoadSample={() =>
                  setInputText(
                    'Tokenization matters when you are budgeting prompt size, comparing deployment families, and understanding how much context your Azure OpenAI request will consume.',
                  )
                }
                result={result}
              />
            </Panel>

            <Panel as="section">
              <TokenResults result={result} />
            </Panel>
          </div>

          <SettingsSidebar
            encoding={activeEncoding}
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onReset={resetSettings}
            onUpdate={updateSettings}
            settings={settings}
          />
        </AppShell>
    </ThemeProvider>
  )
}

function App(): React.ReactElement {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  )
}

export default App
