import React from "react";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { getRouteCount } from "../../utils/getRouteCount";


interface RouteCounterProps {
  xmlContent: string;
}

export const RouteCounter = ({ xmlContent }: RouteCounterProps) => {
  return (
    <Flex padding={2}>
      <Typography variant="pi" fontWeight="bold">
        Nombre de routes : {getRouteCount(xmlContent)}
      </Typography>
    </Flex>
  );
};
