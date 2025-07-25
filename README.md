# @cs124/client-id

A React library for generating and tracking unique browser and tab identifiers, with optional public IP detection.

## Features

- **Browser ID**: Persistent identifier stored in localStorage and optionally in cookies
- **Tab ID**: Session-specific identifier stored in sessionStorage  
- **IP Detection**: Optional IPv4/IPv6 public IP address detection with configurable intervals
- **Cookie Support**: Optional cookie persistence with domain configuration
- **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install @cs124/client-id
```

## Quick Start

```tsx
import { ClientIDProvider, useClientID } from '@cs124/client-id'

function App() {
  return (
    <ClientIDProvider>
      <MyComponent />
    </ClientIDProvider>
  )
}

function MyComponent() {
  const { browserID, tabID, IPv4, IPv6 } = useClientID()
  
  return (
    <div>
      <p>Browser ID: {browserID}</p>
      <p>Tab ID: {tabID}</p>
      {IPv4 && <p>IPv4: {IPv4}</p>}
      {IPv6 && <p>IPv6: {IPv6}</p>}
    </div>
  )
}
```

## API Reference

### ClientIDProvider

The main provider component that manages client identification.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `IPinterval` | `number` | `30000` | Interval for IP detection in milliseconds |
| `disableIP` | `boolean` | `false` | Disable IP address detection |
| `cookies` | `boolean` | `false` | Enable cookie persistence for browser ID |
| `domain` | `string` | `undefined` | Cookie domain scope |
| `verbose` | `boolean` | `false` | Enable console logging |

#### Example with options

```tsx
<ClientIDProvider
  IPinterval={60000}
  cookies={true}
  domain=".example.com"
  verbose={true}
>
  <App />
</ClientIDProvider>
```

### useClientID Hook

Returns the current client identification context.

#### Return Value

```tsx
interface ClientIDContext {
  browserID?: string  // Persistent browser identifier
  tabID?: string      // Session-specific tab identifier  
  IPv4?: string       // Public IPv4 address (if enabled)
  IPv6?: string       // Public IPv6 address (if enabled)
}
```

## Storage Details

- **Browser ID**: Stored in `localStorage` as `"browserID"` and optionally in cookies
- **Tab ID**: Stored in `sessionStorage` as `"tabID"`
- **IDs**: Generated using `crypto.randomBytes(20)` encoded as base64url

## Development

This is a monorepo containing:

- **`react/`** - Main library package
- **`demo/`** - Next.js demo application

### Setup

```bash
npm install
```

### Library Development (`react/` directory)

```bash
# Build the library
npm run build

# Type checking  
npm run tsc

# Linting
npm run eslint

# Code formatting
npm run prettier

# Full check (lint + types + format + deps + build)
npm run check

# Watch mode
npm run watch
```

### Demo Application (`demo/` directory)

```bash
# Development server
npm run start

# Build for production
npm run build

# Serve production build
npm run serve

# Full check (lint + types + format + deps)
npm run check
```

### Root Workspace

```bash
# Check for dependency updates
npm run ncu

# Format package.json files
npm run prettier
```

## Version Strategy

This project uses date-based versioning: `YYYY.M.minor` (e.g., `2025.1.0`).

## License

MIT