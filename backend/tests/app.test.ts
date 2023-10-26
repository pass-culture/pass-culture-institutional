// import * as fs from "fs";
import { setupStrapi, cleanupStrapi } from "./helpers/strapi";
import { Strapi } from "@strapi/strapi";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

let strapiInstance: Strapi;

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