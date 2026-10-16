import { useState } from "react";
import { Alert, Button, ButtonGroup, Container } from "react-bootstrap";
import { Grid, Grid3x3Gap } from "react-bootstrap-icons";
import { SiteHeader } from "./components/SiteHeader";
import { PageHeader } from "./components/PageHeader";
import { CategoryStrip } from "./components/CategoryStrip";
import { ProductToolbar } from "./components/ProductToolbar";
import { ProductGrid } from "./components/ProductGrid";
import { ProductForm } from "./components/ProductForm";
import { products as initialProducts } from "./data/products";
import {
  applySort,
  buildCategories,
  filterProducts,
  PLACEHOLDER_THUMBNAIL,
  type SortKey,
} from "./lib/catalog";
import type { Density, Product, ProductDraft } from "./types";
import { ConfirmDialog } from "./components/ConfirmDialog";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [density, setDensity] = useState<Density>("comfortable");
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [flash, setFlash] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);

  function toggleWishlist(id: number) {
    setWishlist((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  function handleCreate(payload: ProductDraft) {
    const created: Product = {
      // the annotation makes TS check we built a WHOLE product
      ...payload,
      id: Date.now(), // fine until the server hands out ids in Demo 8
      rating: 0,
      discountPercentage: 0,
      thumbnail: PLACEHOLDER_THUMBNAIL,
      tags: [],
    };
    setProducts((current) => [created, ...current]); // prepend — a NEW array
    setShowForm(false);
    setFlash(`“${created.title}” added.`);
  }

  function handleDelete() {
    if (!pendingDelete) return; // narrows Product | null → Product
    const product = pendingDelete;
    setProducts((current) => current.filter((p) => p.id !== product.id));
    setWishlist((current) => current.filter((id) => id !== product.id)); // keep the wishlist honest
    setPendingDelete(null);
    setFlash(`“${product.title}” deleted.`);
  }

  // TODO(lab-1.3): query + sort state; derive visibleProducts with filterProducts() and applySort()
  // TODO(lab-2.1): lift the wishlist here — number[] of product ids, updated immutably
  // TODO(lab-3.2): products become STATE (useState<Product[]>(initialProducts)) so the form can add to them
  // TODO(lab-4.2): pendingDelete state (Product | null), a delete handler, and a dismissible flash <Alert>

  const categories = buildCategories(products);
  const visibleProducts = applySort(
    filterProducts(products, { query, category: activeCategory }),
    sort,
  );

  return (
    <>
      <SiteHeader cartCount={3} wishlistCount={wishlist.length} />

      <Container className="py-4">
        <PageHeader
          title="All products"
          description={`${visibleProducts.length} of ${products.length} products`}
          actions={
            <>
              <ButtonGroup size="sm" aria-label="Grid density">
                <Button
                  variant={
                    density === "comfortable"
                      ? "secondary"
                      : "outline-secondary"
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
              <Button size="sm" onClick={() => setShowForm(true)}>
                Add product
              </Button>
            </>
          }
        />

        {flash && (
          <Alert variant="success" dismissible onClose={() => setFlash(null)}>
            {flash}
          </Alert>
        )}

        <ProductToolbar
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          resultCount={visibleProducts.length}
        />

        <CategoryStrip
          categories={categories}
          activeId={activeCategory}
          onSelect={setActiveCategory}
        />

        <ProductGrid
          products={visibleProducts}
          density={density}
          wishlist={wishlist}
          onToggleSave={toggleWishlist}
          onDelete={setPendingDelete}
        />

        <ConfirmDialog
          show={!!pendingDelete}
          title="Delete product"
          body={`Delete “${pendingDelete?.title}”? This can't be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      </Container>

      <ProductForm
        show={showForm}
        categories={categories}
        onCreate={handleCreate}
        onClose={() => setShowForm(false)}
      />
    </>
  );
}
