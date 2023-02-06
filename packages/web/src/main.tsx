import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Nerdle } from "./components/pages/Nerdle";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider position="top-right">
          <Nerdle />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);
