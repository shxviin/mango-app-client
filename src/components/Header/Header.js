import './Header.css';
import { Button, Navbar, Nav, Form, Container } from 'react-bootstrap';
import Mango from './Mango.png';

const Header = () => {

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand><img style={{ width: 50, height: 50 }} src={Mango} alt="logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>Features</Nav.Link>
                <Nav.Link>Pricing</Nav.Link>
            </Nav>
            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <Button style={{marginRight:"10px"}} variant="outline-info">Sign In</Button>
                <Button className="button" variant="outline-success">Sign Up</Button>
            </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;