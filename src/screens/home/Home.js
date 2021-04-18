import React , {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            "profileDataArray": [
                {
                    "id": "",
                    "caption": "",
                    "media_url": "",
                    "media_type": ""
                },
                {
                    "id": "",
                    "caption": "",
                    "media_url": "",
                    "media_type": ""
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
                    profileDataArray: JSON.parse(this.responseText).data
                });
            }
        });

        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=IGQVJWa0JwU0VuMHdlZAVp5NS1ZAVGE2Nms2a3NkTXFyUy1KYWg4TGYzNElkRG1MSUNEcHo4clVwNGhwTEE0d19xVERBbzh5dTgyd25FcUJrX2c3RWx6ZA013c2oxN00wQ25BbFhqRkJOd0J4eFZAMV082MgZDZD");
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
            <Header isLogin={true}/>
            {isLogin==="true" && this.state.profileDataArray.map(profileData => (
            <img src={profileData.media_url} alt={profileData.caption}/>
            ))}
        </div>
    }
}

export default Home;