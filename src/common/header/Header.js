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
                            <div onClick={this.logoClickHandler}>
                                <Avatar alt="upgrad logo" src="https://humancapitalonline.com/uploads/1584961135.jpg" />
                            </div>
                        </div></div>}
                        {this.props.isOnProfilePage && <div>
                        <div className="header-logo-avatar_search">
                            <div onClick={this.logoClickHandler}>
                                <Avatar alt="upgrad logo" src="https://humancapitalonline.com/uploads/1584961135.jpg" />
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