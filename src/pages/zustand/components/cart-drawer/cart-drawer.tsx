import type { ProductType } from '@/pages/zustand/zustand.types';

import useZustandStore from '@/pages/zustand/zustand.store';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Drawer, List, Typography, Button, Space, Empty, Divider } from 'antd';
import { useShallow } from 'zustand/react/shallow';

import styles from '@/pages/zustand/components/cart-drawer/cart-drawer.module.css';

const { Text } = Typography;

const CartDrawer = () => {
  const { cart, isDrawerOpen, removeProduct, clearProducts, closeDrawer } = useZustandStore(
    useShallow((state) => ({
      cart: state.cart,
      isDrawerOpen: state.isDrawerOpen,
      removeProduct: state.removeProduct,
      clearProducts: state.clearProducts,
      closeDrawer: state.closeDrawer
    }))
  );

  const handleRemoveProduct = (product: ProductType) => {
    removeProduct(product);
  };

  const handleClearCart = () => {
    clearProducts();
  };

  const calculateTotal = () => cart.reduce((total, product) => total + product.price, 0);

  return (
    <Drawer
      title={
        <Space>
          <ShoppingCartOutlined />
          <span>Cart ({cart.length})</span>
        </Space>
      }
      placement="right"
      onClose={closeDrawer}
      open={isDrawerOpen}
      width={400}
      extra={
        cart.length > 0 && (
          <Button onClick={handleClearCart} danger size="small">
            Clear All
          </Button>
        )
      }
    >
      {cart.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Your cart is empty" />
      ) : (
        <>
          <List
            dataSource={cart}
            renderItem={(product) => (
              <List.Item
                actions={[
                  <Button
                    shape="circle"
                    size="middle"
                    key="remove"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveProduct(product)}
                  />
                ]}
              >
                <List.Item.Meta title={product.name} description={`$${product.price.toFixed(2)}`} />
              </List.Item>
            )}
          />
          <Divider />
          <Space direction="vertical" className={styles.space}>
            <div className={styles.total}>
              <Text strong>Total:</Text>
              <Text strong>${calculateTotal().toFixed(2)}</Text>
            </div>
            <Button type="primary" block size="large">
              Checkout
            </Button>
          </Space>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
