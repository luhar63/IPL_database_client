import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

class Header extends Component {
    state = {};

    render() {
        const  {match} = this.props;
    
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
                    <Link to="/home" className={`nav-link ${ (match.url==='/home')? 'active' : ''}` }>
                        Home
                    </Link>
                    <Link to="/matches"  className={`nav-link ${ (match.url==='/matches')? 'active' : ''}` }>
                        Matches
                    </Link>
                    <Link to="/stats" className={`nav-link ${ (match.url==='/stats')? 'active' : ''}` }>
                        Stats
                    </Link>
                    <Link to="/teams" className={`nav-link ${ (match.url==='/teams')? 'active' : ''}` }>
                        Teams
                    </Link>
                    <Link to="/players" className={`nav-link ${ (match.url==='/players')? 'active' : ''}` }>
                        Players
                    </Link>
                    <Link to="/versus" className={`nav-link ${ (match.url==='/versus')? 'active' : ''}` }>
                        Versus
                    </Link>
                </Nav>
            </div>
            
        );
    }
}
Header.propTypes = {
    // children: PropTypes.element
    match: PropTypes.instanceOf(Object).isRequired
};
const mapStateToProps = state => (state);
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
