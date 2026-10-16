import ProductCard from "./ProductCard";
import { useLoaderData, useRouteLoaderData } from "react-router";
import axios from "axios";
import type { Product } from "./ProductDetail";

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export async function productGridLoader(request) {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([

      axios.get<ProductListResponse>("https://dummyjson.com/products", {
        params: { limit: 10 },
        signal: request.signal,
      }),

      axios.get<Category[]>("https://dummyjson.com/products/categories", {
        signal: request.signal,
      }),
    ]);

    return {
      products: productsResponse.data.products,
      categories: categoriesResponse.data,
    };
  } catch (error) {
    if (request.signal.aborted) {
      throw error;
    }

    throw new Response("Failed to load products or categories", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

export default function ProductGrid() {
  console.log("ProductGrid Rendered");

  const {products, categories} = useLoaderData();

  return (
    <div className="container py-4">
      <h2>Our Products</h2>

      {/* Categories */}
      <h4 className="mt-4">Categories</h4>

      {/* {categoriesLoading && <p>Loading categories...</p>} */}

      {/* {categoriesError && (
        <p className="text-danger">{categoriesError}</p>
      )} */}

      {categories && (
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

      {/* {productsLoading && <p>Loading products...</p>} */}

      {/* {productsError && (
        <p className="text-danger">{productsError}</p>
      )} */}

      {products && (
        <div className="row g-3">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
