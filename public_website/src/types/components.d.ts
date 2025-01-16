import type { Schema, Struct } from '@strapi/strapi';

export interface BlockBreadcrumb extends Struct.ComponentSchema {
  collectionName: 'components_block_breadcrumbs';
  info: {
    description: '';
    displayName: 'Breadcrumbs';
  };
  attributes: {};
}

export interface BlockCenteredText extends Struct.ComponentSchema {
  collectionName: 'components_block_centered_texts';
  info: {
    description: '';
    displayName: 'Centered Text';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlockCenteredTitle extends Struct.ComponentSchema {
  collectionName: 'components_block_centered_titles';
  info: {
    displayName: 'Centered Title';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockColumnsText extends Struct.ComponentSchema {
  collectionName: 'components_block_columns_texts';
  info: {
    description: '';
    displayName: 'Columns Text';
  };
  attributes: {
    columns: Schema.Attribute.Component<'common.simple-text-column', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Component<'block.video', false>;
  };
}

export interface BlockDetailedLogos extends Struct.ComponentSchema {
  collectionName: 'components_block_detailed_logos';
  info: {
    displayName: 'Detailed Logos';
  };
  attributes: {
    logos: Schema.Attribute.Component<'common.detailed-logo', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlockDoublePushCta extends Struct.ComponentSchema {
  collectionName: 'components_block_double_push_ctas';
  info: {
    description: '';
    displayName: 'Push Grey CTA';
  };
  attributes: {
    firstCta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    secondCta: Schema.Attribute.Component<'common.not-required-link', false>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockExperienceVideoCarousel extends Struct.ComponentSchema {
  collectionName: 'components_block_experience_video_carousels';
  info: {
    description: '';
    displayName: 'ExperienceVideoCarousel';
  };
  attributes: {
    carouselItems: Schema.Attribute.Component<
      'common.experience-video-carousel-item',
      true
    > &
      Schema.Attribute.Required;
    isLandscape: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFaq extends Struct.ComponentSchema {
  collectionName: 'components_block_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    categories: Schema.Attribute.String;
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    filteringProperty: Schema.Attribute.String & Schema.Attribute.Required;
    limit: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<10>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockHeader extends Struct.ComponentSchema {
  collectionName: 'components_block_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    aboveTitle: Schema.Attribute.String;
    cta: Schema.Attribute.Component<'common.link', false>;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    icon2: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockHeaderWithQRcode extends Struct.ComponentSchema {
  collectionName: 'components_block_header_with_q_rcodes';
  info: {
    description: '';
    displayName: 'HeaderWithQRcode';
  };
  attributes: {
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    QRCode: Schema.Attribute.Component<'common.link', false>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockImage extends Struct.ComponentSchema {
  collectionName: 'components_block_images';
  info: {
    description: '';
    displayName: 'Image';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface BlockImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_block_image_galleries';
  info: {
    displayName: 'Image Gallery';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface BlockImageText extends Struct.ComponentSchema {
  collectionName: 'components_block_image_texts';
  info: {
    description: '';
    displayName: 'ImageText';
  };
  attributes: {
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    isImageRight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlockKeyNumberCarousel extends Struct.ComponentSchema {
  collectionName: 'components_block_key_number_carousels';
  info: {
    displayName: 'KeyNumberCarousel';
  };
  attributes: {
    items: Schema.Attribute.Component<'common.key-number-items', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
    title: Schema.Attribute.String;
  };
}

export interface BlockLatestNews extends Struct.ComponentSchema {
  collectionName: 'components_block_latest_news';
  info: {
    description: '';
    displayName: 'latestNews';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlockLink extends Struct.ComponentSchema {
  collectionName: 'components_block_links';
  info: {
    description: '';
    displayName: 'socialMediaLink';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      [
        'x',
        'instagram',
        'tiktok',
        'youtube',
        'facebook',
        'snapchat',
        'linkedin',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockLittleList extends Struct.ComponentSchema {
  collectionName: 'components_block_little_lists';
  info: {
    description: '';
    displayName: 'LittleList';
  };
  attributes: {
    content: Schema.Attribute.Component<'common.little-list-component', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlockLogos extends Struct.ComponentSchema {
  collectionName: 'components_block_logos';
  info: {
    description: '';
    displayName: 'Logos';
  };
  attributes: {
    logo: Schema.Attribute.Component<'common.logo', true>;
  };
}

export interface BlockOfferList extends Struct.ComponentSchema {
  collectionName: 'components_block_offer_lists';
  info: {
    description: '';
    displayName: 'OfferList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    ctaCard: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    descritptionCard: Schema.Attribute.Text & Schema.Attribute.Required;
    firstCartTitle: Schema.Attribute.String & Schema.Attribute.Required;
    firstIcon: Schema.Attribute.String & Schema.Attribute.Required;
    offreTag: Schema.Attribute.String & Schema.Attribute.Required;
    secondCartTitle: Schema.Attribute.String & Schema.Attribute.Required;
    secondIcon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockOffersCarousel extends Struct.ComponentSchema {
  collectionName: 'components_block_offers_carousels';
  info: {
    description: '';
    displayName: 'OffersCarousel';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Blocks;
    items: Schema.Attribute.Component<'common.offers-carousel-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockOffersSection extends Struct.ComponentSchema {
  collectionName: 'components_block_offers_sections';
  info: {
    description: '';
    displayName: 'OffersSection';
  };
  attributes: {
    cardCta: Schema.Attribute.Component<'common.link', false>;
    cta: Schema.Attribute.Component<'common.link', false>;
    descriptionCard: Schema.Attribute.Text & Schema.Attribute.Required;
    firstCardIcon: Schema.Attribute.String;
    firstCardtitle: Schema.Attribute.String & Schema.Attribute.Required;
    offers: Schema.Attribute.Component<'common.offers', false>;
    offerTag: Schema.Attribute.String;
    secondCardIcon: Schema.Attribute.String;
    secondCardTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockOrganizationChart extends Struct.ComponentSchema {
  collectionName: 'components_block_organization_charts';
  info: {
    description: '';
    displayName: 'Organization Chart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    people: Schema.Attribute.Component<'common.person', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlockPiledCards extends Struct.ComponentSchema {
  collectionName: 'components_block_piled_cards';
  info: {
    description: '';
    displayName: 'PiledCards';
  };
  attributes: {
    accessibleTitle: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'common.piled-card-item', true>;
  };
}

export interface BlockPushCta extends Struct.ComponentSchema {
  collectionName: 'components_block_push_ctas';
  info: {
    description: '';
    displayName: 'Push CTA With QrCode';
  };
  attributes: {
    ctaLink: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    qrCodeDescription: Schema.Attribute.String & Schema.Attribute.Required;
    qrCodeUrl: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockRelatedNews extends Struct.ComponentSchema {
  collectionName: 'components_block_related_news';
  info: {
    description: '';
    displayName: 'RelatedNews';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockSeparator extends Struct.ComponentSchema {
  collectionName: 'components_block_separators';
  info: {
    description: '';
    displayName: 'Separator';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface BlockSimplePushCta extends Struct.ComponentSchema {
  collectionName: 'components_block_simple_push_ctas';
  info: {
    description: '';
    displayName: 'Push Blue CTA';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    surtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockSimpleTextV2 extends Struct.ComponentSchema {
  collectionName: 'components_block_simple_text_v2s';
  info: {
    description: '';
    displayName: 'Simple Text';
  };
  attributes: {
    columns: Schema.Attribute.Component<'common.simple-text-column', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlockSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_block_social_medias';
  info: {
    description: '';
    displayName: 'socialMedia';
  };
  attributes: {
    socialMediaLink: Schema.Attribute.Component<'block.link', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockSpace extends Struct.ComponentSchema {
  collectionName: 'components_block_spaces';
  info: {
    description: '';
    displayName: 'Space';
  };
  attributes: {
    space: Schema.Attribute.Integer;
  };
}

export interface BlockTabImageText extends Struct.ComponentSchema {
  collectionName: 'components_block_tab_image_texts';
  info: {
    displayName: 'TabImageText';
  };
  attributes: {
    block: Schema.Attribute.Component<'block.image-text', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockTabLittleList extends Struct.ComponentSchema {
  collectionName: 'components_block_tab_little_lists';
  info: {
    displayName: 'TabLittleList';
  };
  attributes: {
    block: Schema.Attribute.Component<'block.little-list', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockTabPushGreyCta extends Struct.ComponentSchema {
  collectionName: 'components_block_tab_push_grey_ctas';
  info: {
    displayName: 'TabPushGreyCTA';
  };
  attributes: {
    block: Schema.Attribute.Component<'block.double-push-cta', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockTabSimpleText extends Struct.ComponentSchema {
  collectionName: 'components_block_tab_simple_texts';
  info: {
    displayName: 'TabSimpleText';
  };
  attributes: {
    block: Schema.Attribute.Component<'block.simple-text-v2', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockTabsImageText extends Struct.ComponentSchema {
  collectionName: 'components_block_tabs_image_texts';
  info: {
    displayName: 'TabsImageText';
  };
  attributes: {
    tab: Schema.Attribute.Component<'block.tab-image-text', true>;
  };
}

export interface BlockTabsLittleList extends Struct.ComponentSchema {
  collectionName: 'components_block_tabs_little_lists';
  info: {
    displayName: 'TabsLittleList';
  };
  attributes: {
    tab: Schema.Attribute.Component<'block.tab-little-list', true>;
  };
}

export interface BlockTabsPushGreyCta extends Struct.ComponentSchema {
  collectionName: 'components_block_tabs_push_grey_ctas';
  info: {
    description: '';
    displayName: 'TabsPushGreyCTA';
  };
  attributes: {
    tab: Schema.Attribute.Component<'block.tab-push-grey-cta', true>;
  };
}

export interface BlockTabsSimpleText extends Struct.ComponentSchema {
  collectionName: 'components_block_tabs_simple_texts';
  info: {
    displayName: 'TabsSimpleText';
  };
  attributes: {
    tab: Schema.Attribute.Component<'block.tab-simple-text', true>;
  };
}

export interface BlockVerticalCarousel extends Struct.ComponentSchema {
  collectionName: 'components_block_vertical_carousels';
  info: {
    description: '';
    displayName: 'VerticalCarousel';
  };
  attributes: {
    items: Schema.Attribute.Component<'common.vertical-carousel-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlockVideo extends Struct.ComponentSchema {
  collectionName: 'components_block_videos';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    alt: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Schema.Attribute.Text;
  };
}

export interface CommonDetailedLogo extends Struct.ComponentSchema {
  collectionName: 'components_common_detailed_logos';
  info: {
    displayName: 'Detailed Logo';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonExperienceVideoCarouselItem
  extends Struct.ComponentSchema {
  collectionName: 'components_common_experience_video_carousel_items';
  info: {
    displayName: 'ExperienceVideoCarouselItem';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface CommonFiltre extends Struct.ComponentSchema {
  collectionName: 'components_common_filtres';
  info: {
    description: '';
    displayName: 'Filtre';
  };
  attributes: {
    filtre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonKeyNumberItems extends Struct.ComponentSchema {
  collectionName: 'components_common_key_number_items';
  info: {
    displayName: 'KeyNumberItems';
  };
  attributes: {
    description: Schema.Attribute.Text;
    firstEmoji: Schema.Attribute.String;
    secondEmoji: Schema.Attribute.String;
    thirdEmoji: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CommonLink extends Struct.ComponentSchema {
  collectionName: 'components_common_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    eventName: Schema.Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport',
      ]
    >;
    eventOrigin: Schema.Attribute.Enumeration<
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
        'footer',
      ]
    >;
    Label: Schema.Attribute.String & Schema.Attribute.Required;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonLittleListComponent extends Struct.ComponentSchema {
  collectionName: 'components_common_little_list_components';
  info: {
    description: '';
    displayName: 'LittleListComponent';
  };
  attributes: {
    description: Schema.Attribute.Text;
    firstEmoji: Schema.Attribute.String;
    secondEmoji: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface CommonLogo extends Struct.ComponentSchema {
  collectionName: 'components_common_logos';
  info: {
    description: '';
    displayName: 'Logo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface CommonNotRequiredLink extends Struct.ComponentSchema {
  collectionName: 'components_common_not_required_links';
  info: {
    description: '';
    displayName: 'NotRequiredLink';
  };
  attributes: {
    eventName: Schema.Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport',
      ]
    >;
    eventOrigin: Schema.Attribute.Enumeration<
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
        'footer',
      ]
    >;
    Label: Schema.Attribute.String & Schema.Attribute.Required;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonOffers extends Struct.ComponentSchema {
  collectionName: 'components_common_offers';
  info: {
    description: '';
    displayName: 'Offers';
  };
  attributes: {
    controlsLabel: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    nextButtonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    previousButtonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonOffersCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_common_offers_carousel_items';
  info: {
    description: '';
    displayName: 'OffersCarouselItem';
  };
  attributes: {
    firstIcon: Schema.Attribute.String & Schema.Attribute.Required;
    secondIcon: Schema.Attribute.String & Schema.Attribute.Required;
    surtitle: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<
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
        'saumon',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'purple'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonPerson extends Struct.ComponentSchema {
  collectionName: 'components_common_people';
  info: {
    displayName: 'Person';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonPiledCardItem extends Struct.ComponentSchema {
  collectionName: 'components_common_piled_card_items';
  info: {
    description: '';
    displayName: 'PiledCardItem';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    firstIcon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    secondIcon: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<
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
        'saumon',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'purple'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonSimpleTextColumn extends Struct.ComponentSchema {
  collectionName: 'components_common_simple_text_columns';
  info: {
    description: '';
    displayName: 'Simple Text Column';
  };
  attributes: {
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface CommonVerticalCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_common_vertical_carousel_items';
  info: {
    description: '';
    displayName: 'verticalCarouselItem';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterLegalLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_links';
  info: {
    displayName: 'LegalLinks';
  };
  attributes: {};
}

export interface FooterList extends Struct.ComponentSchema {
  collectionName: 'components_footer_lists';
  info: {
    description: '';
    displayName: 'Lists';
  };
  attributes: {
    Links: Schema.Attribute.Component<'common.link', true>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeaderAccountDropdown extends Struct.ComponentSchema {
  collectionName: 'components_header_account_dropdowns';
  info: {
    displayName: 'accountDropdown';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'header.account-item', true> &
      Schema.Attribute.Required;
  };
}

export interface HeaderAccountItem extends Struct.ComponentSchema {
  collectionName: 'components_header_account_item';
  info: {
    description: '';
    displayName: 'accountItem';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.Required;
    emoji: Schema.Attribute.String & Schema.Attribute.Required;
    eventName: Schema.Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport',
      ]
    >;
    eventOrigin: Schema.Attribute.Enumeration<
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
        'footer',
      ]
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeaderHeader extends Struct.ComponentSchema {
  collectionName: 'components_header_headers';
  info: {
    displayName: 'header';
  };
  attributes: {};
}

export interface HeaderLogin extends Struct.ComponentSchema {
  collectionName: 'components_header_logins';
  info: {
    displayName: 'login';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    loginItems: Schema.Attribute.Component<'header.login-items', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
  };
}

export interface HeaderLoginItems extends Struct.ComponentSchema {
  collectionName: 'components_header_login_items';
  info: {
    description: '';
    displayName: 'loginItems';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.Required;
    emoji: Schema.Attribute.String & Schema.Attribute.Required;
    eventName: Schema.Attribute.Enumeration<
      [
        'goToSignUpNative',
        'goToSignUpPro',
        'goToLoginNative',
        'goToLoginPro',
        'downloadApp',
        'goToFaqNative',
        'goToFaqPro',
        'contactSupport',
      ]
    >;
    eventOrigin: Schema.Attribute.Enumeration<
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
        'footer',
      ]
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeaderMegaMenu extends Struct.ComponentSchema {
  collectionName: 'components_header_mega_menus';
  info: {
    description: '';
    displayName: 'megaMenu';
  };
  attributes: {
    bannerAndroidUrl: Schema.Attribute.String;
    bannerDefaultUrl: Schema.Attribute.String;
    bannerIosUrl: Schema.Attribute.String;
    bannerText: Schema.Attribute.String;
    cardDescription: Schema.Attribute.String & Schema.Attribute.Required;
    cardFirstEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    cardLink: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    cardSecondEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    cardTitle: Schema.Attribute.String & Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    primaryListItems: Schema.Attribute.Component<'common.link', true> &
      Schema.Attribute.Required;
    secondaryListItems: Schema.Attribute.Component<'common.link', true>;
    theme: Schema.Attribute.Enumeration<
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
        'saumon',
      ]
    > &
      Schema.Attribute.DefaultTo<'gold'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeaderNavigationItems extends Struct.ComponentSchema {
  collectionName: 'components_header_navigation_items';
  info: {
    displayName: 'navigationItems';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    megaMenu: Schema.Attribute.Component<'header.mega-menu', false>;
  };
}

export interface HomeEligibilityItems extends Struct.ComponentSchema {
  collectionName: 'components_home_eligibility_items';
  info: {
    displayName: 'eligibilityItems';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    emoji: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeEligibilitySection extends Struct.ComponentSchema {
  collectionName: 'components_home_eligibility_sections';
  info: {
    description: '';
    displayName: 'eligibilitySection';
  };
  attributes: {
    cardCta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    cardDescription: Schema.Attribute.String & Schema.Attribute.Required;
    cardTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    firstEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'home.eligibility-items', true> &
      Schema.Attribute.Required;
    secondEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_sections';
  info: {
    description: '';
    displayName: 'heroSection';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    fifthEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    firstEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    fourthEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    secondEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    sixthEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    subTitle: Schema.Attribute.String & Schema.Attribute.Required;
    thirdEmoji: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeRecommendationsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_recommendations_sections';
  info: {
    displayName: 'recommendationsSection';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    recommendations: Schema.Attribute.Component<
      'block.vertical-carousel',
      false
    > &
      Schema.Attribute.Required;
    recommendationsBackendTag: Schema.Attribute.String &
      Schema.Attribute.Required;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'X']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SimulatorAgeQuestion extends Struct.ComponentSchema {
  collectionName: 'components_simulator_age_questions';
  info: {
    description: '';
    displayName: 'AgeQuestion';
  };
  attributes: {
    answers: Schema.Attribute.Component<'simulator.answer', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 6;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SimulatorAmountScreen extends Struct.ComponentSchema {
  collectionName: 'components_simulator_amount_screens';
  info: {
    displayName: 'Amount Screen';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SimulatorAnswer extends Struct.ComponentSchema {
  collectionName: 'components_simulator_answers';
  info: {
    description: '';
    displayName: 'Answer';
  };
  attributes: {
    answer: Schema.Attribute.String & Schema.Attribute.Required;
    emoji: Schema.Attribute.String;
  };
}

export interface SimulatorFailureScreen extends Struct.ComponentSchema {
  collectionName: 'components_simulator_failure_screens';
  info: {
    description: '';
    displayName: 'Failure Screen';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SimulatorRadioQuestion extends Struct.ComponentSchema {
  collectionName: 'components_simulator_radio_questions';
  info: {
    description: '';
    displayName: 'RadioQuestion';
  };
  attributes: {
    answers: Schema.Attribute.Component<'simulator.answer', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
          min: 2;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SimulatorStep extends Struct.ComponentSchema {
  collectionName: 'components_simulator_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    step: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SimulatorSuccessScreen extends Struct.ComponentSchema {
  collectionName: 'components_simulator_success_screens';
  info: {
    displayName: 'Success Screen';
  };
  attributes: {
    cta: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    needSupport: Schema.Attribute.String & Schema.Attribute.Required;
    steps: Schema.Attribute.Component<'simulator.step', true> &
      Schema.Attribute.Required;
    supportLink: Schema.Attribute.Component<'common.link', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.breadcrumb': BlockBreadcrumb;
      'block.centered-text': BlockCenteredText;
      'block.centered-title': BlockCenteredTitle;
      'block.columns-text': BlockColumnsText;
      'block.detailed-logos': BlockDetailedLogos;
      'block.double-push-cta': BlockDoublePushCta;
      'block.experience-video-carousel': BlockExperienceVideoCarousel;
      'block.faq': BlockFaq;
      'block.header': BlockHeader;
      'block.header-with-q-rcode': BlockHeaderWithQRcode;
      'block.image': BlockImage;
      'block.image-gallery': BlockImageGallery;
      'block.image-text': BlockImageText;
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
      'block.related-news': BlockRelatedNews;
      'block.separator': BlockSeparator;
      'block.simple-push-cta': BlockSimplePushCta;
      'block.simple-text-v2': BlockSimpleTextV2;
      'block.social-media': BlockSocialMedia;
      'block.space': BlockSpace;
      'block.tab-image-text': BlockTabImageText;
      'block.tab-little-list': BlockTabLittleList;
      'block.tab-push-grey-cta': BlockTabPushGreyCta;
      'block.tab-simple-text': BlockTabSimpleText;
      'block.tabs-image-text': BlockTabsImageText;
      'block.tabs-little-list': BlockTabsLittleList;
      'block.tabs-push-grey-cta': BlockTabsPushGreyCta;
      'block.tabs-simple-text': BlockTabsSimpleText;
      'block.vertical-carousel': BlockVerticalCarousel;
      'block.video': BlockVideo;
      'common.detailed-logo': CommonDetailedLogo;
      'common.experience-video-carousel-item': CommonExperienceVideoCarouselItem;
      'common.filtre': CommonFiltre;
      'common.key-number-items': CommonKeyNumberItems;
      'common.link': CommonLink;
      'common.little-list-component': CommonLittleListComponent;
      'common.logo': CommonLogo;
      'common.not-required-link': CommonNotRequiredLink;
      'common.offers': CommonOffers;
      'common.offers-carousel-item': CommonOffersCarouselItem;
      'common.person': CommonPerson;
      'common.piled-card-item': CommonPiledCardItem;
      'common.simple-text-column': CommonSimpleTextColumn;
      'common.vertical-carousel-item': CommonVerticalCarouselItem;
      'footer.legal-links': FooterLegalLinks;
      'footer.list': FooterList;
      'header.account-dropdown': HeaderAccountDropdown;
      'header.account-item': HeaderAccountItem;
      'header.header': HeaderHeader;
      'header.login': HeaderLogin;
      'header.login-items': HeaderLoginItems;
      'header.mega-menu': HeaderMegaMenu;
      'header.navigation-items': HeaderNavigationItems;
      'home.eligibility-items': HomeEligibilityItems;
      'home.eligibility-section': HomeEligibilitySection;
      'home.hero-section': HomeHeroSection;
      'home.recommendations-section': HomeRecommendationsSection;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
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
