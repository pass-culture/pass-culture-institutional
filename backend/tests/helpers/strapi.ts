import strapiFactory, { ConfigProvider, Strapi } from "@strapi/strapi";
import fs from "fs";

let instance: Strapi;

export async function setupStrapi() {
  if (!instance) {
    instance = await strapiFactory({ distDir: "./dist" }).load();
    // Argument distDir required or error running tests
    // https://github.com/strapi/strapi/issues/12894#issuecomment-1143282553
    // https://docs.strapi.io/dev-docs/typescript#start-strapi-programmatically
    await instance.server.mount();
  }
  return instance;
}

export async function cleanupStrapi() {
  const dbSettings: ConfigProvider = strapi.config.get("database.connection");

  // close server to release the db-file
  await strapi.server.httpServer.close();

  // close the connection to the database before deletion
  await strapi.db.connection.destroy();

  // delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}