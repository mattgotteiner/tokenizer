import { Button, FormField } from '@mattgotteiner/spa-ui-controls'
import type { TokenizationResult } from '../../types'
import './TokenInput.css'

interface TokenInputProps {
  inputText: string
  onClear: () => void
  onInputChange: (value: string) => void
  onLoadSample: () => void
  result: TokenizationResult
}

export function TokenInput({
  inputText,
  onClear,
  onInputChange,
  onLoadSample,
  result,
}: TokenInputProps): React.ReactElement {
  return (
    <div className="token-input">
      <div className="token-input__header">
        <div>
          <p className="token-input__eyebrow">Composer</p>
          <h2>Paste text to tokenize</h2>
        </div>
        <div className="token-input__stats">
          {result.charCount.toLocaleString()} chars • {result.lineCount.toLocaleString()} lines
        </div>
      </div>

      <p className="token-input__helper">
        This browser-only tool uses a tiktoken-compatible encoder to estimate how your selected
        Azure OpenAI tokenizer family will split input into tokens.
      </p>

      <FormField
        htmlFor="token-input-textarea"
        label="Input text"
        hint={`Current tokenizer: ${result.encoding} • active family: ${result.model.label}`}
      >
        <textarea
          id="token-input-textarea"
          className="token-input__textarea"
          aria-label="Input text"
          placeholder="Paste prompt text, system instructions, or a representative user message."
          rows={14}
          value={inputText}
          onChange={(event) => onInputChange(event.target.value)}
        />
      </FormField>

      <div className="token-input__actions">
        <Button variant="secondary" onClick={onLoadSample}>
          Load sample
        </Button>
        <Button variant="ghost" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  )
}
