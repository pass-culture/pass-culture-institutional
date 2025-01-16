import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
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
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
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
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
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
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
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
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiActualitesPassCultureActualitesPassCulture
  extends Struct.SingleTypeSchema {
  collectionName: 'actualites_pass_cultures';
  info: {
    description: '';
    displayName: "S'informer - Actualit\u00E9s";
    pluralName: 'actualites-pass-cultures';
    singularName: 'actualites-pass-culture';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aide: Schema.Attribute.Component<'block.simple-push-cta', false>;
    buttonText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    filtres: Schema.Attribute.Component<'common.filtre', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::actualites-pass-culture.actualites-pass-culture'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    showFilter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    socialMediaSection: Schema.Attribute.Component<'block.social-media', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiActualitesRdvActeursCulturelActualitesRdvActeursCulturel
  extends Struct.SingleTypeSchema {
  collectionName: 'actualites_rdv_acteurs_culturels';
  info: {
    description: '';
    displayName: 'Acteurs culturels - Actualit\u00E9s';
    pluralName: 'actualites-rdv-acteurs-culturels';
    singularName: 'actualites-rdv-acteurs-culturel';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aide: Schema.Attribute.Component<'block.simple-push-cta', false>;
    buttonText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    filtres: Schema.Attribute.Component<'common.filtre', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    showFilter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    socialMediaSection: Schema.Attribute.Component<'block.social-media', false>;
    title: Schema.Attribute.String;
    titleEventSection: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEtudesPassCultureEtudesPassCulture
  extends Struct.SingleTypeSchema {
  collectionName: 'etudes_pass_cultures';
  info: {
    description: '';
    displayName: "S'informer - \u00C9tudes";
    pluralName: 'etudes-pass-cultures';
    singularName: 'etudes-pass-culture';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    filtres: Schema.Attribute.Component<'common.filtre', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::etudes-pass-culture.etudes-pass-culture'
    > &
      Schema.Attribute.Private;
    observatoire: Schema.Attribute.Component<'block.simple-push-cta', false>;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    showFilter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    socialMediaSection: Schema.Attribute.Component<'block.social-media', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventEvent extends Struct.CollectionTypeSchema {
  collectionName: 'events';
  info: {
    description: '';
    displayName: '\u00C9v\u00E9nements';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blocks: Schema.Attribute.DynamicZone<
      [
        'block.image',
        'block.simple-text-v2',
        'block.video',
        'block.double-push-cta',
        'block.social-media',
      ]
    >;
    category: Schema.Attribute.Enumeration<['Salon']> &
      Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    endTime: Schema.Attribute.Time & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localisation: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
    pageLocalisation: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Acteurs culturels', 'S\u2019informer - presse']
      >;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.3>;
    publishedAt: Schema.Attribute.DateTime;
    secteur: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    startTime: Schema.Attribute.Time & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFooterFooter extends Struct.SingleTypeSchema {
  collectionName: 'footers';
  info: {
    description: '';
    displayName: 'Pied de page';
    pluralName: 'footers';
    singularName: 'footer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AppStoreUrl: Schema.Attribute.String & Schema.Attribute.Required;
    bannerDefaultUrl: Schema.Attribute.String & Schema.Attribute.Required;
    bannerText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    LegalLinks: Schema.Attribute.Component<'common.link', true>;
    Lists: Schema.Attribute.Component<'footer.list', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer.footer'
    > &
      Schema.Attribute.Private;
    PlayStoreUrl: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Struct.SingleTypeSchema {
  collectionName: 'headers';
  info: {
    description: '';
    displayName: 'Menu';
    pluralName: 'headers';
    singularName: 'header';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutItems: Schema.Attribute.Component<'header.navigation-items', true> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header.header'
    > &
      Schema.Attribute.Private;
    login: Schema.Attribute.Component<'header.account-dropdown', false> &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    signup: Schema.Attribute.Component<'header.account-dropdown', false> &
      Schema.Attribute.Required;
    targetItems: Schema.Attribute.Component<'header.navigation-items', true> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHelpCulturalActorsHelpCulturalActors
  extends Struct.SingleTypeSchema {
  collectionName: 'help_cultural_actors_list';
  info: {
    description: '';
    displayName: 'Acteurs culturels - Aide';
    pluralName: 'help-cultural-actors-list';
    singularName: 'help-cultural-actors';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cardText: Schema.Attribute.Component<'block.double-push-cta', false> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faq: Schema.Attribute.Component<'block.faq', false> &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'block.header', false> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::help-cultural-actors.help-cultural-actors'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    simplepushcta: Schema.Attribute.Component<'block.simple-push-cta', false> &
      Schema.Attribute.Required;
    social: Schema.Attribute.Component<'block.social-media', false> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHelpTeachersHelpTeachers extends Struct.SingleTypeSchema {
  collectionName: 'help_teachers_list';
  info: {
    description: '';
    displayName: 'Enseignants - Aide';
    pluralName: 'help-teachers-list';
    singularName: 'help-teachers';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cardText: Schema.Attribute.Component<'block.double-push-cta', false> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faq: Schema.Attribute.Component<'block.faq', false> &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'block.header', false> &
      Schema.Attribute.Required;
    latestStudies: Schema.Attribute.Component<'block.latest-news', false> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::help-teachers.help-teachers'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    simplepushcta: Schema.Attribute.Component<'block.simple-push-cta', false> &
      Schema.Attribute.Required;
    social: Schema.Attribute.Component<'block.social-media', false> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHelpHelp extends Struct.SingleTypeSchema {
  collectionName: 'helps';
  info: {
    description: '';
    displayName: 'Jeunes & parents - Aide';
    pluralName: 'helps';
    singularName: 'help';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cardText: Schema.Attribute.Component<'block.double-push-cta', false> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faq: Schema.Attribute.Component<'block.faq', false> &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'block.header', false> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::help.help'> &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    simplepushcta: Schema.Attribute.Component<'block.simple-push-cta', false> &
      Schema.Attribute.Required;
    social: Schema.Attribute.Component<'block.social-media', false> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomeHome extends Struct.SingleTypeSchema {
  collectionName: 'homes';
  info: {
    description: '';
    displayName: "Page d'accueil ";
    pluralName: 'homes';
    singularName: 'home';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutSection: Schema.Attribute.Component<'block.centered-text', false> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    CTASection: Schema.Attribute.Component<'block.push-cta', false> &
      Schema.Attribute.Required;
    eligibilitySection: Schema.Attribute.Component<
      'home.eligibility-section',
      false
    > &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'home.hero-section', false> &
      Schema.Attribute.Required;
    latestStudies: Schema.Attribute.Component<'block.latest-news', false> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::home.home'> &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    publishedAt: Schema.Attribute.DateTime;
    recommendationsSection: Schema.Attribute.Component<
      'home.recommendations-section',
      false
    > &
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    socialMediaSection: Schema.Attribute.Component<
      'block.social-media',
      false
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiListeJeuneListeJeune extends Struct.SingleTypeSchema {
  collectionName: 'liste_jeunes';
  info: {
    description: '';
    displayName: 'Jeunes & parents - Actualit\u00E9s';
    pluralName: 'liste-jeunes';
    singularName: 'liste-jeune';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aide: Schema.Attribute.Component<'block.simple-push-cta', false>;
    buttonText: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    filtres: Schema.Attribute.Component<'common.filtre', true> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::liste-jeune.liste-jeune'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    showFilter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    socialMediaSection: Schema.Attribute.Component<
      'block.social-media',
      false
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiListeOffreListeOffre extends Struct.SingleTypeSchema {
  collectionName: 'liste_offres';
  info: {
    description: '';
    displayName: 'Jeunes & parents - Liste offres';
    pluralName: 'liste-offres';
    singularName: 'liste-offre';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    experience: Schema.Attribute.Component<
      'block.experience-video-carousel',
      false
    >;
    hero: Schema.Attribute.Component<'block.header', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::liste-offre.liste-offre'
    > &
      Schema.Attribute.Private;
    offres: Schema.Attribute.Component<'block.offer-list', false> &
      Schema.Attribute.Required;
    offres_culturelles: Schema.Attribute.Component<
      'block.offers-carousel',
      false
    >;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Component<'block.simple-push-cta', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    socialMediaSection: Schema.Attribute.Component<'block.social-media', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsNews extends Struct.CollectionTypeSchema {
  collectionName: 'news_list';
  info: {
    description: '';
    displayName: 'Actualit\u00E9s';
    pluralName: 'news-list';
    singularName: 'news';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboveTitle: Schema.Attribute.String;
    blocks: Schema.Attribute.DynamicZone<
      [
        'block.image',
        'block.simple-text-v2',
        'block.video',
        'block.double-push-cta',
        'block.social-media',
      ]
    >;
    category: Schema.Attribute.Enumeration<
      ['Article', '\u00C9v\u00E8nement', 'Partenariat', 'Rencontre']
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    emoji: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localisation: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::news.news'> &
      Schema.Attribute.Private;
    pageLocalisation: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Jeunes et parents', 'Acteurs culturels', 'S\u2019informer']
      >;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.3>;
    publishedAt: Schema.Attribute.DateTime;
    secteur: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNotFoundNotFound extends Struct.SingleTypeSchema {
  collectionName: 'not_founds';
  info: {
    description: '';
    displayName: "Page d'erreur";
    pluralName: 'not-founds';
    singularName: 'not-found';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    header: Schema.Attribute.Component<'block.header', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::not-found.not-found'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPagePage extends Struct.CollectionTypeSchema {
  collectionName: 'pages';
  info: {
    description: '';
    displayName: 'Pages';
    pluralName: 'pages';
    singularName: 'page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Blocks: Schema.Attribute.DynamicZone<
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
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::page.page'> &
      Schema.Attribute.Private;
    Path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.6>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPressePresse extends Struct.SingleTypeSchema {
  collectionName: 'presses';
  info: {
    description: '';
    displayName: "S'informer - Espace presse";
    pluralName: 'presses';
    singularName: 'presse';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aide: Schema.Attribute.Component<'block.simple-push-cta', false>;
    buttonText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    filtres: Schema.Attribute.Component<'common.filtre', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::presse.presse'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    pushCta: Schema.Attribute.Component<'block.double-push-cta', false> &
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    showFilter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    socialMediaSection: Schema.Attribute.Component<'block.social-media', false>;
    texteImage: Schema.Attribute.Component<'block.image-text', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
    titleEventSection: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiResourceResource extends Struct.CollectionTypeSchema {
  collectionName: 'resources';
  info: {
    description: '';
    displayName: 'CP \u00C9tudes';
    pluralName: 'resources';
    singularName: 'resource';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blocks: Schema.Attribute.DynamicZone<
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
    >;
    category: Schema.Attribute.Enumeration<
      [
        'Dossier de presse',
        'Communiqu\u00E9 de presse',
        '\u00C9tude ritualis\u00E9e',
        '\u00C9tude ponctuelle',
        'Ressource',
      ]
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localisation: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::resource.resource'
    > &
      Schema.Attribute.Private;
    pageLocalisation: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Enseignants',
          'S\u2019informer - ressources',
          'S\u2019informer - presse',
          'S\u2019informer - \u00E9tudes',
        ]
      >;
    partnership: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.3>;
    publishedAt: Schema.Attribute.DateTime;
    secteur: Schema.Attribute.Enumeration<
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
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRessourcepassRessourcepass
  extends Struct.CollectionTypeSchema {
  collectionName: 'ressourcespass';
  info: {
    description: '';
    displayName: 'Ressources';
    pluralName: 'ressourcespass';
    singularName: 'ressourcepass';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['\u00C9tude', 'Document', 'Article']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u00C9tude'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    date: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2024-07-21T22:00:00.000Z'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ressourcepass.ressourcepass'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.3>;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRessourcesPassCultureRessourcesPassCulture
  extends Struct.SingleTypeSchema {
  collectionName: 'ressources_pass_cultures';
  info: {
    description: '';
    displayName: "S'informer - Ressources pass Culture";
    pluralName: 'ressources-pass-cultures';
    singularName: 'ressources-pass-culture';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    etudes: Schema.Attribute.Component<'block.simple-push-cta', false>;
    filtres: Schema.Attribute.Component<'common.filtre', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ressources-pass-culture.ressources-pass-culture'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    separator: Schema.Attribute.Component<'block.separator', false>;
    showFilter: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    socialMediaSection: Schema.Attribute.Component<'block.social-media', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSimulatorSimulator extends Struct.SingleTypeSchema {
  collectionName: 'simulators';
  info: {
    description: '';
    displayName: 'Jeunes & parents - Simulateur';
    pluralName: 'simulators';
    singularName: 'simulator';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ageQuestion: Schema.Attribute.Component<'simulator.age-question', false> &
      Schema.Attribute.Required;
    amountScreen_15: Schema.Attribute.Component<
      'simulator.amount-screen',
      false
    > &
      Schema.Attribute.Required;
    amountScreen_16: Schema.Attribute.Component<
      'simulator.amount-screen',
      false
    > &
      Schema.Attribute.Required;
    amountScreen_17: Schema.Attribute.Component<
      'simulator.amount-screen',
      false
    > &
      Schema.Attribute.Required;
    amountScreen_18: Schema.Attribute.Component<
      'simulator.amount-screen',
      false
    > &
      Schema.Attribute.Required;
    bottomEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    failureScreen: Schema.Attribute.Component<
      'simulator.failure-screen',
      false
    > &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::simulator.simulator'
    > &
      Schema.Attribute.Private;
    nationnalityQuestion: Schema.Attribute.Component<
      'simulator.radio-question',
      false
    > &
      Schema.Attribute.Required;
    offres: Schema.Attribute.Component<'block.simple-push-cta', false>;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    residencyQuestion: Schema.Attribute.Component<
      'simulator.radio-question',
      false
    > &
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    socialMedias: Schema.Attribute.Component<'block.social-media', false> &
      Schema.Attribute.Required;
    steps: Schema.Attribute.Component<'simulator.step', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    successScreen: Schema.Attribute.Component<
      'simulator.success-screen',
      false
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    tooOldScreen: Schema.Attribute.Component<
      'simulator.failure-screen',
      false
    > &
      Schema.Attribute.Required;
    tooYoungScreen: Schema.Attribute.Component<
      'simulator.failure-screen',
      false
    > &
      Schema.Attribute.Required;
    topEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
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
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
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
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
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
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
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
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
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
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
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
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
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
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::actualites-pass-culture.actualites-pass-culture': ApiActualitesPassCultureActualitesPassCulture;
      'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel': ApiActualitesRdvActeursCulturelActualitesRdvActeursCulturel;
      'api::etudes-pass-culture.etudes-pass-culture': ApiEtudesPassCultureEtudesPassCulture;
      'api::event.event': ApiEventEvent;
      'api::footer.footer': ApiFooterFooter;
      'api::header.header': ApiHeaderHeader;
      'api::help-cultural-actors.help-cultural-actors': ApiHelpCulturalActorsHelpCulturalActors;
      'api::help-teachers.help-teachers': ApiHelpTeachersHelpTeachers;
      'api::help.help': ApiHelpHelp;
      'api::home.home': ApiHomeHome;
      'api::liste-jeune.liste-jeune': ApiListeJeuneListeJeune;
      'api::liste-offre.liste-offre': ApiListeOffreListeOffre;
      'api::news.news': ApiNewsNews;
      'api::not-found.not-found': ApiNotFoundNotFound;
      'api::page.page': ApiPagePage;
      'api::presse.presse': ApiPressePresse;
      'api::resource.resource': ApiResourceResource;
      'api::ressourcepass.ressourcepass': ApiRessourcepassRessourcepass;
      'api::ressources-pass-culture.ressources-pass-culture': ApiRessourcesPassCultureRessourcesPassCulture;
      'api::simulator.simulator': ApiSimulatorSimulator;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
    }
  }
}
