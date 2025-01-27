import { useEffect, useState } from 'react';
import { useNotification } from '@strapi/strapi/admin';
import { apiCall } from '../utils/apiCall';
import api from '../utils/api';
import { Box, Flex } from '@strapi/design-system';
import { RouteCounter } from '../components/route-counter';
import ActionButton from '../components/action-button';
import AlertWithIssues from '../components/alert-issues';
import CodeBlock from '../components/code-block';

const HomePage = () => {
  const [sitemap, setSitemap] = useState<string>('');
  const [status, setStatus] = useState<{
    isFetching: boolean;
    isGenerating: boolean;
    isCopying: boolean;
  }>({
    isFetching: false,
    isGenerating: false,
    isCopying: false,
  });

  const notification = useNotification();

  const notify = (type: 'danger' | 'success', message: string): void => {
    notification.toggleNotification({ type, message });
  };

  const handleApiCall = async (action: () => Promise<void>, statusKey: keyof typeof status) => {
    setStatus((prev) => ({ ...prev, [statusKey]: true }));
    try {
      await action();
    } catch (error) {
      console.error(error);
    } finally {
      setStatus((prev) => ({ ...prev, [statusKey]: false }));
    }
  };

  const fetchSitemap = async (): Promise<void> => {
    await apiCall(
      api.getSitemapPreview,
      (response) => {
        setSitemap(response);
      },
      (error) => {
        notify('danger', `Erreur lors de la récupération du sitemap: ${error}`);
      }
    );
  };

  const copyToClipboard = async (): Promise<void> => {
    await apiCall(
      () => api.copyToClipboard(sitemap),
      () => {
        notify('success', 'Sitemap copié dans le presse-papier');
      },
      (error) => {
        notify('danger', `Impossible de copier le sitemap: ${error}`);
      }
    );
  };

  const generateSitemap = async (): Promise<void> => {
    await apiCall(
      api.exportSitemap,
      () => {
        notify('success', 'Sitemap généré avec succès et exporté');
      },
      (error) => {
        notify('danger', `Echec de la génération du sitemap: ${error}`);
      }
    );
  };

  useEffect(() => {
    handleApiCall(fetchSitemap, 'isFetching');
  }, []);

  const hasSitemap = sitemap !== '';

  return (
    // <Layout>
    //   <BaseHeaderLayout
    //     title="Sitemap du Pass Culture"
    //     subtitle="Génération et exportation du sitemap.xml dans le dossier public du Srapi."
    //   />
    //   <ContentLayout>
    <>
      {hasSitemap && <AlertWithIssues sitemap={sitemap} />}
      <Flex justifyContent="center" gap={4} padding={8}>
        <ActionButton
          onClick={() => handleApiCall(fetchSitemap, 'isFetching')}
          disabled={status.isFetching}
          isLoading={status.isFetching}
          label="Rafraichir le sitemap"
        />
        <ActionButton
          onClick={() => handleApiCall(generateSitemap, 'isGenerating')}
          disabled={!hasSitemap || status.isGenerating}
          isLoading={status.isGenerating}
          label="Générer le sitemap"
        />
        <ActionButton
          onClick={() => handleApiCall(copyToClipboard, 'isCopying')}
          disabled={!hasSitemap || status.isCopying}
          isLoading={status.isCopying}
          label="Copier"
        />
      </Flex>
      <RouteCounter xmlContent={sitemap} />
      <Box padding={4} background="white" hasRadius>
        <CodeBlock content={sitemap} />
      </Box>
    </>
    //   </ContentLayout>
    // </Layout>
  );
};

export { HomePage };
