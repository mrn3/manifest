# Manifest - AI-Powered SaaS Platform

A comprehensive SaaS platform for building websites and web applications using AI, similar to Base44.

## Features

- 🤖 **AI-powered app building** - Generate applications using natural language
- 🗄️ **Integrated backend and database system** - Full-stack development platform
- 🎨 **Responsive visual editor** - Real-time visual editing with code preview
- 📊 **Analytics dashboard** - Comprehensive analytics for your applications
- 👥 **Multi-user editing and collaboration** - Real-time collaborative development
- ☁️ **Cloud storage** - Secure file and asset management
- 🔐 **Authentication and user management** - Complete user lifecycle management
- 💳 **Payment processing** - Subscription billing and plan management
- 📧 **Email marketing tools** - Integrated communication and marketing
- 🐛 **Debugging and troubleshooting tools** - Advanced development tools

## Architecture

This is a monorepo containing:

- `apps/marketing` - Public marketing website (Next.js)
- `apps/dashboard` - Main application dashboard (Next.js)
- `apps/api` - Backend API services (Node.js/Express)
- `apps/editor` - Visual editor application (Next.js)
- `packages/ui` - Shared UI components
- `packages/database` - Database schema and utilities
- `packages/auth` - Authentication utilities
- `packages/ai` - AI integration services
- `packages/email` - Email services
- `packages/analytics` - Analytics utilities

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: Supabase Auth
- **AI**: OpenAI API, Anthropic Claude
- **Payments**: Stripe
- **Email**: Resend
- **Storage**: Supabase Storage
- **Deployment**: Vercel, Railway

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Development

- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run type-check` - Type check all TypeScript

## Project Structure

```
manifest-saas-platform/
├── apps/
│   ├── marketing/          # Public marketing website
│   ├── dashboard/          # Main user dashboard
│   ├── api/               # Backend API
│   └── editor/            # Visual editor
├── packages/
│   ├── ui/                # Shared UI components
│   ├── database/          # Database utilities
│   ├── auth/              # Authentication
│   ├── ai/                # AI services
│   ├── email/             # Email services
│   └── analytics/         # Analytics
└── docs/                  # Documentation
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
