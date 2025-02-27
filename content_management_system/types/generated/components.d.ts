import type { Schema, Attribute } from '@strapi/strapi';

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
    images: Attribute.Media<'images', true> & Attribute.Required;
    fifthEmoji: Attribute.String & Attribute.Required;
    sixthEmoji: Attribute.String & Attribute.Required;
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

export interface SimulatorStep extends Schema.Component {
  collectionName: 'components_simulator_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    step: Attribute.String & Attribute.Required;
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
      Attribute.SetMinMax<
        {
          min: 2;
          max: 2;
        },
        number
      >;
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

export interface SimulatorAgeQuestion extends Schema.Component {
  collectionName: 'components_simulator_age_questions';
  info: {
    displayName: 'AgeQuestion';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    answers: Attribute.Component<'simulator.answer', true> & Attribute.Required;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'X']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
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
    image: Attribute.Media<'images'>;
  };
}

export interface CommonSimpleTextColumn extends Schema.Component {
  collectionName: 'components_common_simple_text_columns';
  info: {
    displayName: 'Simple Text Column';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Blocks & Attribute.Required;
  };
}

export interface CommonPiledCardItem extends Schema.Component {
  collectionName: 'components_common_piled_card_items';
  info: {
    displayName: 'PiledCardItem';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    firstIcon: Attribute.String;
    secondIcon: Attribute.String;
    theme: Attribute.Enumeration<
      [
        'purple',
        'yellow',
        'magenta',
        'orange',
        'green',
        'blue',
        'gold',
        'sky',
        'lila',
        'deeppink',
        'aquamarine',
        'lightgray',
        'saumon'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'purple'>;
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
    image: Attribute.Media<'images'> & Attribute.Required;
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

export interface CommonOffersCarouselItem extends Schema.Component {
  collectionName: 'components_common_offers_carousel_items';
  info: {
    displayName: 'OffersCarouselItem';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    surtitle: Attribute.String & Attribute.Required;
    firstIcon: Attribute.String & Attribute.Required;
    secondIcon: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    theme: Attribute.Enumeration<
      [
        'purple',
        'yellow',
        'magenta',
        'orange',
        'green',
        'gold',
        'sky',
        'lila',
        'deeppink',
        'aquamarine',
        'lightgray',
        'saumon'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'purple'>;
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
    eventName: Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport'
      ]
    >;
    eventOrigin: Attribute.Enumeration<
      [
        'header',
        'home',
        'menu-young-people-and-parents',
        'menu-pros',
        'get-your-credit',
        'essential-pros',
        'how-to-propose-offers',
        'help-young-people-and-parents',
        'help-pros',
        'help-teachers',
        'simulator',
        'parents',
        'footer'
      ]
    >;
  };
}

export interface CommonLogo extends Schema.Component {
  collectionName: 'components_common_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
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

export interface CommonLink extends Schema.Component {
  collectionName: 'components_common_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    URL: Attribute.String & Attribute.Required;
    eventName: Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport'
      ]
    >;
    eventOrigin: Attribute.Enumeration<
      [
        'header',
        'home',
        'menu-young-people-and-parents',
        'menu-pros',
        'get-your-credit',
        'essential-pros',
        'how-to-propose-offers',
        'help-young-people-and-parents',
        'help-pros',
        'help-teachers',
        'simulator',
        'parents',
        'footer'
      ]
    >;
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

export interface CommonExperienceVideoCarouselItem extends Schema.Component {
  collectionName: 'components_common_experience_video_carousel_items';
  info: {
    displayName: 'ExperienceVideoCarouselItem';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    url: Attribute.String;
    image: Attribute.Media<'images'>;
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
    image: Attribute.Media<'images'> & Attribute.Required;
  };
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

export interface FooterLegalLinks extends Schema.Component {
  collectionName: 'components_footer_legal_links';
  info: {
    displayName: 'LegalLinks';
  };
  attributes: {};
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
    secondaryListItems: Attribute.Component<'common.link', true>;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    cardTitle: Attribute.String & Attribute.Required;
    cardDescription: Attribute.String & Attribute.Required;
    cardLink: Attribute.Component<'common.link'> & Attribute.Required;
    bannerText: Attribute.String;
    cardFirstEmoji: Attribute.String & Attribute.Required;
    cardSecondEmoji: Attribute.String & Attribute.Required;
    bannerAndroidUrl: Attribute.String;
    bannerIosUrl: Attribute.String;
    bannerDefaultUrl: Attribute.String;
    theme: Attribute.Enumeration<
      [
        'purple',
        'yellow',
        'magenta',
        'orange',
        'green',
        'gold',
        'sky',
        'lila',
        'deeppink',
        'aquamarine',
        'lightgray',
        'saumon'
      ]
    > &
      Attribute.DefaultTo<'gold'>;
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
      Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
  };
}

export interface HeaderLoginItems extends Schema.Component {
  collectionName: 'components_header_login_items';
  info: {
    displayName: 'loginItems';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    color: Attribute.String & Attribute.Required;
    emoji: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    eventName: Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport'
      ]
    >;
    eventOrigin: Attribute.Enumeration<
      [
        'header',
        'home',
        'menu-young-people-and-parents',
        'menu-pros',
        'get-your-credit',
        'essential-pros',
        'how-to-propose-offers',
        'help-young-people-and-parents',
        'help-pros',
        'help-teachers',
        'simulator',
        'parents',
        'footer'
      ]
    >;
  };
}

export interface HeaderHeader extends Schema.Component {
  collectionName: 'components_header_headers';
  info: {
    displayName: 'header';
  };
  attributes: {};
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
    eventName: Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport'
      ]
    >;
    eventOrigin: Attribute.Enumeration<
      [
        'header',
        'home',
        'menu-young-people-and-parents',
        'menu-pros',
        'get-your-credit',
        'essential-pros',
        'how-to-propose-offers',
        'help-young-people-and-parents',
        'help-pros',
        'help-teachers',
        'simulator',
        'parents',
        'footer'
      ]
    >;
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
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface BlockTabsSimpleText extends Schema.Component {
  collectionName: 'components_block_tabs_simple_texts';
  info: {
    displayName: 'TabsSimpleText';
  };
  attributes: {
    tab: Attribute.Component<'block.tab-simple-text', true>;
  };
}

export interface BlockTabsPushGreyCta extends Schema.Component {
  collectionName: 'components_block_tabs_push_grey_ctas';
  info: {
    displayName: 'TabsPushGreyCTA';
    description: '';
  };
  attributes: {
    tab: Attribute.Component<'block.tab-push-grey-cta', true>;
  };
}

export interface BlockTabsLittleList extends Schema.Component {
  collectionName: 'components_block_tabs_little_lists';
  info: {
    displayName: 'TabsLittleList';
  };
  attributes: {
    tab: Attribute.Component<'block.tab-little-list', true>;
  };
}

export interface BlockTabsImageText extends Schema.Component {
  collectionName: 'components_block_tabs_image_texts';
  info: {
    displayName: 'TabsImageText';
  };
  attributes: {
    tab: Attribute.Component<'block.tab-image-text', true>;
  };
}

export interface BlockTabSimpleText extends Schema.Component {
  collectionName: 'components_block_tab_simple_texts';
  info: {
    displayName: 'TabSimpleText';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    block: Attribute.Component<'block.simple-text-v2'>;
  };
}

export interface BlockTabPushGreyCta extends Schema.Component {
  collectionName: 'components_block_tab_push_grey_ctas';
  info: {
    displayName: 'TabPushGreyCTA';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    block: Attribute.Component<'block.double-push-cta'>;
  };
}

export interface BlockTabLittleList extends Schema.Component {
  collectionName: 'components_block_tab_little_lists';
  info: {
    displayName: 'TabLittleList';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    block: Attribute.Component<'block.little-list'>;
  };
}

export interface BlockTabImageText extends Schema.Component {
  collectionName: 'components_block_tab_image_texts';
  info: {
    displayName: 'TabImageText';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    block: Attribute.Component<'block.image-text'>;
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

export interface BlockSimpleTextV2 extends Schema.Component {
  collectionName: 'components_block_simple_text_v2s';
  info: {
    displayName: 'Simple Text';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Blocks & Attribute.Required;
    columns: Attribute.Component<'common.simple-text-column', true> &
      Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
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
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    icon: Attribute.String;
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

export interface BlockRelatedNews extends Schema.Component {
  collectionName: 'components_block_related_news';
  info: {
    displayName: 'RelatedNews';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    cta: Attribute.Component<'common.link'>;
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
    image: Attribute.Media<'images'> & Attribute.Required;
    ctaLink: Attribute.Component<'common.link'> & Attribute.Required;
    qrCodeDescription: Attribute.String & Attribute.Required;
    qrCodeUrl: Attribute.String & Attribute.Required;
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
    accessibleTitle: Attribute.String & Attribute.Required;
  };
}

export interface BlockOrganizationChart extends Schema.Component {
  collectionName: 'components_block_organization_charts';
  info: {
    displayName: 'Organization Chart';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text & Attribute.Required;
    people: Attribute.Component<'common.person', true> & Attribute.Required;
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

export interface BlockOffersCarousel extends Schema.Component {
  collectionName: 'components_block_offers_carousels';
  info: {
    displayName: 'OffersCarousel';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    items: Attribute.Component<'common.offers-carousel-item', true> &
      Attribute.Required;
    cta: Attribute.Component<'common.link'> & Attribute.Required;
    description: Attribute.Blocks;
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
    secondCartTitle: Attribute.String & Attribute.Required;
    descritptionCard: Attribute.Text & Attribute.Required;
    firstIcon: Attribute.String & Attribute.Required;
    secondIcon: Attribute.String & Attribute.Required;
    ctaCard: Attribute.Component<'common.link'> & Attribute.Required;
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
      Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
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

export interface BlockKeyNumberCarousel extends Schema.Component {
  collectionName: 'components_block_key_number_carousels';
  info: {
    displayName: 'KeyNumberCarousel';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.key-number-items', true> &
      Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
  };
}

export interface BlockImage extends Schema.Component {
  collectionName: 'components_block_images';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    description: Attribute.Text;
    alt: Attribute.String & Attribute.Required;
  };
}

export interface BlockImageText extends Schema.Component {
  collectionName: 'components_block_image_texts';
  info: {
    displayName: 'ImageText';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media<'images'> & Attribute.Required;
    isImageRight: Attribute.Boolean & Attribute.DefaultTo<true>;
    icon: Attribute.String;
    text: Attribute.Blocks & Attribute.Required;
  };
}

export interface BlockImageGallery extends Schema.Component {
  collectionName: 'components_block_image_galleries';
  info: {
    displayName: 'Image Gallery';
  };
  attributes: {
    images: Attribute.Media<'images', true> & Attribute.Required;
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
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    icon: Attribute.String & Attribute.Required;
    cta: Attribute.Component<'common.link'>;
    icon2: Attribute.String;
    aboveTitle: Attribute.String;
  };
}

export interface BlockHeaderWithQRcode extends Schema.Component {
  collectionName: 'components_block_header_with_q_rcodes';
  info: {
    displayName: 'HeaderWithQRcode';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text;
    image: Attribute.Media<'images'> & Attribute.Required;
    icon: Attribute.String;
    QRCode: Attribute.Component<'common.link'>;
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

export interface BlockExperienceVideoCarousel extends Schema.Component {
  collectionName: 'components_block_experience_video_carousels';
  info: {
    displayName: 'ExperienceVideoCarousel';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    carouselItems: Attribute.Component<
      'common.experience-video-carousel-item',
      true
    > &
      Attribute.Required;
    isLandscape: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface BlockDoublePushCta extends Schema.Component {
  collectionName: 'components_block_double_push_ctas';
  info: {
    displayName: 'Push Grey CTA';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text;
    firstCta: Attribute.Component<'common.link'> & Attribute.Required;
    icon: Attribute.String;
    secondCta: Attribute.Component<'common.not-required-link'>;
  };
}

export interface BlockDetailedLogos extends Schema.Component {
  collectionName: 'components_block_detailed_logos';
  info: {
    displayName: 'Detailed Logos';
  };
  attributes: {
    title: Attribute.String;
    logos: Attribute.Component<'common.detailed-logo', true> &
      Attribute.Required;
  };
}

export interface BlockColumnsText extends Schema.Component {
  collectionName: 'components_block_columns_texts';
  info: {
    displayName: 'Columns Text';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    video: Attribute.Component<'block.video'>;
    columns: Attribute.Component<'common.simple-text-column', true>;
  };
}

export interface BlockCenteredTitle extends Schema.Component {
  collectionName: 'components_block_centered_titles';
  info: {
    displayName: 'Centered Title';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface BlockCenteredText extends Schema.Component {
  collectionName: 'components_block_centered_texts';
  info: {
    displayName: 'Centered Text';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface BlockBreadcrumb extends Schema.Component {
  collectionName: 'components_block_breadcrumbs';
  info: {
    displayName: 'Breadcrumbs';
    description: '';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'home.recommendations-section': HomeRecommendationsSection;
      'home.hero-section': HomeHeroSection;
      'home.eligibility-section': HomeEligibilitySection;
      'home.eligibility-items': HomeEligibilityItems;
      'simulator.success-screen': SimulatorSuccessScreen;
      'simulator.step': SimulatorStep;
      'simulator.radio-question': SimulatorRadioQuestion;
      'simulator.failure-screen': SimulatorFailureScreen;
      'simulator.answer': SimulatorAnswer;
      'simulator.amount-screen': SimulatorAmountScreen;
      'simulator.age-question': SimulatorAgeQuestion;
      'shared.seo': SharedSeo;
      'shared.meta-social': SharedMetaSocial;
      'common.vertical-carousel-item': CommonVerticalCarouselItem;
      'common.simple-text-column': CommonSimpleTextColumn;
      'common.piled-card-item': CommonPiledCardItem;
      'common.person': CommonPerson;
      'common.offers': CommonOffers;
      'common.offers-carousel-item': CommonOffersCarouselItem;
      'common.not-required-link': CommonNotRequiredLink;
      'common.logo': CommonLogo;
      'common.little-list-component': CommonLittleListComponent;
      'common.link': CommonLink;
      'common.key-number-items': CommonKeyNumberItems;
      'common.filtre': CommonFiltre;
      'common.experience-video-carousel-item': CommonExperienceVideoCarouselItem;
      'common.detailed-logo': CommonDetailedLogo;
      'footer.list': FooterList;
      'footer.legal-links': FooterLegalLinks;
      'header.navigation-items': HeaderNavigationItems;
      'header.mega-menu': HeaderMegaMenu;
      'header.login': HeaderLogin;
      'header.login-items': HeaderLoginItems;
      'header.header': HeaderHeader;
      'header.account-item': HeaderAccountItem;
      'header.account-dropdown': HeaderAccountDropdown;
      'block.video': BlockVideo;
      'block.vertical-carousel': BlockVerticalCarousel;
      'block.tabs-simple-text': BlockTabsSimpleText;
      'block.tabs-push-grey-cta': BlockTabsPushGreyCta;
      'block.tabs-little-list': BlockTabsLittleList;
      'block.tabs-image-text': BlockTabsImageText;
      'block.tab-simple-text': BlockTabSimpleText;
      'block.tab-push-grey-cta': BlockTabPushGreyCta;
      'block.tab-little-list': BlockTabLittleList;
      'block.tab-image-text': BlockTabImageText;
      'block.space': BlockSpace;
      'block.social-media': BlockSocialMedia;
      'block.simple-text-v2': BlockSimpleTextV2;
      'block.simple-push-cta': BlockSimplePushCta;
      'block.separator': BlockSeparator;
      'block.related-news': BlockRelatedNews;
      'block.push-cta': BlockPushCta;
      'block.piled-cards': BlockPiledCards;
      'block.organization-chart': BlockOrganizationChart;
      'block.offers-section': BlockOffersSection;
      'block.offers-carousel': BlockOffersCarousel;
      'block.offer-list': BlockOfferList;
      'block.logos': BlockLogos;
      'block.little-list': BlockLittleList;
      'block.link': BlockLink;
      'block.latest-news': BlockLatestNews;
      'block.key-number-carousel': BlockKeyNumberCarousel;
      'block.image': BlockImage;
      'block.image-text': BlockImageText;
      'block.image-gallery': BlockImageGallery;
      'block.header': BlockHeader;
      'block.header-with-q-rcode': BlockHeaderWithQRcode;
      'block.faq': BlockFaq;
      'block.experience-video-carousel': BlockExperienceVideoCarousel;
      'block.double-push-cta': BlockDoublePushCta;
      'block.detailed-logos': BlockDetailedLogos;
      'block.columns-text': BlockColumnsText;
      'block.centered-title': BlockCenteredTitle;
      'block.centered-text': BlockCenteredText;
      'block.breadcrumb': BlockBreadcrumb;
    }
  }
}
