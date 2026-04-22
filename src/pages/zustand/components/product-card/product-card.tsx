import type { ProductType } from '@/pages/zustand/zustand.types';

import { GiftOutlined, ShoppingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

import styles from '@/pages/zustand/components/product-card/product-card.module.css';

const { Text, Title } = Typography;

const DECOR = [ShoppingOutlined, GiftOutlined, ThunderboltOutlined] as const;

const pickDecor = (product: ProductType) => {
  const n = (Number.parseInt(product.id, 10) + product.name.length) % DECOR.length;
  return DECOR.at(n) ?? ShoppingOutlined;
};

interface ProductCardProps {
  inCart: boolean;
  onCartAction: (product: ProductType) => void;
  product: ProductType;
}

const ProductCard = ({ inCart, onCartAction, product }: ProductCardProps) => {
  const DecorIcon = pickDecor(product);
  return (
    <Card
      actions={[
        <Button
          key="cart"
          danger={inCart}
          icon={<ShoppingOutlined />}
          type={inCart ? 'default' : 'primary'}
          onClick={() => onCartAction(product)}
        >
          {inCart ? 'Remove' : 'Add to cart'}
        </Button>
      ]}
      className={styles.card}
      hoverable
    >
      <div aria-hidden className={styles.thumb}>
        <DecorIcon className={styles.thumbIcon} />
      </div>
      <Space className={styles.content} direction="vertical" size="small">
        <Text className={styles.name} strong>
          {product.name}
        </Text>
        <Text className={styles.tagline} ellipsis type="secondary">
          {product.tagline}
        </Text>
        <Title className={styles.price} level={4}>
          ${product.price.toFixed(2)}
        </Title>
      </Space>
    </Card>
  );
};

export default ProductCard;
