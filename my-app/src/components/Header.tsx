import { Link } from "react-router";
import { useCartStore } from "../stores/useCartStore";
import "./Header.css"; //side effect import
import { Badge, Container, Navbar, NavLink } from "react-bootstrap";

function Header() {
  const lineItems = useCartStore((state) => state.lineItems);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Helpdesk</Navbar.Brand>

        <Link to="/cart" className="text-decoration-none">
          Cart <Badge bg="primary">{lineItems.length}</Badge>
        </Link>
      </Container>
    </Navbar>
  );
}

export default Header;
