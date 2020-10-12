import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// import Button from 'react-bootstrap/Button'

function Home() {
    return (
        <div>
          <Container>
		  <Row>
			<Col xs={12} md={6}>
				<Jumbotron>
					<img
					src='/BlackLogo.png'
					width='100%'
					height='100%'
					alt='logo'
					/>
					<hr className="my-4" />	
					<div style={{display:'flex', justifyContent: 'space-between'}}>
						<h5>Already have an account? Login!</h5>
						<Button href="login" variant="flat" size="md">Log In</Button>
					</div>
					<hr className="my-4" />
					<div style={{display:'flex', justifyContent: 'space-between'}}>
						<h5>Are you new to our page? Sign up!</h5>
						<Button href="signup" variant="flat" size="md">Sign Up</Button>
					</div>
				</Jumbotron>
			</Col>
			<Col xs={12} md={6}>
				<Jumbotron>
					<h1>About Us:</h1>
					<p>Welcome to Home Order, your go-to website for getting all your home improvement projects done without having to leave your home at all! Whether you know what tools and materials you need for a project or you want help from one of our qualified volunteers to do it for you, we’ve got you covered. Also, if you just have questions about a project and you need some advice, check out our “Community Board” tab where you can talk with other crafty people about what you’re working on. The “Products” tab above is where you can find hardware stores in your area so you can make a list of items for one of our volunteers to pick up and deliver right to your door. And finally, our “Services” tab is where you can enlist the help of one of our many local and highly qualified volunteers. All you have to do is post the details of the job you want to have done and then after our volunteers reply to your post, you can pick the volunteer that is best suited to meet your needs.</p>	
				</Jumbotron>
			</Col>
		</Row>
		</Container>
        </div>
    );
}

export default Home;
