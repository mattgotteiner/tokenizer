import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { tokenizeText } from '../../utils/tokenization'
import { TokenResults } from './TokenResults'

describe('TokenResults', () => {
  it('renders highlighted tokenized text instead of the old context graphs and token id table', () => {
    const result = tokenizeText('Hello Azure OpenAI', 'gpt-5')

    render(<TokenResults result={result} />)

    expect(screen.getByRole('heading', { name: 'Highlighted tokenization' })).toBeInTheDocument()
    expect(screen.queryByText('Approximate context usage')).not.toBeInTheDocument()
    expect(screen.queryByText('Token ID')).not.toBeInTheDocument()
    expect(screen.getByTestId('tokenized-text')).toHaveTextContent('Hello Azure OpenAI')
  })

  it('shows the empty state copy without referring to token ids', () => {
    const result = tokenizeText('', 'gpt-5')

    render(<TokenResults result={result} />)

    expect(screen.getByText('Nothing to tokenize yet')).toBeInTheDocument()
    expect(screen.queryByText(/token IDs/i)).not.toBeInTheDocument()
  })
})
