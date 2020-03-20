import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import { Form, Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';

import './style.scss';

class Register extends Component {
    state = {};

    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Register</title>
                </Helmet>
                <Header />
                <h1 className="text-center">Register</h1>
                <div className="form-wrapper">
                    <Form className="register-form">
                        <Form.Group controlId="formRegister-username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRegister-firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRegister-lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRegister-email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRegister-password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRegister-confirmpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    // children: PropTypes.element
};
const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
