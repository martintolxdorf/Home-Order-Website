import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import httpUser from '../httpUser'
// import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Image from 'react-bootstrap/Image'

var loadMongoData = true;
var urlPic = "null";

const Dashboard = (props) => {
	
	// Takes default data / blanks until data is loaded from Mongo. ID and access taken from token. 
	var userInfo = {_id: httpUser.getCurrentUser()._id, access: httpUser.getCurrentUser().access, name: " ", email: " ", phone: " ", password: " ", bio:  " ", profile_link: 'https://res.cloudinary.com/napper/image/upload/v1597033339/home_order/j3vxj9dq4arev4vh9qyx.png'};

	const [fields, setFields] = useState({id: userInfo._id, name: userInfo.name, email: userInfo.email, phone: userInfo.phone, bio: userInfo.bio, profile_link: userInfo.profile_link});
	const [info, setInfo] = useState({id: userInfo._id, name: userInfo.name, email: userInfo.email, phone: userInfo.phone, bio: userInfo.bio, profile_link: userInfo.profile_link});
	
	//Loadingg
	const [loading, setLoading] = useState(false);

	// Fields and info will be loaded with data from mongodb
	// fields for the inputs
	// info for the text
	async function setFieldsWithMongoData(e){
			userInfo = await httpUser.returnUserInfo(e);
			// console.log(userInfo.profile_link);
			setFields(fields => ({name: userInfo.name, email: userInfo.email, phone: userInfo.phone, bio: userInfo.bio, profile_link: userInfo.profile_link}));
			setInfo(info => ({name: userInfo.name, email: userInfo.email, phone: userInfo.phone, bio: userInfo.bio, profile_link: userInfo.profile_link}));
			loadMongoData = false;
		return true;
	}
	// only loads mongoData once
	if(loadMongoData){
		setFieldsWithMongoData(userInfo);
	}

	// retrieves user orders
	// ISSUE: Looks up order by name but name can be changed
	// SOLUTION: order paramater needs to be changed to ID. 
	const [orders, setOrders] = useState([]);


	useEffect(() => {
        async function fetchOrders() {
            const result = await Axios.get('/orders/all');
            setOrders(result.data.filter(order => order.username === userInfo.name).map(order => {
				return <p key={order._id}>{order.store} | {order.price} | {order.status} {order.status.substr(0,9) === "Completed" ? <>prompt for rating here?</> : null}</p> ;
			}));
        }
		async function fetchVolunteerOrders() {
			const result = await Axios.get('/orders/all');
			setOrders(result.data.filter(order => order.status === "Accepted by: " + userInfo.name).map(order => {
				return <>
					<p key={order._id}>{order.store} | {order.address} | {order.price} </p>
					<Button type="submit" size="sm" variant="flat" onClick={() => {
						Axios.post('/orders/update/' + order._id, {status: "Completed by: " + userInfo.name});  // need to refresh the page for it to update, will fix later
					}}>Completed</Button>
				</>;
			}));
		}
		if(userInfo.access === "Volunteer") fetchVolunteerOrders();
		else fetchOrders();
	}, [userInfo.name, userInfo.access]);
	

	
	const [Service, setService] = useState([]);
	useEffect(() => {
        async function fetchService() {
            const result = await Axios.get('/services/' + info.name);
            setService(result.data.map(service => {
				
				return <p>{service.content} | {service.status}</p>;
			}));
        }
        fetchService();
    }, [info.name]);
		
    // used to update user input
    const onInputChange = (e) => {
		e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}));
    };

	const uploadImage = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'profile_name')
		setLoading(true);
		
		const res = await fetch(
		  ' https://api.cloudinary.com/v1_1/napper/image/upload',
		  {
			method: 'POST',
			body: data
		  }
		)
		const file = await res.json()
		urlPic = file.url;
		setLoading(false);
	  }

    // Update Profile Information
    const onFormSubmit = async (e) => {
		// e.preventDefault(); //this prevents page refresh. I like page refresh
		console.log(urlPic);
		// Set new URL or keep old one. 
		if(urlPic === "null"){ fields.profile_link = info.profile_link; }
		else{ fields.profile_link = urlPic; }

		//update userInfo
		fields._id = userInfo._id;
		console.log(fields);

		await httpUser.updateUser(fields);
		
        alert("Information Updated");
    };

	return (
		<div style={{marginLeft:'50px', marginRight:'50px'}}>      
			<h1 style={{textAlign:'center'}}>Hello {info.name},</h1>
			<h3 style={{textAlign:'center'}}>Welcome to your profile page where you can edit your profile and view your orders.</h3>
			<hr className="my-4" />
			<h1> </h1>
			<Row>
				<Col xs={12} md={4}>
					<Jumbotron>
						<img  className="img-thumbnail mx-auto d-block" width='250px' height='270px' alt='profile'
						src={info.profile_link}/>
						<h2> </h2>
						<h3 style={{textAlign:'center'}}> {info.name} </h3>
						<h6 style={{textAlign:'center', fontWeight: '100'}}>{userInfo.access} </h6>
						<h6 style={{textAlign:'center', fontWeight: '100'}}>{info.phone} </h6>
						<h6 style={{textAlign:'center', fontWeight: '100'}}>{info.email} </h6>						
						<hr className="my-4" />
						<h6 style={{textAlign:'center', fontWeight: '100'}}> {info.bio} </h6>
					</Jumbotron>
					<Jumbotron style={{textAlign: 'center'}}> 
						<h3>Your Orders</h3>
						<hr className="my-4" />
						{orders}
					</Jumbotron>
					{userInfo.access !== "Volunteer" ?   // could use some styling
						<div>					
						<Jumbotron style={{textAlign: 'center'}}> 
							<h3>Your Services</h3>
							<hr className="my-4" />
							<p>{Service}</p>
						</Jumbotron>	
						</div>
						: 
						null
					}
				</Col>
				<Col xs={12} md={8}>
					<Jumbotron>
						<Form onChange={onInputChange} onSubmit={onFormSubmit}>
							<Form.Group controlId="email">
								<h4>Edit Profile</h4>
								<Form.Label>Name</Form.Label>
									<Form.Control type="text" placeholder="Name" name="name" value={fields.name} />      
								<Form.Label>Email</Form.Label>
									<Form.Control type="text" placeholder="Email" name="email" value={fields.email} />                       
								<Form.Label>Phone</Form.Label>
									<Form.Control type="text" placeholder="Phone" name="phone" value={fields.phone} />                             
								<Form.Label>List Expertise</Form.Label>
									{userInfo.access === "Volunteer" ?
									<Form.Control type="text" placeholder="List expertise" name="bio" value={fields.bio} /> 
									:
									<Form.Control type="text" placeholder="Bio" name="bio" value={fields.bio} /> 
									}
								<Form.Label>Profile Picture</Form.Label>
									<Form.Control type="file" name="file" onChange={uploadImage}/>                       
									{/* loading message */}
									{loading ? (
									<center><p>Loading...</p></center>
									) : ( <p></p> )}
									
								<hr className="my-4" />
								<Button type="submit" size="md" variant="flat">
									Update Information
								</Button>
							</Form.Group>
						</Form>
					</Jumbotron>
				</Col>	
			</Row>		
		</div>
	)
};

export default Dashboard;
