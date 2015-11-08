'use strict';

import React, { PropTypes } from 'react/addons';
import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const AgentRegister = React.createClass({
  propTypes: {
    user: PropTypes.object,
    errorMessage: PropTypes.string
  },

  getInitialState() {
    return {
      submitted: false,
      agentId: '',
      yelpUrl: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.agent !== this.props.agent) {
      // clear form if user prop changes (i.e. logged in)
      this.clearForm();
    }

    // allow resubmission if error comes through
    this.setState({
      submitted: false
    });
  },

  clearForm() {
    let { agentId, yelpUrl } = this.state;

    this.setState({
      agentId: '',
      yelpUrl: ''
    });
  },

  registerAgent(e) {
    e.preventDefault();
    let { agentId, yelpUrl } = this.state;

    if (!agentId) {
      return Actions.modalError('You must enter your full Agent ID');
    }

    this.setState({
      submitted: true
    });

    let loginData = {
      agent_id: agentId,
      yelp_url: yelpUrl
    };

    Actions.registerAgent(loginData);
  },

  render() {
    let {
      submitted,
      agentId,
      yelpUrl
    } = this.state;
    let { errorMessage } = this.props;

    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="register-agent">
        <h1></h1>
        <form onSubmit={ this.registerAgent } className="modal-form">
          <label htmlFor="agentId"></label>
          <input
            type="text"
            placeholder="Agent ID"
            id="agent-id"
            value={ agentId }
            onChange={ (e) => this.setState({ agentId: e.target.value }) }
          />
          <label htmlFor="yelp-url"></label>
          <input
            type="text"
            placeholder="Yelp URL"
            id="yelp-url"
            value={ yelpUrl }
            onChange={ (e) => this.setState({ yelpUrl: e.target.value }) }
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

export default AgentRegister;
