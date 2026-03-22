import { describe, expect, it } from 'vitest'
import { getModelsForEncoding } from '../types'
import { getUsagePercentage, tokenizeText } from './tokenization'

describe('tokenization helpers', () => {
  it('tokenizes text with the selected model mapping', () => {
    const result = tokenizeText('Hello Azure OpenAI', 'gpt-5')

    expect(result.encoding).toBe('o200k_base')
    expect(result.tokenCount).toBeGreaterThan(0)
    expect(result.tokens[0]?.displayValue.length).toBeGreaterThan(0)
  })

  it('returns curated models for an encoding', () => {
    const models = getModelsForEncoding('cl100k_base')

    expect(models.map((model) => model.id)).toContain('gpt-35-turbo')
  })

  it('caps usage percentage at 100', () => {
    expect(getUsagePercentage(20_000, 8_192)).toBe(100)
  })
})
