'use strict';

import React, { PropTypes } from 'react/addons';
import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const SellerRegister = React.createClass({
  propTypes: {
    user: PropTypes.object,
    errorMessage: PropTypes.string
  },

  getInitialState() {
    return {
      submitted: false,
      name: '',
      email: '',
      phone: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.seller !== this.props.seller) {
      // clear form if user prop changes (i.e. logged in)
      this.clearForm();
    }

    // allow resubmission if error comes through
    this.setState({
      submitted: false
    });
  },

  clearForm() {
    let { name, email, phone } = this.state;

    this.setState({
      name: '',
      email: '',
      phone: ''
    });
  },

  registerSeller(e) {
    e.preventDefault();
    let { name, email, phone } = this.state;

    if (!name) {
      return Actions.modalError('You must enter your full name');
    } else if (!email) {
      return Actions.modalError('You must enter an email address');
    } else if (!phone) {
      return Actions.modalError('You must enter a phone number');
    }

    this.setState({
      submitted: true
    });

    let loginData = {
      full_name: name,
      email: email,
      phone: phone
    };

    Actions.registerSeller(loginData);
  },

  render() {
    let {
      submitted,
      name,
      email,
      phone
    } = this.state;
    let { errorMessage } = this.props;

    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="register-seller">
        <h1></h1>
        <form onSubmit={ this.registerSeller } className="modal-form">
          <label htmlFor="name"></label>
          <input
            type="text"
            placeholder="Full name"
            id="name"
            value={ name }
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <label htmlFor="email"></label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={ email }
            onChange={ (e) => this.setState({ email: e.target.value.trim() }) }
          />
          <label htmlFor="phone"></label>
          <input
            type="text"
            placeholder="Phone number"
            id="phone"
            value={ phone }
            onChange={ (e) => this.setState({ phone: e.target.value }) }
          />
          <button type="submit" className="button button-primary" disabled={ submitted }>
            { submitted ? <Spinner /> : 'Register' }
          </button>
        </form>
        { error }
      </div>
    );
  }
});

export default SellerRegister;
