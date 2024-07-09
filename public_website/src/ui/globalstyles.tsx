import { createGlobalStyle } from 'styled-components'

import { theme } from '@/theme/theme'

const GlobalStyles = createGlobalStyle`
  /* ResetCSS from http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Custom */
  body {
    color: ${theme.colors.black};
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    font: inherit;
    padding: 0;
  }

  /* Focus styles. Define --outline-color on an element to override default color */
  *:focus-visible {
    outline: 2px solid var(--outline-color, ${theme.colors.primary});
    outline-offset: 2px;
  }

  /* Visually hide content but keep its semantic/content to assistive technologies */
  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  /* Highlighted text inside sections title */
  mark {
    background: none;
    background-image: linear-gradient(to right, ${theme.colors.flashGreen} 50%, ${theme.colors.flashGreen} 50%);
    background-size: 200% 0.4em;
    background-position: 100% 90%;
    background-repeat: no-repeat;
    color: inherit;
  }
  
  #main-content{
  position: relative;
  z-index:1
  }

 .customCarrouselAnimation {
    transition: transform 0.5s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform;
  }

  body {
    --module-margin: 5rem;
    --module-spacing: calc(var(--module-margin) * 2);

    @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
      --module-margin: 2.825rem;
    }
  }

  #target-anchor-scroll {
  scroll-margin-top: 1.25rem;
}
`

export default GlobalStyles
