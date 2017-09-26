import React from 'react';
import FirstPage from 'bundle-loader?lazy!../../components/business/firstPage/container/FirstPage'
import Bundle from '../../Bundle';

const root = (props) => (
  <Bundle load={FirstPage}>
    {(FirstPage) => <FirstPage {...props}/>}
  </Bundle>
)

export default root;
