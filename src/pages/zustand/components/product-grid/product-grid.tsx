import type { ProductType } from '@/pages/zustand/zustand.types';

import ProductCard from '@/pages/zustand/components/product-card';
import useZustandStore from '@/pages/zustand/zustand.store';
import { Row, Col } from 'antd';

interface ProductGridProps {
  products: ProductType[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const addProduct = useZustandStore((state) => state.addProduct);
  const cart = useZustandStore((state) => state.cart);
  const handleAddToCart = (product: ProductType) => {
    addProduct(product);
  };
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
          <ProductCard
            product={product}
            onAddToCart={handleAddToCart}
            inCart={cart.some((item: ProductType) => item.id === product.id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
