# pass Culture Institutional

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-institutional&metric=code_smells)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-institutional)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-institutional&metric=coverage)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-institutional)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-institutional&metric=duplicated_lines_density)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-institutional)

Welcome to the **pass Culture Institutional** project!

This repository contains the following key components for the institutional site:

- **`public_website`**: The frontend application built with **Next.js**.
- **`content_management_system`**: The backend powered by **Strapi**.

In addition, the project provides tools to streamline local development and testing by connecting to the **Strapi testing backend** behind Google Cloud IAP.

This README provides general project information, scripts, and setup instructions. For detailed documentation on each part of the project:

- [Public Website Documentation](./public_website/README.md)
- [Content Management System Documentation](./content_management_system/README.md)
- [Strapi Testing Proxy Documentation](./nginx-strapi-testing-proxy/README.md)

---

## Table of Contents

- [pass Culture Institutional](#pass-culture-institutional)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Start the project](#start-the-project)
  - [Local Database](#local-database)
  - [Access the Strapi Testing Backend](#access-the-strapi-testing-backend)
    - [Key Features:](#key-features)
    - [Quick Start:](#quick-start)
  - [Project Scripts](#project-scripts)
  - [Testing](#testing)
    - [Public website](#public-website)
    - [Content management system](#content-management-system)
      - [Sharing types between the front \& back](#sharing-types-between-the-front--back)
      - [Why aren't there any unit test on the CMS?](#why-arent-there-any-unit-test-on-the-cms)
  - [PR title format 🤖](#pr-title-format-)
    - [Why](#why)
      - [About squashing the PR commits](#about-squashing-the-pr-commits)
    - [Key points](#key-points)

## Requirements

1. Ensure you have [Node.js 20.8.0](https://nodejs.org/) installed on your system. If you are using `NVM` you can simply use the command `nvm install` if you don't have 20.8.0 previously installed or `nvm use` if you do.
2. You should have `Yarn` installed: `corepack enable`
3. Install `safe-chain` (refer to internal knowledge base)
4. Install `gitleaks`
5. Set-up pre-commit hook: `chmod +x ./.githooks/pre-commit && git config --local core.hooksPath ./.githooks`

## Start the project

From the root of the project, you can install the dependencies for the `public_website` and the `content_management_system` with the following commands:

```bash
yarn setup
yarn dev
```

> Don't forget to add to `/public_website` and `/content_management_system` the `.env` with the correct environment variables. You can find instructions for [the .env of the public_website](./public_website/README.md#configure-environment-variables) and [for the .env of the content_management_system](./content_management_system/README.md#configure-environment-variables).

## Local Database

If you want to run the content_management_system locally, you need to install Postgres on your machine. With commands (or PgAdmin) you must create a db with the following:

- Database name: db_institutional

More information on how to setup here: [content_management_system documentation](./content_management_system/README.md)

## Access the Strapi Testing Backend

To connect your local frontend to the Strapi testing backend (secured behind Google Cloud IAP) and transfer data to your local database, refer to the detailed documentation in the [Strapi Testing Proxy](./nginx-strapi-testing-proxy/README.md).

### Key Features:

1. **Proxy Setup**: Allows your local frontend to communicate with the Strapi testing server.
2. **Data Transfer**: Synchronize the testing environment data into your local database for seamless development and debugging.

### Quick Start:

1. Follow the setup instructions in the [Strapi Testing Proxy README](./nginx-strapi-testing-proxy/README.md).
2. Use the available scripts:
   - `yarn proxy:testing`: Start the proxy server.
   - `yarn proxy:transfer`: Transfer data from the Strapi testing backend to your local database.
3. Point your frontend (`public_website`) to the local proxy:
   ```env
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:8080
   ```

For detailed steps and troubleshooting, see the full [Strapi Testing Proxy documentation](./nginx-strapi-testing-proxy/README.md).

## Project Scripts

Before you can use the scripts, ensure you have `Yarn` installed on your system.
The project includes several useful scripts for development, testing, and proxy setup

| **Command**                            | **Description**                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| `yarn setup`                           | Install dependencies for both `public_website` and `content_management_system`. |
| `yarn dev`                             | Start both the frontend and backend servers for development.                    |
| `yarn public_website`                  | Start the `public_website` development server.                                  |
| `yarn content_management_system`       | Start the `content_management_system` development server.                       |
| `yarn clear`                           | Remove temporary files and caches in the `public_website` directory.            |
| `yarn setup:public_website`            | Install dependencies for the `public_website` only.                             |
| `yarn setup:content_management_system` | Install dependencies for the `content_management_system` only.                  |
| `yarn audit:all`                       | Check for vulnerabilities in project dependencies.                              |
| `yarn test:deadcode`                   | Detect unused (dead) code in both projects.                                     |
| `yarn test:deadcode:update`            | Update snapshots for dead code detection.                                       |
| `yarn test:lint`                       | Run linting for both frontend and backend.                                      |
| `yarn test:types`                      | Verify TypeScript types across the project.                                     |
| `yarn proxy:testing`                   | Start the testing proxy server to connect to the Strapi testing backend.        |
| `yarn proxy:testing:infinite`          | Run the proxy server in infinite mode with automatic JWT regeneration.          |
| `yarn proxy:testing:stop`              | Stop the currently running proxy server.                                        |
| `yarn proxy:transfer`                  | Transfer data from the Strapi testing backend to your local database.           |

## Testing

### Public website

Unit tests should be created for components and functions.

When a component is created to be used in several places and when it contains logic, it is better to test it in its own file, and (when necessary) mock it in the files where it is called.

We also use snapshot testing, so when intended UI changes are made, be sure to update the snapshot.

### Content management system

#### Sharing types between the front & back

You can copy the types from Strapi to be used in Next. Once you have finished making changes to Strapi, run the command `yarn copytypes` from the root of the project. You can find more details on the implementation of this sharing feature in [this article](https://strapi.io/blog/improve-your-frontend-experience-with-strapi-types-and-type-script).

#### Why aren't there any unit test on the CMS?

No tests have been written yet. As of end of 2023, Strapi has not documented a satisfying way to implement unit testing. The [example provided in the Strapi documentation](https://docs.strapi.io/dev-docs/testing) does not respect the principle of [immutable infrastructure](https://www.digitalocean.com/community/tutorials/what-is-immutable-infrastructure).

The Strapi documentation recommends to use a temp local file to host a SQLite database for unit testing. We would be using a different database instance from the one used in production. This means that we could successfully pass our unit tests but the server could be down in production.

## PR title format 🤖

### Why

- To have consistent PR titles
- To have consistent commit messages on `main`

##### About squashing the PR commits

If we squash the PR when we merge it, the PR title becomes the commit message on `main`.
As a result, we just need to enforce consistency on the title of the PR to have consistent commit message on `main`.

The commits of the PR won't be on `main`, but are still useful for PR readiness and for future reference.

### Key points

- We are simply following this [convention](https://www.conventionalcommits.org/en/v1.0.0/#specification)

Here is a recap:

```

<type>[optional scope]: <description>
  │          │               │
  │          │               └─⫸ PR Description: A short and concise summary of the changes. Present tense.
  │          │                    Not capitalized.
  │          │
  │          └─⫸ PR Scope: A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., fix(parser)
  |
  │
  └─⫸ PR Type: build:, chore:, ci:, docs:, feat:, fix:, perf:, refactor:, revert:, style:, test:

```

Here is a more detailed explanation for different types:

build: Changes that affect the build system or external dependencies
chore: Changes that are routine tasks, maintenance work, or other non-functional activities that don't directly impact the user-facing features or bug fixes.
ci: Changes to our CI configuration files and scripts
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
revert: indicate that the changes are reverting a previous commit/PR
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
test: Adding missing tests or correcting existing tests

- GitHub action to ensure that the PR title is in the right format: [dev_on_pull_request_title_checker.yml](./.github/workflows/dev_on_pull_request_title_checker.yml)
