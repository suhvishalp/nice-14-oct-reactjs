import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";


export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        setProduct(null);

        const { data } = await axios.get<Product>(
          `https://dummyjson.com/products/${productId}`,
          {
            signal: controller.signal,
          }
        );

        setProduct(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            axios.isAxiosError(err) && err.response?.status === 404
              ? "Product not found."
              : "Failed to fetch product details."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (productId && /^\d+$/.test(productId)) {
      fetchProduct();
    } else {
      setProduct(null);
      setError("Invalid product ID.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [productId]);


   if (loading) {
    return (
      <div className="p-4">
        <Spinner animation="border" />
        <p>Loading product...</p>
      </div>
    );
  }

   if (error) {
    return (
      <div className="p-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

   return (
    <div className="container py-4">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </Button>

      <Card className="shadow-sm">
        <Row className="g-0">
          <Col md={5} className="p-4">
            <img
              src={product.images?.[0] ?? product.thumbnail}
              alt={product.title}
              className="img-fluid"
              style={{
                width: "100%",
                height: "350px",
                objectFit: "contain",
              }}
            />
          </Col>

          <Col md={7}>
            <Card.Body className="p-4">
              <Badge bg="secondary" className="mb-3">
                {product.category}
              </Badge>

              <Card.Title as="h2">
                {product.title}
              </Card.Title>

              {product.brand && (
                <p className="text-muted">
                  Brand: {product.brand}
                </p>
              )}

              <h3 className="text-primary">
                ${product.price}
              </h3>

              <p>{product.description}</p>

              <p>
                <strong>Rating:</strong> ⭐ {product.rating}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              <Badge bg={product.stock > 0 ? "success" : "danger"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
