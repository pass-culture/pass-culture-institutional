# pass Culture Institutional

Welcome to the pass culture institutional project !

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
