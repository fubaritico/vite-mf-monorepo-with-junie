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

## Node.js Version Configuration

1. Switched to Node.js LTS version:
   - Previously using Node.js v14.21.2
   - Now using the LTS version (v22.14.0 at the time of writing)
   - Created an .nvmrc file with "lts/*" to ensure the LTS version is used by default
   - This ensures compatibility with all dependencies and follows best practices for production applications

2. Updated to Node.js v22 as specified:
   - Explicitly switched to Node.js v22 using nvm
   - Reinstalled all dependencies with pnpm
   - Verified that all packages are compatible with Node.js v22
   - This aligns with the project requirements and ensures optimal performance
   - Successfully started all applications (list, detail, and host) with Node.js v22
   - Confirmed that the applications can start without errors

## Fix for Remote Component Loading Issue

1. Identified issues with the application startup process:
   - The run_list.sh script was using npm instead of pnpm, which could cause inconsistencies
   - There was no proper script to start all applications in the correct order

2. Created and updated scripts to properly start the applications:
   - Updated run_list.sh to use pnpm instead of npm
   - Created run_detail.sh to start the detail package
   - Created run_host.sh to start the host application
   - Created run_all.sh to start all applications in the correct order, ensuring that remote packages are started before the host

3. Made all scripts executable for easier use

4. Ensured proper startup sequence:
   - Start the list package first (port 5001)
   - Start the detail package second (port 5002)
   - Start the host application last (port 5000)
   - Added delays between startup to ensure each application is ready before the next one starts

These changes ensure that the remote packages are fully initialized and their remote entry points are available before the host application tries to import them, which should resolve the issue with the federation plugin.

## Project Structure Adaptation Based on vite-micro-frontend

1. Analyzed the vite-micro-frontend project structure:
   - Examined the directory structure and package configurations
   - Studied the entry points and bootstrap process for both host and remote applications
   - Reviewed the module federation configuration in development and production modes

2. Updated the entry point structure for all applications:
   - Created bootstrap.tsx files in both remote packages (list and detail)
   - Modified main.tsx files to use top-level await to import bootstrap files
   - Created index.ts in the host application to serve as the entry point
   - Ensured all HTML files reference the correct entry points

3. Updated package.json files to match the vite-micro-frontend structure:
   - Updated dependencies to use the latest versions
   - Added @module-federation/runtime and @module-federation/native-federation-typescript
   - Updated build scripts to use the correct TypeScript configuration
   - Added production mode scripts

4. Enhanced the module federation configuration:
   - Updated vite.config.ts files to use the latest module federation patterns
   - Added proper proxy configurations for development mode
   - Configured both development and production modes properly

These changes align our project structure with modern micro-frontend best practices, ensuring better compatibility, easier maintenance, and more reliable remote component loading.

## Server Management

1. Created scripts to start the applications:
   - run_list.sh: Starts the list package on port 5001
   - run_detail.sh: Starts the detail package on port 5002
   - run_host.sh: Starts the host application on port 5000
   - run_all.sh: Starts all applications in the correct order with appropriate delays

2. Created a script to stop all running servers:
   - Created stop_all.sh in the scripts directory
   - The script uses two approaches to ensure all servers are stopped:
     - Uses `pkill -f "vite"` to kill all Vite development server processes
     - Uses `lsof` and `kill` to terminate processes on ports 5000, 5001, and 5002
   - Made the script executable with `chmod +x scripts/stop_all.sh`
   - Successfully tested the script to stop all running servers

3. Server management workflow:
   - Start servers: `./scripts/run_all.sh`
   - Stop servers: `./scripts/stop_all.sh`
   - This ensures clean startup and shutdown of all micro-frontend components

## Health Check Implementation

1. Created shared utilities for health checking:
   - Added healthCheck.ts utility for checking remote application health
   - Implemented retry.ts utility with exponential backoff
   - Both utilities are placed in the shared package for reuse

2. Health check features:
   - Configurable retry attempts and delays
   - Timeout handling for requests
   - Proper error handling and logging
   - Cache control headers to prevent stale responses

3. Updated host application bootstrap:
   - Added health checks for both list and detail remotes
   - Implemented graceful fallback UI for health check failures
   - Added retry button for user-initiated recovery
   - Improved error handling and user feedback

4. Health check configuration:
   - Default retry attempts: 5
   - Default retry delay: 1000ms
   - Default timeout: 5000ms
   - All values are configurable through options

These changes ensure that the host application only attempts to load remote modules when they are confirmed to be healthy and available, preventing race conditions and improving the user experience.
