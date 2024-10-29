
"use client"
import { MantineProvider } from '@mantine/core';
import { CopilotKit } from '@copilotkit/react-core'; 
import '@mantine/core/styles.css';
import '@copilotkit/react-ui/styles.css';
import './globals.css';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CopilotKit runtimeUrl="/api/copilotkit">
          <MantineProvider withGlobalStyles withNormalizeCSS>
            {children}
          </MantineProvider>
        </CopilotKit>
      </body>
    </html>
  );
}
