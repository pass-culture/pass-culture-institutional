const request = require("supertest");

it("should return restaurants", async () => {
  //   await strapi.services.restaurant.create({
  //     name: "Test Restaurant",
  //     description: "Test Description",
  //   });
  await request(strapi.server.httpServer)
    .post("/api/restaurants")
    .send({
      type: "api::restaurant.restaurant",
      id: 1,
      data: {
        name: "Resto trop bon",
        description: "Y'a de la viande à gogo",
        createdAt: "2023-10-23T12:00:49.307Z",
        updatedAt: "2023-10-23T12:00:50.525Z",
        publishedAt: "2023-10-23T12:00:50.522Z",
      },
    })
    .then((data) => {
      console.log({ data: data.text });
    });

  await request(strapi.server.httpServer)
    .get("/api/restaurants")
    .expect(200) // Expect response http code 200
    .then((data) => {
      const response = JSON.parse(data.text);
      console.log({ response: response.data[0] });
      expect(response).toBeTruthy();
    });
});
