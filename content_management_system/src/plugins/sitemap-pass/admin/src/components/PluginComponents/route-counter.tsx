import React from "react";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { XMLParser } from "fast-xml-parser";

interface RouteCounterProps {
  xmlContent: string;
}
const getRouteCount = (content: string): number => {
  if (content === "") return 0;
  const parser = new XMLParser();
  const result = parser.parse(content);
  const urlEntries = result.urlset?.url ?? [];
  return Array.isArray(urlEntries) ? urlEntries.length : 1;
};
export const RouteCounter = ({ xmlContent }: RouteCounterProps) => {
  return (
    <Flex padding={2}>
      <Typography variant="pi" fontWeight="bold">
        Nombre de routes : {getRouteCount(xmlContent)}
      </Typography>
    </Flex>
  );
};
