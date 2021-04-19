import React , {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
class Home extends Component {
    
    constructor() {
        super();
        this.state = {
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
            ]
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
            <Grid container spacing={3}>
            {this.state.profileDataArrayToShow.map(profileData => (
                <Grid item xs={12} md={6}>
            <div className="profile_data-card-container">
            <Card className="profile_data-card">
                <CardContent >
                <div className="logo_timestamp_username-container">
                <Avatar alt="upgrad logo" src="https://humancapitalonline.com/uploads/1584961135.jpg" />
                <div className="timestamp_username-container">
                    <p className="username-para">{profileData.username}</p>
                    <p className="timestamp-para">{profileData.timestamp}</p>
                </div>
                </div>
                <div>
                <img className="profile_data-image" src={profileData.media_url} alt={profileData.caption}/>
                </div>
                <div>
                    <p>{profileData.caption}</p>
                </div>
                </CardContent>
            </Card>
            </div>
            </Grid>
        ))}
        </Grid>);
    }
}

export default Home;