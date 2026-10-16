
import './Header.css'               //side effect import
import { Container, Navbar } from 'react-bootstrap'


function Header() {
  return (
   <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Helpdesk</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
