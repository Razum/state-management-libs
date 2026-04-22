import type { ThemeConfig } from 'antd';

import { theme } from 'antd';

export const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  cssVar: {},
  hashed: false,
  token: {
    borderRadius: 8,
    boxShadowSecondary: '0 4px 12px rgba(15, 23, 42, 0.06)',
    colorBgLayout: '#f5f7fa',
    colorInfo: '#0891b2',
    colorPrimary: '#0891b2',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 15
  },
  components: {
    Button: {
      controlHeight: 36
    },
    Card: {
      borderRadiusLG: 12
    },
    Layout: {
      footerBg: 'transparent',
      headerBg: '#0f172a',
      headerColor: '#e2e8f0'
    }
  }
};
