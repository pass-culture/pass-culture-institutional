import React from 'react'
import styled from 'styled-components'

import { ArrowRight } from '@/ui/components/icons/ArrowRight'
import { ExternalLink } from '@/ui/components/icons/ExternalLink'

// Same rule as the Link component: internal URLs start with a slash
const isInternalUrl = (url: string): boolean => url.startsWith('/')

/**
 * Icon displayed inside a link, chosen from its URL: an arrow for internal
 * links, an external link icon (with a screen reader hint) otherwise.
 */
export function LinkIcon({ url }: { url: string }) {
  const isInternal = isInternalUrl(url)

  return (
    <React.Fragment>
      <StyledIcon
        aria-hidden="true"
        data-testid={isInternal ? 'internal-link-icon' : 'external-link-icon'}>
        {isInternal ? <ArrowRight /> : <ExternalLink />}
      </StyledIcon>
      {!isInternal && <span className="visually-hidden"> (nouvel onglet)</span>}
    </React.Fragment>
  )
}

const StyledIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 0.75rem;
  vertical-align: middle;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`
