import type { ProductType } from '@/pages/zustand/zustand.types';

import ProductCard from '@/pages/zustand/components/product-card';
import useZustandStore from '@/pages/zustand/zustand.store';
import { Col, Row } from 'antd';

interface ProductGridProps {
  products: ProductType[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const addProduct = useZustandStore((state) => state.addProduct);
  const removeProduct = useZustandStore((state) => state.removeProduct);
  const cart = useZustandStore((state) => state.cart);

  const handleCartAction = (product: ProductType) => {
    const inCart = cart.some((item: ProductType) => item.id === product.id);
    if (inCart) {
      removeProduct(product);
    } else {
      addProduct(product);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} lg={6} md={8} sm={12} xl={6} xs={24}>
          <ProductCard
            inCart={cart.some((item: ProductType) => item.id === product.id)}
            product={product}
            onCartAction={handleCartAction}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
