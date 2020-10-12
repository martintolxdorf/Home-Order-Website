import React, {useState} from 'react'
import httpUser from '../httpUser'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import './LogInOut.css'

const LogIn = (props) => {
    const [fields, setFields] = useState({email: "", password: ""});

    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.logIn(fields);

        setFields({email: '', password: ''} );
        if(user) {
            props.onLoginSuccess(user);
            props.history.push('/');
        }
    };

    return(
        <Container>
		<Jumbotron>
		<div className="text-center">
            <h1>Log In</h1>
				<Form onChange={onInputChange} onSubmit={onFormSubmit}>
					
					<Form.Label><img src='/email-84.svg' height='25' width ='25' alt='email-84'/></Form.Label>
					<Form.Group controlId="email">
						<input type="text" placeholder="Email" name="email" value={fields.email} />
						<Form.Text className="text-muted">
							Enter your E-Mail.
						</Form.Text>
						
					</Form.Group>
						<Form.Label><img src='/lock-open.svg' height='25' width ='25' alt='lock-open'/></Form.Label>
					<Form.Group controlId="password">
							<input type="password" placeholder="Password" name="password" value={fields.password} />
						<Form.Text className="text-muted">
							Enter your Password.
						</Form.Text>
					</Form.Group>
						<Button type="submit" variant="flat">
							Enter
						</Button>
						
				</Form>
		</div>
		</Jumbotron>	
        </Container>
    )
};

export default LogIn;