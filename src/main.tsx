import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import router from '@/router';
import { themeConfig } from '@/theme';
import { RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';

import 'antd/dist/reset.css';
import '@/styles/global.css';

const root = document.querySelector('#root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>
  );
}
