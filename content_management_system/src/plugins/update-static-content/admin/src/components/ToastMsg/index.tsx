import { Alert } from "@strapi/design-system";

const stickyStyle = {
  position: "fixed",
  top: 24,
  left: "calc(50%)",
  transform: "translateX(-50%)",
  zIndex: 10,
};

export default function ToastMessage({
  variant,
  title,
  message,
  action,
  closeToastHandler,
}: {
  variant: string;
  title: string;
  message: string;
  action: any;
  closeToastHandler: any;
}) {
  return (
    <Alert
      variant={variant}
      title={title}
      action={action}
      style={stickyStyle}
      onClose={closeToastHandler}
      closeLabel="close alert"
    >
      {message}
    </Alert>
  );
}
