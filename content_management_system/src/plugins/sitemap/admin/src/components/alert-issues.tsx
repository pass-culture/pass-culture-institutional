import React, { useMemo, useState } from 'react';
import { Alert, Box } from '@strapi/design-system';
import { validateSitemapUrls } from '../utils/validateSitemapUrls';

interface AlertWithIssuesProps {
  sitemap: string;
}

const style = {
  margin: 0,
  paddingLeft: 20,
};

const AlertWithIssues = ({ sitemap }: AlertWithIssuesProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const validationIssues = useMemo(() => validateSitemapUrls(sitemap), [sitemap]);
  const hasIssues = validationIssues.length > 0;

  return hasIssues && isVisible ? (
    <Box padding={4}>
      <Alert
        closeLabel="Fermer l'alerte"
        title="Problèmes trouvés dans le sitemap :"
        variant="danger"
        onClose={() => setIsVisible(false)}
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
