import React, { Component } from 'react';
import '../profile/Profile.css';
import ProfileDetails from '../profileDetails/ProfileDetails';
import Header from '../../common/header/Header';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Commments from '../comments/Comments';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import profileImage from '../../assets/profileImage.jpg';
/*
Profile Component renders the Profile screen.
This screen shows user details - number of posts, followers,
 following etc. info.

*/
class Profile extends Component {

    constructor() {
        super();
        this.state = {
            'username':'ankitt50',
            'mediaCount': 4,
            'imagesArray': [],
            'isModalOpen': false,
            'currentFullName': 'Ankit Tripathi',
            'newFullName': '',
            'isImageDetailModalOpen': false,
            'currentImageUrl': '',
            'currentImageCaption':'',
            'currentImageId':'',
            "likesObject":{
                "id":[
                    '',''
                ]
            },
            "commentsArrayObject":{
                "id":[
                    '',''
                ]
            },
            'currentComment':'',
            'FullNameHelperTextClass':'dispNone',
        }
    }

    // makes the instagram API call to get user media
    // and other user informations.

    componentWillMount() {
        var accessToken = sessionStorage.getItem('isLogin');
        if (accessToken) {

            let data = null;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var imagesData = JSON.parse(this.responseText).data;
                    if(imagesData !== undefined) {
                        that.setState({ imagesArray: imagesData});
                    }
                }
                var tempLikesObject = that.state.likesObject;
                var tempCommentsArrayObject = that.state.commentsArrayObject;
                that.state.imagesArray.forEach(element => {
                    tempLikesObject[element.id] = 0;
                    tempCommentsArrayObject[element.id] = [];
                });

                that.setState({likesObject:tempLikesObject, commentsArrayObject:tempCommentsArrayObject});
            });

            xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,username&access_token=IGQVJWa0JwU0VuMHdlZAVp5NS1ZAVGE2Nms2a3NkTXFyUy1KYWg4TGYzNElkRG1MSUNEcHo4clVwNGhwTEE0d19xVERBbzh5dTgyd25FcUJrX2c3RWx6ZA013c2oxN00wQ25BbFhqRkJOd0J4eFZAMV082MgZDZD");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(data);

        } else {
            // if the user isn't logged in, return them to 
            // the login screen
            this.props.history.push('/');
        }
    }


    render() {

        // styles for the image details modal
        const customStyles = {
            position: 'absolute',
            width: 700,
            backgroundColor: '#ffffff',
            border: '2px solid #000',
            boxShadow: '#333333',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        };

         
        // styles for the full name editing modal.
        const customStylesForFullName = {
            position: 'absolute',
            width: 250,
            backgroundColor: '#ffffff',
            border: '2px solid #000',
            boxShadow: '#333333',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        };


        // style for the update full name button
        const btnStyle = {
            marginTop: 30,
            marginLeft: 30,
            marginBottom: 30,
        }

        // style for the update full name text field
        const editTextFieldStyle = {
            marginLeft: 30,
        }

        // body for the full name editing modal
        const body = (
            <div style={customStylesForFullName}>
                <div style={editTextFieldStyle}>
                <h3>Edit</h3>
                </div>
                <FormControl>
                <div style={editTextFieldStyle}>
                <TextField type="text" label="Full Name *" onChange={this.fullNameChangeHandler} />
                <FormHelperText className={this.state.FullNameHelperTextClass} style={{ color: '#fb3640' }}>required</FormHelperText>
                </div>
                </FormControl>
                <div style={btnStyle}>
                <Button variant="contained" color="primary" onClick={this.updateFullNameHandler}>
                    UPDATE
                </Button>
                </div>
            </div>
        );

        return <div>
            <Header isOnProfilePage={true} logoutHandler={this} />
            <ProfileDetails fullName={this.state.currentFullName} profileScreen={this}/>
            <div className="images-outermost-div">
                <Grid container spacing={5}>
                    {this.state.imagesArray.map(element => (
                        <Grid key={"grid"+element.id} item xs={12} md={4}>
                            <img className="imagesClass" src={element.media_url} alt="instagram-images" onClick={this.openImageDetailModalHandler.bind(this,element.media_url, element.caption, element.id)} />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Modal
                open={this.state.isModalOpen}
                onClose={this.handleClose}
            >
                {body}
            </Modal>
            <Modal
                open={this.state.isImageDetailModalOpen}
                onClose={this.handleImageModalClose}
            >
                <div style={customStyles}>
                <Card>
                <CardContent >
                    <div className="image-details-profile-page">
                        <div>
                            <img style={{width:300, height:300}} src={this.state.currentImageUrl} alt="dominar 400 grey" />
                        </div>
                        <div className="image-details-right-div">   
                <div className="user-profile_image_name-div">
                    <div>
                <Avatar alt="upgrad logo" src={profileImage} />
                </div>
                <div className="image-details-right-div">
                    <p>{this.state.username}</p>
                </div>
                </div>
                <div>
                    <hr/>
                    <p>{this.state.currentImageCaption}</p>
                </div>
                <div className="user-profile_image_name-div">
                <div onClick={this.incrementLikes.bind(this,this.state.currentImageId)}>
                        {this.state.likesObject[this.state.currentImageId]>0 && <FavoriteIcon color="secondary"/>}
                        {this.state.likesObject[this.state.currentImageId]<=0 && <FavoriteBorderIcon/>}
                    </div>
                    <div className="image-details-right-div">
                        <p>{''+this.state.likesObject[this.state.currentImageId]+' likes'}</p>
                    </div>
                    
                </div>
                {(this.state.commentsArrayObject[this.state.currentImageId] !== undefined) &&
                <Commments commentsArray={this.state.commentsArrayObject[this.state.currentImageId]} username="ankitt50"/>}
                <div className="user-profile_image_name-div" >
                    <div>
                    <TextField type="text" onChange={this.commentChangeHandler}/>
                    </div>
                    <div className="image-details-right-div">
                    <Button variant="contained" color="primary" onClick={this.addCommentBtnHandler.bind(this,this.state.currentImageId)}>
                        Add
                    </Button>
                    </div>
                </div>
                        </div>
                    </div>
                    </CardContent>
                    </Card>
                </div>
            </Modal>
        </div>
    }


    // when user clicks on the logout-option,
    // user is taken to the login page.
    logout() {
        this.props.history.push('/');
    }

    // when user clicks on the profile-pic,
    // user is taken to the home page.
    takeToHomePage() {
        this.props.history.push('/home');
    }

    // open the edit full name modal
    openModalHandler = () => {
        this.setState({ isModalOpen: true });
    }

    // open the image details modal
    openImageDetailModalHandler = (url, caption, id) => {
        this.setState({ isImageDetailModalOpen: true, currentImageUrl: url, currentImageCaption: caption, currentImageId: id });
    }

    // close the edit full name modal
    handleClose = () => {
        this.setState({ isModalOpen: false });
    };

    // close the image details modal
    handleImageModalClose = () => {
        this.setState({ isImageDetailModalOpen: false });
    };

    // records the changes in the full name editing text field
    fullNameChangeHandler = (e) => {
        this.setState({ newFullName: e.target.value });
    }

    // when update full name button is clicked.
    updateFullNameHandler = () => {
        var newUpdatedName = this.state.newFullName;
        if(newUpdatedName === '') {
            this.setState({'FullNameHelperTextClass' :'dispRed'});
            this.setState({ newFullName: '' });
        }
        else {
        this.setState({'FullNameHelperTextClass':'dispNone'});
        this.setState({ currentFullName: newUpdatedName });
        this.setState({ newFullName: '' });
        this.setState({ isModalOpen: false });
        }
    }

    // increases the liked count when the heart-icon is clicked
    incrementLikes = (id) => {
        var currentLikes = this.state.likesObject[id];
        var newLikesObject = this.state.likesObject;
        newLikesObject[id] = currentLikes + 1;
        this.setState({'likesObject' : newLikesObject});
    }

    // when add comment button is clicked
    addCommentBtnHandler = (id) => {
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


    // to record the changes in the comment text fields
    commentChangeHandler = (e) => {
        this.setState({currentComment: e.target.value});
    }


    // Instagram APi is called to get user details.
    getInstagramUserDetails() {
        let data = null;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var userData = JSON.parse(this.responseText).data;
                    if (userData !== undefined) {
                        that.setState({'username':userData.username, 'mediaCount':userData.media_count});
                    }
                }
            });

            xhr.open("GET", "https://graph.instagram.com/17841420725170665?fields=id,username,media_count&access_token=IGQVJXY1BMWjV3X3ZAQcXdjUjVFMEFDMXhZAY0JoZAVdreUsxc1JpNjJwRlBMVTFGSE5ZAdnBWWnltcWF1dWlVLUFwRWljM2w5ZAHVJSUI3THEtM1BmN0xDMTVSdXYzNkFnUHN0MmVycnNhU2RFRElfMHc3c2dqd0laT25WbjFN");
            xhr.send(data);
    }
}

export default Profile;