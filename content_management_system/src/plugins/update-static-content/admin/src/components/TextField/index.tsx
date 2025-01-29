import React from "react";
import { TextInput, Flex } from "@strapi/design-system";

export default function TextField({
  HintMessage,
  ...other
}: {
  HintMessage: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <TextInput {...other} />
      {HintMessage}
    </div>
  );
}
