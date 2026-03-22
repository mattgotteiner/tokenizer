import { Tiktoken } from 'js-tiktoken/lite'
import cl100kBase from 'js-tiktoken/ranks/cl100k_base'
import o200kBase from 'js-tiktoken/ranks/o200k_base'
import {
  getModelDefinition,
  type EncodingName,
  type ModelId,
  type TokenizationResult,
} from '../types'

const encoders: Record<EncodingName, Tiktoken> = {
  cl100k_base: new Tiktoken(cl100kBase),
  o200k_base: new Tiktoken(o200kBase),
}

function toDisplayValue(value: string): string {
  if (value.length === 0) {
    return '∅'
  }

  return value
    .replace(/ /g, '␠')
    .replace(/\n/g, '↵\n')
    .replace(/\t/g, '⇥')
}

export function tokenizeText(text: string, modelId: ModelId): TokenizationResult {
  const model = getModelDefinition(modelId)
  const encoder = encoders[model.encoding]
  const tokenIds = encoder.encode(text)
  const tokens = tokenIds.map((tokenId, index) => {
    const value = encoder.decode([tokenId])

    return {
      displayValue: toDisplayValue(value),
      index,
      tokenId,
      value,
    }
  })

  return {
    averageCharactersPerToken: tokenIds.length === 0 ? 0 : text.length / tokenIds.length,
    charCount: text.length,
    encoding: model.encoding,
    lineCount: text.length === 0 ? 0 : text.split(/\r?\n/).length,
    model,
    text,
    tokenCount: tokenIds.length,
    tokenIds,
    tokens,
    uniqueTokenCount: new Set(tokenIds).size,
  }
}

export function getUsagePercentage(tokenCount: number, maxContextWindow: number): number {
  if (maxContextWindow <= 0) {
    return 0
  }

  return Math.min((tokenCount / maxContextWindow) * 100, 100)
}
