import CartDrawer from '@/pages/zustand/components/cart-drawer';
import ProductGrid from '@/pages/zustand/components/product-grid';
import products from '@/pages/zustand/zustand.data';
import useZustandStore from '@/pages/zustand/zustand.store';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Typography, Flex, Badge, Button, Space } from 'antd';
import { useShallow } from 'zustand/react/shallow';

const { Title } = Typography;

const ZustandPage = () => {
  const { cart, clearProducts, openDrawer } = useZustandStore(
    useShallow((state) => ({
      cart: state.cart,
      clearProducts: state.clearProducts,
      openDrawer: state.openDrawer
    }))
  );

  return (
    <Flex vertical gap="large">
      <Flex justify="space-between" align="center">
        <Title level={2}>Zustand Product Store</Title>
        <Space size="large">
          <Badge count={cart.length} showZero>
            <Button icon={<ShoppingCartOutlined />} onClick={openDrawer}>
              Cart ({cart.length})
            </Button>
          </Badge>
          {cart.length > 0 && (
            <Button onClick={clearProducts} danger>
              Clear Cart
            </Button>
          )}
        </Space>
      </Flex>

      <ProductGrid products={products} />
      <CartDrawer />
    </Flex>
  );
};

export default ZustandPage;
