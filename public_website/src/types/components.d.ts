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

export interface BlockDetailedLogos extends Schema.Component {
  collectionName: 'components_block_detailed_logos';
  info: {
    displayName: 'Detailed Logos';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    logos: Attribute.Component<'common.detailed-logo', true> &
      Attribute.Required;
  };
}

export interface BlockDoublePushCta extends Schema.Component {
  collectionName: 'components_block_double_push_ctas';
  info: {
    displayName: 'Push Grey CTA';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text;
    firstCta: Attribute.Component<'common.link'> & Attribute.Required;
    icon: Attribute.String;
    secondCta: Attribute.Component<'common.not-required-link'>;
  };
}

export interface BlockExperienceVideoCarousel extends Schema.Component {
  collectionName: 'components_block_experience_video_carousels';
  info: {
    displayName: 'ExperienceVideoCarousel';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.vertical-carousel-item', true>;
  };
}

export interface BlockFaq extends Schema.Component {
  collectionName: 'components_block_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    categories: Attribute.String;
    filteringProperty: Attribute.String & Attribute.Required;
    limit: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<10>;
  };
}

export interface BlockHeader extends Schema.Component {
  collectionName: 'components_block_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text;
    image: Attribute.Media & Attribute.Required;
    icon: Attribute.String;
    cta: Attribute.Component<'common.link'>;
  };
}

export interface BlockImageText extends Schema.Component {
  collectionName: 'components_block_image_texts';
  info: {
    displayName: 'ImageText';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    isImageRight: Attribute.Boolean & Attribute.DefaultTo<true>;
    icon: Attribute.String;
    text: Attribute.Blocks & Attribute.Required;
  };
}

export interface BlockImage extends Schema.Component {
  collectionName: 'components_block_images';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    description: Attribute.Text;
    alt: Attribute.String;
  };
}

