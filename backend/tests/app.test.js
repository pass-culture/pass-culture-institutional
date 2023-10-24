const fs = require("fs");
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

let strapiInstance;

beforeAll(async () => {
  strapiInstance = await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapiInstance).toBeDefined();
});

require("./restaurants");
