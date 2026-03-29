import { Button, ThemeToggle } from '@mattgotteiner/spa-ui-controls'
import {
  type AppSettings,
  type EncodingDefinition,
  getTokenizerSelections,
} from '../../types'
import './SettingsPanel.css'

interface SettingsPanelProps {
  encoding: EncodingDefinition
  onReset: () => void
  onUpdate: (updates: Partial<AppSettings>) => void
  settings: AppSettings
}

export function SettingsPanel({
  encoding,
  onReset,
  onUpdate,
  settings,
}: SettingsPanelProps): React.ReactElement {
  const tokenizerSelections = getTokenizerSelections()

  return (
    <div className="settings-panel">
      <section className="settings-section">
        <h3 className="settings-section__title">Appearance</h3>

        <div className="settings-field">
          <span className="settings-field__label">Theme</span>
          <ThemeToggle
            className="settings-field__theme-toggle"
            onChange={(theme) => onUpdate({ theme })}
            value={settings.theme}
          />
        </div>
      </section>

      <section className="settings-section">
        <h3 className="settings-section__title">Tokenizer family</h3>

        <div className="settings-tokenizer-options" role="radiogroup" aria-label="Tokenizer family">
          {tokenizerSelections.map((selection) => {
            const isSelected = encoding.id === selection.encoding.id

            return (
              <label
                key={selection.encoding.id}
                className={`settings-tokenizer-option${isSelected ? ' settings-tokenizer-option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name="tokenizer-family"
                  className="settings-tokenizer-option__radio"
                  aria-label={`Select ${selection.encoding.label} tokenizer family`}
                  checked={isSelected}
                  onChange={() => onUpdate({ modelId: selection.encoding.representativeModelId })}
                />
                <span className="settings-tokenizer-option__body">
                  <span className="settings-tokenizer-option__title">{selection.encoding.label}</span>
                  <span className="settings-tokenizer-option__details">
                    {selection.modelFamilies.map((model) => model.label).join(', ')}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
      </section>

      <section className="settings-section settings-section--clear">
        <h3 className="settings-section__title">Reset</h3>
        <Button variant="danger" onClick={onReset}>
          Reset defaults
        </Button>
      </section>
    </div>
  )
}
