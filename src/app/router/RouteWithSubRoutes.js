import React from 'react';
import {Route} from 'react-router-dom'
import { isEmpty } from '../utils/tools/objects'

const RouteWithSubRoutes = (route) => {
  if(isEmpty(route.params)){
    return (
      <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )
  }else{
    return (
      <Route path={`${route.path}${route.params}`} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )
  }


}

export default RouteWithSubRoutes
