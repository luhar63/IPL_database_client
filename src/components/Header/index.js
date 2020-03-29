import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

class Header extends Component {
    state = {};

    render() {
        return (
            <div className="text-center">
                <Navbar className="nav-head">
                    {/* <Navbar.Brand href="#home" className="text-center">
                    <img
                        alt=""
                        src={mainLogo}
                        width="100"
                        height="30"
                        className="d-inline-block align-top"
                    /> 
                    INSIDE <span className="secondary-text">EDGE</span>
                </Navbar.Brand> */}
                    <Nav className="brand"> 
                INSIDE <span className="secondary-text">EDGE</span>
                    </Nav>
                    
                </Navbar>
                <Nav className="menu-nav">
                    <Link to="/login" className="nav-link">
                        Home
                    </Link>
                    <Link to="/matches" className="nav-link">
                        Matches
                    </Link>
                    <Link to="/stats" className="nav-link">
                        Stats
                    </Link>
                    <Link to="/teams" className="nav-link">
                        Teams
                    </Link>
                    <Link to="/versus" className="nav-link">
                        Versus
                    </Link>
                </Nav>
            </div>
            
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
