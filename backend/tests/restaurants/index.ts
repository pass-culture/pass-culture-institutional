import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import { newRestaurant } from "../helpers/fixtures";

describe("endpoint restaurants", () => {
  console.log("DATABASE_CLIENT: ", process.env.DATABASE_CLIENT);
  it("should return a restaurant when calling post method", async () => {
    await request(strapi.server.httpServer)
      .post("/api/restaurants")
      .send({
        data: newRestaurant,
      })
      .then((data) => {
        console.log({ data: data.text });
      });
  });

  it("should return restaurants when calling get method", async () => {
    await request(strapi.server.httpServer)
      .get("/api/restaurants")
      .expect(200)
      .then((data) => {
        const response = JSON.parse(data.text);
        console.log({ response: response.data[0] });
        expect(response.data[0].id).toBeTruthy();
      });
  });
});
