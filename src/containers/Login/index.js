import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import { Form, Button } from 'react-bootstrap';
import { loginFetch, loginReset } from 'Containers/Login/calls';
// import PropTypes from 'prop-types';

import './style.scss';

class Login extends Component {
  state = {
      email: '',
      password: ''
  };

  componentWillUnmount() {
      const { loginReset } = this.props;
      loginReset();
  }

  submitForm = e => {
      const { loginFetch } = this.props;
      e.preventDefault();
      const { email, password } = this.state;
      loginFetch(email, password);
  };

  handleChange = (label, e) => {
      this.setState({
          [label]: e.target.value
      });
  };

  render() {
      return (
          <div>
              <Helmet>
                  <meta charSet="utf-8" />
                  <title>Login</title>
              </Helmet>
              <Header />
              <h1 className="text-center">Log in</h1>
              <div className="form-wrapper">
                  <Form className="login-form" onSubmit={this.submitForm}>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                              type="email"
                              value={this.state.email}
                              onChange={this.handleChange.bind(this, 'email')}
                              placeholder="Enter email"
                          />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                              type="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange.bind(this, 'password')}
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
Login.propTypes = {
    // children: PropTypes.element
};
const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
    loginFetch,
    loginReset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
