import React, { useEffect, useState } from "react";
import { Flex } from "@strapi/design-system/Flex";
import {
  BaseHeaderLayout,
  ContentLayout,
  Layout,
} from "@strapi/design-system/Layout";
import { Box } from "@strapi/design-system/Box";
import api from "../../utils/api";
import { useNotification } from "@strapi/helper-plugin";
import CodeBlock from "../../components/PluginComponents/code-block";
import { RouteCounter } from "../../components/PluginComponents/route-counter";
import AlertWithIssues from "../../components/PluginComponents/alert-issues";
import { apiCall } from "../../utils/apiCall";
import ActionButton from "../../components/PluginComponents/action-button";
const HomePage = () => {
  const [sitemap, setSitemap] = useState<string>("");
  const [status, setStatus] = useState<{
    isFetching: boolean;
    isGenerating: boolean;
    isCopying: boolean;
  }>({
    isFetching: false,
    isGenerating: false,
    isCopying: false,
  });

  const toggleNotification = useNotification();

  const notify = (type: "error" | "success", message: string): void => {
    toggleNotification({ type, message });
  };

  const handleApiCall = async (
    action: () => Promise<void>,
    statusKey: keyof typeof status
  ) => {
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
        notify("error", `Erreur lors de la récupération du sitemap: ${error}`);
      }
    );
  };

  const copyToClipboard = async (): Promise<void> => {
    await apiCall(
      () => api.copyToClipboard(sitemap),
      () => {
        notify("success", "Sitemap copié dans le presse-papier");
      },
      (error) => {
        notify("error", `Impossible de copier le sitemap: ${error}`);
      }
    );
  };

  const generateSitemap = async (): Promise<void> => {
    await apiCall(
      api.exportSitemap,
      () => {
        notify("success", "Sitemap généré avec succès et exporté");
      },
      (error) => {
        notify("error", `Echec de la génération du sitemap: ${error}`);
      }
    );
  };

  useEffect(() => {
    handleApiCall(fetchSitemap, "isFetching");
  }, []);

  const hasSitemap = sitemap !== "";

  return (
    <Layout>
      <BaseHeaderLayout
        title="Sitemap du Pass Culture"
        subtitle="Génération et exportation du sitemap.xml dans le dossier public du Srapi."
      />
      <ContentLayout>
        {hasSitemap && <AlertWithIssues sitemap={sitemap} />}
        <Flex justifyContent="center" gap={4} padding={8}>
          <ActionButton
            onClick={() => handleApiCall(fetchSitemap, "isFetching")}
            disabled={status.isFetching}
            isLoading={status.isFetching}
            label="Rafraichir le sitemap"
          />
          <ActionButton
            onClick={() => handleApiCall(generateSitemap, "isGenerating")}
            disabled={!hasSitemap || status.isGenerating}
            isLoading={status.isGenerating}
            label="Générer le sitemap"
          />
          <ActionButton
            onClick={() => handleApiCall(copyToClipboard, "isCopying")}
            disabled={!hasSitemap || status.isCopying}
            isLoading={status.isCopying}
            label="Copier"
          />
        </Flex>
        <RouteCounter xmlContent={sitemap} />
        <Box padding={4} background="white" hasRadius>
          <CodeBlock content={sitemap} />
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
