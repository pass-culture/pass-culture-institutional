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
    await createSeedRestaurant(strapi);
    await createSeedActivePlaylistTag(strapi);
  },
};

async function createSeedRestaurant(strapi) {
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
}

async function createSeedActivePlaylistTag(strapi) {
  const existingActivePlaylistTags = await strapi.entityService.findMany(
    "api::active-playlist-tag.active-playlist-tag",
    {
      filters: {
        name: "Bons_plans_du_moment",
      },
    }
  );
  if (existingActivePlaylistTags.length > 0) {
    // eslint-disable-next-line no-console
    console.log(
      "Seed active playlist tags already exist",
      existingActivePlaylistTags
    );
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Creating Seed Active Playlist Tag "Bons_plans_du_moment"`);

  await strapi.entityService.create(
    "api::active-playlist-tag.active-playlist-tag",
    {
      data: {
        name: "Bons_plans_du_moment",
        publishedAt: new Date(),
      },
    }
  );
}
