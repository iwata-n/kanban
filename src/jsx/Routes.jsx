import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Master from './components/Master';
import Kpt from './components/kanban/page';

const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={Kpt}/>
  </Route>
);

export default AppRoutes;
