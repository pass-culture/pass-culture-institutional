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
    displayName: 'List';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
<<<<<<< HEAD
    Links: Attribute.Component<'common.link', true>;
=======
    Link: Attribute.Component<'common.link', true>;
>>>>>>> e9c54c8 (add footer content on strapi)
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
    }
  }
}
