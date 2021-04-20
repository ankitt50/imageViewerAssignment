import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

class ProfileDetails extends Component {
    render() {
        return (<div className="profile_details-main-div">
                <div className="profile_pic-div">
                    <Avatar style={{width:100, height:100}} alt="upgrad logo" src="https://humancapitalonline.com/uploads/1584961135.jpg" />
                </div>
                <div className="user_profile_data_numbers-div">
                    <div>
                        username_id
                    </div>
                    <div>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}>
                                Posts: 4
                            </Grid>
                            <Grid item xs={12} md={4}>
                                Follows: 12
                            </Grid>
                            <Grid item xs={12} md={4}>
                                Followed By: 1M
                            </Grid>
                        </Grid>
                    </div>
                    <div className="edit_icon_tag-div">
                        <div className="tag-div">
                        UpGrad Education
                        </div>
                        <div>
                            <Avatar style={{backgroundColor:'#fb3640'}}>
                                <EditIcon/>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default ProfileDetails;