import React from 'react'
import { useQRCode } from 'next-qrcode'
import styled from 'styled-components'

interface PushCTAProps {
  Title: string
  Text?: string
}

export function PushCTA(props: PushCTAProps) {
  const qrCodeUrl = 'https://example.com'

  const { SVG: QrCode } = useQRCode()

  return (
    <Root>
      <ImageContainer>
        <QRCodeCard>
          <QrCode
            text={qrCodeUrl}
            /* TODO: plug theme color */
            options={{ width: 100, margin: 2, color: { dark: '#2D0390' } }}
          />
          <p>Scanne ce QR code pour télécharger l’application</p>
        </QRCodeCard>
      </ImageContainer>
      <RightSide>
        <h2>{props.Title}</h2>
        {props.Text && <p>{props.Text}</p>}
        <CtaLink href="https://example.com">Télécharger l’application</CtaLink>
      </RightSide>
    </Root>
  )
}

// TODO: plug theme colors
// TODO: plug theme typographies (maybe ?)
// TODO: adjust left card size

const Root = styled.div`
  background-color: #f6f4fa;
  max-width: 80rem;
  margin: 6.25rem auto;
  gap: 5.625rem;
  border-radius: 2.5rem;

  display: flex;
`

const ImageContainer = styled.div`
  background-color: #eb0055;
  max-width: 28rem;
  border-radius: 1rem;
  margin: -3.125rem 5rem;
  margin-right: 0;
  background-image: url(https://s3-alpha-sig.figma.com/img/357e/a3b8/3275b2b022f98c6f8da02c37e05d4a18?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SmLrgWMhWmxDoYmeU9Eh5Ad5lNTijYvWyep8vdGYQcnOqxFGR1m4RFef5-8oIVAukvhoN2~LPi0hqvN-z3-MOtcSA5TgrWGE3OLAyIxUeZAzxjlnxsEVy~XuFLzytAhfErieLuqSnQ8d85JxPdxlL3j7jWDhx4cqfCEhIg-4QTeMQDPOZ3KTcXtvZG43M4Jf8vmjBgOkWsQaDdgLKKEsYxqnwDkPobjQVYlFv1YGw4D52Y4T0bcurVi--7~xaEzvHELYaUoaWJLGNm73SalOKGxphVtrAZGTwrhTPaBXlRip1tx0JC515e2QWuFUEC5K-0b~RVVgXtuCSZFyZk7~5A__);
  background-size: cover;
  background-position: center 4.5rem;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column-reverse;
  padding: 2rem;

  position: relative;

  /* FIXME: blue card appears behind Root */
  &::before {
    position: absolute;
    content: '';
    inset: 0;
    background-color: #320096;
    z-index: -1;
    transform: rotate(7deg);
    border-radius: 1rem;
  }
`

const QRCodeCard = styled.div`
  background-color: #2d0390;
  color: white;
  padding: 1.125rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-radius: 1rem;

  box-shadow: -4px 8px 24px 0px #00000036;

  p {
    font-weight: 700;
    line-height: 1.3125;
  }

  svg {
    border-radius: 0.625rem;
  }
`

const RightSide = styled.div`
  padding: 6.25rem 0;

  h2 {
    font-size: 2.5rem;
    line-height: 1.25;
    font-weight: 700;

    color: #320096;

    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1rem;
    line-height: 2.125rem;
    font-weight: 500;

    margin-bottom: 2rem;
  }
`

const CtaLink = styled.a`
  display: inline-block;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;

  background: linear-gradient(90deg, #eb0055, #320096);
  color: #ffffff;

  padding: 1rem 1.75rem;
  border-radius: 9999px;
`
