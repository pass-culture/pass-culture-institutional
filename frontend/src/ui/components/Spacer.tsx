import styled from 'styled-components'

type Props = {
  spaces: number
}

const VerticalSpacer = styled.div<Props>(({ spaces }) => ({
  height: `${spaces}rem`,
}))

const HorizontalSpacer = styled.div<Props>(({ spaces }) => ({
  width: `${spaces}rem`,
}))

export const Spacer = {
  Vertical: VerticalSpacer,
  Horizontal: HorizontalSpacer,
}
