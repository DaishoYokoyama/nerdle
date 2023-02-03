import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Nerdle } from "@/components/pages/Nerdle";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Nerdle />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);
