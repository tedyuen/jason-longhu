import React from 'react';
import { Route } from 'react-router-dom'

const indexRoute = (props) => {
  const { routes } = props;
  for(let route of routes) {
    if(route.index) {
      return (
        <Route path="/" render={props => (
          <route.component {...props} routes={route.routes}/>
        )}/>
      )
    }
  }
}

export default indexRoute;
