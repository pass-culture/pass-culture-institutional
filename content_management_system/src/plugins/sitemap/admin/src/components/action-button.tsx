import { Button } from '@strapi/design-system';
import { Loader } from '@strapi/icons';

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
    startIcon={isLoading ? <Loader /> : null}
    aria-label={label}
  >
    {label}
  </Button>
);

export default ActionButton;
