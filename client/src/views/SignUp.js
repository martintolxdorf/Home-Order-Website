import React, {useState} from 'react'
import httpUser from '../httpUser'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const SignUp = (props) => {
    const [fields, setFields] = useState({access: '', name: '', email: '', phone: '', password: '', bio: '', profile_link: ''});

    // used to update user input for either password or email
    const onInputChange = (e) => {
		e.persist();
		console.log(fields);
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
		e.preventDefault();

		//default profile pic assigned on signup
		fields.profile_link = 'https://res.cloudinary.com/napper/image/upload/v1597033339/home_order/j3vxj9dq4arev4vh9qyx.png';
		
		const user = await httpUser.signUp(fields);
		
        setFields({access: '', name: '', email: '', phone: '', password: '', bio: '', profile_link: ''} );
        if(user) {
            props.onSignUpSuccess(user);
            props.history.push('/');
        }
    };
	
	const Volunteer = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			DO NOT CHECK unless you wish to deliver products/services for other users as a volunteer.
		</Tooltip>
	);

    return(
		<Container>
		<Jumbotron>
		<div className="text-center">
            <h1>Sign Up</h1>
				<Form onChange={onInputChange} onSubmit={onFormSubmit}>
				<Form.Label><img src="/single-01.svg" width='25' height='25' alt="single-01"/></Form.Label>
					<Form.Group controlId="name">		
						<input type="text" placeholder="Name" name="name" value={fields.name} />
						<Form.Text className="text-muted">
							Enter your Name.
						</Form.Text>
					</Form.Group>
					<Form.Label><img src="/email-84.svg" width='25' height='25' alt="email-84"/></Form.Label>
					<Form.Group controlId="email">		
					
						<input type="text" placeholder="Email" name="email" value={fields.email} />
						<Form.Text className="text-muted">
							Enter your E-Mail.
						</Form.Text>
					</Form.Group>
					<Form.Label><img src="/phone-2.svg" width='25' height='25' alt="phone-2"/></Form.Label>
					<Form.Group controlId="phone">		
					
						<input type="text" placeholder="Phone" name="phone" value={fields.phone} />
						<Form.Text className="text-muted">
							Enter your Phone Number.
						</Form.Text>
					</Form.Group>
					<Form.Label><img src="/lock-open.svg" width='25' height='25' alt="lock-open"/></Form.Label>
						<Form.Group controlId="password">
							<input type="password" placeholder="Password" name="password" value={fields.password} />
						<Form.Text className="text-muted">
							Enter your Password.
						</Form.Text>
						</Form.Group>
						<Form.Group controlId="checkbox">
								<OverlayTrigger
										placement="top"
										delay={{ show: 50, hide: 50 }}
										overlay={Volunteer}
								   >
								<Form.Check type="checkbox" id="Volunteer" name="access" value="Volunteer"/>
								</OverlayTrigger>
								<Form.Text className="text-muted">
									Check if you wish to volunteer for this site.
								</Form.Text>
								
						</Form.Group>
						<Button type="submit" variant="flat">
							Sign Up
						</Button>
					
					
				</Form>
		</div>
		</Jumbotron>	
        </Container>
    )
};

export default SignUp;