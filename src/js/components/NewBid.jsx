'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { Navigation } from 'react-router';
import cx from 'classnames';

import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const NewBid = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    errorMessage: React.PropTypes.string
  },

  mixins: [
    Navigation
  ],

  getInitialState() {
    return {
      submitted: false,
      title: '',
      link: ''
    };
  },

  submitBid(e) {
    e.preventDefault();

    let { title, link } = this.state;
    let { user } = this.props;

    if (!title) {
      this.setState({
        highlight: 'title'
      });
      return;
    }

    if (!link) {
      this.setState({
        highlight: 'link'
      });
      return;
    }

    this.setState({
      submitted: true
    });

    let bid = {
      title: title.trim(),
      url: link,
      user_id: user.id //eslint-disable-line camelcase
    };

    Actions.submitBid(bid);
  },

  render() {
    let {
      submitted,
      highlight,
      title,
      link
    } = this.state;

    let titleInputCx = cx('panel-input', {
      'input-error': highlight === 'title'
    });

    let linkInputCx = cx('panel-input', {
      'input-error': highlight === 'link'
    });

    let errorMessage = this.props.errorMessage;
    let error = errorMessage && (
      <div className="error modal-form-error">{ errorMessage }</div>
    );

    return (
      <div className="newbid">
        <h1>New Bid</h1>
        <form onSubmit={ this.submitBid } className="modal-form">
          <label htmlFor="newbid-title">Title</label>
          <input
            type="text"
            className={ titleInputCx }
            placeholder="Title"
            id="newbid-title"
            value={ title }
            onChange={ (e) => this.setState({ title: e.target.value }) }
          />
          <label htmlFor="newbid-url">Link</label>
          <input
            type="text"
            className={ linkInputCx }
            placeholder="Link"
            id="newbid-url"
            value={ link }
            onChange={ (e) => this.setState({ link: e.target.value.trim() }) }
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
