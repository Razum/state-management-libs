import type { ProductType } from '@/pages/zustand/zustand.types';

import { useMemo } from 'react';

import useZustandStore from '@/pages/zustand/zustand.store';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { App, Button, Divider, Drawer, Empty, List, Space, Typography } from 'antd';
import { useShallow } from 'zustand/react/shallow';

import styles from '@/pages/zustand/components/cart-drawer/cart-drawer.module.css';

const { Text } = Typography;

const CartDrawer = () => {
  const { message } = App.useApp();
  const { cart, clearProducts, closeDrawer, isDrawerOpen, removeProduct } = useZustandStore(
    useShallow((state) => ({
      cart: state.cart,
      clearProducts: state.clearProducts,
      closeDrawer: state.closeDrawer,
      isDrawerOpen: state.isDrawerOpen,
      removeProduct: state.removeProduct
    }))
  );

  const total = useMemo(() => cart.reduce((sum, product) => sum + product.price, 0), [cart]);

  const handleRemoveProduct = (product: ProductType) => {
    removeProduct(product);
  };

  const handleClearCart = () => {
    clearProducts();
  };

  const handleCheckout = () => {
    message.success('Order placed (demo)');
  };

  return (
    <Drawer
      extra={
        cart.length > 0 ? (
          <Button danger size="small" onClick={handleClearCart}>
            Clear all
          </Button>
        ) : undefined
      }
      onClose={closeDrawer}
      open={isDrawerOpen}
      placement="right"
      title={
        <Space>
          <ShoppingCartOutlined />
          <span>Cart ({cart.length})</span>
        </Space>
      }
      width={400}
    >
      {cart.length === 0 ? (
        <Empty description="Your cart is empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <List
            dataSource={cart}
            renderItem={(product) => (
              <List.Item
                actions={[
                  <Button
                    key="remove"
                    aria-label={`Remove ${product.name} from cart`}
                    danger
                    icon={<DeleteOutlined />}
                    shape="circle"
                    size="middle"
                    onClick={() => handleRemoveProduct(product)}
                  />
                ]}
              >
                <List.Item.Meta description={`$${product.price.toFixed(2)}`} title={product.name} />
              </List.Item>
            )}
          />
          <Divider />
          <Space className={styles.space} direction="vertical">
            <div className={styles.total}>
              <Text strong>Total</Text>
              <Text strong>${total.toFixed(2)}</Text>
            </div>
            <Button block size="large" type="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Space>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
