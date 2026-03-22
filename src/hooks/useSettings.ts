import { useEffect, useState } from 'react'
import {
  APP_SETTINGS_STORAGE_KEY,
  DEFAULT_SETTINGS,
  MODEL_DEFINITIONS,
  THEME_OPTIONS,
  type AppSettings,
  type ModelId,
  type Theme,
} from '../types'
import { getStoredValue, setStoredValue } from '../utils/localStorage'

interface PersistedSettings {
  modelId?: unknown
  theme?: unknown
}

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && THEME_OPTIONS.includes(value as Theme)
}

function isModelId(value: unknown): value is ModelId {
  return (
    typeof value === 'string' &&
    MODEL_DEFINITIONS.some((model) => model.id === value)
  )
}

function normalizeSettings(candidate: PersistedSettings): AppSettings {
  return {
    modelId: isModelId(candidate.modelId) ? candidate.modelId : DEFAULT_SETTINGS.modelId,
    theme: isTheme(candidate.theme) ? candidate.theme : DEFAULT_SETTINGS.theme,
  }
}

export interface UseSettingsReturn {
  resetSettings: () => void
  settings: AppSettings
  updateSettings: (updates: Partial<AppSettings>) => void
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<AppSettings>(() =>
    normalizeSettings(getStoredValue<PersistedSettings>(APP_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS)),
  )

  useEffect(() => {
    setStoredValue(APP_SETTINGS_STORAGE_KEY, settings)
  }, [settings])

  return {
    resetSettings: () => setSettings(DEFAULT_SETTINGS),
    settings,
    updateSettings: (updates) =>
      setSettings((currentSettings) => normalizeSettings({ ...currentSettings, ...updates })),
  }
}
