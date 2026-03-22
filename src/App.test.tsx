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

    await user.click(screen.getByRole('button', { name: 'Open settings' }))
    await user.click(screen.getByLabelText('Select cl100k_base tokenizer family'))

    expect(screen.getByText('cl100k_base tokenizer')).toBeInTheDocument()
    expect(screen.getByText(/Active Azure family: GPT-4 Turbo\./)).toBeInTheDocument()
  })
})
