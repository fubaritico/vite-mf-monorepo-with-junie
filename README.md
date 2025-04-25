## Monorepo Micro Front End \w React, Vite, Lerna & Pnpm

This project is a grid of movies that uses micro frontends architecture. A detail page is accessed by clicking on a movie card. It is built using React, Vite, Lerna, and Pnpm. The project is structured as a monorepo, which allows for easy management of multiple packages and applications.
The micro frontends are loaded dynamically in the host application, allowing for a modular and scalable architecture. The project is designed to be easy to understand and extend, making it a great starting point for anyone looking to learn about micro frontends.

The main boilerplate code of the project has been generated using JetBrains Junie genAI, which is a great tool for generating boilerplate code quickly and efficiently. The project is designed to be easy to understand and extend, making it a great starting point for anyone looking to learn about micro frontends.

This is a test to check if it was possible to generate a project from a previous one used as an inspiration to produce good model context, using the same tech stack.

All techs and deps used in this project are the latest versions available at the time of writing this README. Some update maintenance for dependencies will be done in time.

It's a work in progress, so many future enhancements are planned.

### Technologies Used
- Junie genAI from JetBrains
- React
- Vite
- Typescript
- @modules-federation
- Lerna
- eslint
- prettier
- commitlint
- Pnpm
- React Router
- React Query
- Native CSS (shared across remote/host)
- React Testing Library (to be implemented)
- Vitest (to be implemented)

### Getting Started

1. Clone the repository
2. Subscribe to TMDB API and get your API key
3. Create a `.env.local` file in the root of the project and add your API key
   ```bash
   VITE_API_KEY=your_api_key
   ```
3. Install dependencies
   ```bash
   pnpm install
   ```
4. Start the development server
   ```bash
    pnpm dev
    ```
5. Open your browser and navigate to `http://localhost:3000`

6. Open the `packages` folder to see the different micro frontends

### Project Structure

The project consists of two remotes and one host application:

- `apps/host`: The host application that loads the micro frontends
- `packages/list`: The list of movies, displayed at '/' route
- `packages/detail`: The detail page of a movie, displayed at '/movie/:id' route
- `packages/people`: The detail of a talent taking part in a movie, displayed at '/people/:id' route (to be implemented)

### Project features

- Micro frontends architecture
- Dynamic loading of micro frontends
- Modular and scalable architecture
- Easy to understand and extend
- Types generation in dev mode to allow host/consumer to get types from remote (not present for Vite in module federation plugin)
- Responsive design
- Native CSS shared across remote/host
- Easy to add new micro frontends
- Each remote is standalone and can be deployed independently
- For production mode (locally), each part of the application is hosted in a expressJS server