export interface BlockKeyNumberCarousel extends Schema.Component {
  collectionName: 'components_block_key_number_carousels';
  info: {
    displayName: 'KeyNumberCarousel';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.key-number-items', true> &
      Attribute.SetMinMax<{
        max: 4;
      }>;
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

export interface BlockLittleList extends Schema.Component {
  collectionName: 'components_block_little_lists';
  info: {
    displayName: 'LittleList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    content: Attribute.Component<'common.little-list-component', true> &
      Attribute.SetMinMax<{
        max: 4;
      }>;
    withDescritpion: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface BlockLogos extends Schema.Component {
  collectionName: 'components_block_logos';
  info: {
    displayName: 'Logos';
    description: '';
  };
  attributes: {
    logo: Attribute.Component<'common.logo', true>;
  };
}

export interface BlockOfferList extends Schema.Component {
  collectionName: 'components_block_offer_lists';
  info: {
    displayName: 'OfferList';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    offreTag: Attribute.String & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    firstCartTitle: Attribute.String & Attribute.Required;
    secondCartTitle: Attribute.String;
    descritptionCard: Attribute.Text;
    firstIcon: Attribute.String;
    secondIcon: Attribute.String;
    ctaCard: Attribute.Component<'common.link'>;
  };
}

export interface BlockOffersCarousel extends Schema.Component {
  collectionName: 'components_block_offers_carousels';
  info: {
    displayName: 'OffersCarousel';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.offers-carousel-item', true>;
    cta: Attribute.Component<'common.link'>;
  };
}

export interface BlockOffersSection extends Schema.Component {
  collectionName: 'components_block_offers_sections';
  info: {
    displayName: 'OffersSection';
    description: '';
  };
  attributes: {
    offers: Attribute.Component<'common.offers'>;
    offerTag: Attribute.String;
    cta: Attribute.Component<'common.link'>;
    firstCardtitle: Attribute.String & Attribute.Required;
    secondCardTitle: Attribute.String & Attribute.Required;
    descriptionCard: Attribute.Text & Attribute.Required;
    firstCardIcon: Attribute.String;
    secondCardIcon: Attribute.String;
    cardCta: Attribute.Component<'common.link'>;
  };
}

export interface BlockOrganizationChart extends Schema.Component {
  collectionName: 'components_block_organization_charts';
  info: {
    displayName: 'Organization Chart';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    people: Attribute.Component<'common.person', true> & Attribute.Required;
  };
}

export interface BlockPiledCards extends Schema.Component {
  collectionName: 'components_block_piled_cards';
  info: {
    displayName: 'PiledCards';
    description: '';
  };
  attributes: {
    items: Attribute.Component<'common.piled-card-item', true>;
  };
}

export interface BlockPushCta extends Schema.Component {
  collectionName: 'components_block_push_ctas';
  info: {
    displayName: 'Push CTA With QrCode';
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

export interface BlockSeparator extends Schema.Component {
  collectionName: 'components_block_separators';
  info: {
    displayName: 'Separator';
    description: '';
  };
  attributes: {
    isActive: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface BlockSimplePushCta extends Schema.Component {
  collectionName: 'components_block_simple_push_ctas';
  info: {
    displayName: 'Push Blue CTA';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    surtitle: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    icon: Attribute.String;
  };
}

export interface BlockSimpleTextV2 extends Schema.Component {
  collectionName: 'components_block_simple_text_v2s';
  info: {
    displayName: 'Simple Text v2';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Blocks & Attribute.Required;
    columns: Attribute.Component<'common.simple-text-column', true> &
      Attribute.SetMinMax<{
        max: 2;
      }>;
  };
}

export interface BlockSimpleText extends Schema.Component {
  collectionName: 'components_block_simple_texts';
  info: {
    displayName: 'SimpleText';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    isNormal: Attribute.Boolean & Attribute.DefaultTo<true>;
    firstSubTitle: Attribute.Text;
    secondSubTitle: Attribute.Text;
    firstText: Attribute.Text;
    secondText: Attribute.Text;
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

export interface BlockSpace extends Schema.Component {
  collectionName: 'components_block_spaces';
  info: {
    displayName: 'Space';
    description: '';
  };
  attributes: {
    space: Attribute.Integer;
  };
}

export interface BlockTestimonies extends Schema.Component {
  collectionName: 'components_block_testimonies';
  info: {
    displayName: 'TestimoniesCarousel';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.vertical-carousel-item', true>;
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
  };
}

export interface BlockVideo extends Schema.Component {
  collectionName: 'components_block_videos';
  info: {
    displayName: 'Video';
    description: '';
  };
  attributes: {
    url: Attribute.Text;
    description: Attribute.Text;
    alt: Attribute.Text;
    image: Attribute.Media;
  };
}

export interface CommonDetailedLogo extends Schema.Component {
  collectionName: 'components_common_detailed_logos';
  info: {
    displayName: 'Detailed Logo';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface CommonFiltre extends Schema.Component {
  collectionName: 'components_common_filtres';
  info: {
    displayName: 'Filtre';
    description: '';
  };
  attributes: {
    filtre: Attribute.String & Attribute.Required;
  };
}

export interface CommonKeyNumberItems extends Schema.Component {
  collectionName: 'components_common_key_number_items';
  info: {
    displayName: 'KeyNumberItems';
  };
  attributes: {
    firstEmoji: Attribute.String;
    secondEmoji: Attribute.String;
    thirdEmoji: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
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

export interface CommonLittleListComponent extends Schema.Component {
  collectionName: 'components_common_little_list_components';
  info: {
    displayName: 'LittleListComponent';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    description: Attribute.Text;
    firstEmoji: Attribute.String;
    secondEmoji: Attribute.String;
  };
}

export interface CommonLogo extends Schema.Component {
  collectionName: 'components_common_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logo: Attribute.Media & Attribute.Required;
  };
}

export interface CommonNotRequiredLink extends Schema.Component {
  collectionName: 'components_common_not_required_links';
  info: {
    displayName: 'NotRequiredLink';
    description: '';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    URL: Attribute.String & Attribute.Required;
  };
}

export interface CommonOffersCarouselItem extends Schema.Component {
  collectionName: 'components_common_offers_carousel_items';
  info: {
    displayName: 'OffersCarouselItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    surtitle: Attribute.String;
    firstIcon: Attribute.String;
    secondIcon: Attribute.String;
    text: Attribute.Text;
    secondSurtitle: Attribute.String;
    theme: Attribute.Enumeration<
      ['purple', 'yellow', 'magenta', 'orange', 'green']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'purple'>;
  };
}

export interface CommonOffers extends Schema.Component {
  collectionName: 'components_common_offers';
  info: {
    displayName: 'Offers';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    previousButtonLabel: Attribute.String & Attribute.Required;
    nextButtonLabel: Attribute.String & Attribute.Required;
    controlsLabel: Attribute.String & Attribute.Required;
  };
}

export interface CommonPerson extends Schema.Component {
  collectionName: 'components_common_people';
  info: {
    displayName: 'Person';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    position: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface CommonPiledCardItem extends Schema.Component {
  collectionName: 'components_common_piled_card_items';
  info: {
    displayName: 'PiledCardItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media;
    firstIcon: Attribute.String;
    secondIcon: Attribute.String;
    color: Attribute.String;
  };
}

export interface CommonSimpleTextColumn extends Schema.Component {
  collectionName: 'components_common_simple_text_columns';
  info: {
    displayName: 'Simple Text Column';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Blocks & Attribute.Required;
  };
}

export interface CommonTestimonyCarousel extends Schema.Component {
  collectionName: 'components_block_testimony_carousels';
  info: {
    displayName: 'TestimonyCarouselItem';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    videoUrl: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
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
    url: Attribute.String & Attribute.Required;
    image: Attribute.Media;
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
      'block.detailed-logos': BlockDetailedLogos;
      'block.double-push-cta': BlockDoublePushCta;
      'block.experience-video-carousel': BlockExperienceVideoCarousel;
      'block.faq': BlockFaq;
      'block.header': BlockHeader;
      'block.image-text': BlockImageText;
      'block.image': BlockImage;
      'block.key-number-carousel': BlockKeyNumberCarousel;
      'block.latest-news': BlockLatestNews;
      'block.link': BlockLink;
      'block.little-list': BlockLittleList;
      'block.logos': BlockLogos;
      'block.offer-list': BlockOfferList;
      'block.offers-carousel': BlockOffersCarousel;
      'block.offers-section': BlockOffersSection;
      'block.organization-chart': BlockOrganizationChart;
      'block.piled-cards': BlockPiledCards;
      'block.push-cta': BlockPushCta;
      'block.separator': BlockSeparator;
      'block.simple-push-cta': BlockSimplePushCta;
      'block.simple-text-v2': BlockSimpleTextV2;
      'block.simple-text': BlockSimpleText;
      'block.social-media': BlockSocialMedia;
      'block.space': BlockSpace;
      'block.testimonies': BlockTestimonies;
      'block.vertical-carousel': BlockVerticalCarousel;
      'block.video': BlockVideo;
      'common.detailed-logo': CommonDetailedLogo;
      'common.filtre': CommonFiltre;
      'common.key-number-items': CommonKeyNumberItems;
      'common.link': CommonLink;
      'common.little-list-component': CommonLittleListComponent;
      'common.logo': CommonLogo;
      'common.not-required-link': CommonNotRequiredLink;
      'common.offers-carousel-item': CommonOffersCarouselItem;
      'common.offers': CommonOffers;
      'common.person': CommonPerson;
      'common.piled-card-item': CommonPiledCardItem;
      'common.simple-text-column': CommonSimpleTextColumn;
      'common.testimony-carousel': CommonTestimonyCarousel;
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
