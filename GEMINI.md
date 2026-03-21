# University Grade Management System

A web application designed for managing university grades, schedules, and academic certificates, built with Astro, React, and Tailwind CSS.

## Project Overview

-   **Purpose:** To provide a comprehensive platform for students, teachers, and analysts to manage academic data.
-   **Main Technologies:**
    -   [Astro](https://astro.build/): A modern static site generator (configured with SSR support).
    -   [React](https://react.dev/): Used for interactive components.
    -   [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework (version 4).
    -   [Radix UI](https://www.radix-ui.com/): Primitives for building accessible components.
    -   [Lucide React](https://lucide.dev/): Icon library.
    -   [TypeScript](https://www.typescriptlang.org/): For type safety.

## Project Structure

-   `src/components/`: Role-based components (analyst, students, teachers) and common UI/layout components.
-   `src/data/`: Static/mock data used for the application.
-   `src/hooks/`: Custom React hooks (e.g., `useEligibility`, `useTheme`).
-   `src/layouts/`: Base Astro layouts.
-   `src/lib/`: Shared utilities (`utils.ts`) and TypeScript definitions (`types.ts`).
-   `src/pages/`: File-based routing organized by user roles.
-   `src/styles/`: Global CSS and Tailwind configuration.

## Key Features

-   **Students:** View grades, enroll in subjects, download certificates (study, registration), view schedules, and check academic history.
-   **Teachers:** Manage sections, evaluate students (evaluation plans), and upload grades.
-   **Analysts:** Assign teachers to subjects and manage academic data.

## Building and Running

This project uses `pnpm` as the package manager.

| Command         | Action                                           |
| :-------------- | :----------------------------------------------- |
| `pnpm install`  | Installs dependencies                            |
| `pnpm dev`      | Starts local dev server at `localhost:4321`      |
| `pnpm build`    | Build the production site to `./dist/`           |
| `pnpm preview`  | Preview the build locally                        |
| `pnpm astro ...`| Run Astro CLI commands (e.g., `astro add`)        |

## Development Conventions

-   **Styling:** Use Tailwind CSS for component styling.
-   **Components:** Prefer functional React components with hooks for interactivity.
-   **Types:** Define and export types in `src/lib/types.ts` to maintain consistency across the project.
-   **Navigation:** Update sidebar data in `src/data/sidebar*Data.ts` to add or modify navigation items.
-   **Organization:** Follow the existing role-based directory structure for components and pages.
-   **Islands Architecture:** Use the `client:load` or `client:visible` directives in Astro files when importing React components that require client-side interactivity.
