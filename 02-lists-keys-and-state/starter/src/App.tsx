import { Button, ButtonGroup, Container } from "react-bootstrap";
import { SiteHeader } from "./components/SiteHeader";
import { PageHeader } from "./components/PageHeader";
import { CategoryStrip } from "./components/CategoryStrip";
import { ProductGrid } from "./components/ProductGrid";
import { products } from "./data/products";
import { useState } from "react";
import { buildCategories } from "./lib/catalog";
import type { Density } from "./types";
import { Grid, Grid3x3Gap } from "react-bootstrap-icons";

export default function App() {
  // TODO(lab-3.2): activeCategory state + DERIVED visibleProducts (no second useState!)
  const [activeCategory, setActiveCategory] = useState("all");

  // TODO(lab-3.3): density state (useState<Density>), and a toggle in PageHeader's `actions` slot
  const [density, setDensity] = useState<Density>("comfortable");

  const categories = buildCategories(products);

  const visibleProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <SiteHeader cartCount={3} />

      <Container className="py-4">
        <PageHeader
          title="All products"
          description={`${visibleProducts.length} of ${products.length} products`}
          actions={
            <ButtonGroup size="sm" aria-label="Grid density">
              <Button
                variant={
                  density === "comfortable" ? "secondary" : "outline-secondary"
                }
                aria-pressed={density === "comfortable"}
                onClick={() => setDensity("comfortable")}
              >
                <Grid className="me-1" />
                Comfortable
              </Button>
              <Button
                variant={
                  density === "compact" ? "secondary" : "outline-secondary"
                }
                aria-pressed={density === "compact"}
                onClick={() => setDensity("compact")}
              >
                <Grid3x3Gap className="me-1" />
                Compact
              </Button>
            </ButtonGroup>
          }
        />

        <CategoryStrip
          categories={categories}
          activeId={activeCategory}
          onSelect={setActiveCategory}
        />

        <ProductGrid products={visibleProducts} density={density} />
      </Container>
    </>
  );
}
