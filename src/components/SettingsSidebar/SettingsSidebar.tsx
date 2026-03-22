import { Button } from '@mattgotteiner/spa-ui-controls'
import { useEffect } from 'react'
import {
  THEME_OPTIONS,
  type AppSettings,
  type EncodingDefinition,
  getTokenizerSelections,
} from '../../types'
import './SettingsSidebar.css'

interface SettingsSidebarProps {
  encoding: EncodingDefinition
  isOpen: boolean
  onClose: () => void
  onReset: () => void
  onUpdate: (updates: Partial<AppSettings>) => void
  settings: AppSettings
}

export function SettingsSidebar({
  encoding,
  isOpen,
  onClose,
  onReset,
  onUpdate,
  settings,
}: SettingsSidebarProps): React.ReactElement {
  const tokenizerSelections = getTokenizerSelections()

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
            <h3 className="settings-section__title">Tokenizer family</h3>
            <p className="settings-section__notice">
              Choose the tokenizer behavior you want to inspect. Azure OpenAI model families that
              share that tokenizer are shown under each option.
            </p>

            <div className="settings-sidebar__tokenizer-options" role="radiogroup">
              {tokenizerSelections.map((selection) => {
                const isSelected = encoding.id === selection.encoding.id

                return (
                  <label
                    key={selection.encoding.id}
                    className={`settings-sidebar__tokenizer-option${isSelected ? ' settings-sidebar__tokenizer-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="tokenizer-family"
                      className="settings-sidebar__tokenizer-radio"
                      aria-label={`Select ${selection.encoding.label} tokenizer family`}
                      checked={isSelected}
                      onChange={() => onUpdate({ modelId: selection.encoding.representativeModelId })}
                    />
                    <span className="settings-sidebar__tokenizer-body">
                      <span className="settings-sidebar__tokenizer-header">
                        <span className="settings-sidebar__tokenizer-title">
                          {selection.encoding.label}
                        </span>
                        <span className="settings-sidebar__tokenizer-badge">
                          Default family: {selection.representativeModel.label}
                        </span>
                      </span>
                      <span className="settings-sidebar__tokenizer-summary">
                        {selection.encoding.summary}
                      </span>
                      <span className="settings-sidebar__tokenizer-families-label">
                        Azure families
                      </span>
                      <span className="settings-sidebar__tokenizer-families">
                        {selection.modelFamilies.map((model) => model.label).join(', ')}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section__title">Notes</h3>
            <p className="settings-section__notice">
              These mappings are curated for common Azure OpenAI GPT deployments and are best used
              as a practical testing reference.
            </p>
            <p className="settings-section__notice">
              {encoding.notes}
            </p>
            <p className="settings-section__notice">
              Token counts come from the selected tokenizer family, while the active Azure family is
              kept as a deterministic representative mapping for this app.
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
