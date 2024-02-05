module.exports = {
  routes: [
    {
      method: "GET",
      path: "/health",
      handler: async (ctx) => {
        const user = await strapi.query("admin::user").findOne();

        ctx.body = `API: OK, Database: ${!!user ? "OK" : "NOT OK"}`;
      },
      config: {
        auth: false,
      },
    },
  ],
};
