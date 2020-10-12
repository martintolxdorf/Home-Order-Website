import React, {useState} from 'react';
import axios from 'axios';
import SingleComment from './singleComment.js';
import ReplyComment from './replyComment.js'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function Questions(props) {
  const [Comment, setComment] = useState("");


  const handleChange = (e) => {
    setComment(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const vars = {
        content: Comment,
        postedBy: props.user.name
    }

    axios.post('/comments/newComment', vars)
      .then(res => {
          if(res.data.success) {
            setComment("");
            props.refresh(res.data.result);
          }
          else {
            alert('Failed to save comment');
          }
      })
  }


  return (
  <div>
	<form style={{display:'flex'}} onSubmit = {onSubmit}>
		<Container>
		<Jumbotron>
		<Form.Group controlId="exampleForm.ControlTextarea1">
			<Form.Label>Ask A Question</Form.Label>
			<Form.Control onChange={handleChange} value={Comment} placeholder="Ask Something" as="textarea" rows="3" />
		</Form.Group>
    <br />
    <Button type="submit" size="lg" variant="flat">Submit</Button>
		</Jumbotron>
		</Container>
  </form>
  <h1> Community Board </h1>

	<Container>
	  <Jumbotron>
      {props.commentList && props.commentList.map((comment) => (  // first part of and makes sure not null?
        !comment.responseTo &&
        <React.Fragment key={comment._id}>
          <SingleComment
            comment={comment}
            refresh={props.refresh}
            remove={props.remove}
            user={props.user}
          />
          <ReplyComment
            replies = {props.commentList.map(reply => (reply.responseTo === comment._id && reply)).filter(comment => comment !== false)}
            commentList = {props.commentList}
            refresh={props.refresh}
            remove={props.remove}
            user={props.user}
            parentCommentId={comment._id}
          />
          <hr className="my-4" />
        </React.Fragment>
      ))}
	  </Jumbotron>
	</Container>
  </div>
  )
};

export default Questions
