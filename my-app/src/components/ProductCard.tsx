
export default function ProductCard({ product }) {

    // const [data, setData] = useState([]);
    //   const [loading, setLoading] = useState(true);
    //   const [error, setError] = useState(null);


    //useEffect()   //fetch the reviews of this specific product 


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
      </div>
    </div>
  );
}