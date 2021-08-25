import React, {Component} from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import Home from './Home'
import Stats from './Stats'
import Admin from './Admin'

class NavBar extends Component {
  render = () => {
    return (
        <Router>
        <Navbar collapseOnSelect expand="sm"  bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/" className="border border-white rounded">Whist</Navbar.Brand>
                <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/stats">Stats</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>

        <Route path="/" exact render={() =><Home/>}/>
        <Route path="/stats" exact render={() =><Stats/>}/>
        <Route path="/admin" exact render={() =><Admin/>}/>
      </Router>
    )
  }
}

export default NavBar;