import styled from "styled-components";

const Title1 = styled.h1(({ theme }) => ({
  ...theme.typography.title1,
}));

const Body = styled.p(({ theme }) => ({
  ...theme.typography.body,
}));

const ButtonText = styled.a(({ theme }) => ({
  ...theme.typography.buttonText,
}));

export const Typo = {
  Title1,
  Body,
  ButtonText,
};
