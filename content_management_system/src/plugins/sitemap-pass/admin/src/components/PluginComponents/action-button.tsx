import { Button } from "@strapi/design-system/Button";
import { Spinner } from "@strapi/icons";
import React from "react";
const ActionButton = ({
  label,
  onClick,
  disabled = false,
  isLoading = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled || isLoading}
    startIcon={isLoading ? <Spinner /> : null}
    aria-label={label}
  >
    {label}
  </Button>
);

export default ActionButton;
