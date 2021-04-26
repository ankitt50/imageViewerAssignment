import React, { Component } from 'react';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import profilePic from '../../assets/profileImage.jpg';

/*

Header component is a common component on all Screens.

It shows Logo on the left most corner.

It shows search bar and profile pic on right most 
corner on home screen,

and shows only profile pic on right most corner of the
profile screen

*/
class Header extends Component {

    constructor() {
        super();
        // variable to check, if the options menu
        // is open or not
        this.state = {
            "options-open": false,
        }
    }

    render() {
        return (
            <div className="header-outer-div">
                <div className="header-main-div">
                    <div className="header-logo-text">
                        <p>Image Viewer</p>
                    </div>
                    {this.props.isLogin && <div>
                        <div className="header-logo-avatar_search">
                            <div className="header-search_field-container">
                                <SearchIcon />
                                <TextField placeholder="Search..." InputProps={{ disableUnderline: true }} onChange={this.filterMediaHandler}/>
                            </div>
                            <div onClick={this.picClickHandler} className="profile-image-on-header">
                                <Avatar alt="upgrad logo" src={profilePic} />
                            </div>
                        </div></div>}
                        {this.props.isOnProfilePage && <div>
                        <div className="header-logo-avatar_search">
                            <div onClick={this.picClickHandler} className="profile-image-on-header">
                                <Avatar alt="upgrad logo" src={profilePic} />
                            </div>
                        </div></div>}
                </div>
                {this.state['options-open'] && <div>
                    <div className="account-options-container">
                    {this.props.isLogin && <div>
                            <p onClick={this.profilePageNavigationHandler} >My Account</p>
                            <hr />
                        </div>}
                        <p onClick={this.logoutClickHandler}>Logout</p>
                    </div>
                </div>
                }
            </div>
        );

    }

    // method to open or close the options-menu on
    // click of the profile pic
    picClickHandler = () => {
        if (this.state['options-open']) {
            this.setState({ 'options-open': false });
        }
        else {
            this.setState({ 'options-open': true });
        }
    }

    // to logout when logout-option is clicked by the user
    logoutClickHandler = () => {
        sessionStorage.removeItem("isLogin");
        this.props.logoutHandler.logout();
    }

    // to got to profile-screen when 'my account'-option 
    // is clicked by the user

    profilePageNavigationHandler = () => {
        this.props.logoutHandler.goToProfile();
    }

    // to filter media based on captions
    filterMediaHandler = (e) => {
        this.props.logoutHandler.filterMedia(e.target.value);
    }

}

export default Header;