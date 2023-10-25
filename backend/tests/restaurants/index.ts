import request from "supertest";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

it("should return restaurants", async () => {
  //   await strapi.services.restaurant.create({
  //     name: "Test Restaurant",
  //     description: "Test Description",
  //   });
  await request((strapi as any).server.httpServer) // Replace 'any' with the appropriate type
    .post("/api/restaurants")
    .send({
      data: {
        name: "Resto degeu",
        description: "C'est cher en plus",
      },
    })
    .then((data) => {
      console.log({ data: data.text });
    });

  await request((strapi as any).server.httpServer) // Replace 'any' with the appropriate type
    .get("/api/restaurants")
    .expect(200) // Expect response http code 200
    .then((data) => {
      const response = JSON.parse(data.text);
      console.log({ response: response.data[1] });
      expect(response).toBeTruthy();
    });
});
