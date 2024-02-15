# Entity Locator App

This is a simple Next.js app that allows users to see the location of entities on a map, and to determine their distance to them by clicking on it. 

The app uses Next.js, TypeScript and Leaflet as its main technologies. Testing is done through Jest, but I currently lack the time to work on proper unit or E2E tests.

## Technologies Used

- Next.js
- React
- TypeScript
- Leaflet
- Jest (incomplete)

## Getting Started

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/eppu/locator-map.git
   ```

1. Navigate to the project directory:

   ```bash
   cd locator-map
   ```

1. Create a `.env` file based on the provided `.env.sample` file and fill in the required values:

   ```bash
   cp .env.sample .env

   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Run the development server

   ```bash
   npm run dev
   ```

The app will be accessible at http://localhost:3000.

## How to Deploy

The project is automatically deployed through Vercel when commits are pushed to the 'main' branch.
