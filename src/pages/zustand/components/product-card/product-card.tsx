import type { ProductType } from '@/pages/zustand/zustand.types';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Button, Typography, Space } from 'antd';

import styles from '@/pages/zustand/components/product-card/product-card.module.css';

const { Title, Text } = Typography;

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
  inCart: boolean;
}

const ProductCard = ({ product, onAddToCart, inCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <Card
      hoverable
      className={styles.card}
      actions={[
        <Button
          key="add-to-cart"
          type={inCart ? 'default' : 'primary'}
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          disabled={inCart}
        >
          {inCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      ]}
    >
      <Space direction="vertical" size="small" className={styles.content}>
        <Title level={4}>{product.name}</Title>
        <Text strong className={styles.price}>
          ${product.price.toFixed(2)}
        </Text>
      </Space>
    </Card>
  );
};

export default ProductCard;
