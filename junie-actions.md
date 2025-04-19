# Junie Monorepo Project Actions Log

## Initial Project Setup

1. Created a monorepo project structure managed by Lerna, using pnpm as a package manager
2. Set up two workspaces: 'packages' for shared components and 'apps' for applications
3. Created a pnpm-workspace.yaml file to define the workspace structure
4. Created the 'list' remote project in the packages workspace:
   - React/TypeScript project using Vite as bundler
   - Configured to expose components via @module-federation/vite
   - Implemented a List component that displays movies from TMDB API
   - Set up React Router v7 for navigation
5. Created the 'detail' remote project in the packages workspace:
   - React/TypeScript project using Vite as bundler
   - Configured to expose components via @module-federation/vite
   - Implemented a Detail component to show movie details
6. Created a host application in the apps workspace:
   - React/TypeScript project using Vite as bundler
   - Configured to consume the remote components
   - Set up React Router v7 for navigation between components

## Dependency Installation

1. Used Node.js version 20.9.0 (required for React Router v7)
2. Installed all dependencies using pnpm
3. Added @module-federation/vite as a dev dependency

## Issues and Troubleshooting

1. Encountered issues with the federation plugin configuration
2. Temporarily disabled federation plugin in all packages to get the app running
3. Modified the host application to use a placeholder component instead of the remote List component

## Current Task: Fix Remote Component Loading

1. Re-enabling federation plugin to properly load remote components
2. Ensuring the List component is displayed as the default in the host application

## Actions Taken to Fix Remote Component Loading

1. Re-enabled the federation plugin in the list package's vite.config.ts file:
   - Uncommented the import statements for federation and path
   - Uncommented and restored the federation plugin configuration

2. Re-enabled the federation plugin in the detail package's vite.config.ts file:
   - Uncommented the import statements for federation and path
   - Uncommented and restored the federation plugin configuration

3. Re-enabled the federation plugin in the host application's vite.config.ts file:
   - Uncommented the import statements for federation and path
   - Uncommented and restored the federation plugin configuration

4. Updated the host application's main.tsx file:
   - Removed the placeholder component that was used when federation was disabled
   - Implemented lazy loading for the List component from the list remote
   - Added lazy loading for the Detail component from the detail remote
   - Updated the router configuration to include both routes

These changes should allow the host application to properly load and display the List component as the default view, and the Detail component when navigating to a movie detail page.

## Verification

1. Verified that the bootstrap.tsx file in the host application is correctly set up to import the main.tsx file
2. Confirmed that the index.html file in the host application correctly references the bootstrap.tsx file
3. Checked that the types.d.ts file in the host application has the correct type declarations for the remote modules

## Expected Outcome

When the host application is started, it should:
1. Load the federation plugin configuration
2. Import the remote List component from the list package
3. Display the List component as the default view
4. Allow navigation to the Detail component when a movie is clicked

To run the application:
1. Start the list package: `cd packages/list && pnpm run dev`
2. Start the detail package: `cd packages/detail && pnpm run dev`
3. Start the host application: `cd apps/host && pnpm run dev`
4. Open a browser and navigate to http://localhost:5000

## Commit Conventions Setup

1. Installed commitlint:
   - Added @commitlint/cli and @commitlint/config-conventional as dev dependencies

2. Created commitlint configuration:
   - Created commitlint.config.js at the root of the project
   - Extended the conventional commit rules
   - Defined specific rules for commit message format

3. Commit message format:
   - Structure: `<type>(<scope>): <subject>`
   - Types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
   - Example: `feat(list): add movie search functionality`

4. Commit message rules:
   - Type must be lowercase and one of the allowed types
   - Scope must be lowercase
   - Subject must not be empty
   - Subject must not end with a period
   - Header (type + scope + subject) must not exceed 100 characters

5. Removed husky:
   - Removed husky dependency from package.json
   - Decided to use manual commit message validation instead of git hooks
   - This simplifies the commit process while still maintaining the commit message convention documentation
