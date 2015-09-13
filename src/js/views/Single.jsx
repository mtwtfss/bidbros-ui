'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import SingleStore from '../stores/SingleStore';
import PostsStore from '../stores/PostsStore';
import UserStore from '../stores/UserStore';
import Spinner from '../components/Spinner';
import Post from '../components/Post';

const SinglePost = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(PostsStore, 'newPost'),
    Reflux.listenTo(SingleStore, 'updatePost')
  ],

  getInitialState() {
    let postData = SingleStore.getDefaultData();

    return {
      loading: true,
      post: postData.post
    };
  },

  componentDidMount() {
    let { postId } = this.props.params;
    Actions.fetchPost(postId);
  },

  routerWillLeave() {},

  newPost(data) {
    var post = data.posts[0];
    this.setState({ post: post });
    this.transitionTo(`/post/${post.id}`);
  },

  updatePost(post) {
    if (!post.id) {
      this.transitionTo('/404');
      return;
    }

    var user = UserStore.getUser(post.user_id);
    if (user) {
      post.username = user.username;
    } else {
      post.username = 'User ' + post.user_id;
    }

    this.setState({ post: post, loading: false });
  },

  render() {
    let content;
    let { loading, post } = this.state;
    let { postId } = this.props.params;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <Post post={ post } key={ postId } />
        </div>
      );
    }

    return (
      <div className="content full-width">
        { content }
      </div>
    );
  }
});

export default SinglePost;
