import React,{Component} from 'react';
import './Comments.css'

class Comments extends Component {
    render() {
        return <div>
            {this.props.commentsArray.map(comment=>(
                <p><span className="bolder-username">{this.props.username + ': '}</span>{comment}</p>
            ))}
        </div>
    }
}

export default Comments;