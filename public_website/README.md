# pass Culture Institutional public website

## Configure environment variables

You will find a template for the environnement variables under `public_website/.env.example`. Duplicate and rename the file `.env`. For running in a local development environnement, you should set `STRAPI_API_URL` to the port Strapi is running on, for example: `http://localhost:1337`.

At the moment, it is not possible to create a build for the website with a non-local instance of the Content Management System. To build locally you must have the CMS running on your own machine.

If you set `STRAPI_API_URL` to a non-local instance of the CMS (for example the testing version: `https://siteinstit-cms.testing.passculture.team`), the token the Public Website needs to access the CMS (Google IAP protected) that is usually provided by the CI will not be found by Next.

> Usually, to access environment variables in the browser, they have to be prefixed by `NEXT_PUBLIC_`. In our case, we only need `STRAPI_API_URL` to be available in the Node.js environment.

There are also 2 environment variables that are used to build the playlists. Since `INSTITUTIONAL_API_TOKEN` is only available in our CI, it is not possible locally to get the playlists from our backend. We have included dummy playlist data directly in Next for local development.

## Start the Public Website

Navigate to the project directory and install the dependencies by running the following commands:

```bash
cd public_website
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

- `yarn build`: Build the application for production.
- `yarn dev`: Start the Next.js development server.
- `yarn start`: Start the application in production mode.
- `yarn test`: Run tests using Vitest.
- `yarn test:deadcode`: Find unused code using ts-prune.
- `yarn test:lint`: Run the linter to check code quality.
- `yarn test:types`: Check typing.
