import React from "react";
import { Box, Flex, Loader } from "@strapi/design-system";
import useFormattedLabel from "../../hooks/useFormattedLabel";

const PADDING_X = 10;
const PADDING_Y = 2;

function PageLoading() {
  const LOADING_MESSAGE = useFormattedLabel("loadingMsg");
  return (
    <Flex justifyContent="center">
      <Loader>{LOADING_MESSAGE}</Loader>
    </Flex>
  );
}

export default function PageWrapper({
  children,
  baseHeaderLayout,
  pageTitle,
  isLoading,
}: {
  children: React.ReactNode;
  baseHeaderLayout: React.ReactNode;
  pageTitle: string;
  isLoading: boolean;
}) {
  return (
    <>
      {/* <h1>{pageTitle}</h1> */}
      {baseHeaderLayout}
      <Box
        paddingRight={PADDING_X}
        paddingLeft={PADDING_X}
        paddingTop={PADDING_Y}
        paddingBottom={PADDING_Y}
      >
        {isLoading ? <PageLoading /> : <>{children}</>}
      </Box>
    </>
  );
}
