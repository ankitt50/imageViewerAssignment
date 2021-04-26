import React,{Component} from 'react';
import './Comments.css'

/*
Comments component is used in Home screen and Profile Screen
 to render all the comments on the particular image.

 It takes an array of comments as props , and returns 
 them as paragraphs.
*/
class Comments extends Component {
    render() {
        return <div>
            {this.props.commentsArray.map(comment=>(
                <p key={"para"+comment+this.props.username}><span className="bolder-username">{this.props.username + ': '}</span>{comment}</p>
            ))}
        </div>
    }
}

export default Comments;