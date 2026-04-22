import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import router from '@/router';
import { RouterProvider } from '@tanstack/react-router';
import { ConfigProvider, theme } from 'antd';

import 'antd/dist/reset.css';

const root = document.querySelector('#root');

const themeConfig = {
  cssVar: {},
  algorithm: theme.defaultAlgorithm,
  token: {
    fontSize: 18
  }
};

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>
  );
}
