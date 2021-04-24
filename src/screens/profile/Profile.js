import React, { Component } from 'react';
import '../profile/Profile.css';
import ProfileDetails from './ProfileDetails';
import Header from '../../common/header/Header';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            'imagesArray': [],
            'isModalOpen': false,
            'currentFullName': 'UpGrad Education',
            'newFullName': '',
            'isImageDetailModalOpen': false,
            'currentImageUrl': '',
            'currentImageCaption':'',
        }
    }

    componentWillMount() {
        var accessToken = sessionStorage.getItem('isLogin');
        if (accessToken) {

            let data = null;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var imagesData = JSON.parse(this.responseText).data;
                    that.setState({ imagesArray: imagesData});
                }
            });

            xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,username&access_token=IGQVJWa0JwU0VuMHdlZAVp5NS1ZAVGE2Nms2a3NkTXFyUy1KYWg4TGYzNElkRG1MSUNEcHo4clVwNGhwTEE0d19xVERBbzh5dTgyd25FcUJrX2c3RWx6ZA013c2oxN00wQ25BbFhqRkJOd0J4eFZAMV082MgZDZD");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(data);

        } else {
            this.props.history.push('/');
        }
    }


    render() {
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

        const body = (
            <div style={customStyles}>
                <h2>Edit</h2>
                <TextField type="text" label="Full Name" onChange={this.fullNameChangeHandler} />
                <Button variant="contained" color="primary" onClick={this.updateFullNameHandler}>
                    UPDATE
                </Button>
            </div>
        );

        return <div>
            <Header isOnProfilePage={true} logoutHandler={this} />
            <ProfileDetails fullName={this.state.currentFullName} profileScreen={this} />
            <div className="images-outermost-div">
                <Grid container spacing={5}>
                    {this.state.imagesArray.map(element => (
                        <Grid item xs={12} md={4}>
                            <img className="imagesClass" src={element.media_url} alt="instagram-images" onClick={this.openImageDetailModalHandler.bind(this,element.media_url, element.caption)} />
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
                <Avatar alt="upgrad logo" src="https://humancapitalonline.com/uploads/1584961135.jpg" />
                </div>
                <div className="image-details-right-div">
                    <p>ankitt50</p>
                </div>
                </div>
                <div>
                    <p>{this.state.currentImageCaption}</p>
                </div>
                <div className="user-profile_image_name-div">
                    <div>
                        <FavoriteBorderIcon/>
                    </div>
                    <div >
                        <p>{''+'0 '+' likes'}</p>
                    </div>
                    
                </div>
                <div className="user-profile_image_name-div" >
                    <div>
                    <TextField type="text" />
                    </div>
                    <div className="image-details-right-div">
                    <Button variant="contained" color="primary">
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

    logout() {
        this.props.history.push('/');
    }

    openModalHandler = () => {
        console.log('open modal handler called');
        this.setState({ isModalOpen: true });
    }

    openImageDetailModalHandler = (url, caption) => {
        console.log('open modal handler called');
        this.setState({ isImageDetailModalOpen: true, currentImageUrl: url, currentImageCaption: caption });
    }

    handleClose = () => {
        console.log('close modal handler called');
        this.setState({ isModalOpen: false });
    };

    handleImageModalClose = () => {
        console.log('close modal handler called');
        this.setState({ isImageDetailModalOpen: false });
    };

    fullNameChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ newFullName: e.target.value });
    }
    updateFullNameHandler = () => {
        var newUpdatedName = this.state.newFullName;
        this.setState({ currentFullName: newUpdatedName });
        this.setState({ isModalOpen: false });
    }
}

export default Profile;