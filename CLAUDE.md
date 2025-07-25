# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo containing a React library for client identification and a Next.js demo application:

- **`react/`** - Main library package (`@cs124/client-id`) that provides React components for generating and tracking unique browser and tab IDs
- **`demo/`** - Next.js demo application showcasing the library functionality  
- Root workspace manages both packages with NPM workspaces

## Development Commands

### React Library (`react/` directory)
- **Build**: `npm run build` - Compiles TypeScript to `dist/`
- **Type checking**: `npm run tsc` - TypeScript compilation check without output
- **Linting**: `npm run eslint` - ESLint for source files
- **Code formatting**: `npm run prettier` - Prettier with import organization
- **Full check**: `npm run check` - Runs eslint, tsc, prettier, depcheck, and build
- **Watch mode**: `npm run watch` or `npm run start` - TypeScript compilation in watch mode
- **Dependency check**: `npm run depcheck` - Checks for unused dependencies

### Demo Application (`demo/` directory)
- **Development server**: `npm run start` - Next.js dev server
- **Build**: `npm run build` - Production build
- **Production server**: `npm run serve` - Serves production build
- **Type checking**: `npm run tsc` - TypeScript compilation check
- **Linting**: `npm run eslint` - ESLint with auto-fix
- **Full check**: `npm run check` - Runs eslint, tsc, prettier, and depcheck

### Root Workspace
- **Update dependencies**: `npm run ncu` - Check for dependency updates
- **Format package.json**: `npm run prettier` - Format package.json files

## Library Architecture

The main library (`react/src/index.tsx`) provides:

- **`ClientIDProvider`** - React context provider that generates and manages client IDs
- **`useClientID`** - Hook to access client ID context values
- **`ClientIDContext`** - Context containing `browserID`, `tabID`, `IPv4`, and `IPv6`

### Key Features
- Generates unique browser ID (persisted in localStorage and optional cookies)
- Generates unique tab ID (persisted in sessionStorage)  
- Optional public IP detection (IPv4/IPv6) with configurable intervals
- Cookie support with domain configuration
- Verbose logging option

### Configuration Options
- `IPinterval` - IP detection interval (default: 30 seconds)
- `disableIP` - Disable IP detection
- `cookies` - Enable cookie persistence for browser ID
- `domain` - Cookie domain scope
- `verbose` - Enable console logging

## Version Strategy

This project uses date-based versioning: `YYYY.M.minor` (e.g., `2025.1.0`).