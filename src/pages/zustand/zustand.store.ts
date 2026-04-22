import type { ProductType } from '@/pages/zustand/zustand.types';

import { create } from 'zustand';

interface ZustandStoreType {
  cart: ProductType[];
  isDrawerOpen: boolean;
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  clearProducts: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const useZustandStore = create<ZustandStoreType>((set) => ({
  cart: [],
  isDrawerOpen: false,
  addProduct: (product: ProductType) => set((state) => ({ cart: [...state.cart, product] })),
  removeProduct: (product: ProductType) =>
    set((state) => ({
      cart: state.cart.filter((p: ProductType) => p.id !== product.id)
    })),
  clearProducts: () => set({ cart: [] }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false })
}));

export default useZustandStore;
