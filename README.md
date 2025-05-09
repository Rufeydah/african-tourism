# African Tourism

An interactive web application showcasing diverse tourist destinations across Africa. Built with Next.js, TypeScript, and Tailwind CSS, this project provides a responsive and modern user interface to explore countries, attractions, and travel information.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)

- [Available Scripts](#available-scripts)
- [Technologies](#technologies)
- [API and Data](#api-and-data)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Country Explorer**: Browse a list of African countries with flag, name, and basic info.
- **Destination Details**: View detailed pages for each country, showcasing attractions, culture, and travel tips.
- **Responsive Design**: Optimized for desktop and mobile devices using Tailwind CSS.
- **Client-side & Server-side Data Fetching**: Utilizes Next.js `app/` directory for nested layouts and data fetching patterns.
- **Reusable Components**: Modular UI components in the `components/` directory for easy customization.
- **State Management**: Custom hooks in `hooks/` for managing application state.
- **TypeScript**: Strongly typed codebase for enhanced developer experience.

## Demo

> Add link or screenshots of the live demo here.

## Project Structure

```
├── app/
│   ├── layout.tsx         # Root layout for Next.js
│   ├── page.tsx           # Homepage component
│   ├── country/[id]/      # Dynamic routing for country pages
│   │   └── page.tsx       # Country detail component
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Shared React components
├── hooks/                 # Custom React hooks
├── data/                  # Static data or JSON files
├── lib/                   # Utility functions and API clients
├── public/                # Static assets (images, icons)
├── styles/                # Additional CSS and Tailwind config
├── types/                 # TypeScript type definitions
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm or pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Rufeydah/african-tourism.git
cd african-tourism

# Install dependencies (npm)
npm install
# or using pnpm
pnpm install
```

### Running Locally

```bash
# Development server (localhost:3000)
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `npm run dev` / `pnpm dev` – Runs the app in development mode.
- `npm run build` – Builds the application for production.
- `npm start` – Starts the production server.
- `npm run lint` – Runs ESLint for code linting.

## Technologies

- **Next.js** – React framework for production.
- **TypeScript** – Typed superset of JavaScript.
- **Tailwind CSS** – Utility-first CSS framework.
- **React** – JavaScript library for building user interfaces.

## API and Data

This project fetches data from public APIs and static JSON files located in the `data/` directory. Ensure API endpoints are configured in `lib/api.ts` before running.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with detailed changes.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/X`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/X`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
