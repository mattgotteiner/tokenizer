import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the tokenizer app shell', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Tokenizer' })).toBeInTheDocument()
    expect(screen.getByLabelText('Input text')).toBeInTheDocument()
  })

  it('updates token metadata when the selected model changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Settings' }))
    await user.selectOptions(screen.getByLabelText('GPT model family'), 'gpt-35-turbo')

    expect(screen.getByText('GPT-35 Turbo uses cl100k_base')).toBeInTheDocument()
  })
})
