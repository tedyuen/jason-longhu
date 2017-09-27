import React, { Component } from 'react'
import { getParams } from '../../../../utils/tools/params';
import { connect } from 'react-redux';
import Img from 'react-image'
import back from './background2.jpeg'
import '../../firstPage/container/firstPage.scss'

class SecondPage extends Component {

  render() {
    return (
      <div className="first-page">
        <Img src={back} className="back-img"/>

        <div className="first-page-inner">

          <div className="inner-text">
            抽奖码：{this.props.params}
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    params: getParams(state),
  }
}


export default connect(mapStateToProps, null)(SecondPage)
