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
  const [isFetching, setIsFetching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const toggleNotification = useNotification();

  const notify = (type: "error" | "success", message: string): void => {
    toggleNotification({ type, message });
  };

  const fetchSitemap = async (): Promise<void> => {
    setIsFetching(true);
    apiCall(
      api.getSitemapPreview,
      (response) => {
        setSitemap(response);
        setIsFetching(false);
      },
      (error) => {
        notify("error", `Erreur lors de la récupération du sitemap: ${error}`);
        setIsFetching(false);
      }
    );
  };
  const copyToClipboard = async (): Promise<void> => {
    apiCall(
      () => api.copyToClipboard(sitemap),
      () => {
        notify("success", "Sitemap copié dans le presse-papier");
        setIsCopying(false);
      },
      (error) => {
        notify("error", `Impossible de copier le sitemap: ${error}`);
        setIsCopying(false);
      }
    );
  };

  const generateSitemap = async (): Promise<void> => {
    setIsGenerating(true);
    apiCall(
      api.exportSitemap,
      () => {
        notify("success", "Sitemap généré avec succès et exporté");
        setIsGenerating(false);
      },
      (error) => {
        notify("error", `Echec de la génération du sitemap: ${error}`);
        setIsGenerating(false);
      }
    );
  };

  useEffect(() => {
    fetchSitemap();
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
            onClick={fetchSitemap}
            disabled={isFetching}
            isLoading={isFetching}
            aria-label="Rafraichir le sitemap"
            label="Rafraichir le sitemap"
          />

          <ActionButton
            onClick={generateSitemap}
            disabled={!hasSitemap || isGenerating}
            isLoading={isGenerating}
            aria-label="Générer le sitemap"
            label="Générer le sitemap"
          />
          <ActionButton
            onClick={copyToClipboard}
            disabled={!hasSitemap || isCopying}
            isLoading={isCopying}
            aria-label="Copier le sitemap dans le presse-papier"
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
