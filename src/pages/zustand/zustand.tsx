import CartDrawer from '@/pages/zustand/components/cart-drawer';
import ProductGrid from '@/pages/zustand/components/product-grid';
import products from '@/pages/zustand/zustand.data';
import useZustandStore from '@/pages/zustand/zustand.store';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Flex, Space, Typography } from 'antd';
import { useShallow } from 'zustand/react/shallow';

const { Text } = Typography;

const ZustandPage = () => {
  const { cart, openDrawer } = useZustandStore(
    useShallow((state) => ({
      cart: state.cart,
      openDrawer: state.openDrawer
    }))
  );

  return (
    <Flex vertical gap="large">
      <Flex align="center" justify="space-between" wrap="wrap" gap="middle">
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: 18 }}>
            Product catalog
          </Text>
          <Text type="secondary">
            {products.length} products · click a card to add or remove from the cart
          </Text>
        </Space>
        <Badge count={cart.length} showZero>
          <Button
            aria-label={`Open shopping cart, ${cart.length} items`}
            icon={<ShoppingCartOutlined />}
            type="default"
            onClick={openDrawer}
          >
            Cart
          </Button>
        </Badge>
      </Flex>

      <ProductGrid products={products} />
      <CartDrawer />
    </Flex>
  );
};

export default ZustandPage;
