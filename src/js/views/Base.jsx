'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Bids from './Bids';
import Listings from './Listings';

const Base = React.createClass({
  render() {
    if (this.props.agent) {
      return <Listings />;
    } else if (this.props.seller) {
      return <Bids />;
    } else {
      return (

				<section id="main" className="container">

					<section className="box special">
						<header className="major">
							<h2>Introducing the best platform</h2>
							<h2>for matching real estate agents and sellers</h2>
							<p>Searching for the right real estate agent can be a nightmare! Our product guarantees that the interests of both sellers and agents are aligned.</p>
						</header>
						<span className="image featured"><img src="images/pic01.jpg" alt="" /></span>
					</section>

					<section className="box special features">
						<div className="features-row">
							<section>
								<span className="icon major fa-bolt accent2"></span>
								<h3>Property listings</h3>
								<p>Sellers list their properties and await competitive offers from real estate agents</p>
							</section>
							<section>
								<span className="icon major fa-area-chart accent3"></span>
								<h3>Historical data</h3>
								<p>Historical data about the agents is presented to support their respective bids</p>
							</section>
						</div>
						<div className="features-row">
							<section>
								<span className="icon major fa-cloud accent4"></span>
								<h3>Competitive rates</h3>
								<p>Bidding encourages real estate agents to keep rates fair and competitive</p>
							</section>
							<section>
								<span className="icon major fa-lock accent5"></span>
								<h3>Customization</h3>
								<p>Prioritize listings and bids based on personal agenda</p>
							</section>
						</div>
					</section>

                                <section id="cta">

                                        <h2>Sign up for beta access</h2>
    
                                        <form>
                                                <div className="row uniform 50%">
                                                        <div className="8u 12u(mobilep)">
                                                                <input type="email" name="email" id="email" placeholder="Email Address" />
                                                        </div>
                                                        <div className="4u 12u(mobilep)">
                                                                <input type="submit" value="Sign Up" className="fit" />
                                                        </div>
                                                </div>
                                        </form>

                                </section>

				</section>


      );
    }
  }
});

export default Base;
