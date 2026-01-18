# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Booking Management System** for a salon/spa business built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The application manages bookings, clients, employees, services, VIP packages, gift cards, inventory, payments, commissions, and leave requests.

> **IMPORTANT: Development Phase**
> - This project has **NO BACKEND** yet. Use `mockData.json` for all data.
> - This is a **TEMPLATE PROJECT** - will be reused for multiple customers. Keep all customizable values (colors, text, images, logos) in `config/` files.

## Commands

```bash
# Install dependencies (uses Bun)
bun install

# Development server
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Lint
bun run lint
```

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Package Manager**: Bun (see bun.lock)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Data Fetching**: React Query (TanStack Query)
- **Fonts**: Geist Sans and Geist Mono via next/font

## Coding Guidelines

### Styling
- **ALWAYS use Tailwind CSS** for all styling. Do not use inline styles or CSS modules.
- Use Tailwind's utility classes directly in JSX.
- For theming, use CSS variables defined in the theme configuration (see Template Configuration below).

### Components
- **ALWAYS create reusable components**. Never write raw HTML directly in pages.
- Place shared components in `components/` directory.
- Each component should be in its own file.
- Use TypeScript interfaces for component props.
- Follow atomic design principles: atoms → molecules → organisms → templates → pages.

### Data Fetching
- **ALWAYS use React Query (TanStack Query)** for state management.
- Create custom hooks for data access (e.g., `useBookings`, `useClients`).
- Place query hooks in `hooks/` or `queries/` directory.
- Use query keys consistently for cache management.

### Mock Data (Development Phase)
- **NO BACKEND YET** - Use `mockData.json` as the data source during development.
- Create a data service layer in `lib/data/` that reads from mock data.
- Structure queries to easily swap mock data for real API calls later.
- Example pattern:
  ```typescript
  // lib/data/bookings.ts
  import mockData from '@/mockData.json';

  export const getBookings = async () => mockData.bookings;
  export const getBookingById = async (id: string) =>
    mockData.bookings.find(b => b.id === id);

  // hooks/useBookings.ts
  import { useQuery } from '@tanstack/react-query';
  import { getBookings } from '@/lib/data/bookings';

  export const useBookings = () => useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });
  ```
- When backend is ready, only update `lib/data/` files to call real APIs.

## Template Configuration (Multi-Tenant)

This project is a **reusable template** for multiple customers. All customizable elements are centralized in configuration files.

### Theme Configuration: `config/theme.config.ts`
```typescript
// All colors, spacing, and visual theming
export const themeConfig = {
  colors: {
    primary: { main: '#...', light: '#...', dark: '#...' },
    secondary: { main: '#...', light: '#...', dark: '#...' },
    accent: '#...',
    background: { default: '#...', paper: '#...' },
    text: { primary: '#...', secondary: '#...' },
    success: '#...',
    warning: '#...',
    error: '#...',
  },
  // Add to tailwind.config.ts as CSS variables
};
```

### Branding Configuration: `config/branding.config.ts`
```typescript
// All text, images, logos, and brand-specific content
export const brandingConfig = {
  company: {
    name: 'Company Name',
    tagline: 'Your tagline here',
    logo: '/images/logo.png',
    logoAlt: '/images/logo-alt.png',
    favicon: '/favicon.ico',
  },
  images: {
    hero: '/images/hero.jpg',
    placeholder: '/images/placeholder.png',
  },
  contact: {
    email: 'contact@example.com',
    phone: '+1234567890',
    address: '123 Street, City',
  },
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
};
```

### Content Configuration: `config/content.config.ts`
```typescript
// All static text content for easy translation/customization
export const contentConfig = {
  pages: {
    home: { title: '...', description: '...' },
    booking: { title: '...', description: '...' },
    // etc.
  },
  buttons: {
    book: 'Book Now',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  messages: {
    success: '...',
    error: '...',
  },
};
```

### Using Configuration
- Import config in components: `import { themeConfig } from '@/config/theme.config'`
- Colors are exposed as CSS variables in `globals.css` for Tailwind usage
- Never hardcode colors, text, or image paths - always reference config files

## Project Structure

```
bookingmanagement/
├── app/                    # Next.js App Router pages and layouts
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components (Button, Input, Card, etc.)
│   ├── forms/              # Form components
│   ├── layout/             # Layout components (Header, Footer, Sidebar)
│   └── features/           # Feature-specific components
├── config/                 # Configuration files (CUSTOMIZE PER CUSTOMER)
│   ├── theme.config.ts     # Colors, spacing, visual theming
│   ├── branding.config.ts  # Logo, images, company info
│   └── content.config.ts   # Static text, labels, messages
├── hooks/                  # Custom React hooks
├── queries/                # React Query hooks and API calls
├── lib/                    # Utility functions and helpers
├── types/                  # TypeScript type definitions
├── public/                 # Static assets (images, fonts)
│   └── images/             # Customer logos and images
└── mockData.json           # Sample data defining the domain model
```

## Domain Model

Key entities (defined in mockData.json):
- **Users**: Staff with roles (CHAIRMAN, MANAGER, RECEPTIONIST, UTILITY) and permissions
- **Clients**: Customers with VIP/Regular status and visit history
- **Employees**: Service providers with specializations and availability
- **Services**: Offered services with variants and pricing
- **Bookings**: Appointments with service items, status tracking, and payments
- **VIP Packages**: Monthly benefit packages for VIP clients
- **Gift Cards**: Purchasable cards with balance tracking
- **Inventory**: Stock items with supplier info
- **Sales/Payments**: Transaction records with payment breakdowns
- **Commission Rules**: Employee commission calculations
- **Leave Requests**: Employee time-off management

## Path Aliases

TypeScript path alias configured: `@/*` maps to the project root.
