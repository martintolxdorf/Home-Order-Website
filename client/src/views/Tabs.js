import React from 'react';
import './Home/Home.css';
import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import Container from 'react-bootstrap/Container'
// import httpUser from '../../httpUser'



const Tabs = (props) => {
	

const Products = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    I know what I want.
  </Tooltip>
);

const Services = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    I need someone to help me.
  </Tooltip>
);
	// if("userInfo.access" == "Volunteer"){
	// 		return (
	// 		<div className="text-center">
	// 				   {props.currentUser ?
	// 					   (
	// 					   <div className='mt-2 mb-2'>
	// 						   <Container style={{webkitBoxShadow: '0 8px 6px -6px #999',
	// 							mozBoxShadow: '0 8px 6px -6px #999',
	// 							boxShadow: '0 8px 6px -6px #999'}}>
	// 							   <Button variant="tabs" href="questions">Questions</Button>
	// 							   <OverlayTrigger
	// 									placement="top"
	// 									delay={{ show: 50, hide: 50 }}
	// 									overlay={Products}
	// 							   >
	// 							   <Button variant="tabs" href="cart">Orders</Button>
	// 							   </OverlayTrigger>
	// 							   <OverlayTrigger
	// 									placement="top"
	// 									delay={{ show: 50, hide: 50 }}
	// 									overlay={Services}
	// 							   >
	// 							   <Button variant="tabs" href="services">Services</Button>
	// 							   </OverlayTrigger>
	// 						   </Container>
	// 					   </div>
	// 					   ) :
	// 					   (
	// 						   <div>	
	// 						   </div>
	// 					   )
	// 				   }
	// 		</div>
	// 	   )
	// }
	// else{
		return (
			<div className="text-center">
					   {props.currentUser ?
						   (
						   <div className='mt-2 mb-2' >
							   <div  >
								   <Button variant="tabs" href="questions">Questions</Button>
								   {props.currentUser.access === "Volunteer" ?
										<Button variant="tabs" href="order">Orders</Button> : /*should be fixed to allow admin access*/
										<OverlayTrigger
												placement="top"
												delay={{ show: 50, hide: 50 }}
												overlay={Products}
										>
										<Button variant="tabs" href="cart">Products</Button>
										</OverlayTrigger>}
								   <OverlayTrigger
										placement="top"
										delay={{ show: 50, hide: 50 }}
										overlay={Services}
								   >
								   <Button variant="tabs" href="service">Services</Button>
								   </OverlayTrigger>
							   </div>
						   </div>
						   ) :
						   (
							   <div>	
							   </div>
						   )
					   }
			</div>
		   )
	}
	
//};

export default Tabs;
