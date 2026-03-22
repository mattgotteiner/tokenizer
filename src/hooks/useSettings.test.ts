import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { APP_SETTINGS_STORAGE_KEY } from '../types'
import { useSettings } from './useSettings'

describe('useSettings', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('loads defaults when storage is empty', () => {
    const { result } = renderHook(() => useSettings())

    expect(result.current.settings.modelId).toBe('gpt-5')
    expect(result.current.settings.theme).toBe('system')
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useSettings())

    act(() => {
      result.current.updateSettings({ modelId: 'gpt-4o-mini', theme: 'dark' })
    })

    const persisted = JSON.parse(window.localStorage.getItem(APP_SETTINGS_STORAGE_KEY) ?? '{}')

    expect(persisted.modelId).toBe('gpt-4o-mini')
    expect(persisted.theme).toBe('dark')
  })
})
