import React, { useEffect, useState } from 'react'
import SingleService from './singleService.js';

function ReplyService(props){
  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [show, setShow] = useState(false);

  useEffect(() => {

      let commentNumber = 0;
      props.serviceList.forEach((comment) => {
          if (comment.responseTo === props.parentServiceId) {
              commentNumber++;
          }
      })
      setChildCommentNumber(commentNumber);
  }, [props.parentServiceId, props.serviceList])

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

  let renderReplyComment =
      props.replies.map(service => (
        <React.Fragment key={service._id}>{
          <div style={{marginLeft:'50px',width: '80%'}}>
            <SingleService
              service={service}
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

export default ReplyService
