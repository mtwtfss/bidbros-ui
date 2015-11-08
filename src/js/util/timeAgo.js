'use strict';

import moment from 'moment';

export default function timeAgo(timePosted) {
  return moment(timePosted * 1000, 'x').fromNow();
}
