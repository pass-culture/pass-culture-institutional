/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "fragment ComponentBlockBreadcrumb on ComponentBlockBreadcrumb {\n  id\n}": types.ComponentBlockBreadcrumbFragmentDoc,
    "fragment ComponentBlockCenteredText on ComponentBlockCenteredText {\n  id\n  title\n  requiredDescription: description\n}": types.ComponentBlockCenteredTextFragmentDoc,
    "fragment ComponentBlockCenteredTitle on ComponentBlockCenteredTitle {\n  id\n  requiredTitle: title\n}": types.ComponentBlockCenteredTitleFragmentDoc,
    "fragment ComponentBlockColumnsText on ComponentBlockColumnsText {\n  id\n  requiredTitle: title\n  video {\n    ...ComponentBlockVideo\n  }\n  columns {\n    ...ComponentCommonSimpleTextColumn\n  }\n}": types.ComponentBlockColumnsTextFragmentDoc,
    "fragment ComponentBlockDetailedLogos on ComponentBlockDetailedLogos {\n  id\n  title\n  logos {\n    ...ComponentCommonDetailedLogo\n  }\n}": types.ComponentBlockDetailedLogosFragmentDoc,
    "fragment ComponentBlockDoublePushCta on ComponentBlockDoublePushCta {\n  id\n  requiredTitle: title\n  text\n  firstCta {\n    ...ComponentCommonLink\n  }\n  secondCta {\n    ...ComponentCommonNotRequiredLink\n  }\n  requiredImage: image {\n    ...UploadFile\n  }\n  icon\n}": types.ComponentBlockDoublePushCtaFragmentDoc,
    "fragment ComponentBlockExperienceVideoCarousel on ComponentBlockExperienceVideoCarousel {\n  id\n  title\n  isLandscape\n  carouselItems {\n    ...ComponentCommonExperienceVideoCarouselItem\n  }\n}": types.ComponentBlockExperienceVideoCarouselFragmentDoc,
    "fragment ComponentBlockFaq on ComponentBlockFaq {\n  id\n  requiredTitle: title\n  limit\n  categories\n  filteringProperty\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}": types.ComponentBlockFaqFragmentDoc,
    "fragment ComponentBlockHeader on ComponentBlockHeader {\n  id\n  requiredTitle: title\n  text\n  aboveTitle\n  requiredImage: image {\n    ...UploadFile\n  }\n  requiredIcon: icon\n  icon2\n  cta {\n    ...ComponentCommonLink\n  }\n}": types.ComponentBlockHeaderFragmentDoc,
    "fragment ComponentBlockHeaderWithQRcode on ComponentBlockHeaderWithQRcode {\n  id\n  requiredTitle: title\n  text\n  requiredImage: image {\n    ...UploadFile\n  }\n  icon\n  QRCode {\n    ...ComponentCommonLink\n  }\n}": types.ComponentBlockHeaderWithQRcodeFragmentDoc,
    "fragment ComponentBlockImage on ComponentBlockImage {\n  id\n  requiredImage: image {\n    ...UploadFile\n  }\n  description\n  requiredAlt: alt\n}": types.ComponentBlockImageFragmentDoc,
    "fragment ComponentBlockImageGallery on ComponentBlockImageGallery {\n  id\n  images {\n    ...UploadFile\n  }\n  images_connection {\n    ...UploadFileRelationResponseCollection\n  }\n}": types.ComponentBlockImageGalleryFragmentDoc,
    "fragment ComponentBlockImageText on ComponentBlockImageText {\n  id\n  title\n  requiredImage: image {\n    ...UploadFile\n  }\n  isImageRight\n  icon\n  jsonText: text\n}": types.ComponentBlockImageTextFragmentDoc,
    "fragment ComponentBlockKeyNumberCarousel on ComponentBlockKeyNumberCarousel {\n  id\n  title\n  keyNumberItems: items {\n    ...ComponentCommonKeyNumberItems\n  }\n}": types.ComponentBlockKeyNumberCarouselFragmentDoc,
    "fragment ComponentBlockLatestNews on ComponentBlockLatestNews {\n  id\n  requiredTitle: title\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}": types.ComponentBlockLatestNewsFragmentDoc,
    "fragment ComponentBlockLittleList on ComponentBlockLittleList {\n  id\n  title\n  description\n  content {\n    ...ComponentCommonLittleListComponent\n  }\n}": types.ComponentBlockLittleListFragmentDoc,
    "fragment ComponentBlockLogos on ComponentBlockLogos {\n  id\n  logo {\n    ...ComponentCommonLogo\n  }\n}": types.ComponentBlockLogosFragmentDoc,
    "fragment ComponentBlockOfferList on ComponentBlockOfferList {\n  title\n  description\n  offreTag\n  firstCartTitle\n  firstIcon\n  secondCartTitle\n  secondIcon\n  descritptionCard\n  cta {\n    ...ComponentCommonLink\n  }\n  ctaCard {\n    ...ComponentCommonLink\n  }\n}": types.ComponentBlockOfferListFragmentDoc,
    "fragment ComponentBlockOffersCarousel on ComponentBlockOffersCarousel {\n  id\n  requiredTitle: title\n  jsonDescription: description\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n  offersCarouselItems: items {\n    ...ComponentCommonOffersCarouselItem\n  }\n}": types.ComponentBlockOffersCarouselFragmentDoc,
    "fragment ComponentBlockOrganizationChart on ComponentBlockOrganizationChart {\n  id\n  title\n  requiredDescription: description\n  people {\n    ...ComponentCommonPerson\n  }\n}": types.ComponentBlockOrganizationChartFragmentDoc,
    "fragment ComponentBlockPiledCards on ComponentBlockPiledCards {\n  id\n  accessibleTitle\n  piledCardsItems: items {\n    ...ComponentCommonPiledCardItem\n  }\n}": types.ComponentBlockPiledCardsFragmentDoc,
    "fragment ComponentBlockPushCta on ComponentBlockPushCta {\n  title\n  description\n  image {\n    ...UploadFile\n  }\n  ctaLink {\n    ...ComponentCommonLink\n  }\n  qrCodeDescription\n  qrCodeUrl\n}": types.ComponentBlockPushCtaFragmentDoc,
    "fragment ComponentBlockSeparator on ComponentBlockSeparator {\n  id\n  isActive\n}": types.ComponentBlockSeparatorFragmentDoc,
    "fragment ComponentBlockSimplePushCta on ComponentBlockSimplePushCta {\n  id\n  requiredTitle: title\n  surtitle\n  icon\n  requiredImage: image {\n    ...UploadFile\n  }\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}": types.ComponentBlockSimplePushCtaFragmentDoc,
    "fragment ComponentBlockSimpleTextV2 on ComponentBlockSimpleTextV2 {\n  id\n  title\n  jsonText: text\n  columns {\n    ...ComponentCommonSimpleTextColumn\n  }\n}": types.ComponentBlockSimpleTextV2FragmentDoc,
    "fragment ComponentBlockSocialMedia on ComponentBlockSocialMedia {\n  id\n  requiredTitle: title\n  socialMediaLink {\n    name\n    url\n  }\n}": types.ComponentBlockSocialMediaFragmentDoc,
    "fragment ComponentBlockSpace on ComponentBlockSpace {\n  id\n  space\n}": types.ComponentBlockSpaceFragmentDoc,
    "fragment ComponentBlockTabImageText on ComponentBlockTabImageText {\n  id\n  title\n  block {\n    ...ComponentBlockImageText\n  }\n}": types.ComponentBlockTabImageTextFragmentDoc,
    "fragment ComponentBlockTabLittleList on ComponentBlockTabLittleList {\n  id\n  title\n  block {\n    ...ComponentBlockLittleList\n  }\n}": types.ComponentBlockTabLittleListFragmentDoc,
    "fragment ComponentBlockTabPushGreyCta on ComponentBlockTabPushGreyCta {\n  id\n  title\n  block {\n    ...ComponentBlockDoublePushCta\n  }\n}": types.ComponentBlockTabPushGreyCtaFragmentDoc,
    "fragment ComponentBlockTabSimpleText on ComponentBlockTabSimpleText {\n  id\n  title\n  block {\n    ...ComponentBlockSimpleTextV2\n  }\n}": types.ComponentBlockTabSimpleTextFragmentDoc,
    "fragment ComponentBlockTabsImageText on ComponentBlockTabsImageText {\n  id\n  tab {\n    ...ComponentBlockTabImageText\n  }\n}": types.ComponentBlockTabsImageTextFragmentDoc,
    "fragment ComponentBlockTabsLittleList on ComponentBlockTabsLittleList {\n  id\n  tab {\n    ...ComponentBlockTabLittleList\n  }\n}": types.ComponentBlockTabsLittleListFragmentDoc,
    "fragment ComponentBlockTabsPushGreyCta on ComponentBlockTabsPushGreyCta {\n  id\n  tab {\n    ...ComponentBlockTabPushGreyCta\n  }\n}": types.ComponentBlockTabsPushGreyCtaFragmentDoc,
    "fragment ComponentBlockTabsSimpleText on ComponentBlockTabsSimpleText {\n  id\n  tab {\n    ...ComponentBlockTabSimpleText\n  }\n}": types.ComponentBlockTabsSimpleTextFragmentDoc,
    "fragment ComponentBlockVerticalCarousel on ComponentBlockVerticalCarousel {\n  id\n  requiredTitle: title\n  verticalCarouselItems: items {\n    ...ComponentCommonVerticalCarouselItem\n  }\n}": types.ComponentBlockVerticalCarouselFragmentDoc,
    "fragment ComponentBlockVideo on ComponentBlockVideo {\n  id\n  url\n  description\n  alt\n  image {\n    ...UploadFile\n  }\n}": types.ComponentBlockVideoFragmentDoc,
    "fragment ComponentCommonDetailedLogo on ComponentCommonDetailedLogo {\n  title\n  description\n  cta {\n    ...ComponentCommonLink\n  }\n  image {\n    ...UploadFile\n  }\n}": types.ComponentCommonDetailedLogoFragmentDoc,
    "fragment ComponentCommonExperienceVideoCarouselItem on ComponentCommonExperienceVideoCarouselItem {\n  title\n  description\n  url\n  image {\n    ...UploadFile\n  }\n}": types.ComponentCommonExperienceVideoCarouselItemFragmentDoc,
    "fragment ComponentCommonFiltre on ComponentCommonFiltre {\n  filtre\n}": types.ComponentCommonFiltreFragmentDoc,
    "fragment ComponentCommonKeyNumberItems on ComponentCommonKeyNumberItems {\n  id\n  title\n  description\n  firstEmoji\n  secondEmoji\n  thirdEmoji\n}": types.ComponentCommonKeyNumberItemsFragmentDoc,
    "fragment ComponentCommonLink on ComponentCommonLink {\n  id\n  Label\n  URL\n  eventName\n  eventOrigin\n}": types.ComponentCommonLinkFragmentDoc,
    "fragment ComponentCommonLittleListComponent on ComponentCommonLittleListComponent {\n  id\n  text\n  description\n  firstEmoji\n  secondEmoji\n}": types.ComponentCommonLittleListComponentFragmentDoc,
    "fragment ComponentCommonLogo on ComponentCommonLogo {\n  logo {\n    ...UploadFile\n  }\n}": types.ComponentCommonLogoFragmentDoc,
    "fragment ComponentCommonNotRequiredLink on ComponentCommonNotRequiredLink {\n  Label\n  URL\n  eventName\n  eventOrigin\n}": types.ComponentCommonNotRequiredLinkFragmentDoc,
    "fragment ComponentCommonOffersCarouselItem on ComponentCommonOffersCarouselItem {\n  title\n  surtitle\n  text\n  theme\n  firstIcon\n  secondIcon\n}": types.ComponentCommonOffersCarouselItemFragmentDoc,
    "fragment ComponentCommonPerson on ComponentCommonPerson {\n  name\n  position\n  image {\n    ...UploadFile\n  }\n}": types.ComponentCommonPersonFragmentDoc,
    "fragment ComponentCommonPiledCardItem on ComponentCommonPiledCardItem {\n  id\n  title\n  description\n  image {\n    ...UploadFile\n  }\n  firstIcon\n  secondIcon\n  theme\n}": types.ComponentCommonPiledCardItemFragmentDoc,
    "fragment ComponentCommonSimpleTextColumn on ComponentCommonSimpleTextColumn {\n  id\n  title\n  text\n}": types.ComponentCommonSimpleTextColumnFragmentDoc,
    "fragment ComponentCommonVerticalCarouselItem on ComponentCommonVerticalCarouselItem {\n  id\n  title\n  description\n  url\n  image {\n    ...UploadFile\n  }\n}": types.ComponentCommonVerticalCarouselItemFragmentDoc,
    "fragment ComponentFooterList on ComponentFooterList {\n  id\n  Title\n  Links {\n    ...ComponentCommonLink\n  }\n}": types.ComponentFooterListFragmentDoc,
    "fragment ComponentHeaderAccountDropdown on ComponentHeaderAccountDropdown {\n  id\n  buttonLabel\n  items {\n    ...ComponentHeaderAccountItem\n  }\n}": types.ComponentHeaderAccountDropdownFragmentDoc,
    "fragment ComponentHeaderAccountItem on ComponentHeaderAccountItem {\n  id\n  label\n  color\n  emoji\n  url\n  eventName\n  eventOrigin\n}": types.ComponentHeaderAccountItemFragmentDoc,
    "fragment ComponentHeaderMegaMenu on ComponentHeaderMegaMenu {\n  id\n  title\n  primaryListItems {\n    ...ComponentCommonLink\n  }\n  secondaryListItems {\n    ...ComponentCommonLink\n  }\n  cta {\n    ...ComponentCommonLink\n  }\n  cardTitle\n  cardDescription\n  cardLink {\n    ...ComponentCommonLink\n  }\n  bannerText\n  cardFirstEmoji\n  cardSecondEmoji\n  bannerAndroidUrl\n  bannerIosUrl\n  bannerDefaultUrl\n  theme\n}": types.ComponentHeaderMegaMenuFragmentDoc,
    "fragment ComponentHeaderNavigationItems on ComponentHeaderNavigationItems {\n  id\n  label\n  megaMenu {\n    ...ComponentHeaderMegaMenu\n  }\n}": types.ComponentHeaderNavigationItemsFragmentDoc,
    "fragment ComponentHomeEligibilityItems on ComponentHomeEligibilityItems {\n  title\n  description\n  emoji\n}": types.ComponentHomeEligibilityItemsFragmentDoc,
    "fragment ComponentHomeEligibilitySection on ComponentHomeEligibilitySection {\n  title\n  cardTitle\n  cardDescription\n  cardCta {\n    ...ComponentCommonLink\n  }\n  firstEmoji\n  secondEmoji\n  items {\n    ...ComponentHomeEligibilityItems\n  }\n}": types.ComponentHomeEligibilitySectionFragmentDoc,
    "fragment ComponentHomeHeroSection on ComponentHomeHeroSection {\n  title\n  subTitle\n  cta {\n    ...ComponentCommonLink\n  }\n  firstEmoji\n  secondEmoji\n  thirdEmoji\n  fourthEmoji\n  fifthEmoji\n  sixthEmoji\n  images_connection {\n    ...UploadFileRelationResponseCollection\n  }\n  images {\n    ...UploadFile\n  }\n}": types.ComponentHomeHeroSectionFragmentDoc,
    "fragment ComponentHomeRecommendationsSection on ComponentHomeRecommendationsSection {\n  recommendations {\n    ...ComponentBlockVerticalCarousel\n  }\n  recommendationsBackendTag\n  cta {\n    ...ComponentCommonLink\n  }\n}": types.ComponentHomeRecommendationsSectionFragmentDoc,
    "fragment ComponentSharedMetaSocial on ComponentSharedMetaSocial {\n  socialNetwork\n  title\n  description\n  image {\n    ...UploadFile\n  }\n}": types.ComponentSharedMetaSocialFragmentDoc,
    "fragment ComponentSharedSeo on ComponentSharedSeo {\n  id\n  keywords\n  metaDescription\n  metaImage {\n    ...UploadFile\n  }\n  metaRobots\n  metaSocial {\n    ...ComponentSharedMetaSocial\n  }\n  metaTitle\n  metaViewport\n  structuredData\n  canonicalURL\n}": types.ComponentSharedSeoFragmentDoc,
    "fragment ComponentSimulatorAgeQuestion on ComponentSimulatorAgeQuestion {\n  title\n  answers {\n    ...ComponentSimulatorAnswer\n  }\n}": types.ComponentSimulatorAgeQuestionFragmentDoc,
    "fragment ComponentSimulatorAmountScreen on ComponentSimulatorAmountScreen {\n  id\n  title\n  text\n}": types.ComponentSimulatorAmountScreenFragmentDoc,
    "fragment ComponentSimulatorAnswer on ComponentSimulatorAnswer {\n  id\n  answer\n  emoji\n}": types.ComponentSimulatorAnswerFragmentDoc,
    "fragment ComponentSimulatorFailureScreen on ComponentSimulatorFailureScreen {\n  id\n  title\n  text\n  cta {\n    ...ComponentCommonLink\n  }\n}": types.ComponentSimulatorFailureScreenFragmentDoc,
    "fragment ComponentSimulatorRadioQuestion on ComponentSimulatorRadioQuestion {\n  id\n  title\n  answers {\n    ...ComponentSimulatorAnswer\n  }\n}": types.ComponentSimulatorRadioQuestionFragmentDoc,
    "fragment ComponentSimulatorStep on ComponentSimulatorStep {\n  id\n  step\n}": types.ComponentSimulatorStepFragmentDoc,
    "fragment ComponentSimulatorSuccessScreen on ComponentSimulatorSuccessScreen {\n  id\n  title\n  steps {\n    ...ComponentSimulatorStep\n  }\n  cta {\n    ...ComponentCommonLink\n  }\n  needSupport\n  supportLink {\n    ...ComponentCommonLink\n  }\n}": types.ComponentSimulatorSuccessScreenFragmentDoc,
    "fragment Event on Event {\n  title\n  date\n  startTime\n  endTime\n  cta {\n    ...ComponentCommonLink\n  }\n  image {\n    ...UploadFile\n  }\n  category\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockImage\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockVideo\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockSocialMedia\n  }\n  city\n  slug\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n  endDate\n}": types.EventFragmentDoc,
    "fragment Footer on Footer {\n  PlayStoreUrl\n  AppStoreUrl\n  Lists {\n    ...ComponentFooterList\n  }\n  bannerText\n  LegalLinks {\n    ...ComponentCommonLink\n  }\n  bannerDefaultUrl\n}": types.FooterFragmentDoc,
    "fragment Header on Header {\n  targetItems {\n    ...ComponentHeaderNavigationItems\n  }\n  aboutItems {\n    ...ComponentHeaderNavigationItems\n  }\n  login {\n    ...ComponentHeaderAccountDropdown\n  }\n  signup {\n    ...ComponentHeaderAccountDropdown\n  }\n}": types.HeaderFragmentDoc,
    "fragment News on News {\n  title\n  category\n  date\n  image {\n    ...UploadFile\n  }\n  slug\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockImage\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockVideo\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockSocialMedia\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n  aboveTitle\n  emoji\n}": types.NewsFragmentDoc,
    "fragment Presse on Presse {\n  title\n  buttonText\n  filtres {\n    ...ComponentCommonFiltre\n  }\n  socialMediaSection {\n    ...ComponentBlockSocialMedia\n  }\n  separator {\n    ...ComponentBlockSeparator\n  }\n  texteImage {\n    ...ComponentBlockImageText\n  }\n  pushCta {\n    ...ComponentBlockDoublePushCta\n  }\n  aide {\n    ...ComponentBlockSimplePushCta\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  titleEventSection\n  showFilter\n}": types.PresseFragmentDoc,
    "fragment Resource on Resource {\n  title\n  category\n  date\n  image {\n    ...UploadFile\n  }\n  slug\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockCenteredText\n    ...ComponentBlockHeader\n    ...ComponentBlockSocialMedia\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockImageText\n    ...ComponentBlockImage\n    ...ComponentBlockLittleList\n    ...ComponentBlockSeparator\n    ...ComponentBlockSimplePushCta\n    ...ComponentBlockSpace\n    ...ComponentBlockVerticalCarousel\n    ...ComponentBlockVideo\n    ...ComponentBlockKeyNumberCarousel\n    ...ComponentBlockLogos\n    ...ComponentBlockLatestNews\n    ...ComponentBlockExperienceVideoCarousel\n    ...ComponentBlockOffersCarousel\n    ...ComponentBlockPiledCards\n    ...ComponentBlockFaq\n    ...ComponentBlockDetailedLogos\n    ...ComponentBlockOrganizationChart\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockImageGallery\n    ...ComponentBlockBreadcrumb\n  }\n  partnership\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n}": types.ResourceFragmentDoc,
    "fragment Ressourcepass on Ressourcepass {\n  title\n  date\n  category\n  cta {\n    ...ComponentCommonLink\n  }\n}": types.RessourcepassFragmentDoc,
    "fragment RessourcesPassCulture on RessourcesPassCulture {\n  title\n  buttonText\n  filtres {\n    ...ComponentCommonFiltre\n  }\n  socialMediaSection {\n    ...ComponentBlockSocialMedia\n  }\n  separator {\n    ...ComponentBlockSeparator\n  }\n  etudes {\n    ...ComponentBlockSimplePushCta\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  showFilter\n}": types.RessourcesPassCultureFragmentDoc,
    "fragment Simulator on Simulator {\n  title\n  description\n  ageQuestion {\n    ...ComponentSimulatorAgeQuestion\n  }\n  nationnalityQuestion {\n    ...ComponentSimulatorRadioQuestion\n  }\n  residencyQuestion {\n    ...ComponentSimulatorRadioQuestion\n  }\n  steps {\n    ...ComponentSimulatorStep\n  }\n  successScreen {\n    ...ComponentSimulatorSuccessScreen\n  }\n  failureScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  tooYoungScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  tooOldScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  amountScreen_15 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_16 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_17 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_18 {\n    ...ComponentSimulatorAmountScreen\n  }\n  topEmoji\n  bottomEmoji\n  socialMedias {\n    ...ComponentBlockSocialMedia\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  offres {\n    ...ComponentBlockSimplePushCta\n  }\n}": types.SimulatorFragmentDoc,
    "fragment UploadFile on UploadFile {\n  name\n  alternativeText\n  caption\n  width\n  height\n  formats\n  hash\n  ext\n  mime\n  size\n  url\n  previewUrl\n  provider\n  provider_metadata\n  createdAt\n  updatedAt\n  publishedAt\n}": types.UploadFileFragmentDoc,
    "fragment UploadFileRelationResponseCollection on UploadFileRelationResponseCollection {\n  nodes {\n    ...UploadFile\n  }\n}": types.UploadFileRelationResponseCollectionFragmentDoc,
    "query Actualites($filters: NewsFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  newsList(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...News\n  }\n}": types.ActualitesDocument,
    "query ActualitesJeunesParents($sort: [String], $filters: NewsFiltersInput) {\n  listeJeune {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(sort: $sort, filters: $filters) {\n    ...News\n  }\n}": types.ActualitesJeunesParentsDocument,
    "query ActualitesPassCulture($filters: NewsFiltersInput, $sort: [String]) {\n  actualitesPassCulture {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(filters: $filters, sort: $sort) {\n    ...News\n  }\n}": types.ActualitesPassCultureDocument,
    "query ActualitesRDVActeursCulturels($sortNews: [String], $filtersNews: NewsFiltersInput, $sortEvents: [String], $filtersEvents: EventFiltersInput) {\n  actualitesRdvActeursCulturel {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    titleEventSection\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(sort: $sortNews, filters: $filtersNews) {\n    ...News\n  }\n  events(sort: $sortEvents, filters: $filtersEvents) {\n    ...Event\n  }\n}": types.ActualitesRdvActeursCulturelsDocument,
    "query AideActeursCulturels {\n  helpCulturalActors {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}": types.AideActeursCulturelsDocument,
    "query AideEnseignants($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  helpTeachers {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    latestStudies {\n      ...ComponentBlockLatestNews\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}": types.AideEnseignantsDocument,
    "query AideJeunesParents {\n  help {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}": types.AideJeunesParentsDocument,
    "query App {\n  header {\n    ...Header\n  }\n  footer {\n    ...Footer\n  }\n}": types.AppDocument,
    "query EtudesPassCulture($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  etudesPassCulture {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    observatoire {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}": types.EtudesPassCultureDocument,
    "query Evenements($filters: EventFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  events(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Event\n  }\n}": types.EvenementsDocument,
    "query Home($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  home {\n    aboutSection {\n      ...ComponentBlockCenteredText\n    }\n    CTASection {\n      ...ComponentBlockPushCta\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    latestStudies {\n      ...ComponentBlockLatestNews\n    }\n    eligibilitySection {\n      ...ComponentHomeEligibilitySection\n    }\n    heroSection {\n      ...ComponentHomeHeroSection\n    }\n    recommendationsSection {\n      ...ComponentHomeRecommendationsSection\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}": types.HomeDocument,
    "query ListeOffres {\n  listeOffre {\n    experience {\n      ...ComponentBlockExperienceVideoCarousel\n    }\n    hero {\n      ...ComponentBlockHeader\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    offres {\n      ...ComponentBlockOfferList\n    }\n    offres_culturelles {\n      ...ComponentBlockOffersCarousel\n    }\n    question {\n      ...ComponentBlockSimplePushCta\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n  }\n}": types.ListeOffresDocument,
    "query NotFound {\n  notFound {\n    header {\n      ...ComponentBlockHeader\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}": types.NotFoundDocument,
    "query Page($filters: PageFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  pages(filters: $filters, pagination: $pagination, sort: $sort) {\n    Path\n    Blocks {\n      __typename\n      ...ComponentBlockCenteredText\n      ...ComponentBlockHeader\n      ...ComponentBlockSocialMedia\n      ...ComponentBlockDoublePushCta\n      ...ComponentBlockImageText\n      ...ComponentBlockImage\n      ...ComponentBlockLittleList\n      ...ComponentBlockSeparator\n      ...ComponentBlockSimplePushCta\n      ...ComponentBlockSpace\n      ...ComponentBlockVerticalCarousel\n      ...ComponentBlockVideo\n      ...ComponentBlockKeyNumberCarousel\n      ...ComponentBlockLogos\n      ...ComponentBlockLatestNews\n      ...ComponentBlockExperienceVideoCarousel\n      ...ComponentBlockOffersCarousel\n      ...ComponentBlockPiledCards\n      ...ComponentBlockFaq\n      ...ComponentBlockDetailedLogos\n      ...ComponentBlockOrganizationChart\n      ...ComponentBlockSimpleTextV2\n      ...ComponentBlockImageGallery\n      ...ComponentBlockBreadcrumb\n      ...ComponentBlockHeaderWithQRcode\n      ...ComponentBlockColumnsText\n      ...ComponentBlockCenteredTitle\n      ...ComponentBlockTabsSimpleText\n      ...ComponentBlockTabsPushGreyCta\n      ...ComponentBlockTabsLittleList\n      ...ComponentBlockTabsImageText\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}": types.PageDocument,
    "query PlanDuSite($filters: PageFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  pages(filters: $filters, pagination: $pagination, sort: $sort) {\n    Path\n    Blocks {\n      __typename\n      ...ComponentBlockCenteredText\n      ...ComponentBlockHeader\n      ...ComponentBlockSocialMedia\n      ...ComponentBlockDoublePushCta\n      ...ComponentBlockImageText\n      ...ComponentBlockImage\n      ...ComponentBlockLittleList\n      ...ComponentBlockSeparator\n      ...ComponentBlockSimplePushCta\n      ...ComponentBlockSpace\n      ...ComponentBlockVerticalCarousel\n      ...ComponentBlockVideo\n      ...ComponentBlockKeyNumberCarousel\n      ...ComponentBlockLogos\n      ...ComponentBlockLatestNews\n      ...ComponentBlockExperienceVideoCarousel\n      ...ComponentBlockOffersCarousel\n      ...ComponentBlockPiledCards\n      ...ComponentBlockFaq\n      ...ComponentBlockDetailedLogos\n      ...ComponentBlockOrganizationChart\n      ...ComponentBlockSimpleTextV2\n      ...ComponentBlockImageGallery\n      ...ComponentBlockBreadcrumb\n      ...ComponentBlockHeaderWithQRcode\n      ...ComponentBlockColumnsText\n      ...ComponentBlockCenteredTitle\n      ...ComponentBlockTabsSimpleText\n      ...ComponentBlockTabsPushGreyCta\n      ...ComponentBlockTabsLittleList\n      ...ComponentBlockTabsImageText\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}": types.PlanDuSiteDocument,
    "query Presse($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String], $sortEvents: [String], $filtersEvents: EventFiltersInput) {\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n  events(sort: $sortEvents, filters: $filtersEvents) {\n    ...Event\n  }\n  presse {\n    ...Presse\n  }\n}": types.PresseDocument,
    "query Ressources($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}": types.RessourcesDocument,
    "query RessourcesPass($filters: RessourcepassFiltersInput, $sort: [String], $pagination: PaginationArg) {\n  ressourcespass(filters: $filters, sort: $sort, pagination: $pagination) {\n    ...Ressourcepass\n  }\n  ressourcesPassCulture {\n    ...RessourcesPassCulture\n  }\n}": types.RessourcesPassDocument,
    "query Simulateur {\n  simulator {\n    ...Simulator\n  }\n}": types.SimulateurDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockBreadcrumb on ComponentBlockBreadcrumb {\n  id\n}"): (typeof documents)["fragment ComponentBlockBreadcrumb on ComponentBlockBreadcrumb {\n  id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockCenteredText on ComponentBlockCenteredText {\n  id\n  title\n  requiredDescription: description\n}"): (typeof documents)["fragment ComponentBlockCenteredText on ComponentBlockCenteredText {\n  id\n  title\n  requiredDescription: description\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockCenteredTitle on ComponentBlockCenteredTitle {\n  id\n  requiredTitle: title\n}"): (typeof documents)["fragment ComponentBlockCenteredTitle on ComponentBlockCenteredTitle {\n  id\n  requiredTitle: title\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockColumnsText on ComponentBlockColumnsText {\n  id\n  requiredTitle: title\n  video {\n    ...ComponentBlockVideo\n  }\n  columns {\n    ...ComponentCommonSimpleTextColumn\n  }\n}"): (typeof documents)["fragment ComponentBlockColumnsText on ComponentBlockColumnsText {\n  id\n  requiredTitle: title\n  video {\n    ...ComponentBlockVideo\n  }\n  columns {\n    ...ComponentCommonSimpleTextColumn\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockDetailedLogos on ComponentBlockDetailedLogos {\n  id\n  title\n  logos {\n    ...ComponentCommonDetailedLogo\n  }\n}"): (typeof documents)["fragment ComponentBlockDetailedLogos on ComponentBlockDetailedLogos {\n  id\n  title\n  logos {\n    ...ComponentCommonDetailedLogo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockDoublePushCta on ComponentBlockDoublePushCta {\n  id\n  requiredTitle: title\n  text\n  firstCta {\n    ...ComponentCommonLink\n  }\n  secondCta {\n    ...ComponentCommonNotRequiredLink\n  }\n  requiredImage: image {\n    ...UploadFile\n  }\n  icon\n}"): (typeof documents)["fragment ComponentBlockDoublePushCta on ComponentBlockDoublePushCta {\n  id\n  requiredTitle: title\n  text\n  firstCta {\n    ...ComponentCommonLink\n  }\n  secondCta {\n    ...ComponentCommonNotRequiredLink\n  }\n  requiredImage: image {\n    ...UploadFile\n  }\n  icon\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockExperienceVideoCarousel on ComponentBlockExperienceVideoCarousel {\n  id\n  title\n  isLandscape\n  carouselItems {\n    ...ComponentCommonExperienceVideoCarouselItem\n  }\n}"): (typeof documents)["fragment ComponentBlockExperienceVideoCarousel on ComponentBlockExperienceVideoCarousel {\n  id\n  title\n  isLandscape\n  carouselItems {\n    ...ComponentCommonExperienceVideoCarouselItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockFaq on ComponentBlockFaq {\n  id\n  requiredTitle: title\n  limit\n  categories\n  filteringProperty\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentBlockFaq on ComponentBlockFaq {\n  id\n  requiredTitle: title\n  limit\n  categories\n  filteringProperty\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockHeader on ComponentBlockHeader {\n  id\n  requiredTitle: title\n  text\n  aboveTitle\n  requiredImage: image {\n    ...UploadFile\n  }\n  requiredIcon: icon\n  icon2\n  cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentBlockHeader on ComponentBlockHeader {\n  id\n  requiredTitle: title\n  text\n  aboveTitle\n  requiredImage: image {\n    ...UploadFile\n  }\n  requiredIcon: icon\n  icon2\n  cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockHeaderWithQRcode on ComponentBlockHeaderWithQRcode {\n  id\n  requiredTitle: title\n  text\n  requiredImage: image {\n    ...UploadFile\n  }\n  icon\n  QRCode {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentBlockHeaderWithQRcode on ComponentBlockHeaderWithQRcode {\n  id\n  requiredTitle: title\n  text\n  requiredImage: image {\n    ...UploadFile\n  }\n  icon\n  QRCode {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockImage on ComponentBlockImage {\n  id\n  requiredImage: image {\n    ...UploadFile\n  }\n  description\n  requiredAlt: alt\n}"): (typeof documents)["fragment ComponentBlockImage on ComponentBlockImage {\n  id\n  requiredImage: image {\n    ...UploadFile\n  }\n  description\n  requiredAlt: alt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockImageGallery on ComponentBlockImageGallery {\n  id\n  images {\n    ...UploadFile\n  }\n  images_connection {\n    ...UploadFileRelationResponseCollection\n  }\n}"): (typeof documents)["fragment ComponentBlockImageGallery on ComponentBlockImageGallery {\n  id\n  images {\n    ...UploadFile\n  }\n  images_connection {\n    ...UploadFileRelationResponseCollection\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockImageText on ComponentBlockImageText {\n  id\n  title\n  requiredImage: image {\n    ...UploadFile\n  }\n  isImageRight\n  icon\n  jsonText: text\n}"): (typeof documents)["fragment ComponentBlockImageText on ComponentBlockImageText {\n  id\n  title\n  requiredImage: image {\n    ...UploadFile\n  }\n  isImageRight\n  icon\n  jsonText: text\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockKeyNumberCarousel on ComponentBlockKeyNumberCarousel {\n  id\n  title\n  keyNumberItems: items {\n    ...ComponentCommonKeyNumberItems\n  }\n}"): (typeof documents)["fragment ComponentBlockKeyNumberCarousel on ComponentBlockKeyNumberCarousel {\n  id\n  title\n  keyNumberItems: items {\n    ...ComponentCommonKeyNumberItems\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockLatestNews on ComponentBlockLatestNews {\n  id\n  requiredTitle: title\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentBlockLatestNews on ComponentBlockLatestNews {\n  id\n  requiredTitle: title\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockLittleList on ComponentBlockLittleList {\n  id\n  title\n  description\n  content {\n    ...ComponentCommonLittleListComponent\n  }\n}"): (typeof documents)["fragment ComponentBlockLittleList on ComponentBlockLittleList {\n  id\n  title\n  description\n  content {\n    ...ComponentCommonLittleListComponent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockLogos on ComponentBlockLogos {\n  id\n  logo {\n    ...ComponentCommonLogo\n  }\n}"): (typeof documents)["fragment ComponentBlockLogos on ComponentBlockLogos {\n  id\n  logo {\n    ...ComponentCommonLogo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockOfferList on ComponentBlockOfferList {\n  title\n  description\n  offreTag\n  firstCartTitle\n  firstIcon\n  secondCartTitle\n  secondIcon\n  descritptionCard\n  cta {\n    ...ComponentCommonLink\n  }\n  ctaCard {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentBlockOfferList on ComponentBlockOfferList {\n  title\n  description\n  offreTag\n  firstCartTitle\n  firstIcon\n  secondCartTitle\n  secondIcon\n  descritptionCard\n  cta {\n    ...ComponentCommonLink\n  }\n  ctaCard {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockOffersCarousel on ComponentBlockOffersCarousel {\n  id\n  requiredTitle: title\n  jsonDescription: description\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n  offersCarouselItems: items {\n    ...ComponentCommonOffersCarouselItem\n  }\n}"): (typeof documents)["fragment ComponentBlockOffersCarousel on ComponentBlockOffersCarousel {\n  id\n  requiredTitle: title\n  jsonDescription: description\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n  offersCarouselItems: items {\n    ...ComponentCommonOffersCarouselItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockOrganizationChart on ComponentBlockOrganizationChart {\n  id\n  title\n  requiredDescription: description\n  people {\n    ...ComponentCommonPerson\n  }\n}"): (typeof documents)["fragment ComponentBlockOrganizationChart on ComponentBlockOrganizationChart {\n  id\n  title\n  requiredDescription: description\n  people {\n    ...ComponentCommonPerson\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockPiledCards on ComponentBlockPiledCards {\n  id\n  accessibleTitle\n  piledCardsItems: items {\n    ...ComponentCommonPiledCardItem\n  }\n}"): (typeof documents)["fragment ComponentBlockPiledCards on ComponentBlockPiledCards {\n  id\n  accessibleTitle\n  piledCardsItems: items {\n    ...ComponentCommonPiledCardItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockPushCta on ComponentBlockPushCta {\n  title\n  description\n  image {\n    ...UploadFile\n  }\n  ctaLink {\n    ...ComponentCommonLink\n  }\n  qrCodeDescription\n  qrCodeUrl\n}"): (typeof documents)["fragment ComponentBlockPushCta on ComponentBlockPushCta {\n  title\n  description\n  image {\n    ...UploadFile\n  }\n  ctaLink {\n    ...ComponentCommonLink\n  }\n  qrCodeDescription\n  qrCodeUrl\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockSeparator on ComponentBlockSeparator {\n  id\n  isActive\n}"): (typeof documents)["fragment ComponentBlockSeparator on ComponentBlockSeparator {\n  id\n  isActive\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockSimplePushCta on ComponentBlockSimplePushCta {\n  id\n  requiredTitle: title\n  surtitle\n  icon\n  requiredImage: image {\n    ...UploadFile\n  }\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentBlockSimplePushCta on ComponentBlockSimplePushCta {\n  id\n  requiredTitle: title\n  surtitle\n  icon\n  requiredImage: image {\n    ...UploadFile\n  }\n  requiredCta: cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockSimpleTextV2 on ComponentBlockSimpleTextV2 {\n  id\n  title\n  jsonText: text\n  columns {\n    ...ComponentCommonSimpleTextColumn\n  }\n}"): (typeof documents)["fragment ComponentBlockSimpleTextV2 on ComponentBlockSimpleTextV2 {\n  id\n  title\n  jsonText: text\n  columns {\n    ...ComponentCommonSimpleTextColumn\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockSocialMedia on ComponentBlockSocialMedia {\n  id\n  requiredTitle: title\n  socialMediaLink {\n    name\n    url\n  }\n}"): (typeof documents)["fragment ComponentBlockSocialMedia on ComponentBlockSocialMedia {\n  id\n  requiredTitle: title\n  socialMediaLink {\n    name\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockSpace on ComponentBlockSpace {\n  id\n  space\n}"): (typeof documents)["fragment ComponentBlockSpace on ComponentBlockSpace {\n  id\n  space\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabImageText on ComponentBlockTabImageText {\n  id\n  title\n  block {\n    ...ComponentBlockImageText\n  }\n}"): (typeof documents)["fragment ComponentBlockTabImageText on ComponentBlockTabImageText {\n  id\n  title\n  block {\n    ...ComponentBlockImageText\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabLittleList on ComponentBlockTabLittleList {\n  id\n  title\n  block {\n    ...ComponentBlockLittleList\n  }\n}"): (typeof documents)["fragment ComponentBlockTabLittleList on ComponentBlockTabLittleList {\n  id\n  title\n  block {\n    ...ComponentBlockLittleList\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabPushGreyCta on ComponentBlockTabPushGreyCta {\n  id\n  title\n  block {\n    ...ComponentBlockDoublePushCta\n  }\n}"): (typeof documents)["fragment ComponentBlockTabPushGreyCta on ComponentBlockTabPushGreyCta {\n  id\n  title\n  block {\n    ...ComponentBlockDoublePushCta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabSimpleText on ComponentBlockTabSimpleText {\n  id\n  title\n  block {\n    ...ComponentBlockSimpleTextV2\n  }\n}"): (typeof documents)["fragment ComponentBlockTabSimpleText on ComponentBlockTabSimpleText {\n  id\n  title\n  block {\n    ...ComponentBlockSimpleTextV2\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabsImageText on ComponentBlockTabsImageText {\n  id\n  tab {\n    ...ComponentBlockTabImageText\n  }\n}"): (typeof documents)["fragment ComponentBlockTabsImageText on ComponentBlockTabsImageText {\n  id\n  tab {\n    ...ComponentBlockTabImageText\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabsLittleList on ComponentBlockTabsLittleList {\n  id\n  tab {\n    ...ComponentBlockTabLittleList\n  }\n}"): (typeof documents)["fragment ComponentBlockTabsLittleList on ComponentBlockTabsLittleList {\n  id\n  tab {\n    ...ComponentBlockTabLittleList\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabsPushGreyCta on ComponentBlockTabsPushGreyCta {\n  id\n  tab {\n    ...ComponentBlockTabPushGreyCta\n  }\n}"): (typeof documents)["fragment ComponentBlockTabsPushGreyCta on ComponentBlockTabsPushGreyCta {\n  id\n  tab {\n    ...ComponentBlockTabPushGreyCta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockTabsSimpleText on ComponentBlockTabsSimpleText {\n  id\n  tab {\n    ...ComponentBlockTabSimpleText\n  }\n}"): (typeof documents)["fragment ComponentBlockTabsSimpleText on ComponentBlockTabsSimpleText {\n  id\n  tab {\n    ...ComponentBlockTabSimpleText\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockVerticalCarousel on ComponentBlockVerticalCarousel {\n  id\n  requiredTitle: title\n  verticalCarouselItems: items {\n    ...ComponentCommonVerticalCarouselItem\n  }\n}"): (typeof documents)["fragment ComponentBlockVerticalCarousel on ComponentBlockVerticalCarousel {\n  id\n  requiredTitle: title\n  verticalCarouselItems: items {\n    ...ComponentCommonVerticalCarouselItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentBlockVideo on ComponentBlockVideo {\n  id\n  url\n  description\n  alt\n  image {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentBlockVideo on ComponentBlockVideo {\n  id\n  url\n  description\n  alt\n  image {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonDetailedLogo on ComponentCommonDetailedLogo {\n  title\n  description\n  cta {\n    ...ComponentCommonLink\n  }\n  image {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentCommonDetailedLogo on ComponentCommonDetailedLogo {\n  title\n  description\n  cta {\n    ...ComponentCommonLink\n  }\n  image {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonExperienceVideoCarouselItem on ComponentCommonExperienceVideoCarouselItem {\n  title\n  description\n  url\n  image {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentCommonExperienceVideoCarouselItem on ComponentCommonExperienceVideoCarouselItem {\n  title\n  description\n  url\n  image {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonFiltre on ComponentCommonFiltre {\n  filtre\n}"): (typeof documents)["fragment ComponentCommonFiltre on ComponentCommonFiltre {\n  filtre\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonKeyNumberItems on ComponentCommonKeyNumberItems {\n  id\n  title\n  description\n  firstEmoji\n  secondEmoji\n  thirdEmoji\n}"): (typeof documents)["fragment ComponentCommonKeyNumberItems on ComponentCommonKeyNumberItems {\n  id\n  title\n  description\n  firstEmoji\n  secondEmoji\n  thirdEmoji\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonLink on ComponentCommonLink {\n  id\n  Label\n  URL\n  eventName\n  eventOrigin\n}"): (typeof documents)["fragment ComponentCommonLink on ComponentCommonLink {\n  id\n  Label\n  URL\n  eventName\n  eventOrigin\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonLittleListComponent on ComponentCommonLittleListComponent {\n  id\n  text\n  description\n  firstEmoji\n  secondEmoji\n}"): (typeof documents)["fragment ComponentCommonLittleListComponent on ComponentCommonLittleListComponent {\n  id\n  text\n  description\n  firstEmoji\n  secondEmoji\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonLogo on ComponentCommonLogo {\n  logo {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentCommonLogo on ComponentCommonLogo {\n  logo {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonNotRequiredLink on ComponentCommonNotRequiredLink {\n  Label\n  URL\n  eventName\n  eventOrigin\n}"): (typeof documents)["fragment ComponentCommonNotRequiredLink on ComponentCommonNotRequiredLink {\n  Label\n  URL\n  eventName\n  eventOrigin\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonOffersCarouselItem on ComponentCommonOffersCarouselItem {\n  title\n  surtitle\n  text\n  theme\n  firstIcon\n  secondIcon\n}"): (typeof documents)["fragment ComponentCommonOffersCarouselItem on ComponentCommonOffersCarouselItem {\n  title\n  surtitle\n  text\n  theme\n  firstIcon\n  secondIcon\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonPerson on ComponentCommonPerson {\n  name\n  position\n  image {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentCommonPerson on ComponentCommonPerson {\n  name\n  position\n  image {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonPiledCardItem on ComponentCommonPiledCardItem {\n  id\n  title\n  description\n  image {\n    ...UploadFile\n  }\n  firstIcon\n  secondIcon\n  theme\n}"): (typeof documents)["fragment ComponentCommonPiledCardItem on ComponentCommonPiledCardItem {\n  id\n  title\n  description\n  image {\n    ...UploadFile\n  }\n  firstIcon\n  secondIcon\n  theme\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonSimpleTextColumn on ComponentCommonSimpleTextColumn {\n  id\n  title\n  text\n}"): (typeof documents)["fragment ComponentCommonSimpleTextColumn on ComponentCommonSimpleTextColumn {\n  id\n  title\n  text\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentCommonVerticalCarouselItem on ComponentCommonVerticalCarouselItem {\n  id\n  title\n  description\n  url\n  image {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentCommonVerticalCarouselItem on ComponentCommonVerticalCarouselItem {\n  id\n  title\n  description\n  url\n  image {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentFooterList on ComponentFooterList {\n  id\n  Title\n  Links {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentFooterList on ComponentFooterList {\n  id\n  Title\n  Links {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHeaderAccountDropdown on ComponentHeaderAccountDropdown {\n  id\n  buttonLabel\n  items {\n    ...ComponentHeaderAccountItem\n  }\n}"): (typeof documents)["fragment ComponentHeaderAccountDropdown on ComponentHeaderAccountDropdown {\n  id\n  buttonLabel\n  items {\n    ...ComponentHeaderAccountItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHeaderAccountItem on ComponentHeaderAccountItem {\n  id\n  label\n  color\n  emoji\n  url\n  eventName\n  eventOrigin\n}"): (typeof documents)["fragment ComponentHeaderAccountItem on ComponentHeaderAccountItem {\n  id\n  label\n  color\n  emoji\n  url\n  eventName\n  eventOrigin\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHeaderMegaMenu on ComponentHeaderMegaMenu {\n  id\n  title\n  primaryListItems {\n    ...ComponentCommonLink\n  }\n  secondaryListItems {\n    ...ComponentCommonLink\n  }\n  cta {\n    ...ComponentCommonLink\n  }\n  cardTitle\n  cardDescription\n  cardLink {\n    ...ComponentCommonLink\n  }\n  bannerText\n  cardFirstEmoji\n  cardSecondEmoji\n  bannerAndroidUrl\n  bannerIosUrl\n  bannerDefaultUrl\n  theme\n}"): (typeof documents)["fragment ComponentHeaderMegaMenu on ComponentHeaderMegaMenu {\n  id\n  title\n  primaryListItems {\n    ...ComponentCommonLink\n  }\n  secondaryListItems {\n    ...ComponentCommonLink\n  }\n  cta {\n    ...ComponentCommonLink\n  }\n  cardTitle\n  cardDescription\n  cardLink {\n    ...ComponentCommonLink\n  }\n  bannerText\n  cardFirstEmoji\n  cardSecondEmoji\n  bannerAndroidUrl\n  bannerIosUrl\n  bannerDefaultUrl\n  theme\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHeaderNavigationItems on ComponentHeaderNavigationItems {\n  id\n  label\n  megaMenu {\n    ...ComponentHeaderMegaMenu\n  }\n}"): (typeof documents)["fragment ComponentHeaderNavigationItems on ComponentHeaderNavigationItems {\n  id\n  label\n  megaMenu {\n    ...ComponentHeaderMegaMenu\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHomeEligibilityItems on ComponentHomeEligibilityItems {\n  title\n  description\n  emoji\n}"): (typeof documents)["fragment ComponentHomeEligibilityItems on ComponentHomeEligibilityItems {\n  title\n  description\n  emoji\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHomeEligibilitySection on ComponentHomeEligibilitySection {\n  title\n  cardTitle\n  cardDescription\n  cardCta {\n    ...ComponentCommonLink\n  }\n  firstEmoji\n  secondEmoji\n  items {\n    ...ComponentHomeEligibilityItems\n  }\n}"): (typeof documents)["fragment ComponentHomeEligibilitySection on ComponentHomeEligibilitySection {\n  title\n  cardTitle\n  cardDescription\n  cardCta {\n    ...ComponentCommonLink\n  }\n  firstEmoji\n  secondEmoji\n  items {\n    ...ComponentHomeEligibilityItems\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHomeHeroSection on ComponentHomeHeroSection {\n  title\n  subTitle\n  cta {\n    ...ComponentCommonLink\n  }\n  firstEmoji\n  secondEmoji\n  thirdEmoji\n  fourthEmoji\n  fifthEmoji\n  sixthEmoji\n  images_connection {\n    ...UploadFileRelationResponseCollection\n  }\n  images {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentHomeHeroSection on ComponentHomeHeroSection {\n  title\n  subTitle\n  cta {\n    ...ComponentCommonLink\n  }\n  firstEmoji\n  secondEmoji\n  thirdEmoji\n  fourthEmoji\n  fifthEmoji\n  sixthEmoji\n  images_connection {\n    ...UploadFileRelationResponseCollection\n  }\n  images {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentHomeRecommendationsSection on ComponentHomeRecommendationsSection {\n  recommendations {\n    ...ComponentBlockVerticalCarousel\n  }\n  recommendationsBackendTag\n  cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentHomeRecommendationsSection on ComponentHomeRecommendationsSection {\n  recommendations {\n    ...ComponentBlockVerticalCarousel\n  }\n  recommendationsBackendTag\n  cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSharedMetaSocial on ComponentSharedMetaSocial {\n  socialNetwork\n  title\n  description\n  image {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment ComponentSharedMetaSocial on ComponentSharedMetaSocial {\n  socialNetwork\n  title\n  description\n  image {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSharedSeo on ComponentSharedSeo {\n  id\n  keywords\n  metaDescription\n  metaImage {\n    ...UploadFile\n  }\n  metaRobots\n  metaSocial {\n    ...ComponentSharedMetaSocial\n  }\n  metaTitle\n  metaViewport\n  structuredData\n  canonicalURL\n}"): (typeof documents)["fragment ComponentSharedSeo on ComponentSharedSeo {\n  id\n  keywords\n  metaDescription\n  metaImage {\n    ...UploadFile\n  }\n  metaRobots\n  metaSocial {\n    ...ComponentSharedMetaSocial\n  }\n  metaTitle\n  metaViewport\n  structuredData\n  canonicalURL\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorAgeQuestion on ComponentSimulatorAgeQuestion {\n  title\n  answers {\n    ...ComponentSimulatorAnswer\n  }\n}"): (typeof documents)["fragment ComponentSimulatorAgeQuestion on ComponentSimulatorAgeQuestion {\n  title\n  answers {\n    ...ComponentSimulatorAnswer\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorAmountScreen on ComponentSimulatorAmountScreen {\n  id\n  title\n  text\n}"): (typeof documents)["fragment ComponentSimulatorAmountScreen on ComponentSimulatorAmountScreen {\n  id\n  title\n  text\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorAnswer on ComponentSimulatorAnswer {\n  id\n  answer\n  emoji\n}"): (typeof documents)["fragment ComponentSimulatorAnswer on ComponentSimulatorAnswer {\n  id\n  answer\n  emoji\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorFailureScreen on ComponentSimulatorFailureScreen {\n  id\n  title\n  text\n  cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentSimulatorFailureScreen on ComponentSimulatorFailureScreen {\n  id\n  title\n  text\n  cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorRadioQuestion on ComponentSimulatorRadioQuestion {\n  id\n  title\n  answers {\n    ...ComponentSimulatorAnswer\n  }\n}"): (typeof documents)["fragment ComponentSimulatorRadioQuestion on ComponentSimulatorRadioQuestion {\n  id\n  title\n  answers {\n    ...ComponentSimulatorAnswer\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorStep on ComponentSimulatorStep {\n  id\n  step\n}"): (typeof documents)["fragment ComponentSimulatorStep on ComponentSimulatorStep {\n  id\n  step\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ComponentSimulatorSuccessScreen on ComponentSimulatorSuccessScreen {\n  id\n  title\n  steps {\n    ...ComponentSimulatorStep\n  }\n  cta {\n    ...ComponentCommonLink\n  }\n  needSupport\n  supportLink {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment ComponentSimulatorSuccessScreen on ComponentSimulatorSuccessScreen {\n  id\n  title\n  steps {\n    ...ComponentSimulatorStep\n  }\n  cta {\n    ...ComponentCommonLink\n  }\n  needSupport\n  supportLink {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Event on Event {\n  title\n  date\n  startTime\n  endTime\n  cta {\n    ...ComponentCommonLink\n  }\n  image {\n    ...UploadFile\n  }\n  category\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockImage\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockVideo\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockSocialMedia\n  }\n  city\n  slug\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n  endDate\n}"): (typeof documents)["fragment Event on Event {\n  title\n  date\n  startTime\n  endTime\n  cta {\n    ...ComponentCommonLink\n  }\n  image {\n    ...UploadFile\n  }\n  category\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockImage\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockVideo\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockSocialMedia\n  }\n  city\n  slug\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n  endDate\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Footer on Footer {\n  PlayStoreUrl\n  AppStoreUrl\n  Lists {\n    ...ComponentFooterList\n  }\n  bannerText\n  LegalLinks {\n    ...ComponentCommonLink\n  }\n  bannerDefaultUrl\n}"): (typeof documents)["fragment Footer on Footer {\n  PlayStoreUrl\n  AppStoreUrl\n  Lists {\n    ...ComponentFooterList\n  }\n  bannerText\n  LegalLinks {\n    ...ComponentCommonLink\n  }\n  bannerDefaultUrl\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Header on Header {\n  targetItems {\n    ...ComponentHeaderNavigationItems\n  }\n  aboutItems {\n    ...ComponentHeaderNavigationItems\n  }\n  login {\n    ...ComponentHeaderAccountDropdown\n  }\n  signup {\n    ...ComponentHeaderAccountDropdown\n  }\n}"): (typeof documents)["fragment Header on Header {\n  targetItems {\n    ...ComponentHeaderNavigationItems\n  }\n  aboutItems {\n    ...ComponentHeaderNavigationItems\n  }\n  login {\n    ...ComponentHeaderAccountDropdown\n  }\n  signup {\n    ...ComponentHeaderAccountDropdown\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment News on News {\n  title\n  category\n  date\n  image {\n    ...UploadFile\n  }\n  slug\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockImage\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockVideo\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockSocialMedia\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n  aboveTitle\n  emoji\n}"): (typeof documents)["fragment News on News {\n  title\n  category\n  date\n  image {\n    ...UploadFile\n  }\n  slug\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockImage\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockVideo\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockSocialMedia\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n  aboveTitle\n  emoji\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Presse on Presse {\n  title\n  buttonText\n  filtres {\n    ...ComponentCommonFiltre\n  }\n  socialMediaSection {\n    ...ComponentBlockSocialMedia\n  }\n  separator {\n    ...ComponentBlockSeparator\n  }\n  texteImage {\n    ...ComponentBlockImageText\n  }\n  pushCta {\n    ...ComponentBlockDoublePushCta\n  }\n  aide {\n    ...ComponentBlockSimplePushCta\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  titleEventSection\n  showFilter\n}"): (typeof documents)["fragment Presse on Presse {\n  title\n  buttonText\n  filtres {\n    ...ComponentCommonFiltre\n  }\n  socialMediaSection {\n    ...ComponentBlockSocialMedia\n  }\n  separator {\n    ...ComponentBlockSeparator\n  }\n  texteImage {\n    ...ComponentBlockImageText\n  }\n  pushCta {\n    ...ComponentBlockDoublePushCta\n  }\n  aide {\n    ...ComponentBlockSimplePushCta\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  titleEventSection\n  showFilter\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Resource on Resource {\n  title\n  category\n  date\n  image {\n    ...UploadFile\n  }\n  slug\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockCenteredText\n    ...ComponentBlockHeader\n    ...ComponentBlockSocialMedia\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockImageText\n    ...ComponentBlockImage\n    ...ComponentBlockLittleList\n    ...ComponentBlockSeparator\n    ...ComponentBlockSimplePushCta\n    ...ComponentBlockSpace\n    ...ComponentBlockVerticalCarousel\n    ...ComponentBlockVideo\n    ...ComponentBlockKeyNumberCarousel\n    ...ComponentBlockLogos\n    ...ComponentBlockLatestNews\n    ...ComponentBlockExperienceVideoCarousel\n    ...ComponentBlockOffersCarousel\n    ...ComponentBlockPiledCards\n    ...ComponentBlockFaq\n    ...ComponentBlockDetailedLogos\n    ...ComponentBlockOrganizationChart\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockImageGallery\n    ...ComponentBlockBreadcrumb\n  }\n  partnership\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n}"): (typeof documents)["fragment Resource on Resource {\n  title\n  category\n  date\n  image {\n    ...UploadFile\n  }\n  slug\n  localisation\n  secteur\n  blocks {\n    __typename\n    ...ComponentBlockCenteredText\n    ...ComponentBlockHeader\n    ...ComponentBlockSocialMedia\n    ...ComponentBlockDoublePushCta\n    ...ComponentBlockImageText\n    ...ComponentBlockImage\n    ...ComponentBlockLittleList\n    ...ComponentBlockSeparator\n    ...ComponentBlockSimplePushCta\n    ...ComponentBlockSpace\n    ...ComponentBlockVerticalCarousel\n    ...ComponentBlockVideo\n    ...ComponentBlockKeyNumberCarousel\n    ...ComponentBlockLogos\n    ...ComponentBlockLatestNews\n    ...ComponentBlockExperienceVideoCarousel\n    ...ComponentBlockOffersCarousel\n    ...ComponentBlockPiledCards\n    ...ComponentBlockFaq\n    ...ComponentBlockDetailedLogos\n    ...ComponentBlockOrganizationChart\n    ...ComponentBlockSimpleTextV2\n    ...ComponentBlockImageGallery\n    ...ComponentBlockBreadcrumb\n  }\n  partnership\n  seo {\n    ...ComponentSharedSeo\n  }\n  pageLocalisation\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Ressourcepass on Ressourcepass {\n  title\n  date\n  category\n  cta {\n    ...ComponentCommonLink\n  }\n}"): (typeof documents)["fragment Ressourcepass on Ressourcepass {\n  title\n  date\n  category\n  cta {\n    ...ComponentCommonLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RessourcesPassCulture on RessourcesPassCulture {\n  title\n  buttonText\n  filtres {\n    ...ComponentCommonFiltre\n  }\n  socialMediaSection {\n    ...ComponentBlockSocialMedia\n  }\n  separator {\n    ...ComponentBlockSeparator\n  }\n  etudes {\n    ...ComponentBlockSimplePushCta\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  showFilter\n}"): (typeof documents)["fragment RessourcesPassCulture on RessourcesPassCulture {\n  title\n  buttonText\n  filtres {\n    ...ComponentCommonFiltre\n  }\n  socialMediaSection {\n    ...ComponentBlockSocialMedia\n  }\n  separator {\n    ...ComponentBlockSeparator\n  }\n  etudes {\n    ...ComponentBlockSimplePushCta\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  showFilter\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Simulator on Simulator {\n  title\n  description\n  ageQuestion {\n    ...ComponentSimulatorAgeQuestion\n  }\n  nationnalityQuestion {\n    ...ComponentSimulatorRadioQuestion\n  }\n  residencyQuestion {\n    ...ComponentSimulatorRadioQuestion\n  }\n  steps {\n    ...ComponentSimulatorStep\n  }\n  successScreen {\n    ...ComponentSimulatorSuccessScreen\n  }\n  failureScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  tooYoungScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  tooOldScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  amountScreen_15 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_16 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_17 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_18 {\n    ...ComponentSimulatorAmountScreen\n  }\n  topEmoji\n  bottomEmoji\n  socialMedias {\n    ...ComponentBlockSocialMedia\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  offres {\n    ...ComponentBlockSimplePushCta\n  }\n}"): (typeof documents)["fragment Simulator on Simulator {\n  title\n  description\n  ageQuestion {\n    ...ComponentSimulatorAgeQuestion\n  }\n  nationnalityQuestion {\n    ...ComponentSimulatorRadioQuestion\n  }\n  residencyQuestion {\n    ...ComponentSimulatorRadioQuestion\n  }\n  steps {\n    ...ComponentSimulatorStep\n  }\n  successScreen {\n    ...ComponentSimulatorSuccessScreen\n  }\n  failureScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  tooYoungScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  tooOldScreen {\n    ...ComponentSimulatorFailureScreen\n  }\n  amountScreen_15 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_16 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_17 {\n    ...ComponentSimulatorAmountScreen\n  }\n  amountScreen_18 {\n    ...ComponentSimulatorAmountScreen\n  }\n  topEmoji\n  bottomEmoji\n  socialMedias {\n    ...ComponentBlockSocialMedia\n  }\n  seo {\n    ...ComponentSharedSeo\n  }\n  offres {\n    ...ComponentBlockSimplePushCta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UploadFile on UploadFile {\n  name\n  alternativeText\n  caption\n  width\n  height\n  formats\n  hash\n  ext\n  mime\n  size\n  url\n  previewUrl\n  provider\n  provider_metadata\n  createdAt\n  updatedAt\n  publishedAt\n}"): (typeof documents)["fragment UploadFile on UploadFile {\n  name\n  alternativeText\n  caption\n  width\n  height\n  formats\n  hash\n  ext\n  mime\n  size\n  url\n  previewUrl\n  provider\n  provider_metadata\n  createdAt\n  updatedAt\n  publishedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UploadFileRelationResponseCollection on UploadFileRelationResponseCollection {\n  nodes {\n    ...UploadFile\n  }\n}"): (typeof documents)["fragment UploadFileRelationResponseCollection on UploadFileRelationResponseCollection {\n  nodes {\n    ...UploadFile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Actualites($filters: NewsFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  newsList(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...News\n  }\n}"): (typeof documents)["query Actualites($filters: NewsFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  newsList(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...News\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ActualitesJeunesParents($sort: [String], $filters: NewsFiltersInput) {\n  listeJeune {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(sort: $sort, filters: $filters) {\n    ...News\n  }\n}"): (typeof documents)["query ActualitesJeunesParents($sort: [String], $filters: NewsFiltersInput) {\n  listeJeune {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(sort: $sort, filters: $filters) {\n    ...News\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ActualitesPassCulture($filters: NewsFiltersInput, $sort: [String]) {\n  actualitesPassCulture {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(filters: $filters, sort: $sort) {\n    ...News\n  }\n}"): (typeof documents)["query ActualitesPassCulture($filters: NewsFiltersInput, $sort: [String]) {\n  actualitesPassCulture {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(filters: $filters, sort: $sort) {\n    ...News\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ActualitesRDVActeursCulturels($sortNews: [String], $filtersNews: NewsFiltersInput, $sortEvents: [String], $filtersEvents: EventFiltersInput) {\n  actualitesRdvActeursCulturel {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    titleEventSection\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(sort: $sortNews, filters: $filtersNews) {\n    ...News\n  }\n  events(sort: $sortEvents, filters: $filtersEvents) {\n    ...Event\n  }\n}"): (typeof documents)["query ActualitesRDVActeursCulturels($sortNews: [String], $filtersNews: NewsFiltersInput, $sortEvents: [String], $filtersEvents: EventFiltersInput) {\n  actualitesRdvActeursCulturel {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    aide {\n      ...ComponentBlockSimplePushCta\n    }\n    titleEventSection\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  newsList(sort: $sortNews, filters: $filtersNews) {\n    ...News\n  }\n  events(sort: $sortEvents, filters: $filtersEvents) {\n    ...Event\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AideActeursCulturels {\n  helpCulturalActors {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"): (typeof documents)["query AideActeursCulturels {\n  helpCulturalActors {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AideEnseignants($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  helpTeachers {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    latestStudies {\n      ...ComponentBlockLatestNews\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"): (typeof documents)["query AideEnseignants($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  helpTeachers {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    latestStudies {\n      ...ComponentBlockLatestNews\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AideJeunesParents {\n  help {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"): (typeof documents)["query AideJeunesParents {\n  help {\n    heroSection {\n      ...ComponentBlockHeader\n    }\n    cardText {\n      ...ComponentBlockDoublePushCta\n    }\n    social {\n      ...ComponentBlockSocialMedia\n    }\n    simplepushcta {\n      ...ComponentBlockSimplePushCta\n    }\n    faq {\n      ...ComponentBlockFaq\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query App {\n  header {\n    ...Header\n  }\n  footer {\n    ...Footer\n  }\n}"): (typeof documents)["query App {\n  header {\n    ...Header\n  }\n  footer {\n    ...Footer\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query EtudesPassCulture($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  etudesPassCulture {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    observatoire {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"): (typeof documents)["query EtudesPassCulture($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  etudesPassCulture {\n    title\n    buttonText\n    filtres {\n      ...ComponentCommonFiltre\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n    observatoire {\n      ...ComponentBlockSimplePushCta\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    showFilter\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Evenements($filters: EventFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  events(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Event\n  }\n}"): (typeof documents)["query Evenements($filters: EventFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  events(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Event\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Home($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  home {\n    aboutSection {\n      ...ComponentBlockCenteredText\n    }\n    CTASection {\n      ...ComponentBlockPushCta\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    latestStudies {\n      ...ComponentBlockLatestNews\n    }\n    eligibilitySection {\n      ...ComponentHomeEligibilitySection\n    }\n    heroSection {\n      ...ComponentHomeHeroSection\n    }\n    recommendationsSection {\n      ...ComponentHomeRecommendationsSection\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"): (typeof documents)["query Home($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  home {\n    aboutSection {\n      ...ComponentBlockCenteredText\n    }\n    CTASection {\n      ...ComponentBlockPushCta\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    latestStudies {\n      ...ComponentBlockLatestNews\n    }\n    eligibilitySection {\n      ...ComponentHomeEligibilitySection\n    }\n    heroSection {\n      ...ComponentHomeHeroSection\n    }\n    recommendationsSection {\n      ...ComponentHomeRecommendationsSection\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListeOffres {\n  listeOffre {\n    experience {\n      ...ComponentBlockExperienceVideoCarousel\n    }\n    hero {\n      ...ComponentBlockHeader\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    offres {\n      ...ComponentBlockOfferList\n    }\n    offres_culturelles {\n      ...ComponentBlockOffersCarousel\n    }\n    question {\n      ...ComponentBlockSimplePushCta\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n  }\n}"): (typeof documents)["query ListeOffres {\n  listeOffre {\n    experience {\n      ...ComponentBlockExperienceVideoCarousel\n    }\n    hero {\n      ...ComponentBlockHeader\n    }\n    socialMediaSection {\n      ...ComponentBlockSocialMedia\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n    offres {\n      ...ComponentBlockOfferList\n    }\n    offres_culturelles {\n      ...ComponentBlockOffersCarousel\n    }\n    question {\n      ...ComponentBlockSimplePushCta\n    }\n    separator {\n      ...ComponentBlockSeparator\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query NotFound {\n  notFound {\n    header {\n      ...ComponentBlockHeader\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"): (typeof documents)["query NotFound {\n  notFound {\n    header {\n      ...ComponentBlockHeader\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page($filters: PageFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  pages(filters: $filters, pagination: $pagination, sort: $sort) {\n    Path\n    Blocks {\n      __typename\n      ...ComponentBlockCenteredText\n      ...ComponentBlockHeader\n      ...ComponentBlockSocialMedia\n      ...ComponentBlockDoublePushCta\n      ...ComponentBlockImageText\n      ...ComponentBlockImage\n      ...ComponentBlockLittleList\n      ...ComponentBlockSeparator\n      ...ComponentBlockSimplePushCta\n      ...ComponentBlockSpace\n      ...ComponentBlockVerticalCarousel\n      ...ComponentBlockVideo\n      ...ComponentBlockKeyNumberCarousel\n      ...ComponentBlockLogos\n      ...ComponentBlockLatestNews\n      ...ComponentBlockExperienceVideoCarousel\n      ...ComponentBlockOffersCarousel\n      ...ComponentBlockPiledCards\n      ...ComponentBlockFaq\n      ...ComponentBlockDetailedLogos\n      ...ComponentBlockOrganizationChart\n      ...ComponentBlockSimpleTextV2\n      ...ComponentBlockImageGallery\n      ...ComponentBlockBreadcrumb\n      ...ComponentBlockHeaderWithQRcode\n      ...ComponentBlockColumnsText\n      ...ComponentBlockCenteredTitle\n      ...ComponentBlockTabsSimpleText\n      ...ComponentBlockTabsPushGreyCta\n      ...ComponentBlockTabsLittleList\n      ...ComponentBlockTabsImageText\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"): (typeof documents)["query Page($filters: PageFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  pages(filters: $filters, pagination: $pagination, sort: $sort) {\n    Path\n    Blocks {\n      __typename\n      ...ComponentBlockCenteredText\n      ...ComponentBlockHeader\n      ...ComponentBlockSocialMedia\n      ...ComponentBlockDoublePushCta\n      ...ComponentBlockImageText\n      ...ComponentBlockImage\n      ...ComponentBlockLittleList\n      ...ComponentBlockSeparator\n      ...ComponentBlockSimplePushCta\n      ...ComponentBlockSpace\n      ...ComponentBlockVerticalCarousel\n      ...ComponentBlockVideo\n      ...ComponentBlockKeyNumberCarousel\n      ...ComponentBlockLogos\n      ...ComponentBlockLatestNews\n      ...ComponentBlockExperienceVideoCarousel\n      ...ComponentBlockOffersCarousel\n      ...ComponentBlockPiledCards\n      ...ComponentBlockFaq\n      ...ComponentBlockDetailedLogos\n      ...ComponentBlockOrganizationChart\n      ...ComponentBlockSimpleTextV2\n      ...ComponentBlockImageGallery\n      ...ComponentBlockBreadcrumb\n      ...ComponentBlockHeaderWithQRcode\n      ...ComponentBlockColumnsText\n      ...ComponentBlockCenteredTitle\n      ...ComponentBlockTabsSimpleText\n      ...ComponentBlockTabsPushGreyCta\n      ...ComponentBlockTabsLittleList\n      ...ComponentBlockTabsImageText\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PlanDuSite($filters: PageFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  pages(filters: $filters, pagination: $pagination, sort: $sort) {\n    Path\n    Blocks {\n      __typename\n      ...ComponentBlockCenteredText\n      ...ComponentBlockHeader\n      ...ComponentBlockSocialMedia\n      ...ComponentBlockDoublePushCta\n      ...ComponentBlockImageText\n      ...ComponentBlockImage\n      ...ComponentBlockLittleList\n      ...ComponentBlockSeparator\n      ...ComponentBlockSimplePushCta\n      ...ComponentBlockSpace\n      ...ComponentBlockVerticalCarousel\n      ...ComponentBlockVideo\n      ...ComponentBlockKeyNumberCarousel\n      ...ComponentBlockLogos\n      ...ComponentBlockLatestNews\n      ...ComponentBlockExperienceVideoCarousel\n      ...ComponentBlockOffersCarousel\n      ...ComponentBlockPiledCards\n      ...ComponentBlockFaq\n      ...ComponentBlockDetailedLogos\n      ...ComponentBlockOrganizationChart\n      ...ComponentBlockSimpleTextV2\n      ...ComponentBlockImageGallery\n      ...ComponentBlockBreadcrumb\n      ...ComponentBlockHeaderWithQRcode\n      ...ComponentBlockColumnsText\n      ...ComponentBlockCenteredTitle\n      ...ComponentBlockTabsSimpleText\n      ...ComponentBlockTabsPushGreyCta\n      ...ComponentBlockTabsLittleList\n      ...ComponentBlockTabsImageText\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"): (typeof documents)["query PlanDuSite($filters: PageFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  pages(filters: $filters, pagination: $pagination, sort: $sort) {\n    Path\n    Blocks {\n      __typename\n      ...ComponentBlockCenteredText\n      ...ComponentBlockHeader\n      ...ComponentBlockSocialMedia\n      ...ComponentBlockDoublePushCta\n      ...ComponentBlockImageText\n      ...ComponentBlockImage\n      ...ComponentBlockLittleList\n      ...ComponentBlockSeparator\n      ...ComponentBlockSimplePushCta\n      ...ComponentBlockSpace\n      ...ComponentBlockVerticalCarousel\n      ...ComponentBlockVideo\n      ...ComponentBlockKeyNumberCarousel\n      ...ComponentBlockLogos\n      ...ComponentBlockLatestNews\n      ...ComponentBlockExperienceVideoCarousel\n      ...ComponentBlockOffersCarousel\n      ...ComponentBlockPiledCards\n      ...ComponentBlockFaq\n      ...ComponentBlockDetailedLogos\n      ...ComponentBlockOrganizationChart\n      ...ComponentBlockSimpleTextV2\n      ...ComponentBlockImageGallery\n      ...ComponentBlockBreadcrumb\n      ...ComponentBlockHeaderWithQRcode\n      ...ComponentBlockColumnsText\n      ...ComponentBlockCenteredTitle\n      ...ComponentBlockTabsSimpleText\n      ...ComponentBlockTabsPushGreyCta\n      ...ComponentBlockTabsLittleList\n      ...ComponentBlockTabsImageText\n    }\n    seo {\n      ...ComponentSharedSeo\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Presse($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String], $sortEvents: [String], $filtersEvents: EventFiltersInput) {\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n  events(sort: $sortEvents, filters: $filtersEvents) {\n    ...Event\n  }\n  presse {\n    ...Presse\n  }\n}"): (typeof documents)["query Presse($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String], $sortEvents: [String], $filtersEvents: EventFiltersInput) {\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n  events(sort: $sortEvents, filters: $filtersEvents) {\n    ...Event\n  }\n  presse {\n    ...Presse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Ressources($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"): (typeof documents)["query Ressources($filters: ResourceFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  resources(filters: $filters, pagination: $pagination, sort: $sort) {\n    ...Resource\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RessourcesPass($filters: RessourcepassFiltersInput, $sort: [String], $pagination: PaginationArg) {\n  ressourcespass(filters: $filters, sort: $sort, pagination: $pagination) {\n    ...Ressourcepass\n  }\n  ressourcesPassCulture {\n    ...RessourcesPassCulture\n  }\n}"): (typeof documents)["query RessourcesPass($filters: RessourcepassFiltersInput, $sort: [String], $pagination: PaginationArg) {\n  ressourcespass(filters: $filters, sort: $sort, pagination: $pagination) {\n    ...Ressourcepass\n  }\n  ressourcesPassCulture {\n    ...RessourcesPassCulture\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Simulateur {\n  simulator {\n    ...Simulator\n  }\n}"): (typeof documents)["query Simulateur {\n  simulator {\n    ...Simulator\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;