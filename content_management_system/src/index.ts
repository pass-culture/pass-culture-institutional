export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const existingRestaurants = await strapi.entityService.findMany(
      "api::restaurant.restaurant",
      {
        filters: {
          name: "Seed Restaurant 1",
        },
      }
    );
    if (existingRestaurants.length > 0) {
      // eslint-disable-next-line no-console
      console.log("Seed restaurants already exist", existingRestaurants);
      return;
    }

    for (let index = 0; index < 3; index++) {
      // eslint-disable-next-line no-console
      console.log(`Creating Seed Restaurant ${index + 1}`);

      await strapi.entityService.create("api::restaurant.restaurant", {
        data: {
          name: `Seed Restaurant ${index + 1}`,
          description: `Seed description ${index + 1}`,
          publishedAt: new Date(),
        },
      });
    }
  },
};
