/**
 * Non-regression tests for the RBAC permission layer built on @casl/ability.
 *
 * @casl/ability is pinned by @strapi/admin, @strapi/permissions and
 * @strapi/types and forced to a patched version through "resolutions" in
 * package.json (GHSA-x9vf-53q3-cvx6). These tests exercise casl through
 * Strapi's own permission engine and the same casl helpers @strapi/admin uses
 * (subject, permittedFieldsOf, rulesFor, rulesToQuery), so a resolution that
 * changes casl's behaviour makes them fail.
 *
 * Run with: yarn test (node --test, no extra dependency).
 */
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const permissions = require("@strapi/permissions");
const { subject, detectSubjectType } = require("@casl/ability");
const {
  permittedFieldsOf,
  rulesToFields,
  rulesToQuery,
} = require("@casl/ability/extra");

const ARTICLE = "api::article.article";
const AUTHOR_ID = 1;
const AUTHOR_ROLE_ID = 10;

// Mirrors the conditions Strapi registers for the admin
// (admin::is-creator and admin::has-same-role-as-creator).
const conditions = {
  "admin::is-creator": {
    handler: ({ user }) => ({ "createdBy.id": user.id }),
  },
  "admin::has-same-role-as-creator": {
    handler: ({ user }) => ({
      "createdBy.roles": {
        $elemMatch: { id: { $in: user.roles.map((role) => role.id) } },
      },
    }),
  },
  "test::always-true": { handler: () => true },
  "test::always-false": { handler: () => false },
};

const providers = {
  condition: { get: (name) => conditions[name] },
};

const author = { id: AUTHOR_ID, roles: [{ id: AUTHOR_ROLE_ID }] };

const buildAbility = (permissionList, user = author) =>
  permissions.engine
    .new({ providers })
    .generateAbility(permissionList, { user });

const article = (data) => subject(ARTICLE, data);

// Same computation as the admin sanitize helpers in @strapi/admin.
const sanitizeFieldsInfo = (ability, action, target) => {
  const permittedFields = permittedFieldsOf(ability, action, target, {
    fieldsFrom: (rule) => rule.fields || [],
  });
  const hasAtLeastOneRegistered = ability
    .rulesFor(action, detectSubjectType(target))
    .flatMap((rule) => rule.fields)
    .some((fields) => fields !== undefined && fields !== null);
  return { permittedFields, hasAtLeastOneRegistered };
};

// Same computation as buildCaslQuery in @strapi/admin.
const buildCaslQuery = (ability, action, model) =>
  rulesToQuery(ability, action, model, (rule) => rule.conditions);

// Version of the @casl/ability copy that `fromPackage` loads at runtime.
// package.json is not exported by casl, so walk up from its entry point.
const caslVersionLoadedBy = (fromPackage) => {
  const fromDir = path.dirname(require.resolve(fromPackage));
  let dir = path.dirname(require.resolve("@casl/ability", { paths: [fromDir] }));
  while (!fs.existsSync(path.join(dir, "package.json")) ||
    JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")).name !== "@casl/ability") {
    dir = path.dirname(dir);
  }
  return JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")).version;
};

describe("casl version", () => {
  for (const fromPackage of ["@strapi/permissions", "@strapi/admin", "@strapi/types"]) {
    it(`${fromPackage} loads the patched version forced by resolutions`, () => {
      const version = caslVersionLoadedBy(fromPackage);
      const [major, minor, patch] = version.split(".").map(Number);
      assert.equal(major, 6);
      assert.ok(
        minor > 7 || (minor === 7 && patch >= 5),
        `@casl/ability ${version} is vulnerable (GHSA-x9vf-53q3-cvx6), expected >= 6.7.5`
      );
    });
  }
});

describe("permission engine (@strapi/permissions + casl)", () => {
  it("grants an action without conditions on any subject of that type", async () => {
    const ability = await buildAbility([
      { action: "plugin::content-manager.explorer.read", subject: ARTICLE },
    ]);
    assert.equal(
      ability.can("plugin::content-manager.explorer.read", ARTICLE),
      true
    );
    assert.equal(
      ability.can("plugin::content-manager.explorer.read", article({ id: 5 })),
      true
    );
    assert.equal(
      ability.can("plugin::content-manager.explorer.delete", ARTICLE),
      false
    );
    assert.equal(
      ability.can("plugin::content-manager.explorer.read", "api::page.page"),
      false
    );
  });

  it("applies the is-creator condition on the subject instance", async () => {
    const ability = await buildAbility([
      {
        action: "plugin::content-manager.explorer.update",
        subject: ARTICLE,
        conditions: ["admin::is-creator"],
      },
    ]);
    const action = "plugin::content-manager.explorer.update";
    assert.equal(
      ability.can(action, article({ id: 1, createdBy: { id: AUTHOR_ID } })),
      true
    );
    assert.equal(
      ability.can(action, article({ id: 2, createdBy: { id: 999 } })),
      false
    );
    assert.equal(ability.can(action, article({ id: 3 })), false);
    // Type-level check: allowed for at least some instances.
    assert.equal(ability.can(action, ARTICLE), true);
  });

  it("applies the $elemMatch / $in condition (same role as creator)", async () => {
    const ability = await buildAbility([
      {
        action: "plugin::content-manager.explorer.read",
        subject: ARTICLE,
        conditions: ["admin::has-same-role-as-creator"],
      },
    ]);
    const action = "plugin::content-manager.explorer.read";
    assert.equal(
      ability.can(
        action,
        article({ createdBy: { roles: [{ id: 3 }, { id: AUTHOR_ROLE_ID }] } })
      ),
      true
    );
    assert.equal(
      ability.can(action, article({ createdBy: { roles: [{ id: 3 }] } })),
      false
    );
  });

  it("drops permissions whose conditions all evaluate to false", async () => {
    const ability = await buildAbility([
      {
        action: "plugin::content-manager.explorer.publish",
        subject: ARTICLE,
        conditions: ["test::always-false"],
      },
    ]);
    assert.equal(
      ability.can("plugin::content-manager.explorer.publish", ARTICLE),
      false
    );
  });

  it("grants unconditionally when one condition evaluates to true", async () => {
    const ability = await buildAbility([
      {
        action: "plugin::content-manager.explorer.publish",
        subject: ARTICLE,
        conditions: ["test::always-false", "test::always-true"],
      },
    ]);
    assert.equal(
      ability.can(
        "plugin::content-manager.explorer.publish",
        article({ createdBy: { id: 999 } })
      ),
      true
    );
  });

  it("handles parametrized actions", async () => {
    const ability = await buildAbility([
      {
        action: "plugin::content-manager.explorer.read",
        subject: ARTICLE,
        actionParameters: { locale: "fr" },
      },
    ]);
    assert.equal(
      ability.can(
        {
          name: "plugin::content-manager.explorer.read",
          params: { locale: "fr" },
        },
        ARTICLE
      ),
      true
    );
    assert.equal(
      ability.can(
        {
          name: "plugin::content-manager.explorer.read",
          params: { locale: "en" },
        },
        ARTICLE
      ),
      false
    );
  });

  it("grants actions on all subjects when subject is null", async () => {
    const ability = await buildAbility([
      { action: "admin::marketplace.read", subject: null },
    ]);
    assert.equal(ability.can("admin::marketplace.read", "all"), true);
  });
});

