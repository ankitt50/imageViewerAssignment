import React, { Component } from 'react';
import '../profile/Profile.css';
import ProfileDetails from './ProfileDetails';
import Header from '../../common/header/Header';
import Grid from '@material-ui/core/Grid';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            'imagesArray': []
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
                var tempImagesArray = that.state.imagesArray;
                imagesData.forEach(element => {
                    tempImagesArray.push(element.media_url);
                });
                that.setState({imagesArray:tempImagesArray});
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
        return <div>
            <Header isOnProfilePage={true} logoutHandler={this} />
            <ProfileDetails />
            <div className="images-outermost-div">
                <Grid container spacing={5}>
                    {this.state.imagesArray.map(element => (
                    <Grid item xs={12} md={4}>
                        <img className="imagesClass" src={element} alt="instagram-images"/>
                    </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    }

    logout() {
        this.props.history.push('/');
    }
}

export default Profile;