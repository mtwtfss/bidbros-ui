'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import ListingsStore from '../stores/ListingsStore';
import Spinner from '../components/Spinner';
import Listing from '../components/Listing';

const Listings = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(ListingsStore, 'updateListings')
  ],

  getInitialState() {
    let listingsData = ListingsStore.getDefaultData();

    return {
      loading: true,
      listings: listingsData.listings,
      listingRange: listingsData.listingRange
    };
  },

  componentDidMount() {
    Actions.fetchListings();
  },

  routerWillLeave() {},

  updateListings(listingsData) {
    this.setState({
      loading: false,
      listings: listingsData.listings,
      listingRange: listingsData.listingRange
    });
  },

  loadMoreListings() {
    Actions.expandListingRange();
  },

  render() {
    let listings = this.state.listings;
    let listingRange = this.state.listingRange;

    if (listings.length) {
      listings = listings.slice(0, listingRange).map(function(listing) {
        return <Listing listing={ listing } key={ listing.id } />;
      });
    } else {
      listings = 'There are no listings yet!';
    }

    return (


                                <section id="main" className="container">

                                        <section className="box special">
      <div className="content full-width">
        <div className="bids">
{ this.state.loading ? <Spinner /> : listings }
        </div>
        {
          this.state.listings.length > this.state.listingRange ? (
            <nav className="pagination">
              <hr />
            </nav>
          ) : null
        }
      </div>

                                        </section>
                                </section>





    );
  }
});

export default Listings;
