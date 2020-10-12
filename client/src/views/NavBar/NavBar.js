import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'


const NavBar = (props) => {
    return (
	
        <Navbar bg="dark" variant="dark" expand="lg">
			
            {/* Logo */}
            <Navbar.Brand href="Home">
				<img alt="yes"
					src="/HomeOrder.svg"
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				{props.currentUser ?
                    (
                    <Nav className="mr-auto">
						<Nav.Link href="dashboard"><img src="/single-01.svg" height='22' width='22' alt="single-01"/>{' '}Profile</Nav.Link>
						<Nav.Link href="cart"><img src="/cart-simple.svg" height='22' width='22' alt="cart-simple"/>{' '}Cart</Nav.Link>
						<Nav.Link href="Home"><img src="/home-52.svg" height='22' width='22' alt="home-52"/>{' '}Home</Nav.Link>
						<Nav.Link href="logout"><img src="/ic_exit_to_app_48px.svg" height='24' width='24' alt="exit_to_app"/>{' '}Log Out</Nav.Link>
                    </Nav>
                    ) :
                    (
                    <Nav className="mr-auto">
                        <Nav.Link href="login">Log In</Nav.Link>
						<Nav.Link href="signup">Sign Up</Nav.Link>
                    </Nav>
                    )
                }
			</Navbar.Collapse>

            {/* Page Links */}
          

        </Navbar>
	
    )
};

export default NavBar;
