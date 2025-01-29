import { useIntl } from "react-intl";
import { getTranslation } from "../utils/getTranslation";

export default function useFormattedLabel(labelId: string) {
  const { formatMessage } = useIntl();
  const label = formatMessage({ id: getTranslation(labelId) });
  return label;
}
