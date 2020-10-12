import React, { useEffect, useState } from 'react'
import SingleComment from './singleComment.js';

function ReplyComment(props){
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.forEach(comment => {  // not sure whats going on here but map seemed like it should be foreach
      console.log(comment);
      if (comment.responseTo === props.parentCommentId) commentNumber++
    });
    setChildCommentNumber(commentNumber);
  }, [props.parentCommentId, props.commentList])

  const showComments = () => {
    setShow(!show);
  }

  /*let renderReplyComment = <p>No comments</p>
  if(props.replies.length !== 0){  // kinda jank theres definitely a better way
    renderReplyComment =
      props.replies.map(comment => (
        <React.Fragment key={comment._id}>{
          <div style={{marginLeft:'50px',width: '80%'}}>
            <SingleComment
              comment={comment}
              refresh={props.refresh}
              remove={props.remove}
              user={props.user}
              type="reply"
            />
          </div>
        }</React.Fragment>
      ))
  }*/

  let renderReplyComment = props.replies.map(comment => (
    <React.Fragment key={comment._id}>{
      <div style={{marginLeft:'50px',width: '80%'}}>
        <SingleComment
          comment={comment}
          refresh={props.refresh}
          remove={props.remove}
          user={props.user}
          type="reply"
        />
      </div>
    }</React.Fragment>
  ))

  return(
    <div>

      {ChildCommentNumber > 1 && show === false &&
        <p id='replies' style={{ fontSize: '14px', margin: 0, color: 'blue', cursor: 'pointer' }} onClick={showComments}>
          View {ChildCommentNumber} replies
        </p>
      }

      {ChildCommentNumber === 1 && show === false &&
        <p id='replies' style={{ fontSize: '14px', margin: 0, color: 'blue', cursor: 'pointer' }} onClick={showComments}>
          View {ChildCommentNumber} reply
        </p>
      }

      {ChildCommentNumber > 1 && show !== false &&
        <p id='replies' style={{ fontSize: '14px', margin: 0, color: 'blue', cursor: 'pointer' }} onClick={showComments}>
          Hide {ChildCommentNumber} replies
        </p>
      }

      {ChildCommentNumber === 1 && show !== false &&
        <p id='replies' style={{ fontSize: '14px', margin: 0, color: 'blue', cursor: 'pointer' }} onClick={showComments}>
          Hide {ChildCommentNumber} reply
        </p>
      }

      {show && renderReplyComment.reverse()}
    </div>
  )

}

export default ReplyComment
