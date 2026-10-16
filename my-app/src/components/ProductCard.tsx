import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ProductCard({ product }) {

  const navigate = useNavigate()


  function handleViewDetails(){
    navigate(`/products/${product.id}`)
  }   


  return (
    <div className="card h-100">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        style={{
          height: "180px",
          objectFit: "contain"
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>

        <p className="card-text">
          ${product.price}
        </p>

        <p className="text-muted">
          {product.category}
        </p>

        <Button onClick={handleViewDetails} className="btn btn-primary">View Details</Button>

      </div>
    </div>
  );
}