import React, { Component } from 'react';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

class Header extends Component {

    constructor() {
        super();
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
                            <div onClick={this.logoClickHandler} className="profile-image-on-header">
                                <Avatar alt="upgrad logo" src="https://scontent-del1-1.cdninstagram.com/v/t51.2885-15/73685220_157449838846949_2453623051468031234_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=rHuKrfJs3b8AX_6Q6lX&_nc_ht=scontent-del1-1.cdninstagram.com&oh=7677afb24f583e49fa9019f3c648ca04&oe=60A8B01F" />
                            </div>
                        </div></div>}
                        {this.props.isOnProfilePage && <div>
                        <div className="header-logo-avatar_search">
                            <div onClick={this.logoClickHandler} className="profile-image-on-header">
                                <Avatar alt="upgrad logo" src="https://scontent-del1-1.cdninstagram.com/v/t51.2885-15/73685220_157449838846949_2453623051468031234_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=rHuKrfJs3b8AX_6Q6lX&_nc_ht=scontent-del1-1.cdninstagram.com&oh=7677afb24f583e49fa9019f3c648ca04&oe=60A8B01F" />
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

    logoClickHandler = () => {
        if (this.state['options-open']) {
            this.setState({ 'options-open': false });
        }
        else {
            this.setState({ 'options-open': true });
        }
    }

    logoutClickHandler = () => {
        sessionStorage.removeItem("isLogin");
        this.props.logoutHandler.logout();
    }

    profilePageNavigationHandler = () => {
        this.props.logoutHandler.goToProfile();
    }
    filterMediaHandler = (e) => {
        this.props.logoutHandler.filterMedia(e.target.value);
    }

}

export default Header;