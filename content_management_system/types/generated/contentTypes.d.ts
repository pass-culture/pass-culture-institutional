import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivePlaylistTagActivePlaylistTag
  extends Schema.CollectionType {
  collectionName: 'active_playlist_tags';
  info: {
    singularName: 'active-playlist-tag';
    pluralName: 'active-playlist-tags';
    displayName: 'Active Playlist Tag';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    tag: Attribute.String;
    displayName: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::active-playlist-tag.active-playlist-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::active-playlist-tag.active-playlist-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActualitesPassCultureActualitesPassCulture
  extends Schema.SingleType {
  collectionName: 'actualites_pass_cultures';
  info: {
    singularName: 'actualites-pass-culture';
    pluralName: 'actualites-pass-cultures';
    displayName: 'Actualites Pass Culture';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    buttonText: Attribute.String;
    filtres: Attribute.Component<'common.filtre', true>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    separator: Attribute.Component<'block.separator'>;
    aide: Attribute.Component<'block.simple-push-cta'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::actualites-pass-culture.actualites-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::actualites-pass-culture.actualites-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActualitesRdvActeursCulturelActualitesRdvActeursCulturel
  extends Schema.SingleType {
  collectionName: 'actualites_rdv_acteurs_culturels';
  info: {
    singularName: 'actualites-rdv-acteurs-culturel';
    pluralName: 'actualites-rdv-acteurs-culturels';
    displayName: 'Actualites Rdv Acteurs Culturels';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    buttonText: Attribute.String;
    filtres: Attribute.Component<'common.filtre', true>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    separator: Attribute.Component<'block.separator'>;
    aide: Attribute.Component<'block.simple-push-cta'>;
    titleEventSection: Attribute.String & Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Path: Attribute.String & Attribute.Required;
    Blocks: Attribute.DynamicZone<
      [
        'block.simple-text',
        'block.image',
        'block.video',
        'block.double-push-cta',
        'block.social-media'
      ]
    >;
    relatedNews: Attribute.Component<'block.related-news'> & Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEtudesPassCultureEtudesPassCulture
  extends Schema.SingleType {
  collectionName: 'etudes_pass_cultures';
  info: {
    singularName: 'etudes-pass-culture';
    pluralName: 'etudes-pass-cultures';
    displayName: 'Etudes Pass Culture';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    buttonText: Attribute.String;
    filtres: Attribute.Component<'common.filtre', true>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    separator: Attribute.Component<'block.separator'>;
    observatoire: Attribute.Component<'block.simple-push-cta'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::etudes-pass-culture.etudes-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::etudes-pass-culture.etudes-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    startTime: Attribute.Time & Attribute.Required;
    endTime: Attribute.Time & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    image: Attribute.Media;
    category: Attribute.Enumeration<['Salon']> & Attribute.Required;
    localisation: Attribute.Enumeration<
      [
        'Aquitaine',
        'Auvergne',
        'Auvergne-Rh\u00F4ne-Alpes',
        'Basse-Normandie',
        'Bourgogne',
        'Bourgogne-Franche-Comt\u00E9',
        'Bretagne',
        'Centre',
        'Champagne-Ardenne',
        'Corse',
        'Franche-Comt\u00E9',
        'Grand-Est',
        'Guadeloupe',
        'Guyane',
        'Haute-Normandie',
        'Hauts-de-France',
        '\u00CEle-de-France',
        'La-R\u00E9union',
        'Languedoc-Roussillon',
        'Languedoc-Roussillon-Midi-Pyr\u00E9n\u00E9es',
        'Limousin',
        'Lorraine',
        'Martinique',
        'Mayotte',
        'Midi-Pyr\u00E9n\u00E9es',
        'Nord-Pas-de-Calais',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Pays-de-la-Loire',
        'Picardie',
        'Poitou-Charentes',
        "Provence-Alpes-C\u00F4te d'Azur",
        'Rh\u00F4ne-Alpes'
      ]
    > &
      Attribute.Required;
    secteur: Attribute.Enumeration<
      [
        'Pratiques culturelles',
        'Spectacle vivant',
        'Musique',
        'Lecture',
        'Cin\u00E9ma',
        'Offres num\u00E9riques'
      ]
    > &
      Attribute.Required;
    city: Attribute.String & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    PlayStoreUrl: Attribute.String & Attribute.Required;
    AppStoreUrl: Attribute.String & Attribute.Required;
    Lists: Attribute.Component<'footer.list', true>;
    bannerText: Attribute.String;
    LegalLinks: Attribute.Component<'common.link', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Schema.SingleType {
  collectionName: 'headers';
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'Header';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    targetItems: Attribute.Component<'header.navigation-items', true> &
      Attribute.Required;
    aboutItems: Attribute.Component<'header.navigation-items', true> &
      Attribute.Required;
    login: Attribute.Component<'header.account-dropdown'> & Attribute.Required;
    signup: Attribute.Component<'header.account-dropdown'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHelpHelp extends Schema.SingleType {
  collectionName: 'helps';
  info: {
    singularName: 'help';
    pluralName: 'helps';
    displayName: 'Help - Jeunes parents';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroSection: Attribute.Component<'block.header'> & Attribute.Required;
    cardText: Attribute.Component<'block.double-push-cta'> & Attribute.Required;
    social: Attribute.Component<'block.social-media'> & Attribute.Required;
    simplepushcta: Attribute.Component<'block.simple-push-cta'> &
      Attribute.Required;
    faq: Attribute.Component<'block.faq'> & Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::help.help', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::help.help', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHelpCulturalActorsHelpCulturalActors
  extends Schema.SingleType {
  collectionName: 'help_cultural_actors_list';
  info: {
    singularName: 'help-cultural-actors';
    pluralName: 'help-cultural-actors-list';
    displayName: 'Help - Cultural Actors';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroSection: Attribute.Component<'block.header'> & Attribute.Required;
    cardText: Attribute.Component<'block.double-push-cta'> & Attribute.Required;
    social: Attribute.Component<'block.social-media'> & Attribute.Required;
    simplepushcta: Attribute.Component<'block.simple-push-cta'> &
      Attribute.Required;
    faq: Attribute.Component<'block.faq'> & Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::help-cultural-actors.help-cultural-actors',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::help-cultural-actors.help-cultural-actors',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHelpTeachersHelpTeachers extends Schema.SingleType {
  collectionName: 'help_teachers_list';
  info: {
    singularName: 'help-teachers';
    pluralName: 'help-teachers-list';
    displayName: 'Help - Teachers';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heroSection: Attribute.Component<'block.header'> & Attribute.Required;
    cardText: Attribute.Component<'block.double-push-cta'> & Attribute.Required;
    social: Attribute.Component<'block.social-media'> & Attribute.Required;
    simplepushcta: Attribute.Component<'block.simple-push-cta'> &
      Attribute.Required;
    faq: Attribute.Component<'block.faq'> & Attribute.Required;
    latestStudies: Attribute.Component<'block.latest-news'> &
      Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::help-teachers.help-teachers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::help-teachers.help-teachers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes';
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'Home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutSection: Attribute.Component<'block.centered-text'> &
      Attribute.Required;
    CTASection: Attribute.Component<'block.push-cta'> & Attribute.Required;
    socialMediaSection: Attribute.Component<'block.social-media'> &
      Attribute.Required;
    latestStudies: Attribute.Component<'block.latest-news'> &
      Attribute.Required;
    eligibilitySection: Attribute.Component<'home.eligibility-section'> &
      Attribute.Required;
    heroSection: Attribute.Component<'home.hero-section'> & Attribute.Required;
    recommendationsSection: Attribute.Component<'home.recommendations-section'> &
      Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiListeJeuneListeJeune extends Schema.SingleType {
  collectionName: 'liste_jeunes';
  info: {
    singularName: 'liste-jeune';
    pluralName: 'liste-jeunes';
    displayName: 'Actualit\u00E9s jeunes parents';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    buttonText: Attribute.Text;
    filtres: Attribute.Component<'common.filtre', true> & Attribute.Required;
    socialMediaSection: Attribute.Component<'block.social-media'> &
      Attribute.Required;
    separator: Attribute.Component<'block.separator'>;
    aide: Attribute.Component<'block.simple-push-cta'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::liste-jeune.liste-jeune',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::liste-jeune.liste-jeune',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiListeOffreListeOffre extends Schema.SingleType {
  collectionName: 'liste_offres';
  info: {
    singularName: 'liste-offre';
    pluralName: 'liste-offres';
    displayName: 'Liste offres';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    hero: Attribute.Component<'block.header'>;
    offres: Attribute.Component<'block.offer-list'> & Attribute.Required;
    separator: Attribute.Component<'block.separator'>;
    question: Attribute.Component<'block.simple-push-cta'>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    offers: Attribute.Component<'block.offers-section'> & Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::liste-offre.liste-offre',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::liste-offre.liste-offre',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsNews extends Schema.CollectionType {
  collectionName: 'news_list';
  info: {
    singularName: 'news';
    pluralName: 'news-list';
    displayName: 'News';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    category: Attribute.Enumeration<
      [
        '\u00C9tude',
        'Article',
        '\u00C9v\u00E8nement',
        'Partenariat',
        'Rencontre',
        'Dossier de presse',
        'Communiqu\u00E9 de presse',
        '\u00C9tude ritualis\u00E9e',
        '\u00C9tude ponctuelle'
      ]
    > &
      Attribute.Required;
    date: Attribute.DateTime & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
    localisation: Attribute.Enumeration<
      [
        'Aquitaine',
        'Auvergne',
        'Auvergne-Rh\u00F4ne-Alpes',
        'Basse-Normandie',
        'Bourgogne',
        'Bourgogne-Franche-Comt\u00E9',
        'Bretagne',
        'Centre',
        'Champagne-Ardenne',
        'Corse',
        'Franche-Comt\u00E9',
        'Grand-Est',
        'Guadeloupe',
        'Guyane',
        'Haute-Normandie',
        'Hauts-de-France',
        '\u00CEle-de-France',
        'La-R\u00E9union',
        'Languedoc-Roussillon',
        'Languedoc-Roussillon-Midi-Pyr\u00E9n\u00E9es',
        'Limousin',
        'Lorraine',
        'Martinique',
        'Mayotte',
        'Midi-Pyr\u00E9n\u00E9es',
        'Nord-Pas-de-Calais',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Pays-de-la-Loire',
        'Picardie',
        'Poitou-Charentes',
        "Provence-Alpes-C\u00F4te d'Azur",
        'Rh\u00F4ne-Alpes'
      ]
    > &
      Attribute.Required;
    secteur: Attribute.Enumeration<
      [
        'Pratiques culturelles',
        'Spectacle vivant',
        'Musique',
        'Lecture',
        'Cin\u00E9ma',
        'Offres num\u00E9riques'
      ]
    > &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::news.news', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::news.news', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiNotFoundNotFound extends Schema.SingleType {
  collectionName: 'not_founds';
  info: {
    singularName: 'not-found';
    pluralName: 'not-founds';
    displayName: 'Not Found';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    header: Attribute.Component<'block.header'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::not-found.not-found',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::not-found.not-found',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages';
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Path: Attribute.String & Attribute.Required & Attribute.Unique;
    Blocks: Attribute.DynamicZone<
      [
        'block.centered-text',
        'block.header',
        'block.simple-text',
        'block.social-media',
        'block.double-push-cta',
        'block.image-text',
        'block.image',
        'block.little-list',
        'block.separator',
        'block.simple-push-cta',
        'block.space',
        'block.vertical-carousel',
        'block.video',
        'block.key-number-carousel',
        'block.logos',
        'block.testimonies',
        'block.latest-news',
        'block.experience-video-carousel',
        'block.offers-carousel',
        'block.piled-cards',
        'block.faq',
        'block.detailed-logos',
        'block.organization-chart',
        'block.simple-text-v2',
        'block.list-bread-crumb'
      ]
    >;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPressePresse extends Schema.SingleType {
  collectionName: 'presses';
  info: {
    singularName: 'presse';
    pluralName: 'presses';
    displayName: 'Presse';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    buttonText: Attribute.String;
    filtres: Attribute.Component<'common.filtre', true>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    separator: Attribute.Component<'block.separator'>;
    texteImage: Attribute.Component<'block.image-text'> & Attribute.Required;
    pushCta: Attribute.Component<'block.double-push-cta'> & Attribute.Required;
    aide: Attribute.Component<'block.simple-push-cta'>;
    titleEventSection: Attribute.String & Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::presse.presse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::presse.presse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRessourcesEnseignantRessourcesEnseignant
  extends Schema.SingleType {
  collectionName: 'ressources_enseignants';
  info: {
    singularName: 'ressources-enseignant';
    pluralName: 'ressources-enseignants';
    displayName: 'Ressources Enseignants';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    buttonText: Attribute.String;
    filtres: Attribute.Component<'common.filtre', true>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    separator: Attribute.Component<'block.separator'>;
    aide: Attribute.Component<'block.simple-push-cta'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ressources-enseignant.ressources-enseignant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ressources-enseignant.ressources-enseignant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRessourcesPassCultureRessourcesPassCulture
  extends Schema.SingleType {
  collectionName: 'ressources_pass_cultures';
  info: {
    singularName: 'ressources-pass-culture';
    pluralName: 'ressources-pass-cultures';
    displayName: 'Ressources Pass Culture';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    buttonText: Attribute.String;
    filtres: Attribute.Component<'common.filtre', true>;
    socialMediaSection: Attribute.Component<'block.social-media'>;
    separator: Attribute.Component<'block.separator'>;
    etudes: Attribute.Component<'block.simple-push-cta'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ressources-pass-culture.ressources-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ressources-pass-culture.ressources-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantRestaurant extends Schema.CollectionType {
  collectionName: 'restaurants';
  info: {
    singularName: 'restaurant';
    pluralName: 'restaurants';
    displayName: 'Restaurant';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.RichText;
    categories: Attribute.Relation<
      'api::restaurant.restaurant',
      'manyToMany',
      'api::category.category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurant.restaurant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurant.restaurant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSimulatorSimulator extends Schema.SingleType {
  collectionName: 'simulators';
  info: {
    singularName: 'simulator';
    pluralName: 'simulators';
    displayName: 'Simulator';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    ageQuestion: Attribute.Component<'simulator.age-question'> &
      Attribute.Required;
    nationnalityQuestion: Attribute.Component<'simulator.radio-question'> &
      Attribute.Required;
    residencyQuestion: Attribute.Component<'simulator.radio-question'> &
      Attribute.Required;
    steps: Attribute.Component<'simulator.step', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
    successScreen: Attribute.Component<'simulator.success-screen'> &
      Attribute.Required;
    failureScreen: Attribute.Component<'simulator.failure-screen'> &
      Attribute.Required;
    tooYoungScreen: Attribute.Component<'simulator.failure-screen'> &
      Attribute.Required;
    tooOldScreen: Attribute.Component<'simulator.failure-screen'> &
      Attribute.Required;
    amountScreen_15: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required;
    amountScreen_16: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required;
    amountScreen_17: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required;
    amountScreen_18: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required;
    topEmoji: Attribute.String & Attribute.Required;
    bottomEmoji: Attribute.String & Attribute.Required;
    socialMedias: Attribute.Component<'block.social-media'> &
      Attribute.Required;
    bread: Attribute.Component<'block.list-bread-crumb'>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::simulator.simulator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::simulator.simulator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::active-playlist-tag.active-playlist-tag': ApiActivePlaylistTagActivePlaylistTag;
      'api::actualites-pass-culture.actualites-pass-culture': ApiActualitesPassCultureActualitesPassCulture;
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel': ApiActualitesRdvActeursCulturelActualitesRdvActeursCulturel;
      'api::article.article': ApiArticleArticle;
      'api::category.category': ApiCategoryCategory;
      'api::etudes-pass-culture.etudes-pass-culture': ApiEtudesPassCultureEtudesPassCulture;
      'api::event.event': ApiEventEvent;
      'api::footer.footer': ApiFooterFooter;
      'api::header.header': ApiHeaderHeader;
      'api::help.help': ApiHelpHelp;
      'api::help-cultural-actors.help-cultural-actors': ApiHelpCulturalActorsHelpCulturalActors;
      'api::help-teachers.help-teachers': ApiHelpTeachersHelpTeachers;
      'api::home.home': ApiHomeHome;
      'api::liste-jeune.liste-jeune': ApiListeJeuneListeJeune;
      'api::liste-offre.liste-offre': ApiListeOffreListeOffre;
      'api::news.news': ApiNewsNews;
      'api::not-found.not-found': ApiNotFoundNotFound;
      'api::page.page': ApiPagePage;
      'api::presse.presse': ApiPressePresse;
      'api::ressources-enseignant.ressources-enseignant': ApiRessourcesEnseignantRessourcesEnseignant;
      'api::ressources-pass-culture.ressources-pass-culture': ApiRessourcesPassCultureRessourcesPassCulture;
      'api::restaurant.restaurant': ApiRestaurantRestaurant;
      'api::simulator.simulator': ApiSimulatorSimulator;
    }
  }
}
