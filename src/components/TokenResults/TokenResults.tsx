import { getUsagePercentage } from '../../utils/tokenization'
import type { TokenizationResult } from '../../types'
import './TokenResults.css'

const CONTEXT_WINDOWS = [
  { label: '8K', size: 8_192 },
  { label: '32K', size: 32_768 },
  { label: '128K', size: 128_000 },
] as const

interface TokenResultsProps {
  result: TokenizationResult
}

export function TokenResults({ result }: TokenResultsProps): React.ReactElement {
  if (result.text.length === 0) {
    return (
      <div className="token-results token-results--empty">
        <p className="token-results__eyebrow">Results</p>
        <h2>Nothing to tokenize yet</h2>
        <p>Paste text on the left to inspect token IDs, token pieces, and tokenizer metadata.</p>
      </div>
    )
  }

  return (
    <div className="token-results">
      <div className="token-results__header">
        <div>
          <p className="token-results__eyebrow">Results</p>
          <h2>Token breakdown</h2>
        </div>
        <div className="token-results__pill">{result.encoding}</div>
      </div>

      <div className="token-results__summary-grid">
        <article>
          <span>Total tokens</span>
          <strong>{result.tokenCount.toLocaleString()}</strong>
        </article>
        <article>
          <span>Unique tokens</span>
          <strong>{result.uniqueTokenCount.toLocaleString()}</strong>
        </article>
        <article>
          <span>Chars / token</span>
          <strong>{result.averageCharactersPerToken.toFixed(2)}</strong>
        </article>
        <article>
          <span>Model family</span>
          <strong>{result.model.label}</strong>
        </article>
      </div>

      <div className="token-results__context">
        <h3>Approximate context usage</h3>
        <div className="token-results__context-list">
          {CONTEXT_WINDOWS.map((window) => (
            <div key={window.label} className="token-results__context-item">
              <div className="token-results__context-header">
                <span>{window.label}</span>
                <strong>{getUsagePercentage(result.tokenCount, window.size).toFixed(1)}%</strong>
              </div>
              <div className="token-results__bar">
                <div
                  className="token-results__bar-fill"
                  style={{ width: `${getUsagePercentage(result.tokenCount, window.size)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-results__table-wrap">
        <table className="token-results__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Token ID</th>
              <th>Decoded piece</th>
              <th>Raw value</th>
            </tr>
          </thead>
          <tbody>
            {result.tokens.map((token) => (
              <tr key={`${token.index}-${token.tokenId}`}>
                <td>{token.index + 1}</td>
                <td>{token.tokenId}</td>
                <td>
                  <code>{token.displayValue}</code>
                </td>
                <td>
                  <code>{JSON.stringify(token.value)}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
