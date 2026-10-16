

import ProductCard from "./ProductCard";
import { useFetch } from "../hook/useFetch";

export default function ProductGrid() {
  
   const {data: productsData, loading: productsLoading, error: productsError} =  useFetch("https://dummyjson.com/products")

   const {data: categoryData, loading: categoriesLoading, error: categoriesError } =  useFetch('https://dummyjson.com/products/categories')
  

   const products = productsData?.products ?? [] 
   const categories = categoryData

  return (
    <div className="container py-4">
      <h2>Our Products</h2>

      {/* Categories */}
      <h4 className="mt-4">Categories</h4>

      {categoriesLoading && <p>Loading categories...</p>}

      {categoriesError && (
        <p className="text-danger">{categoriesError}</p>
      )}

      {!categoriesLoading && !categoriesError && (
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <span
              key={category.slug}
              className="badge bg-secondary"
            >
              {category.name}
            </span>
          ))}
        </div>
      )}

      {/* Products */}
      <h4>Products</h4>

      {productsLoading && <p>Loading products...</p>}

      {productsError && (
        <p className="text-danger">{productsError}</p>
      )}

      {!productsLoading && !productsError && (
        <div className="row g-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
