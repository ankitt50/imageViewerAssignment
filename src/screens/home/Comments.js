import React,{Component} from 'react';

class Comments extends Component {
    render() {
        return <div>
            {this.props.commentsArray.map(comment=>(
                <p>{comment}</p>
            ))}
        </div>
    }
}

export default Comments;