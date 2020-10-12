import React, { useState } from 'react'
import { Comment, Button, Input } from 'antd';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
const { TextArea } = Input;


function SingleComment(props) {
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href="about:null"
		ref={ref}
		onClick={e => {
		e.preventDefault();
		onClick(e);
		}}
	>
		{<img src="/Dots.png" height='15' width='15' alt='dots' onClick={e => {
            e.preventDefault();
		    onClick(e);
		}}/>}

	</a>
	));
	
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            postedBy: props.user.name,
            responseTo: props.comment._id,
            content: CommentValue
        }

        axios.post('/comments/newComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refresh(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const deleteReply = (id) => {
        axios.delete('/comments/deleteComments/' + id).then(response => {
            if(response.data.success)
                props.remove(response.data.data._id);
            else
                alert('Failed to delete comment');
        })
    }

    //i decided to comment this line out becuz i didnt like the bullet point next to the reply
    //i decided to add the button down below inside render under the comment
    //const actions = [<p onClick={openReply} key="comment-list-reply-to-0" >Reply to</p>]

    //decided to comment this out becuz for some reason there is an error with the delete button it crashes the site if i click on show replies
    //also doesnt display the delete button anywhere
    let actions = [];
    if(props.user.name === props.comment.postedBy || props.user.access === "Admin") actions.push(<span onClick={() => deleteReply(props.comment._id)} key="comment-basic-delete"><img src="/trash-simple.svg" height='21' width='21' alt="trash-simple"/></span>)

    return (
        <div>
		<div style={{display:'flex', justifyContent: 'space-between'}}>
        <h6 className="text-left"> Posted by: {props.comment.postedBy} </h6>
		<Dropdown>
			<Dropdown.Toggle as={CustomToggle} />
			<Dropdown.Menu size="sm"> 
				<Dropdown.Header><Comment style={{cursor:'pointer'}} actions={actions} /></Dropdown.Header>
			</Dropdown.Menu>
		</Dropdown>
		</div>
        <Comment
            //actions={actions}
            //author={props.comment.postedBy}
            content={
                <p style={{wordWrap:'break-word'}}>
                    {props.comment.content}
                </p>
            }
        ></Comment>
		
        {props.type !== "reply" &&
                  <p  onClick={openReply} style={{ fontSize: '14px', margin: 0, color: 'red', cursor:'pointer' }}>REPLY</p>
        }

        {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="Reply to this post"
                />
                <br />
                <Button
                    style={{ width: '20%', height: '52px' }}
                    onClick={onSubmit}
                >
                Submit
                </Button>
            </form>
        }
        </div>
    )
}

export default SingleComment
