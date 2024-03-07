import type { Schema, Attribute } from '@strapi/strapi';

export interface BlockCenteredText extends Schema.Component {
  collectionName: 'components_block_centered_texts';
  info: {
    displayName: 'Centered Text';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
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

export interface BlockLatestNews extends Schema.Component {
  collectionName: 'components_block_latest_news';
  info: {
    displayName: 'latestNews';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
  };
}

export interface BlockLink extends Schema.Component {
  collectionName: 'components_block_links';
  info: {
    displayName: 'socialMediaLink';
    description: '';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'x',
        'instagram',
        'tiktok',
        'youtube',
        'facebook',
        'snapchat',
        'linkedin'
      ]
    > &
      Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface BlockPushCta extends Schema.Component {
  collectionName: 'components_block_push_ctas';
  info: {
    displayName: 'pushCTA';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media & Attribute.Required;
    ctaLink: Attribute.Component<'common.link'> & Attribute.Required;
    qrCodeDescription: Attribute.String & Attribute.Required;
    qrCodeUrl: Attribute.String & Attribute.Required;
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

export interface BlockSocialMedia extends Schema.Component {
  collectionName: 'components_block_social_medias';
  info: {
    displayName: 'socialMedia';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    socialMediaLink: Attribute.Component<'block.link', true> &
      Attribute.Required;
  };
}

export interface BlockVerticalCarousel extends Schema.Component {
  collectionName: 'components_block_vertical_carousels';
  info: {
    displayName: 'VerticalCarousel';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    items: Attribute.Component<'common.vertical-carousel-item', true> &
      Attribute.Required;
    previousButtonLabel: Attribute.String & Attribute.Required;
    nextButtonLabel: Attribute.String & Attribute.Required;
    controlsLabel: Attribute.String & Attribute.Required;
  };
}

export interface CommonLink extends Schema.Component {
  collectionName: 'components_common_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    URL: Attribute.String & Attribute.Required;
  };
}

export interface CommonVerticalCarouselItem extends Schema.Component {
  collectionName: 'components_common_vertical_carousel_items';
  info: {
    displayName: 'verticalCarouselItem';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    url: Attribute.String & Attribute.Required;
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

export interface HeaderAccountDropdown extends Schema.Component {
  collectionName: 'components_header_account_dropdowns';
  info: {
    displayName: 'accountDropdown';
  };
  attributes: {
    buttonLabel: Attribute.String & Attribute.Required;
    items: Attribute.Component<'header.account-item', true> &
      Attribute.Required;
  };
}

export interface HeaderAccountItem extends Schema.Component {
  collectionName: 'components_header_account_item';
  info: {
    displayName: 'accountItem';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    color: Attribute.String & Attribute.Required;
    emoji: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface HeaderHeader extends Schema.Component {
  collectionName: 'components_header_headers';
  info: {
    displayName: 'header';
  };
  attributes: {};
}

export interface HeaderLoginItems extends Schema.Component {
  collectionName: 'components_header_login_items';
  info: {
    displayName: 'loginItems';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    color: Attribute.String & Attribute.Required;
    emoji: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface HeaderLogin extends Schema.Component {
  collectionName: 'components_header_logins';
  info: {
    displayName: 'login';
  };
  attributes: {
    buttonLabel: Attribute.String & Attribute.Required;
    loginItems: Attribute.Component<'header.login-items', true> &
      Attribute.SetMinMax<{
        max: 2;
      }>;
  };
}

export interface HeaderMegaMenu extends Schema.Component {
  collectionName: 'components_header_mega_menus';
  info: {
    displayName: 'megaMenu';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    primaryListItems: Attribute.Component<'common.link', true> &
      Attribute.Required;
    secondaryListItems: Attribute.Component<'common.link', true> &
      Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    cardTitle: Attribute.String & Attribute.Required;
    cardDescription: Attribute.String & Attribute.Required;
    cardLink: Attribute.Component<'common.link'> & Attribute.Required;
    bannerText: Attribute.String;
    cardFirstEmoji: Attribute.String & Attribute.Required;
    cardSecondEmoji: Attribute.String & Attribute.Required;
  };
}

export interface HeaderNavigationItems extends Schema.Component {
  collectionName: 'components_header_navigation_items';
  info: {
    displayName: 'navigationItems';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    megaMenu: Attribute.Component<'header.mega-menu'>;
  };
}

export interface HomeEligibilityItems extends Schema.Component {
  collectionName: 'components_home_eligibility_items';
  info: {
    displayName: 'eligibilityItems';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    emoji: Attribute.String & Attribute.Required;
  };
}

export interface HomeEligibilitySection extends Schema.Component {
  collectionName: 'components_home_eligibility_sections';
  info: {
    displayName: 'eligibilitySection';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    items: Attribute.Component<'home.eligibility-items', true> &
      Attribute.Required;
    cardTitle: Attribute.Text & Attribute.Required;
    cardDescription: Attribute.String & Attribute.Required;
    cardCta: Attribute.Component<'common.link'> & Attribute.Required;
    firstEmoji: Attribute.String & Attribute.Required;
    secondEmoji: Attribute.String & Attribute.Required;
  };
}

export interface HomeHeroSection extends Schema.Component {
  collectionName: 'components_home_hero_sections';
  info: {
    displayName: 'heroSection';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.String & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    firstEmoji: Attribute.String & Attribute.Required;
    secondEmoji: Attribute.String & Attribute.Required;
    thirdEmoji: Attribute.String & Attribute.Required;
    fourthEmoji: Attribute.String & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    fifthEmoji: Attribute.String & Attribute.Required;
    sixthEmoji: Attribute.String & Attribute.Required;
  };
}

export interface HomeRecommendationsSection extends Schema.Component {
  collectionName: 'components_home_recommendations_sections';
  info: {
    displayName: 'recommendationsSection';
  };
  attributes: {
    recommendations: Attribute.Component<'block.vertical-carousel'> &
      Attribute.Required;
    recommendationsBackendTag: Attribute.String & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
  };
}

export interface SimulatorAgeQuestion extends Schema.Component {
  collectionName: 'components_simulator_age_questions';
  info: {
    displayName: 'AgeQuestion';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    answers: Attribute.Component<'simulator.answer', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 6;
        max: 6;
      }>;
  };
}

export interface SimulatorAmountScreen extends Schema.Component {
  collectionName: 'components_simulator_amount_screens';
  info: {
    displayName: 'Amount Screen';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface SimulatorAnswer extends Schema.Component {
  collectionName: 'components_simulator_answers';
  info: {
    displayName: 'Answer';
    description: '';
  };
  attributes: {
    answer: Attribute.String & Attribute.Required;
    emoji: Attribute.String;
  };
}

export interface SimulatorFailureScreen extends Schema.Component {
  collectionName: 'components_simulator_failure_screens';
  info: {
    displayName: 'Failure Screen';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
  };
}

export interface SimulatorRadioQuestion extends Schema.Component {
  collectionName: 'components_simulator_radio_questions';
  info: {
    displayName: 'RadioQuestion';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    answers: Attribute.Component<'simulator.answer', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 2;
        max: 2;
      }>;
  };
}

export interface SimulatorStep extends Schema.Component {
  collectionName: 'components_simulator_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    step: Attribute.String & Attribute.Required;
  };
}

export interface SimulatorSuccessScreen extends Schema.Component {
  collectionName: 'components_simulator_success_screens';
  info: {
    displayName: 'Success Screen';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    steps: Attribute.Component<'simulator.step', true> & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    needSupport: Attribute.String & Attribute.Required;
    supportLink: Attribute.Component<'common.link'> & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'block.centered-text': BlockCenteredText;
      'block.header': BlockHeader;
      'block.latest-news': BlockLatestNews;
      'block.link': BlockLink;
      'block.push-cta': BlockPushCta;
      'block.simple-text': BlockSimpleText;
      'block.social-media': BlockSocialMedia;
      'block.vertical-carousel': BlockVerticalCarousel;
      'common.link': CommonLink;
      'common.vertical-carousel-item': CommonVerticalCarouselItem;
      'footer.legal-links': FooterLegalLinks;
      'footer.list': FooterList;
      'header.account-dropdown': HeaderAccountDropdown;
      'header.account-item': HeaderAccountItem;
      'header.header': HeaderHeader;
      'header.login-items': HeaderLoginItems;
      'header.login': HeaderLogin;
      'header.mega-menu': HeaderMegaMenu;
      'header.navigation-items': HeaderNavigationItems;
      'home.eligibility-items': HomeEligibilityItems;
      'home.eligibility-section': HomeEligibilitySection;
      'home.hero-section': HomeHeroSection;
      'home.recommendations-section': HomeRecommendationsSection;
      'simulator.age-question': SimulatorAgeQuestion;
      'simulator.amount-screen': SimulatorAmountScreen;
      'simulator.answer': SimulatorAnswer;
      'simulator.failure-screen': SimulatorFailureScreen;
      'simulator.radio-question': SimulatorRadioQuestion;
      'simulator.step': SimulatorStep;
      'simulator.success-screen': SimulatorSuccessScreen;
    }
  }
}
