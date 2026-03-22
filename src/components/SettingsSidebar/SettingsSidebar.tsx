import { Button, FormField } from '@mattgotteiner/spa-ui-controls'
import { useEffect } from 'react'
import {
  MODEL_DEFINITIONS,
  THEME_OPTIONS,
  type AppSettings,
  type EncodingDefinition,
  type ModelDefinition,
} from '../../types'
import './SettingsSidebar.css'

interface SettingsSidebarProps {
  encoding: EncodingDefinition
  isOpen: boolean
  mappedModels: ModelDefinition[]
  onClose: () => void
  onReset: () => void
  onUpdate: (updates: Partial<AppSettings>) => void
  settings: AppSettings
}

export function SettingsSidebar({
  encoding,
  isOpen,
  mappedModels,
  onClose,
  onReset,
  onUpdate,
  settings,
}: SettingsSidebarProps): React.ReactElement {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return <></>
  }

  return (
    <div
      className="settings-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <aside
        aria-labelledby="settings-sidebar-title"
        aria-modal="true"
        className="settings-sidebar"
        role="dialog"
      >
        <div className="settings-sidebar__header">
          <h2 id="settings-sidebar-title" className="settings-sidebar__title">
            Settings
          </h2>
          <button
            type="button"
            className="settings-sidebar__close"
            onClick={onClose}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="settings-sidebar__content">
          <section className="settings-section">
            <h3 className="settings-section__title">Appearance</h3>

            <div className="settings-field">
              <span className="settings-field__label">Theme</span>
              <div className="settings-field__radio-group">
                {THEME_OPTIONS.map((theme) => (
                  <label key={theme} className="settings-field__radio-wrapper">
                    <input
                      type="radio"
                      name="theme"
                      className="settings-field__radio"
                      value={theme}
                      checked={settings.theme === theme}
                      onChange={() => onUpdate({ theme })}
                    />
                    <span className="settings-field__radio-label">
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section__title">Azure OpenAI target</h3>

            <FormField
              htmlFor="settings-model"
              label="GPT model family"
              hint="Choose the Azure OpenAI GPT family whose tokenizer behavior you want to inspect."
            >
              <select
                id="settings-model"
                className="settings-sidebar__control"
                value={settings.modelId}
                onChange={(event) =>
                  onUpdate({ modelId: event.target.value as AppSettings['modelId'] })
                }
              >
                {MODEL_DEFINITIONS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.label}
                  </option>
                ))}
              </select>
            </FormField>
          </section>

          <section className="settings-section">
            <h3 className="settings-section__title">Tokenizer mapping</h3>

            <dl className="mapping-list">
              <div>
                <dt>Tokenizer</dt>
                <dd>{encoding.label}</dd>
              </div>
              <div>
                <dt>Selected target</dt>
                <dd>{MODEL_DEFINITIONS.find((model) => model.id === settings.modelId)?.label}</dd>
              </div>
            </dl>

            <p className="settings-section__notice">{encoding.summary}</p>
            <p className="settings-section__notice">{encoding.notes}</p>

            <div className="settings-sidebar__mapping-card">
              <h4>AOAI GPT families sharing this tokenizer</h4>
              <ul className="settings-sidebar__model-list">
                {mappedModels.map((model) => (
                  <li key={model.id}>
                    <strong>{model.label}</strong>
                    <span>{model.notes}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section__title">Notes</h3>
            <p className="settings-section__notice">
              These mappings are curated for common Azure OpenAI GPT deployments and are best used
              as a practical testing reference.
            </p>
            <Button variant="danger" onClick={onReset}>
              Reset defaults
            </Button>
          </section>
        </div>
      </aside>
    </div>
  )
}
