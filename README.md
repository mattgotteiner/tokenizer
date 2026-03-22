# Azure OpenAI Tokenizer

A Vite + React + TypeScript SPA for pasting text and inspecting how common Azure OpenAI GPT model families tokenize it in the browser.

## What it does

- Accepts pasted or typed text
- Lets you pick a tokenizer family first, with curated Azure OpenAI GPT families shown as context
- Shows the active tokenizer/encoding plus its representative Azure family
- Breaks the input into token IDs and decoded token pieces
- Surfaces which other Azure OpenAI GPT families share the same tokenizer
- Supports `light`, `dark`, and `system` themes in a settings sidebar

## Tech stack

- React 19
- TypeScript 5.9
- Vite 7
- `@mattgotteiner/spa-ui-controls`
- `js-tiktoken` in browser-only mode via the lite encoder imports

## Important note about mappings

The model-to-tokenizer mappings in this app are intentionally curated for common Azure OpenAI GPT deployment families. They are useful for local testing, but they should still be verified against your exact deployment and current Azure/OpenAI documentation when precision matters.

## Prerequisites

- Node.js 22+
- Access to the `@mattgotteiner` GitHub Packages scope for `@mattgotteiner/spa-ui-controls`

## Getting started

```bash
npm login --scope=@mattgotteiner --auth-type=legacy --registry=https://npm.pkg.github.com
npm install
npm run dev
```

Then open the Vite URL, paste text, and optionally open the settings sidebar to switch tokenizer families or theme preference.

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build the app |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once |
| `npm run test:coverage` | Run Vitest with coverage |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run generate-icons` | Regenerate PWA icon assets |

## GitHub Actions

The repository includes:

- `CI` workflow for `lint`, `typecheck`, `test:run`, and `build`
- `Deploy to GitHub Pages` workflow for publishing the Vite `dist/` output

Because the app depends on a GitHub Packages package, the workflows install dependencies using `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.

## Project structure

```text
src/
├── components/
│   ├── SettingsSidebar/
│   ├── TokenInput/
│   └── TokenResults/
├── context/
├── hooks/
├── test/
├── types/
└── utils/
```

