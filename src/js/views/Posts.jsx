'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import PostsStore from '../stores/PostsStore';
import UserStore from '../stores/UserStore';
import Spinner from '../components/Spinner';
import Post from '../components/Post';

const Posts = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(PostsStore, 'updatePosts')
  ],

  getInitialState() {
    let postData = PostsStore.getDefaultData();

    return {
      loading: true,
      posts: postData.posts,
      postRange: postData.postRange
    };
  },

  componentDidMount() {
    Actions.fetchPosts();
  },

  routerWillLeave() {},

  updatePosts(postData) {
    var users = UserStore.getUsers();
    postData.posts.forEach(function(post) {
      var user = users[post.user_id];

      if (user) {
        post.username = users[post.user_id].username;
      } else {
        post.username = 'User ' + post.user_id;
      }
    });

    this.setState({
      loading: false,
      posts: postData.posts,
      postRange: postData.postRange
    });
  },

  loadMorePosts() {
    Actions.expandPostRange();
  },

  render() {
    let posts = this.state.posts;
    let postRange = this.state.postRange;

    if (posts.length) {
      posts = posts.slice(0, postRange).map(function(post) {
        return <Post post={ post } key={ post.id } />;
      });
    } else {
      posts = 'There are no posts yet!';
    }

    return (
      <div className="content full-width">
        <div className="posts">
          { this.state.loading ? <Spinner /> : posts }
        </div>
        {
          this.state.posts.length > this.state.postRange ? (
            <nav className="pagination">
              <hr />
              <a onClick={ this.loadMorePosts } className="load-more">Load More Posts</a>
            </nav>
          ) : null
        }
      </div>
    );
  }
});

export default Posts;
