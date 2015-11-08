'use strict';

import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';
import React, { PropTypes } from 'react/addons';

const AgentLogin = React.createClass({
  propTypes: {
    user: PropTypes.object,
    errorMessage: PropTypes.string
  },

  getInitialState() {
    return {
      submitted: false,
      agentId: ''
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
      agentId: '',
    });
  },

  login(e) {
    e.preventDefault();
    let { agentId } = this.state;

    this.setState({
      submitted: true
    });

    Actions.agentLogin({
      agent_id: agentId
    });
  },

  render() {
    let {
      submitted,
      agentId
    } = this.state;
    let { errorMessage } = this.props;

    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="login">
        <h1></h1>
        <form onSubmit={ this.login } className="modal-form">
          <label htmlFor="agent-id"></label>
          <input
            type="text"
            placeholder="Agent ID"
            id="agent-id"
            value={ agentId }
            onChange={ (e) => this.setState({ agentId: e.target.value }) }
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

export default AgentLogin;
