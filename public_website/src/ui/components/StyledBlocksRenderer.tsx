import styled, { css } from 'styled-components'

const StyledBlocksRenderer = styled.div`
  ${({ theme }) => css`
    /* General styles */
    line-height: 2;
    font-weight: ${theme.fonts.weights.medium};

    /* Images */
    img {
      border-radius: ${theme.radius.sm};
      margin: 1.25rem auto;
      display: block;
      object-fit: cover;
      aspect-ratio: 1.2;
      height: auto;
      width: 100%;
    }

    /* Headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 600;
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2.5rem;
      color: ${theme.colors.secondary};
    }

    h3 {
      font-size: 2rem;
      color: ${theme.colors.secondary};
    }

    h4 {
      font-size: 1.6rem;
      color: ${theme.colors.secondary};
    }

    h5 {
      font-size: 1.3rem;
    }

    h6 {
      font-size: 1.1rem;
    }

    /* Paragraphs */
    p {
      word-break: break-word;
      margin-bottom: 1rem;
    }

    /* Links */
    a {
      color: ${theme.colors.primary} !important;
      text-decoration: underline;
      font-weight: 600;
      outline-offset: 0.625rem;

      &:hover {
        text-decoration: none;
      }
      &:focus {
        outline: 0.125rem solid ${theme.colors.primary};
      }
    }

    /* Bold text */
    strong {
      font-weight: ${theme.fonts.weights.bold};
    }

    /* Lists */
    ul,
    ol {
      margin-left: 1rem;
      padding-left: 1rem;
      margin-bottom: 1rem;
    }

    ul {
      list-style: disc inside;
    }

    ol {
      list-style: decimal inside;
    }

    li {
      margin-bottom: 0.5rem;
    }

    /* Code blocks */
    pre {
      background: ${theme.colors.lightGray};
      padding: 1rem;
      border-radius: ${theme.radius.sm};
      overflow-x: auto;
      margin-bottom: 1rem;
    }

    code {
      background: ${theme.colors.lightGray};
      padding: 0.2rem 0.4rem;
      border-radius: ${theme.radius.sm};
      font-family: monospace;
    }

    /* Mobile adaptation */
    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 0 1rem;
      line-height: 1.8;

      h2 {
        font-size: 2rem;
      }

      h3 {
        font-size: 1.7rem;
      }

      h4 {
        font-size: 1.3rem;
      }

      h5 {
        font-size: 1.2rem;
      }

      h6 {
        font-size: 1.05rem;
      }

      p,
      ul {
        padding-left: 0;
      }
    }
  `}
`

export default StyledBlocksRenderer
