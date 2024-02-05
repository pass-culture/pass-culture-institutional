module.exports = {
  routes: [
    {
      method: "GET",
      path: "/health",
      async handler(ctx) {
        const user = await strapi.query("admin::user").findOne();
        ctx.body = `API: OK, Database: ${user?.id ? "OK" : "NOT OK"}`;
      },
      config: {
        auth: false,
      },
    },
  ],
};
