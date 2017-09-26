import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'


import RouteWithSubRoutes from './RouteWithSubRoutes';
import routes from './routeConfig';
import root from './lazy/firstPage'
import { path } from '../utils/serverData/contentPath'

class MainRouter extends Component {

  render() {
    const rootPath = `${path}/`
    return(
      <Switch>
        <Route exact path={rootPath} component={root}/>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </Switch>
    )
  }
}

export { MainRouter };
