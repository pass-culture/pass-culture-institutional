import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";

import PluginPage from "./PluginPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<PluginPage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
