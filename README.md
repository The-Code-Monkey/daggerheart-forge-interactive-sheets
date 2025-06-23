# Daggerheart Forge Interactive Sheets

A comprehensive digital toolset designed specifically for Daggerheart RPG campaigns and character management, built with Next.js.

## Features

- **Interactive Character Sheets**: Create and manage detailed Daggerheart characters with all stats, abilities, and equipment tracked automatically
- **Campaign Management**: Organize your campaigns, track party members, and manage session notes (coming soon)
- **Digital Dice Rolling**: Built-in dice roller with Daggerheart's unique mechanics, including Hope and Fear dice (coming soon)
- **Combat Tracker**: Streamlined initiative tracking and combat management (coming soon)
- **Equipment Manager**: Comprehensive inventory system with item descriptions and stats (coming soon)
- **Spell & Ability Cards**: Beautiful card-based interface for managing spells and abilities (coming soon)
- **Homebrew Content**: Create and manage custom classes, subclasses, and domains

## Tech Stack

- **Frontend**: Next.js 15.1.3 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **TypeScript**: Full type safety throughout
- **Testing**: Jest with React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ (check with `node --version`)
- npm or yarn package manager
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd daggerheart-forge-interactive-sheets
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
daggerheart-forge-interactive-sheets/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   ├── character-builder/        # Character creation and editing
│   ├── character-sheet/          # Character sheet viewer
│   ├── dashboard/                # User dashboard
│   ├── game-rules/               # Game rules and reference
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   ├── not-found.tsx             # 404 page
│   └── page.tsx                  # Home page
├── src/
│   ├── components/               # Reusable UI components
│   ├── contexts/                 # React contexts (Auth, etc.)
│   ├── hooks/                    # Custom React hooks
│   ├── integrations/             # External service integrations
│   │   └── supabase/             # Supabase client and helpers
│   └── lib/                      # Utility functions and types
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware for auth
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies and scripts
```

## Database Setup

This project uses Supabase as the backend. You'll need to:

1. Create a new Supabase project
2. Run the database migrations (see `supabase/` directory)
3. Set up the required tables for characters, classes, ancestries, etc.
4. Configure Row Level Security (RLS) policies

## Authentication

The app uses Supabase Auth with the following features:
- Email/password authentication
- Protected routes using Next.js middleware
- Automatic session management
- User profile management

## Development

### Code Style

- ESLint configuration with TypeScript rules
- Prettier for code formatting
- Arrow functions preferred over function declarations
- Strict TypeScript configuration

### Testing

Tests are written using Jest and React Testing Library:
```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
```

## Deployment

The app is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

For other platforms, build the app and deploy the `.next` directory:
```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- Join our [Discord server](https://discord.gg/mwgahF9z6q) for community support
- Report bugs and feature requests via GitHub issues
- Check the documentation for detailed guides

## Roadmap

- [ ] Complete character builder functionality
- [ ] Campaign management system
- [ ] Digital dice roller with Daggerheart mechanics
- [ ] Combat tracker and initiative system
- [ ] Equipment and inventory management
- [ ] Spell and ability card system
- [ ] Mobile app companion
- [ ] Offline mode support
