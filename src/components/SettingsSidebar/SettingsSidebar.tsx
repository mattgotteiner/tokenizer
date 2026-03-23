import { Button, SettingsDrawer } from '@mattgotteiner/spa-ui-controls'
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

  return (
    <SettingsDrawer
      footer={
        <Button variant="danger" onClick={onReset}>
          Reset defaults
        </Button>
      }
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      width={400}
    >
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
          <div
            className="settings-sidebar__tokenizer-options"
            role="radiogroup"
            aria-label="Tokenizer family"
          >
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
                    <span className="settings-sidebar__tokenizer-title">
                      {selection.encoding.label}
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
      </div>
    </SettingsDrawer>
  )
}
