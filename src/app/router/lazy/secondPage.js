import React from 'react';
import SecondPage from 'bundle-loader?lazy!../../components/business/secondPage/container/SecondPage'
import Bundle from '../../Bundle';
import { path } from '../../utils/serverData/contentPath'

const secondPage = (props) => (
  <Bundle load={SecondPage}>
    {(SecondPage) => <SecondPage {...props}/>}
  </Bundle>
)

export default {
  path: `${path}/second`,
  component: secondPage
}
