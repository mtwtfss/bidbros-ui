'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { Navigation } from 'react-router';
import cx from 'classnames';

import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const NewListing = React.createClass({
  propTypes: {
    seller: React.PropTypes.object,
    errorMessage: React.PropTypes.string
  },

  mixins: [
    Navigation
  ],

  getInitialState() {
    return {
      submitted: false,
      listing_id: ''
    };
  },

  submitListing(e) {
    e.preventDefault();

    let { listing_id } = this.state;
    let { seller } = this.props;

    if (!listing_id) {
      this.setState({
        highlight: 'listing_id'
      });
      return;
    }

    this.setState({
      submitted: true
    });

    let listing = {
      listing_id: listing_id.trim(),
      seller_id: seller.id //eslint-disable-line camelcase
    };

    Actions.submitListing(listing);
  },

  render() {
    let {
      submitted,
      highlight,
      listing_id
    } = this.state;

    let listing_idInputCx = cx('panel-input', {
      'input-error': highlight === 'listing_id'
    });

    let errorMessage = this.props.errorMessage;
    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="newlisting">
        <h1>New Listing</h1>
        <form onSubmit={ this.submitListing } className="modal-form">
          <label htmlFor="newlisting-listing_id">Listing ID</label>
          <input
            type="text"
            className={ listing_idInputCx }
            placeholder="Listing ID"
            id="newlisting-listing_id"
            value={ listing_id }
            onChange={ (e) => this.setState({ listing_id: e.target.value }) }
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

export default NewListing;
