'use strict';

import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';
import React, { PropTypes } from 'react/addons';

const SellerLogin = React.createClass({
  propTypes: {
    user: PropTypes.object,
    errorMessage: PropTypes.string
  },

  getInitialState() {
    return {
      submitted: false,
      email: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      // clear form if user prop changes (i.e. logged in)
      this.clearForm();
    }

    // allow resubmission if error comes through
    this.setState({
      submitted: false
    });
  },

  clearForm() {
    this.setState({
      email: '',
    });
  },

  login(e) {
    e.preventDefault();
    let { email } = this.state;

    this.setState({
      submitted: true
    });

    Actions.sellerLogin({
      email: email
    });
  },

  render() {
    let {
      submitted,
      email
    } = this.state;
    let { errorMessage } = this.props;

    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="login">
        <h1> </h1>
        <form onSubmit={ this.login } className="modal-form">
          <label htmlFor="email"></label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={ email }
            onChange={ (e) => this.setState({ email: e.target.value.trim() }) }
          />
          <input
            type="text"
            placeholder="Password"
            id="password"
          />
          <button type="submit" className="button button-primary" disabled={ submitted }>
            { submitted ? <Spinner /> : 'Sign In' }
          </button>
        </form>
        { error }
      </div>
    );
  }
});

export default SellerLogin;
