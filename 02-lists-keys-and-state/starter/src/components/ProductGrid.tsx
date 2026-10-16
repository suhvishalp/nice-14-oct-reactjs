import { Col, Row } from "react-bootstrap";
import type { Density, Product } from "../types";
import { ProductCard } from "./ProductCard";
import { BoxSeam } from "react-bootstrap-icons";

const COLUMNS: Record<Density, { xs: number; sm: number; md: number; xl: number }> = {
  comfortable: { xs: 1, sm: 2, md: 3, xl: 4 },
  compact: { xs: 2, sm: 3, md: 4, xl: 6 },
};

interface ProductGridProps {
  products: Product[]
  density: Density
}

/**
 * Renders ONE product, hard-coded. Twenty-four are passed in.
 * Lab 1.1 turns this into a .map(); Lab 1.2 handles the empty list.
 */
export function ProductGrid({ products, density }: ProductGridProps) {
  // TODO(lab-1.2): early-return an empty state when products.length === 0

  if (products.length == 0) {
    return (
      <div
        className="text-center text-muted rounded-3 border py-5"
        style={{ borderStyle: "dashed" }}
      >
        <BoxSeam size={32} className="mb-2" />
        <p className="fw-medium mb-0">No products found</p>
        <p className="small mb-0">Try a different category.</p>
      </div>
    );
  }

  return (
    <Row {...COLUMNS[density]} className="g-3">
      {/* TODO(lab-1.1): replace this single hard-coded card with products.map(...) — and give each a key */}

      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} density={density}  />
        </Col>
      ))}
    </Row>
  );
}
