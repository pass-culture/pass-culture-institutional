# pass Culture Institutional

Welcome to the pass culture institutional project !

This repo contains the frontend (Next) and backend (Strapi) for the institutional site.

This README contains general information that concerns the front & back.

For more specific information:

[frontend documentation](./frontend/README.md)

[backend documentation](./backend/README.md)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-institutional&metric=code_smells)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-institutional)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-institutional&metric=coverage)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-institutional)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-institutional&metric=duplicated_lines_density)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-institutional)

## Start the project

Navigate to the project directory and install the dependencies by running the following commands:

```bash
yarn install
yarn dev
```

> Don't forget to add `/frontend` and `/backend` `.env` with correct environment variables from pass Culture [1Password](https://team-passculture.1password.com/) (search "Site institutionnel" in "Tech" section).

## Local Database

If you want to run the backend locally, you need to install Postgres on your machine. With commands (or PgAdmin) you must create a db with the following:

- Database name: db_institutional

More information on how to setup here: [backend documentation](./backend/README.md)

## Project Scripts

Before you can use the scripts, ensure you have `Yarn` installed on your system.
The project includes several scripts to simplify development and setup:

- `yarn frontend`: Start the frontend development server.
- `yarn backend`: Start the backend development server.
- `yarn clear`: Remove temporary files and caches in the frontend directory.
- `yarn setup:frontend`: Install the frontend dependencies.
- `yarn setup:backend`: Install the backend dependencies.
- `yarn setup`: Install the frontend and backend project dependencies.
- `yarn dev`: Run during development. It clears caches, and starts the frontend and backend servers.
- `yarn audit:all`: Test all the vulnerabilities packages.
- `yarn test:deadcode`: Test both frontend and backend dead code.
- `yarn test:deadcode:update`: Update the frontend and backend dead code snapshots.
- `yarn test:lint:` Test both frontend and backend linting.
- `yarn test:types:` Test both frontend and backend typing.

## Testing

### Frontend

Unit tests should be created for components and functions.

When a component is created to be used in several places and when it contains logic, it is better to test it in its own file, and (when necessary) mock it in the files where it is called.

We also use snapshot testing, so when intended UI changes are made, be sure to update the snapshot.

### Backend

As of end of 2023, Strapi has not documented a satisfying way to implement unit testing. The [example provided in the Strapi documentation](https://docs.strapi.io/dev-docs/testing) does not respect the principle of [immutable infrastructure](https://www.digitalocean.com/community/tutorials/what-is-immutable-infrastructure).

The Strapi documentation recommends to use a temp local file to host a SQLite database for unit testing. We would be using a different database instance from the one used in production. This means that we could successfully pass our unit tests but the server could be down in production.

## PR title format 🤖

### Why

- To have consistent PR titles
- To have consistent commit messages on master

##### About squashing the PR commits

If we squash the PR when we merge it, the PR title becomes the commit message on master.
As a result, we just need to enforce consistency on the title of the PR to have consistent commit message on master.

The commits of the PR won't be on main, but are still useful for PR readiness and for future reference.

### Key points

- The agreed upon format for the PR title is:

```
<jira> <type>(<scope>): <short summary>
  │       │      |             │
  │       │      |             └─⫸ PR Summary: short summary of the Jira ticket title in English. Present tense.
  │       │      |                  Not capitalized. No period at the end.
  │       │      |
  │       │      └─⫸ PR Scope: Hierarchical scope. Not capitalized, but snakeCase. For instance:
  │       │           app, core, themeProvider... > identityCheck, eac, booking, search... > useSelectHomepageEntry...
  │       │
  │       └─⫸ PR Type: build, ci, docs, feat, fix, perf, refactor or test.
  |            See https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type
  │
  └─⫸ Jira ticket number: with parentheses -> (PC-1234).
```

Available types: `build`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor` and `test`.

- GitHub action to ensure that the PR title is in the right format: [dev_on_pull_request_title_checker.yml](./.github/workflows/dev_on_pull_request_title_checker.yml)
