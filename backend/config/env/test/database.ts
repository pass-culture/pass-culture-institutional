import path from "path";

export default ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(
        __dirname,
        "..",
        env("DATABASE_FILENAME", ".tmp/data.db")
      ),
    },
    useNullAsDefault: true,
    debug: false,
  },
});

// Got this file from:
// https://docs.strapi.io/dev-docs/configurations/sqlite#install-sqlite-manually
// Just added the debug: false line as it was given in the test documentation:
// https://docs.strapi.io/dev-docs/testing#set-up-a-testing-environment

// Also in the strapi test documentation, they tell us to install the following:
// yarn add --dev jest supertest sqlite3
// But I actaully had to install the following:
// yarn add better-sqlite3
