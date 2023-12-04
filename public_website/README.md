# pass Culture Institutional public website

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone this repository to your machine using the following command:

```bash
git clone https://github.com/your-username/pass-culture-institutional.git
```

## Configure environment variables

You will find a template for the environnement variables under `public_website/.env.example`. Duplicate and rename the file `.env`. For running in a local development environnement, you should set `NEXT_PUBLIC_STRAPI_API_URL` to the port Strapi is running on, for example: `http://localhost:1337`.

## Start the project

Navigate to the project directory and install the dependencies by running the following commands:

```bash
cd pass-culture-institutional
yarn install
yarn dev
```

## Test files location

By default, Next.js will take into account any file ending with tsx, ts, jsx or js under the pages folder for the purpose of building pages/API routes and routing.

We follow Jest's convention by adding tests to the **tests** folder in the project's root directory.
It is not possible to have the test files along side the page files or the build will fail.

## Project Scripts

Before you can use the scripts, ensure you have `Yarn` installed on your system.
The project includes several scripts to simplify development and setup:

- `yarn build:` Build the application for production.
- `yarn dev:` Start the Next.js development server.
- `yarn start:` Start the application in production mode.
- `yarn test:` Run tests using Vitest.
- `yarn test:deadcode:` Find unused code using ts-prune.
- `yarn test:lint:` Run the linter to check code quality.
- `yarn test:types:` Check typing.
