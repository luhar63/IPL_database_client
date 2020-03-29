import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from 'Components/Header';
import { Form, Button } from 'react-bootstrap';
import { loginFetch, loginReset } from 'Containers/Home/calls';
import PropTypes from 'prop-types';

import './style.scss';

class Home extends Component {
  state = {
      email: '',
      password: ''
  };

  componentWillUnmount() {
      const { resetLogin } = this.props;
      resetLogin();
  }

  submitForm = e => {
      const { fetchLogin } = this.props;
      e.preventDefault();
      const { email, password } = this.state;
      fetchLogin(email, password);
  };

  handleChange = (label, e) => {
      this.setState({
          [label]: e.target.value
      });
  };

  render() {
      const {email, password} = this.state;
      const {match} = this.props;
      return (
          <div>
              <Helmet>
                  <meta charSet="utf-8" />
                  <title>Login</title>
              </Helmet>
              <Header match={match}/>
              <h1 className="text-center">Log in</h1>
              <div className="form-wrapper">
                  <Form className="login-form" onSubmit={this.submitForm}>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                              type="email"
                              value={email}
                              onChange={() => {this.handleChange(this, 'email');}}
                              placeholder="Enter email"
                          />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={() => {this.handleChange(this, 'password');}}
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
Home.propTypes = {
    // children: PropTypes.element
    resetLogin: PropTypes.func.isRequired,
    fetchLogin: PropTypes.func.isRequired,
    match: PropTypes.instanceOf(Object).isRequired

};
const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
    fetchLogin: loginFetch,
    resetLogin: loginReset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
