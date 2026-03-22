import type { TokenPiece, TokenizationResult } from '../../types'
import './TokenResults.css'

interface TokenResultsProps {
  result: TokenizationResult
}

function getRenderedTokenValue(token: TokenPiece): string {
  if (token.value.length === 0 || !/\S/u.test(token.value)) {
    return token.displayValue
  }

  return token.value
}

export function TokenResults({ result }: TokenResultsProps): React.ReactElement {
  if (result.text.length === 0) {
    return (
      <div className="token-results token-results--empty">
        <p className="token-results__eyebrow">Results</p>
        <h2>Nothing to tokenize yet</h2>
        <p>Paste text on the left to inspect token boundaries, token pieces, and tokenizer metadata.</p>
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
          <span>Tokenizer</span>
          <strong>{result.encoding}</strong>
        </article>
      </div>

      <div className="token-results__visualization">
        <div className="token-results__section-header">
          <div>
            <h3>Highlighted tokenization</h3>
            <p>Original text, split exactly where the selected tokenizer breaks it apart.</p>
          </div>
        </div>

        <div
          aria-label="Highlighted tokenized text"
          className="token-results__tokenized-text"
          data-testid="tokenized-text"
        >
          {result.tokens.map((token) => (
            <span
              key={`${token.index}-${token.tokenId}`}
              aria-label={`Piece ${token.index + 1}: ${token.displayValue}`}
              className={`token-results__token token-results__token--tone-${(token.index % 8) + 1}`}
              title={`Piece ${token.index + 1}: ${token.displayValue}`}
            >
              {getRenderedTokenValue(token)}
            </span>
          ))}
        </div>

        <p className="token-results__visualization-note">
          Pure whitespace segments use visible markers: <code>␠</code> for spaces, <code>↵</code>{' '}
          for line breaks, and <code>⇥</code> for tabs.
        </p>
      </div>
    </div>
  )
}
