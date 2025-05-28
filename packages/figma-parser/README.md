# @max-lee2/figma-parser

[![npm version](https://img.shields.io/npm/v/@max-lee2/figma-parser.svg)](https://www.npmjs.com/package/@max-lee2/figma-parser)
[![license](https://img.shields.io/npm/l/@max-lee2/figma-parser.svg)](https://github.com/max-lee2/frontend-community/blob/main/packages/figma-parser/LICENSE)

A powerful Figma file parser for frontend-community projects. This package provides utilities to fetch and transform Figma file data, making it easier to work with Figma designs in your frontend applications.

## Features

- 🔄 Fetch Figma file data using the Figma API
- 🛠 Transform Figma file data into a more usable format
- 📦 TypeScript support with full type definitions
- 🚀 Modern ESM and CommonJS support

## Installation

```bash
npm install @max-lee2/figma-parser
# or
yarn add @max-lee2/figma-parser
# or
pnpm add @max-lee2/figma-parser
```

## Usage

```typescript
import { getFigmaFile, transformFileData } from '@max-lee2/figma-parser';

// Fetch Figma file data
const figmaFile = await getFigmaFile('your-figma-file-key');

// Transform the file data
const transformedData = transformFileData(figmaFile);
```

## API Reference

### `getFigmaFile(fileKey: string)`

Fetches a Figma file using the Figma API.

- `fileKey`: The key of the Figma file to fetch
- Returns: Promise<FigmaFile>

### `transformFileData(file: FigmaFile)`

Transforms the raw Figma file data into a more usable format.

- `file`: The Figma file data to transform
- Returns: Transformed file data

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Watch for changes
pnpm dev

# Clean build files
pnpm clean
```

## License

MIT © [max-lee2](https://github.com/max-lee2)
