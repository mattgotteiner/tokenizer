export const APP_SETTINGS_STORAGE_KEY = 'tokenizer-settings'

export type Theme = 'light' | 'dark' | 'system'
export const THEME_OPTIONS: Theme[] = ['light', 'dark', 'system']

export type ModelId =
  | 'gpt-5'
  | 'gpt-5-mini'
  | 'gpt-5-nano'
  | 'gpt-4.1'
  | 'gpt-4.1-mini'
  | 'gpt-4.1-nano'
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-35-turbo'

export type EncodingName = 'o200k_base' | 'cl100k_base'

export interface ModelDefinition {
  id: ModelId
  label: string
  encoding: EncodingName
  notes: string
}

export interface EncodingDefinition {
  id: EncodingName
  label: string
  summary: string
  notes: string
}

export interface AppSettings {
  modelId: ModelId
  theme: Theme
}

export interface TokenPiece {
  displayValue: string
  index: number
  tokenId: number
  value: string
}

export interface TokenizationResult {
  averageCharactersPerToken: number
  charCount: number
  encoding: EncodingName
  lineCount: number
  model: ModelDefinition
  text: string
  tokenCount: number
  tokenIds: number[]
  tokens: TokenPiece[]
  uniqueTokenCount: number
}

export const MODEL_DEFINITIONS: readonly ModelDefinition[] = [
  {
    id: 'gpt-5',
    label: 'GPT-5',
    encoding: 'o200k_base',
    notes: 'Latest flagship GPT-5 family entry in the curated Azure OpenAI list.',
  },
  {
    id: 'gpt-5-mini',
    label: 'GPT-5 mini',
    encoding: 'o200k_base',
    notes: 'Smaller GPT-5 family member sharing the same tokenizer family.',
  },
  {
    id: 'gpt-5-nano',
    label: 'GPT-5 nano',
    encoding: 'o200k_base',
    notes: 'Compact GPT-5 family member using the same encoding family.',
  },
  {
    id: 'gpt-4.1',
    label: 'GPT-4.1',
    encoding: 'o200k_base',
    notes: 'GPT-4.1 family entry mapped to the newer OpenAI tokenizer family.',
  },
  {
    id: 'gpt-4.1-mini',
    label: 'GPT-4.1 mini',
    encoding: 'o200k_base',
    notes: 'Smaller GPT-4.1 family member sharing the o200k tokenizer.',
  },
  {
    id: 'gpt-4.1-nano',
    label: 'GPT-4.1 nano',
    encoding: 'o200k_base',
    notes: 'Compact GPT-4.1 family member using the same tokenizer family.',
  },
  {
    id: 'gpt-4o',
    label: 'GPT-4o',
    encoding: 'o200k_base',
    notes: 'Omni generation model mapped to o200k_base.',
  },
  {
    id: 'gpt-4o-mini',
    label: 'GPT-4o mini',
    encoding: 'o200k_base',
    notes: 'Smaller GPT-4o deployment family using the same encoding.',
  },
  {
    id: 'gpt-4-turbo',
    label: 'GPT-4 Turbo',
    encoding: 'cl100k_base',
    notes: 'Earlier GPT-4 generation family still commonly encountered in Azure OpenAI deployments.',
  },
  {
    id: 'gpt-4',
    label: 'GPT-4',
    encoding: 'cl100k_base',
    notes: 'Legacy GPT-4 family entry using the cl100k tokenizer family.',
  },
  {
    id: 'gpt-35-turbo',
    label: 'GPT-35 Turbo',
    encoding: 'cl100k_base',
    notes: 'Azure-specific naming for the GPT-3.5 Turbo family using cl100k_base.',
  },
] as const

export const ENCODING_DEFINITIONS: readonly EncodingDefinition[] = [
  {
    id: 'o200k_base',
    label: 'o200k_base',
    summary:
      'Newer OpenAI tokenizer family used by current GPT-4o, GPT-4.1, and GPT-5 style model families.',
    notes:
      'This app loads only the o200k ranks needed for the selected Azure OpenAI model families.',
  },
  {
    id: 'cl100k_base',
    label: 'cl100k_base',
    summary:
      'Established tokenizer family used by GPT-4 Turbo, GPT-4, and GPT-35 Turbo style deployments.',
    notes:
      'Useful when you need to compare newer Azure OpenAI families against older GPT-4 and GPT-35 deployments.',
  },
] as const

export const DEFAULT_SETTINGS: AppSettings = {
  modelId: 'gpt-5',
  theme: 'system',
}

export function getModelDefinition(modelId: ModelId): ModelDefinition {
  const match = MODEL_DEFINITIONS.find((model) => model.id === modelId)

  if (!match) {
    throw new Error(`Unknown model definition: ${modelId}`)
  }

  return match
}

export function getEncodingDefinition(encoding: EncodingName): EncodingDefinition {
  const match = ENCODING_DEFINITIONS.find((item) => item.id === encoding)

  if (!match) {
    throw new Error(`Unknown encoding definition: ${encoding}`)
  }

  return match
}

export function getModelsForEncoding(encoding: EncodingName): ModelDefinition[] {
  return MODEL_DEFINITIONS.filter((model) => model.encoding === encoding)
}
