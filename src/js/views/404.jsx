'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import PostsStore from '../stores/PostsStore';
import { Navigation, TransitionHook } from 'react-router';

// components
const Link = require('react-router').Link;

const uhOh = React.createClass({
  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(PostsStore, 'newPost')
  ],

  routerWillLeave() {},

  newPost(data) {
    var post = data.posts[0];
    this.setState({ post: post });
    this.transitionTo(`/post/${post.id}`);
  },

  render() {
    return (
      <div className="content full-width">
        <h1>{ 'That Page Doesn\'t Exist' }</h1>
        <p><Link to="/">Return to the homepage</Link></p>
      </div>
    );
  }
});

export default uhOh;