describe("field-level permissions (admin sanitize helpers)", () => {
  const action = "plugin::content-manager.explorer.read";

  it("restricts the permitted fields to the registered ones", async () => {
    const ability = await buildAbility([
      {
        action,
        subject: ARTICLE,
        properties: { fields: ["title", "seo.metaTitle"] },
      },
    ]);
    const { permittedFields, hasAtLeastOneRegistered } = sanitizeFieldsInfo(
      ability,
      action,
      article({ id: 1 })
    );
    assert.deepEqual([...permittedFields].sort(), ["seo.metaTitle", "title"]);
    assert.equal(hasAtLeastOneRegistered, true);
    assert.equal(ability.can(action, article({ id: 1 }), "title"), true);
    assert.equal(ability.can(action, article({ id: 1 }), "body"), false);
  });

  it("allows every field when no field is registered", async () => {
    const ability = await buildAbility([{ action, subject: ARTICLE }]);
    const { permittedFields, hasAtLeastOneRegistered } = sanitizeFieldsInfo(
      ability,
      action,
      article({ id: 1 })
    );
    assert.deepEqual(permittedFields, []);
    assert.equal(hasAtLeastOneRegistered, false);
    assert.equal(ability.can(action, article({ id: 1 }), "body"), true);
  });

  it("only grants fields of rules whose conditions match", async () => {
    const ability = await buildAbility([
      {
        action,
        subject: ARTICLE,
        properties: { fields: ["title"] },
      },
      {
        action,
        subject: ARTICLE,
        properties: { fields: ["body"] },
        conditions: ["admin::is-creator"],
      },
    ]);
    const own = sanitizeFieldsInfo(
      ability,
      action,
      article({ createdBy: { id: AUTHOR_ID } })
    );
    const other = sanitizeFieldsInfo(
      ability,
      action,
      article({ createdBy: { id: 999 } })
    );
    assert.deepEqual([...own.permittedFields].sort(), ["body", "title"]);
    assert.deepEqual(other.permittedFields, ["title"]);
  });
});

describe("query building (admin getQuery)", () => {
  const action = "plugin::content-manager.explorer.read";

  it("returns an empty query when access is unconditional", async () => {
    const ability = await buildAbility([{ action, subject: ARTICLE }]);
    assert.deepEqual(buildCaslQuery(ability, action, ARTICLE), {});
  });

  it("returns null when the action is not granted", async () => {
    const ability = await buildAbility([{ action, subject: ARTICLE }]);
    assert.equal(
      buildCaslQuery(ability, "plugin::content-manager.explorer.delete", ARTICLE),
      null
    );
  });

  it("translates conditions into a query filter", async () => {
    const ability = await buildAbility([
      { action, subject: ARTICLE, conditions: ["admin::is-creator"] },
    ]);
    assert.deepEqual(buildCaslQuery(ability, action, ARTICLE), {
      $or: [{ $and: [{ $or: [{ "createdBy.id": AUTHOR_ID }] }] }],
    });
  });
});

describe("prototype pollution (GHSA-x9vf-53q3-cvx6)", () => {
  // Fixed in 6.7.5: "ignores potentially insecure fields in rulesToFields".
  // Strapi 4 does not call rulesToFields itself; this test fails on 6.5.0
  // and proves the resolved version carries the fix.
  it("rulesToFields does not write through __proto__ condition paths", async () => {
    const action = "plugin::content-manager.explorer.read";
    const ability = await buildAbility([]);
    ability.update([
      {
        action,
        subject: ARTICLE,
        conditions: {
          "__proto__.polluted": "yes",
          "constructor.prototype.polluted": "yes",
        },
      },
    ]);
    try {
      rulesToFields(ability, action, ARTICLE);
    } catch {
      // 6.5.0 also throws on the constructor.prototype path; only the
      // pollution side effect matters here.
    }
    try {
      assert.equal({}.polluted, undefined);
    } finally {
      delete Object.prototype.polluted;
    }
  });
});
