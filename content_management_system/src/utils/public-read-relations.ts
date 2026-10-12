import type { CoreApi } from "@strapi/strapi";

/**
 * Content API routes are public (`auth: false`) and the users-permissions
 * plugin is disabled, so anonymous requests carry no auth. Strapi then strips
 * from responses (and rejects in filters) every relation whose target content
 * type the requester is not allowed to `find`, which makes relations unusable
 * on the public API.
 *
 * This read-only auth only grants `find` on content types that are already
 * publicly readable through their own routes, so it exposes nothing new.
 * Private fields keep being removed by the regular sanitizers.
 */
const PUBLICLY_READABLE_UIDS = [
  "api::observatory.observatory",
  "api::observatory-category.observatory-category",
  "api::observatory-theme.observatory-theme",
];

const ALLOWED_SCOPES = new Set(
  PUBLICLY_READABLE_UIDS.map((uid) => `${uid}.find`)
);

const publicReadAuth = {
  strategy: {
    name: "public-read-relations",
    verify(_auth: unknown, config: { scope?: unknown } = {}): Promise<void> {
      const isAllowed =
        typeof config.scope === "string" && ALLOWED_SCOPES.has(config.scope);

      return isAllowed
        ? Promise.resolve()
        : Promise.reject(new Error("Forbidden"));
    },
  },
  credentials: null,
};

type CoreSanitizers = Pick<
  CoreApi.Controller.Base,
  "validateQuery" | "sanitizeQuery" | "sanitizeOutput"
>;

type RequestContext = Parameters<CoreSanitizers["validateQuery"]>[0];

// Keeps the real auth when there is one (admin, API token)
const withPublicReadAuth = (ctx: RequestContext): RequestContext =>
  ctx.state.auth
    ? ctx
    : Object.create(ctx, {
        state: { value: { ...ctx.state, auth: publicReadAuth } },
      });

// The core controller is the prototype of custom controllers
const getCoreController = (controller: CoreSanitizers): CoreSanitizers =>
  Object.getPrototypeOf(controller);

/**
 * Controller overrides for `createCoreController` so that relations to the
 * publicly readable content types are populated and filterable.
 */
export const withPublicReadRelations = (): CoreSanitizers => ({
  validateQuery(ctx) {
    return getCoreController(this).validateQuery(withPublicReadAuth(ctx));
  },
  sanitizeQuery(ctx) {
    return getCoreController(this).sanitizeQuery(withPublicReadAuth(ctx));
  },
  sanitizeOutput(data, ctx) {
    return getCoreController(this).sanitizeOutput(
      data,
      withPublicReadAuth(ctx)
    );
  },
});
