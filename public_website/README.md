# pass Culture Institutional public website

## Configure environment variables

You will find a template for the environnement variables under `public_website/.env.testing`. Duplicate and rename the file `.env`. For running in a local development environnement, you should set `NEXT_PUBLIC_STRAPI_API_URL` to the port Strapi is running on, for example: `http://localhost:1337`.

> To access environment variables in the browser, they have to be prefixed by `NEXT_PUBLIC_`.

There is also an environment variable that is used to build the playlists. Set `NEXT_PUBLIC_BACKEND_API_URL` to `https://backend.passculture.app`. We have also included dummy playlist data directly in Next for local development/testing (MSW mocks the playlist data).

Set `NEXT_PUBLIC_APP_URL` to `https://passculture.app` to build offers' URLs.

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
We have not found an easy way to have the test files along side the page files (the build will fails if tests are included in the `src`).

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
