'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { Link } from 'react-router';

import Actions from './actions/Actions';

import AgentStore from './stores/AgentStore';
import ListingsStore from './stores/ListingsStore';
import SellerStore from './stores/SellerStore';
import ModalStore from './stores/ModalStore';

import Base from './views/Base';
import Modal from './components/Modal';
import AgentLogin from './components/AgentLogin';
import SellerLogin from './components/SellerLogin';
import AgentRegister from './components/AgentRegister';
import SellerRegister from './components/SellerRegister';
import NewListing from './components/NewListing';
import NewBid from './components/NewBid';
import LoginLinks from './components/LoginLinks';
import AgentSettings from './components/AgentSettings';
import SellerSettings from './components/SellerSettings';

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
    Reflux.listenTo(AgentStore, 'updateCurrentAgent'),
    Reflux.listenTo(SellerStore, 'updateCurrentSeller')
  ],

  getInitialState() {
    let agentData = AgentStore.getDefaultData();
    let sellerData = SellerStore.getDefaultData();

    return {
      loading: true,
      agent: agentData.currentAgent,
      listing: ListingsStore.currentListing,
      seller: sellerData.currentSeller,
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
    Actions.fetchAgents();

    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
  },

  updateCurrentSeller(sellerData) {
    this.setState({
      loading: false,
      showModal: false,
      seller: sellerData.currentSeller
    });
  },

  updateCurrentAgent(agentData) {
    this.setState({
      loading: false,
      showModal: false,
      agent: agentData.currentAgent
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

  newListing() {
    if (this.state.seller) {
      Actions.showModal('newlisting');
    } else {
      Actions.showModal('agentlogin', 'You have to be logged in as a Seller to do that', ['newlisting']);
    }
  },

  getModalComponent(modal) {
    if (!modal.type) {
      return null;
    }

    let modalInner;
    let modalProps = {
      agent: this.state.agent,
      listing: this.state.listing,
      seller: this.state.seller,
      errorMessage: modal.errorMessage
    };

    switch (modal.type) {
      case 'agentregister':
        modalInner = <AgentRegister { ...modalProps } />; break;
      case 'sellerregister':
        modalInner = <SellerRegister { ...modalProps } />; break;
      case 'agentlogin':
        modalInner = <AgentLogin { ...modalProps } />; break;
      case 'sellerlogin':
        modalInner = <SellerLogin { ...modalProps } />; break;
      case 'newlisting':
        modalInner = <NewListing { ...modalProps } />; break;
      case 'newbid':
        modalInner = <NewBid { ...modalProps } />; break;
    }

    return (
      <Modal hideModal={ this.hideModal }>
        { modalInner }
      </Modal>
    );
  },

  render() {
    let { agent, listing, seller, modal, loading } = this.state;

    var newListingButton = (
      <a className="newlisting button special" onClick={ this.newListing }>
        <i className=""></i>
        <span className="sr-only">New Listing</span>
      </a>
    );

    return (
      <div className="wrapper full-height">
        <header className="header cf">
          <div className="float-left">
          </div>
          <div className="float-right">
            { agent ? <AgentSettings agent={ agent } /> : null }
            { seller ? <SellerSettings seller={ seller } /> : null }
            { (!agent && !seller) ? (loading ? null : <LoginLinks />) : null }
            { seller ? newListingButton : null }
          </div>
        </header>

        <main id="content" className="full-height inner">
          <Base agent={ agent } seller={ seller } />
        </main>

        { this.getModalComponent(modal) }
      </div>
    );
  }
});

export default App;
