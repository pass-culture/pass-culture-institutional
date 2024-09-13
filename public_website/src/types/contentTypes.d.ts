import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    username: Attribute.String
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    registrationToken: Attribute.String & Attribute.Private
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    preferedLanguage: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions'
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    name: 'Transfer Token'
    singularName: 'transfer-token'
    pluralName: 'transfer-tokens'
    displayName: 'Transfer Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    name: 'Transfer Token Permission'
    description: ''
    singularName: 'transfer-token-permission'
    pluralName: 'transfer-token-permissions'
    displayName: 'Transfer Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    alternativeText: Attribute.String
    caption: Attribute.String
    width: Attribute.Integer
    height: Attribute.Integer
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    ext: Attribute.String
    mime: Attribute.String & Attribute.Required
    size: Attribute.Decimal & Attribute.Required
    url: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases'
  info: {
    singularName: 'release'
    pluralName: 'releases'
    displayName: 'Release'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    releasedAt: Attribute.DateTime
    scheduledAt: Attribute.DateTime
    timezone: Attribute.String
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions'
  info: {
    singularName: 'release-action'
    pluralName: 'release-actions'
    displayName: 'Release Action'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >
    contentType: Attribute.String & Attribute.Required
    locale: Attribute.String
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >
    isEntryValid: Attribute.Boolean
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiActualitesPassCultureActualitesPassCulture
  extends Schema.SingleType {
  collectionName: 'actualites_pass_cultures'
  info: {
    singularName: 'actualites-pass-culture'
    pluralName: 'actualites-pass-cultures'
    displayName: "S'informer - Actualit\u00E9s"
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String
    buttonText: Attribute.String
    filtres: Attribute.Component<'common.filtre', true>
    socialMediaSection: Attribute.Component<'block.social-media'>
    separator: Attribute.Component<'block.separator'>
    aide: Attribute.Component<'block.simple-push-cta'>
    seo: Attribute.Component<'shared.seo'>
    showFilter: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::actualites-pass-culture.actualites-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::actualites-pass-culture.actualites-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiActualitesRdvActeursCulturelActualitesRdvActeursCulturel
  extends Schema.SingleType {
  collectionName: 'actualites_rdv_acteurs_culturels'
  info: {
    singularName: 'actualites-rdv-acteurs-culturel'
    pluralName: 'actualites-rdv-acteurs-culturels'
    displayName: 'Acteurs culturels - Actualit\u00E9s'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String
    buttonText: Attribute.String
    filtres: Attribute.Component<'common.filtre', true>
    socialMediaSection: Attribute.Component<'block.social-media'>
    separator: Attribute.Component<'block.separator'>
    aide: Attribute.Component<'block.simple-push-cta'>
    titleEventSection: Attribute.String & Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    showFilter: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiEtudesPassCultureEtudesPassCulture
  extends Schema.SingleType {
  collectionName: 'etudes_pass_cultures'
  info: {
    singularName: 'etudes-pass-culture'
    pluralName: 'etudes-pass-cultures'
    displayName: "S'informer - \u00C9tudes"
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String
    buttonText: Attribute.String
    filtres: Attribute.Component<'common.filtre', true>
    socialMediaSection: Attribute.Component<'block.social-media'>
    separator: Attribute.Component<'block.separator'>
    observatoire: Attribute.Component<'block.simple-push-cta'>
    seo: Attribute.Component<'shared.seo'>
    showFilter: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::etudes-pass-culture.etudes-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::etudes-pass-culture.etudes-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events'
  info: {
    singularName: 'event'
    pluralName: 'events'
    displayName: '\u00C9v\u00E9nements'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    date: Attribute.Date & Attribute.Required
    startTime: Attribute.Time & Attribute.Required
    endTime: Attribute.Time & Attribute.Required
    cta: Attribute.Component<'common.link'> & Attribute.Required
    image: Attribute.Media<'images'>
    category: Attribute.Enumeration<['Salon']> & Attribute.Required
    localisation: Attribute.Enumeration<
      [
        'Aucune',
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
        'Rh\u00F4ne-Alpes',
      ]
    > &
      Attribute.Required
    secteur: Attribute.Enumeration<
      [
        'Aucun',
        'Pratiques culturelles',
        'Spectacle vivant',
        'Musique',
        'Lecture',
        'Cin\u00E9ma',
        'Offres num\u00E9riques',
      ]
    > &
      Attribute.Required
    city: Attribute.String & Attribute.Required
    slug: Attribute.String & Attribute.Required & Attribute.Unique
    blocks: Attribute.DynamicZone<
      [
        'block.image',
        'block.simple-text-v2',
        'block.video',
        'block.double-push-cta',
        'block.social-media',
      ]
    >
    seo: Attribute.Component<'shared.seo'>
    pageLocalisation: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Acteurs culturels', 'S\u2019informer - presse']
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers'
  info: {
    singularName: 'footer'
    pluralName: 'footers'
    displayName: 'Pied de page'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    PlayStoreUrl: Attribute.String & Attribute.Required
    AppStoreUrl: Attribute.String & Attribute.Required
    Lists: Attribute.Component<'footer.list', true>
    bannerText: Attribute.String
    LegalLinks: Attribute.Component<'common.link', true>
    bannerDefaultUrl: Attribute.String & Attribute.Required
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiHeaderHeader extends Schema.SingleType {
  collectionName: 'headers'
  info: {
    singularName: 'header'
    pluralName: 'headers'
    displayName: 'Menu'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    targetItems: Attribute.Component<'header.navigation-items', true> &
      Attribute.Required
    aboutItems: Attribute.Component<'header.navigation-items', true> &
      Attribute.Required
    login: Attribute.Component<'header.account-dropdown'> & Attribute.Required
    signup: Attribute.Component<'header.account-dropdown'> & Attribute.Required
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiHelpHelp extends Schema.SingleType {
  collectionName: 'helps'
  info: {
    singularName: 'help'
    pluralName: 'helps'
    displayName: 'Jeunes & parents - Aide'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    heroSection: Attribute.Component<'block.header'> & Attribute.Required
    cardText: Attribute.Component<'block.double-push-cta'> & Attribute.Required
    social: Attribute.Component<'block.social-media'> & Attribute.Required
    simplepushcta: Attribute.Component<'block.simple-push-cta'> &
      Attribute.Required
    faq: Attribute.Component<'block.faq'> & Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::help.help', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::help.help', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiHelpCulturalActorsHelpCulturalActors
  extends Schema.SingleType {
  collectionName: 'help_cultural_actors_list'
  info: {
    singularName: 'help-cultural-actors'
    pluralName: 'help-cultural-actors-list'
    displayName: 'Acteurs culturels - Aide'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    heroSection: Attribute.Component<'block.header'> & Attribute.Required
    cardText: Attribute.Component<'block.double-push-cta'> & Attribute.Required
    social: Attribute.Component<'block.social-media'> & Attribute.Required
    simplepushcta: Attribute.Component<'block.simple-push-cta'> &
      Attribute.Required
    faq: Attribute.Component<'block.faq'> & Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::help-cultural-actors.help-cultural-actors',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::help-cultural-actors.help-cultural-actors',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiHelpTeachersHelpTeachers extends Schema.SingleType {
  collectionName: 'help_teachers_list'
  info: {
    singularName: 'help-teachers'
    pluralName: 'help-teachers-list'
    displayName: 'Enseignants - Aide'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    heroSection: Attribute.Component<'block.header'> & Attribute.Required
    cardText: Attribute.Component<'block.double-push-cta'> & Attribute.Required
    social: Attribute.Component<'block.social-media'> & Attribute.Required
    simplepushcta: Attribute.Component<'block.simple-push-cta'> &
      Attribute.Required
    faq: Attribute.Component<'block.faq'> & Attribute.Required
    latestStudies: Attribute.Component<'block.latest-news'> & Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::help-teachers.help-teachers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::help-teachers.help-teachers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes'
  info: {
    singularName: 'home'
    pluralName: 'homes'
    displayName: "Page d'accueil "
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    aboutSection: Attribute.Component<'block.centered-text'> &
      Attribute.Required
    CTASection: Attribute.Component<'block.push-cta'> & Attribute.Required
    socialMediaSection: Attribute.Component<'block.social-media'> &
      Attribute.Required
    latestStudies: Attribute.Component<'block.latest-news'> & Attribute.Required
    eligibilitySection: Attribute.Component<'home.eligibility-section'> &
      Attribute.Required
    heroSection: Attribute.Component<'home.hero-section'> & Attribute.Required
    recommendationsSection: Attribute.Component<'home.recommendations-section'> &
      Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiListeJeuneListeJeune extends Schema.SingleType {
  collectionName: 'liste_jeunes'
  info: {
    singularName: 'liste-jeune'
    pluralName: 'liste-jeunes'
    displayName: 'Jeunes & parents - Actualit\u00E9s'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    buttonText: Attribute.Text
    filtres: Attribute.Component<'common.filtre', true> & Attribute.Required
    socialMediaSection: Attribute.Component<'block.social-media'> &
      Attribute.Required
    separator: Attribute.Component<'block.separator'>
    aide: Attribute.Component<'block.simple-push-cta'>
    seo: Attribute.Component<'shared.seo'>
    showFilter: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::liste-jeune.liste-jeune',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::liste-jeune.liste-jeune',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiListeOffreListeOffre extends Schema.SingleType {
  collectionName: 'liste_offres'
  info: {
    singularName: 'liste-offre'
    pluralName: 'liste-offres'
    displayName: 'Jeunes & parents - Liste offres'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    hero: Attribute.Component<'block.header'>
    offres: Attribute.Component<'block.offer-list'> & Attribute.Required
    separator: Attribute.Component<'block.separator'>
    question: Attribute.Component<'block.simple-push-cta'>
    socialMediaSection: Attribute.Component<'block.social-media'>
    seo: Attribute.Component<'shared.seo'>
    experience: Attribute.Component<'block.experience-video-carousel'>
    offres_culturelles: Attribute.Component<'block.offers-carousel'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::liste-offre.liste-offre',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::liste-offre.liste-offre',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiNewsNews extends Schema.CollectionType {
  collectionName: 'news_list'
  info: {
    singularName: 'news'
    pluralName: 'news-list'
    displayName: 'Actualit\u00E9s'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    category: Attribute.Enumeration<
      ['Article', '\u00C9v\u00E8nement', 'Partenariat', 'Rencontre']
    > &
      Attribute.Required
    date: Attribute.DateTime & Attribute.Required
    image: Attribute.Media<'images'> & Attribute.Required
    slug: Attribute.String & Attribute.Required & Attribute.Unique
    localisation: Attribute.Enumeration<
      [
        'Aucune',
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
        'Rh\u00F4ne-Alpes',
      ]
    > &
      Attribute.Required
    secteur: Attribute.Enumeration<
      [
        'Aucun',
        'Pratiques culturelles',
        'Spectacle vivant',
        'Musique',
        'Lecture',
        'Cin\u00E9ma',
        'Offres num\u00E9riques',
      ]
    > &
      Attribute.Required
    blocks: Attribute.DynamicZone<
      [
        'block.image',
        'block.simple-text-v2',
        'block.video',
        'block.double-push-cta',
        'block.social-media',
      ]
    >
    seo: Attribute.Component<'shared.seo'>
    pageLocalisation: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Jeunes et parents', 'Acteurs culturels', 'S\u2019informer']
      >
    aboveTitle: Attribute.String
    emoji: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::news.news', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::news.news', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiNotFoundNotFound extends Schema.SingleType {
  collectionName: 'not_founds'
  info: {
    singularName: 'not-found'
    pluralName: 'not-founds'
    displayName: "Page d'erreur"
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    header: Attribute.Component<'block.header'>
    seo: Attribute.Component<'shared.seo'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::not-found.not-found',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::not-found.not-found',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages'
  info: {
    singularName: 'page'
    pluralName: 'pages'
    displayName: 'Pages'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    Path: Attribute.String & Attribute.Required & Attribute.Unique
    Blocks: Attribute.DynamicZone<
      [
        'block.centered-text',
        'block.header',
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
        'block.latest-news',
        'block.experience-video-carousel',
        'block.offers-carousel',
        'block.piled-cards',
        'block.faq',
        'block.detailed-logos',
        'block.organization-chart',
        'block.simple-text-v2',
        'block.image-gallery',
        'block.breadcrumb',
        'block.header-with-q-rcode',
        'block.columns-text',
        'block.centered-title',
        'block.tabs-simple-text',
        'block.tabs-push-grey-cta',
        'block.tabs-little-list',
        'block.tabs-image-text',
      ]
    >
    seo: Attribute.Component<'shared.seo'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiPressePresse extends Schema.SingleType {
  collectionName: 'presses'
  info: {
    singularName: 'presse'
    pluralName: 'presses'
    displayName: "S'informer - Espace presse"
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String
    buttonText: Attribute.String
    filtres: Attribute.Component<'common.filtre', true>
    socialMediaSection: Attribute.Component<'block.social-media'>
    separator: Attribute.Component<'block.separator'>
    texteImage: Attribute.Component<'block.image-text'> & Attribute.Required
    pushCta: Attribute.Component<'block.double-push-cta'> & Attribute.Required
    aide: Attribute.Component<'block.simple-push-cta'>
    seo: Attribute.Component<'shared.seo'>
    titleEventSection: Attribute.String & Attribute.Required
    showFilter: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::presse.presse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::presse.presse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiResourceResource extends Schema.CollectionType {
  collectionName: 'resources'
  info: {
    singularName: 'resource'
    pluralName: 'resources'
    displayName: 'CP \u00C9tudes'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    category: Attribute.Enumeration<
      [
        'Dossier de presse',
        'Communiqu\u00E9 de presse',
        '\u00C9tude ritualis\u00E9e',
        '\u00C9tude ponctuelle',
        'Ressource',
      ]
    > &
      Attribute.Required
    date: Attribute.DateTime & Attribute.Required
    image: Attribute.Media<'images'> & Attribute.Required
    slug: Attribute.String & Attribute.Required & Attribute.Unique
    localisation: Attribute.Enumeration<
      [
        'Aucune',
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
        'Rh\u00F4ne-Alpes',
      ]
    > &
      Attribute.Required
    secteur: Attribute.Enumeration<
      [
        'Aucun',
        'Pratiques culturelles',
        'Spectacle vivant',
        'Musique',
        'Lecture',
        'Cin\u00E9ma',
        'Offres num\u00E9riques',
      ]
    > &
      Attribute.Required
    blocks: Attribute.DynamicZone<
      [
        'block.centered-text',
        'block.header',
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
        'block.latest-news',
        'block.experience-video-carousel',
        'block.offers-carousel',
        'block.piled-cards',
        'block.faq',
        'block.detailed-logos',
        'block.organization-chart',
        'block.simple-text-v2',
        'block.image-gallery',
        'block.breadcrumb',
      ]
    >
    partnership: Attribute.Enumeration<
      [
        'AUCUN',
        'INRIA',
        'Le Syndicat de la librairie fran\u00E7aise',
        'DEPS',
        'PRODISS',
        'DITP',
        'L\u2019Institut Jean-Nicod',
        'ENS-PSL',
        'CNRS',
      ]
    > &
      Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    pageLocalisation: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Enseignants',
          'S\u2019informer - ressources',
          'S\u2019informer - presse',
          'S\u2019informer - \u00E9tudes',
        ]
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::resource.resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::resource.resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiRessourcepassRessourcepass extends Schema.CollectionType {
  collectionName: 'ressourcespass'
  info: {
    singularName: 'ressourcepass'
    pluralName: 'ressourcespass'
    displayName: 'Ressources'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.DefaultTo<'2024-07-21T22:00:00.000Z'>
    category: Attribute.Enumeration<['\u00C9tude', 'Document', 'Article']> &
      Attribute.Required &
      Attribute.DefaultTo<'\u00C9tude'>
    cta: Attribute.Component<'common.link'> & Attribute.Required
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::ressourcepass.ressourcepass',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::ressourcepass.ressourcepass',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiRessourcesPassCultureRessourcesPassCulture
  extends Schema.SingleType {
  collectionName: 'ressources_pass_cultures'
  info: {
    singularName: 'ressources-pass-culture'
    pluralName: 'ressources-pass-cultures'
    displayName: "S'informer - Ressources pass Culture"
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String
    buttonText: Attribute.String
    filtres: Attribute.Component<'common.filtre', true>
    socialMediaSection: Attribute.Component<'block.social-media'>
    separator: Attribute.Component<'block.separator'>
    etudes: Attribute.Component<'block.simple-push-cta'>
    seo: Attribute.Component<'shared.seo'>
    showFilter: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::ressources-pass-culture.ressources-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::ressources-pass-culture.ressources-pass-culture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiSimulatorSimulator extends Schema.SingleType {
  collectionName: 'simulators'
  info: {
    singularName: 'simulator'
    pluralName: 'simulators'
    displayName: 'Jeunes & parents - Simulateur'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    description: Attribute.Text & Attribute.Required
    ageQuestion: Attribute.Component<'simulator.age-question'> &
      Attribute.Required
    nationnalityQuestion: Attribute.Component<'simulator.radio-question'> &
      Attribute.Required
    residencyQuestion: Attribute.Component<'simulator.radio-question'> &
      Attribute.Required
    steps: Attribute.Component<'simulator.step', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 3
          max: 3
        },
        number
      >
    successScreen: Attribute.Component<'simulator.success-screen'> &
      Attribute.Required
    failureScreen: Attribute.Component<'simulator.failure-screen'> &
      Attribute.Required
    tooYoungScreen: Attribute.Component<'simulator.failure-screen'> &
      Attribute.Required
    tooOldScreen: Attribute.Component<'simulator.failure-screen'> &
      Attribute.Required
    amountScreen_15: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required
    amountScreen_16: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required
    amountScreen_17: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required
    amountScreen_18: Attribute.Component<'simulator.amount-screen'> &
      Attribute.Required
    topEmoji: Attribute.String & Attribute.Required
    bottomEmoji: Attribute.String & Attribute.Required
    socialMedias: Attribute.Component<'block.social-media'> & Attribute.Required
    seo: Attribute.Component<'shared.seo'>
    offres: Attribute.Component<'block.simple-push-cta'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::simulator.simulator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::simulator.simulator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::content-releases.release': PluginContentReleasesRelease
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
      'api::actualites-pass-culture.actualites-pass-culture': ApiActualitesPassCultureActualitesPassCulture
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel': ApiActualitesRdvActeursCulturelActualitesRdvActeursCulturel
      'api::etudes-pass-culture.etudes-pass-culture': ApiEtudesPassCultureEtudesPassCulture
      'api::event.event': ApiEventEvent
      'api::footer.footer': ApiFooterFooter
      'api::header.header': ApiHeaderHeader
      'api::help.help': ApiHelpHelp
      'api::help-cultural-actors.help-cultural-actors': ApiHelpCulturalActorsHelpCulturalActors
      'api::help-teachers.help-teachers': ApiHelpTeachersHelpTeachers
      'api::home.home': ApiHomeHome
      'api::liste-jeune.liste-jeune': ApiListeJeuneListeJeune
      'api::liste-offre.liste-offre': ApiListeOffreListeOffre
      'api::news.news': ApiNewsNews
      'api::not-found.not-found': ApiNotFoundNotFound
      'api::page.page': ApiPagePage
      'api::presse.presse': ApiPressePresse
      'api::resource.resource': ApiResourceResource
      'api::ressourcepass.ressourcepass': ApiRessourcepassRessourcepass
      'api::ressources-pass-culture.ressources-pass-culture': ApiRessourcesPassCultureRessourcesPassCulture
      'api::simulator.simulator': ApiSimulatorSimulator
    }
  }
}
