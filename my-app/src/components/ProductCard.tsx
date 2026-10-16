import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useCartStore } from "../stores/useCartStore";

export default function ProductCard({ product }) {

  const addItem =  useCartStore( state => state.addItem)

  const {savedIds, toggleWishlist} = useWishlist()

  const saved = savedIds.includes(product.id)

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

      <Button
        variant="light"
        size="sm"
        className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
        onClick={() => toggleWishlist(product.id)}
      >
        {saved ? <HeartFill className="text-danger" /> : <Heart />}
      </Button>

      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>

        <p className="card-text">
          ${product.price}
        </p>

        <p className="text-muted">
          {product.category}
        </p>

        <Row>
          <Col>
                  <Button onClick={handleViewDetails} className="btn btn-primary">View Details</Button>
          </Col>

          <Col>
              <Button onClick={ ()=> addItem(product)} className="btn btn-info">Add to Cart</Button>
            </Col>
        </Row>

        
      </div>
    </div>
  );
}