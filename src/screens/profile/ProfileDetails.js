import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import './ProfileDetails.css';

class ProfileDetails extends Component {
    render() {
        return (<div className="profile_details-main-div">
                <div className="profile_pic-div" onClick={this.takeToHomePageHandler}>
                    <Avatar style={{width:100, height:100}} alt="upgrad logo" src="https://scontent-del1-1.cdninstagram.com/v/t51.2885-15/73685220_157449838846949_2453623051468031234_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=rHuKrfJs3b8AX_6Q6lX&_nc_ht=scontent-del1-1.cdninstagram.com&oh=7677afb24f583e49fa9019f3c648ca04&oe=60A8B01F" />
                </div>
                <div className="user_profile_data_numbers-div">
                    <div className="profile-data-username-bold-div">
                        <p>{this.props.profileScreen.state.username}</p>
                    </div>
                    <div className="grid-post-count-div">
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}>
                                Posts: {this.props.profileScreen.state.mediaCount}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                Follows: 136
                            </Grid>
                            <Grid item xs={12} md={4}>
                                Followed By: 63
                            </Grid>
                        </Grid>
                        <br/>
                    </div>
                    <div className="edit_icon_tag-div">
                        <div className="tag-div">
                        {this.props.fullName}
                        </div>
                        <div onClick={this.props.profileScreen.openModalHandler}>
                            <Avatar style={{backgroundColor:'#fb3640'}}>
                                <EditIcon/>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>);
    }
    takeToHomePageHandler = () => {
        this.props.profileScreen.takeToHomePage();
    }
}

export default ProfileDetails;