'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { Navigation } from 'react-router';
import ListingsStore from '../stores/ListingsStore';
import cx from 'classnames';

import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const NewBid = React.createClass({
  propTypes: {
    agent: React.PropTypes.object,
    errorMessage: React.PropTypes.string
  },

  mixins: [
    Navigation
  ],

  getInitialState() {
    return {
      submitted: false,
      closingPrice: '',
      duration: '',
      commission: ''
    };
  },

  submitBid(e) {
    e.preventDefault();

    let { closingPrice, duration, commission } = this.state;
    let { agent } = this.props;

    if (!closingPrice) {
      this.setState({
        highlight: 'closingPrice'
      });
      return;
    }

    if (!duration) {
      this.setState({
        highlight: 'duration'
      });
      return;
    }

    if (!commission) {
      this.setState({
        highlight: 'commission'
      });
      return;
    }

    this.setState({
      submitted: true
    });

    let bid = {
      listing_id: ListingsStore.getCurrentListing().id,
      agent_id: agent.id,
      close_price: closingPrice,
      duration: duration,
      commission: commission
    };

    Actions.submitBid(bid);
  },

  render() {
    let {
      submitted,
      highlight,
      closingPrice,
      duration,
      commission
    } = this.state;

    let closingPriceInputCx = cx('panel-input', {
      'input-error': highlight === 'closingPrice'
    });

    let durationInputCx = cx('panel-input', {
      'input-error': highlight === 'duration'
    });

    let commissionInputCx = cx('panel-input', {
      'input-error': highlight === 'commission'
    });

    let errorMessage = this.props.errorMessage;
    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="newbid">
        <h1>New Bid</h1>
        <form onSubmit={ this.submitBid } className="modal-form">
          <label htmlFor="newbid-closingPrice">Closing Price</label>
          <input
            type="text"
            className={ closingPriceInputCx }
            placeholder="Closing Price"
            id="newbid-closingPrice"
            value={ closingPrice }
            onChange={ (e) => this.setState({ closingPrice: e.target.value }) }
          />
          <label htmlFor="newbid-duration">Duration</label>
          <input
            type="text"
            className={ durationInputCx }
            placeholder="Duration"
            id="newbid-duration"
            value={ duration }
            onChange={ (e) => this.setState({ duration: e.target.value }) }
          />
          <label htmlFor="newbid-commission">Commission</label>
          <input
            type="text"
            className={ commissionInputCx }
            placeholder="Commission"
            id="newbid-commission"
            value={ commission }
            onChange={ (e) => this.setState({ commission: e.target.value }) }
          />
          <button type="submit" className="button button-primary" disabled={ submitted }>
            { submitted ? <Spinner /> : 'Submit' }
          </button>
        </form>
        { error }
      </div>
    );
  }
});

export default NewBid;
