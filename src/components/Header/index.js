import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appName } from 'Constants/app';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './style.scss';
import mainLogo from 'Assets/images/logo.png';

class Header extends Component {
    state = {};

    render() {
        return (
            <Navbar className="nav-head">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={mainLogo}
                        width="100"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    {appName}
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </Nav>
            </Navbar>
        );
    }
}
Header.propTypes = {
    // children: PropTypes.element
};
const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
