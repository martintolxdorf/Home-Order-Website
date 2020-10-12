import React, {useState} from 'react';
import axios from 'axios';
import SingleService from './singleService.js';
import ReplyService from './replyService.js'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Services(props) {
  const [Service, setService] = useState([]);

   const acceptService = async (id) => {
        axios.post('/services/update/' + id, {status: "Accepted by: " + props.user.name});
		setService(Service.filter(service => service._id !== id));
    }

  const handleChange = (e) => {
    setService(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const vars = {
        content: Service,
        postedBy: props.user.name,
    }

    axios.post('/services/newService', vars)
      .then(res => {
          if(res.data.success) {
            setService("");
            props.refresh(res.data.result);
          }
          else {
            alert('Failed to save service');
          }
      })
  }


  return (
  <div>
	<form style={{display:'flex'}} onSubmit = {onSubmit}>
		<Container>
		<Jumbotron>
		<Form.Group controlId="exampleForm.ControlTextarea1">
			<Form.Label>Ask for a service</Form.Label>
			<Form.Control onChange={handleChange} value={Service} placeholder="Post a service" as="textarea" rows="3" />
		</Form.Group>
    <br />
    <Button type="submit" size="lg" variant="flat">Submit</Button>
		</Jumbotron>
		</Container>
  </form>
  <h1> Services </h1>

	<Container>
	  <Jumbotron>
      {props.serviceList && props.serviceList.map((service) => (  // first part of and makes sure not null?
        !service.responseTo &&
        <React.Fragment key={service._id}>
          <SingleService
			Service={Service}
			acceptService={acceptService}
            service={service}
            refresh={props.refresh}
            remove={props.remove}
            user={props.user}
          />
          <ReplyService
            replies = {props.serviceList.map(reply => (reply.responseTo === service._id && reply)).filter(service => service !== false)}
            serviceList = {props.serviceList}
            refresh={props.refresh}
            remove={props.remove}
            user={props.user}
            parentServiceId={service._id}
          />
          <hr className="my-4" />

        </React.Fragment>
      ))}
	  </Jumbotron>
	</Container>
  </div>
  )
};

export default Services
