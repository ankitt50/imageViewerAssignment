import React , {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Commments from './Comments';
class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            "currentComment": '',
            "profileDataArray": [
                {
                    "id": "",
                    "caption": "",
                    "media_url": "",
                    "media_type": "",
                    "username":"",
                    "timestamp":""
                },
                {
                    "id": "",
                    "caption": "",
                    "media_url": "",
                    "media_type": "",
                    "username":"",
                    "timestamp":""
                },
            ],
            "profileDataArrayToShow": [
                {
                    "id": "",
                    "caption": "",
                    "media_url": "",
                    "media_type": "",
                    "username":"",
                    "timestamp":""
                },
                {
                    "id": "",
                    "caption": "",
                    "media_url": "",
                    "media_type": "",
                    "username":"",
                    "timestamp":""
                },
            ],
            "likesObject":{

            },
            "commentsArrayObject":{
                "id":[
                    '',''
                ]
            },
            'timeStampArrayObject': {

            }
        }
    }

    componentWillMount() {
        var isLogin = sessionStorage.getItem("isLogin");
        if(isLogin === "true") {
            let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profileDataArray: JSON.parse(this.responseText).data,
                    profileDataArrayToShow: JSON.parse(this.responseText).data
                });
                var tempLikesObject = that.state.likesObject;
                var tempCommentsArrayObject = that.state.commentsArrayObject;
                var tempTimeStampArrayObject = that.state.timeStampArrayObject;
                that.state.profileDataArray.forEach(element => {
                    tempLikesObject[element.id] = 0;
                    tempCommentsArrayObject[element.id] = [];
                    var editedTS = "";
                    var TSArray = element.timestamp.split("T");
                    var TSArray2 = TSArray[1].split("+");
                    editedTS = TSArray[0] + ' ' + TSArray2[0];
                    tempTimeStampArrayObject[element.id] = editedTS;
                });

                that.setState({likesObject:tempLikesObject, commentsArrayObject:tempCommentsArrayObject, timeStampArrayObject:tempTimeStampArrayObject});
            }
        });

        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,username&access_token=IGQVJWa0JwU0VuMHdlZAVp5NS1ZAVGE2Nms2a3NkTXFyUy1KYWg4TGYzNElkRG1MSUNEcHo4clVwNGhwTEE0d19xVERBbzh5dTgyd25FcUJrX2c3RWx6ZA013c2oxN00wQ25BbFhqRkJOd0J4eFZAMV082MgZDZD");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
        }
        else {
            this.props.history.push('/');
        }
    }

    render() {
        var isLogin = sessionStorage.getItem("isLogin");
        return <div>
            <Header isLogin={true} logoutHandler={this}/>
            {isLogin==="true" && this.returnProfileDataElements()}
            
            
        </div>
    }

    logout() {
        this.props.history.push('/');
    }
    goToProfile() {
        this.props.history.push('/profile');
    }

    filterMedia(searchData) {
        var tempArray = [];
        console.log(searchData);
        this.state.profileDataArray.forEach(element => {
            console.log(element);
            if(element.caption.includes(searchData)){
                console.log(element.caption);
                tempArray.push(element);
            }
        });

        this.setState({profileDataArrayToShow: tempArray});
        
    }

    returnProfileDataElements = () => {
        return (
            <div class="home-page-outermost-div">
            <Grid container>
            {this.state.profileDataArrayToShow.map(profileData => (
                <Grid item xs={12} md={6}>
            <div className="profile_data-card-container">
            <Card className="profile_data-card">
                <CardContent >
                <div className="logo_timestamp_username-container">
                <Avatar alt="upgrad logo" src="https://humancapitalonline.com/uploads/1584961135.jpg" />
                <div className="timestamp_username-container">
                    <p className="username-para">{profileData.username}</p>
                    <p className="timestamp-para">{this.state.timeStampArrayObject[profileData.id]}</p>
                </div>
                </div>
                <div className="image-outer-div">
                <img className="profile_data-image" src={profileData.media_url} alt={profileData.caption}/>
                <hr className="image-horizontal-rule"/>
                </div>
                <div className="caption-div">
                    <p>{profileData.caption}</p>
                </div>
                <div className="profile_data-likes-container">
                    <div onClick={this.incrementLikes.bind(this,profileData.id)}>
                        {this.state.likesObject[profileData.id]>0 && <FavoriteIcon color="secondary"/>}
                        {this.state.likesObject[profileData.id]<=0 && <FavoriteBorderIcon/>}
                    </div>
                    <div className="likes-count-text">
                        <p>{''+this.state.likesObject[profileData.id]+' likes'}</p>
                    </div>
                    
                </div>
                <div className="comments-outer-div">
                {(this.state.commentsArrayObject[profileData.id] !== undefined) &&
                <Commments username={profileData.username} commentsArray={this.state.commentsArrayObject[profileData.id]}/>}
                </div>
                <div className="add-comment-container">
                    <div className="addComment-textfield-div">
                    <TextField type="text" label="Add a comment" onChange={this.commentChangeHandler} />
                    </div>
                    <div className="add-comment-btn">
                    <Button variant="contained" color="primary" onClick={this.addCommentBtnHandler.bind(this,profileData.id)}>
                        Add
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
            </Grid>
        ))}
        </Grid></div>);
    }

    incrementLikes = (id) => {
        var currentLikes = this.state.likesObject[id];
        var newLikesObject = this.state.likesObject;
        newLikesObject[id] = currentLikes + 1;
        this.setState({'likesObject' : newLikesObject});
    }
    commentChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({currentComment:e.target.value});
    }
    addCommentBtnHandler = (id) => {
        console.log('btn clicked'+id);
        var newComment = this.state.currentComment;
        if (newComment !== '') {
            var oldCommentArray = this.state.commentsArrayObject[id];
            oldCommentArray.push(newComment);
            var compeleteCommentsArray = this.state.commentsArrayObject;
            compeleteCommentsArray[id] = oldCommentArray;
            this.setState({commentsArrayObject:compeleteCommentsArray});
            this.setState({currentComment:''});
        }
    }
}

export default Home;