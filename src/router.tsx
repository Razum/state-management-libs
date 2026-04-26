import Layout from '@/components/layout';
import Home from '@/pages/home';
import Jotai from '@/pages/jotai';
import MobX from '@/pages/mobx';
import Valtio from '@/pages/valtio';
import Zustand from '@/pages/zustand';
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: Layout
});

const IndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
});

const MobXRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mobx',
  component: MobX
});

const ZustandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/zustand',
  component: Zustand
});

const JotaiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jotai',
  component: Jotai
});

const ValtioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/valtio',
  component: Valtio
});

const routeTree = rootRoute.addChildren([
  IndexRoute,
  MobXRoute,
  ZustandRoute,
  JotaiRoute,
  ValtioRoute
]);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true
});

export default router;
