import type { Schema, Attribute } from '@strapi/strapi';

export interface BlockCenteredText extends Schema.Component {
  collectionName: 'components_block_centered_texts';
  info: {
    displayName: 'Centered Text';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Text: Attribute.Text & Attribute.Required;
  };
}

export interface BlockHeader extends Schema.Component {
  collectionName: 'components_block_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Text: Attribute.Text;
    Surtitle: Attribute.String;
  };
}

export interface BlockSimpleText extends Schema.Component {
  collectionName: 'components_block_simple_texts';
  info: {
    displayName: 'Simple Text';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Text: Attribute.Text;
  };
}

export interface CommonLink extends Schema.Component {
  collectionName: 'components_common_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    URL: Attribute.String & Attribute.Required;
  };
}

export interface FooterLegalLinks extends Schema.Component {
  collectionName: 'components_footer_legal_links';
  info: {
    displayName: 'LegalLinks';
  };
  attributes: {};
}

export interface FooterList extends Schema.Component {
  collectionName: 'components_footer_lists';
  info: {
    displayName: 'Lists';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Links: Attribute.Component<'common.link', true>;
  };
}

export interface HeaderHeader extends Schema.Component {
  collectionName: 'components_header_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {};
}

export interface HeaderLoginItems extends Schema.Component {
  collectionName: 'components_header_login_items';
  info: {
    displayName: 'LoginItems';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    Color: Attribute.String & Attribute.Required;
    Emoji: Attribute.String & Attribute.Required;
    URL: Attribute.String & Attribute.Required;
  };
}

export interface HeaderLogin extends Schema.Component {
  collectionName: 'components_header_logins';
  info: {
    displayName: 'Login';
  };
  attributes: {
    ButtonLabel: Attribute.String & Attribute.Required;
    LoginItems: Attribute.Component<'header.login-items', true> &
      Attribute.SetMinMax<{
        max: 2;
      }>;
  };
}

export interface HeaderMegaMenu extends Schema.Component {
  collectionName: 'components_header_mega_menus';
  info: {
    displayName: 'MegaMenu';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    PrimaryListItems: Attribute.Component<'common.link', true> &
      Attribute.Required;
    SecondaryListItems: Attribute.Component<'common.link', true> &
      Attribute.Required;
    Cta: Attribute.Component<'common.link'> & Attribute.Required;
    CardTitle: Attribute.String & Attribute.Required;
    CardDescription: Attribute.String & Attribute.Required;
    CardLink: Attribute.Component<'common.link'> & Attribute.Required;
    BannerText: Attribute.String;
  };
}

export interface HeaderNavigationItems extends Schema.Component {
  collectionName: 'components_header_navigation_items';
  info: {
    displayName: 'NavigationItems';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    MegaMenu: Attribute.Component<'header.mega-menu'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'block.centered-text': BlockCenteredText;
      'block.header': BlockHeader;
      'block.simple-text': BlockSimpleText;
      'common.link': CommonLink;
      'footer.legal-links': FooterLegalLinks;
      'footer.list': FooterList;
      'header.header': HeaderHeader;
      'header.login-items': HeaderLoginItems;
      'header.login': HeaderLogin;
      'header.mega-menu': HeaderMegaMenu;
      'header.navigation-items': HeaderNavigationItems;
    }
  }
}
