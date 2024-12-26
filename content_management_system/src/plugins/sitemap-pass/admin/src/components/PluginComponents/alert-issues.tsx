import React, { useEffect, useState } from "react";
import { Box } from "@strapi/design-system/Box";
import { Alert } from "@strapi/design-system/Alert";
import { validateSitemapUrls } from "../../utils/validateSitemapUrls";

interface AlertWithIssuesProps {
  sitemap: string;
}
const style = {
  margin: 0,
  paddingLeft: "20px",
};
const AlertWithIssues = ({ sitemap }: AlertWithIssuesProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [validationIssues, setValidationIssues] = useState<
    { url: string; issue: string }[]
  >([]);

  const onClose = (): void => setShowAlert(false);

  const validateSitemap = (): boolean => {
    const issues = validateSitemapUrls(sitemap);
    setValidationIssues(issues);
    setShowAlert(issues.length > 0);
    return issues.length === 0;
  };

  useEffect(() => {
    validateSitemap();
  }, [sitemap]);

  const hasIssues = validationIssues.length > 0;
  const isShowAlert = showAlert && hasIssues;

  return isShowAlert ? (
    <Box padding={4}>
      <Alert
        closeLabel="Fermer l'alerte"
        title="Problèmes trouvés dans le sitemap :"
        variant="danger"
        onClose={onClose}
      >
        <ul style={style}>
          {validationIssues.map((issue) => (
            <li key={`${issue.url}-${issue.issue}`}>
              {issue.url}: {issue.issue}
            </li>
          ))}
        </ul>
      </Alert>
    </Box>
  ) : null;
};
export default AlertWithIssues;
