import { Badge, Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Cart3, Shop, Heart } from "react-bootstrap-icons";

function CountBadge({ count, label }: { count: number; label: string }) {
  if (count <= 0) return null;
  return (
    <Badge
      pill
      bg="primary"
      className="position-absolute top-0 start-100 translate-middle"
    >
      {count}
      <span className="visually-hidden"> {label}</span>
    </Badge>
  );
}

/** Data, not markup. The nav is rendered FROM this, so adding a link is a data change. */
const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
];

interface SiteHeaderProps {
  cartCount?: number;
  wishlistCount?: number;
}

// TODO(lab-2.3): add a `wishlistCount` prop and show it as a heart badge next to the cart
export function SiteHeader({
  cartCount = 0,
  wishlistCount = 0,
}: SiteHeaderProps) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand href="#">
          <Shop className="me-2" />
          ShopScope
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {NAV_LINKS.map((link) => (
              <Nav.Link key={link.label} href={link.href}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <Form
            className="d-none d-sm-flex me-2"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="search"
              size="sm"
              placeholder="Search products"
              aria-label="Search products"
            />
          </Form>

          <div className="d-flex gap-3">
            <Button
              variant="outline-light"
              size="sm"
              className="position-relative"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart />
              <CountBadge count={wishlistCount} label="saved" />
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              className="position-relative"
              aria-label={`Cart, ${cartCount} items`}
            >
              <Cart3 />
              <CountBadge count={cartCount} label="in cart" />
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
