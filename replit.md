# SistemGranit

## Overview
A Next.js 16 application using React 19, TypeScript, and Tailwind CSS 4.

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `public/` - Static assets (SVGs, icons)
- `next.config.ts` - Next.js configuration
- `tailwind.css` - Tailwind CSS configuration

## Development
The project runs on Bun as the package manager and runtime.

### Commands
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Workflow
The development server runs on port 5000 with `bun run dev --hostname 0.0.0.0 --port 5000`

## Dependencies
- Next.js 16.1.1
- React 19.2.3
- Tailwind CSS 4
- TypeScript 5

## Deployment
Configured for autoscale deployment with build step using `bun run build`.
