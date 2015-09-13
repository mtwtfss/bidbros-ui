'use strict';

import '../scss/main.scss';
import Routes from './routes';
import React from 'react/addons';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
React.render(Routes, document.getElementById('app'));
