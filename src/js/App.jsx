'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { Link } from 'react-router';

import Actions from './actions/Actions';

import UserStore from './stores/UserStore';
import ModalStore from './stores/ModalStore';

import Posts from './views/Posts';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import LoginLinks from './components/LoginLinks';
import UserSettings from './components/UserSettings';

import Colors from 'material-ui/lib/styles/colors';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

let App = React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    Reflux.listenTo(ModalStore, 'onModalUpdate'),
    Reflux.listenTo(UserStore, 'updateCurrentUser')
  ],

  getInitialState() {
    let userData = UserStore.getDefaultData();

    return {
      loading: true,
      user: userData.currentUser,
      modal: ModalStore.getDefaultData(),
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  getChildContext: function() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  componentWillMount() {
    Actions.fetchUser();
    Actions.fetchUsers();

    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
  },

  updateCurrentUser(userData) {
    this.setState({
      loading: false,
      showModal: false,
      user: userData.currentUser
    });
  },

  onModalUpdate(newModalState) {
    this.setState({
      modal: newModalState
    });
  },

  hideModal(e) {
    if (e) { e.preventDefault(); }
    Actions.hideModal();
  },

  newPost() {
    if (this.state.user) {
      Actions.showModal('newpost');
    } else {
      Actions.showModal('login', 'You have to login to do that', ['newpost']);
    }
  },

  getModalComponent(modal) {
    if (!modal.type) {
      return null;
    }

    let modalInner;
    let modalProps = {
      user: this.state.user,
      errorMessage: modal.errorMessage
    };

    switch (modal.type) {
      case 'register':
        modalInner = <Register { ...modalProps } />; break;
      case 'login':
        modalInner = <Login { ...modalProps } />; break;
      case 'newpost':
        modalInner = <NewPost { ...modalProps } />; break;
    }

    return (
      <Modal hideModal={ this.hideModal }>
        { modalInner }
      </Modal>
    );
  },

  render() {
    let { user, modal, loading } = this.state;

    return (
      <div className="wrapper full-height">
        <header className="header cf">
          <div className="float-left">
            <Link to="/" className="menu-title">Bid Bros</Link>
          </div>
          <div className="float-right">
            { user ? <UserSettings user={ user } /> : (loading ? null : <LoginLinks />) }
            <a className="newpost-link" onClick={ this.newPost }>
              <i className="fa fa-plus-square-o"></i>
              <span className="sr-only">New Post</span>
            </a>
          </div>
        </header>

        <main id="content" className="full-height inner">
          { this.props.children || <Posts /> }
        </main>

        { this.getModalComponent(modal) }
      </div>
    );
  }
});

export default App;
