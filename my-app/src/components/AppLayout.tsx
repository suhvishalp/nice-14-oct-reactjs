import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { SideNav } from "./SideNav";
import { Outlet } from "react-router";
import { queues } from "../data/tickets";

export function AppLayout() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="g-0">
        <Col md={3} className="bg-white border-end min-vh-100">
          <SideNav queues={queues} activeId="inbox" />
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
