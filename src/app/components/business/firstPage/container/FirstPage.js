import React, { Component } from 'react'
import Img from 'react-image'
import back from './background.jpeg'
import { putParams } from '../../../../utils/tools/params'
import './firstPage.scss'

let $ = window.$
class FirstPage extends Component {
  constructor(props) {
    super(props)
    this.handleGoClick = this.handleGoClick.bind(this)
  }

//   http://120.26.64.180:8084/sch/fang/createCode.do
// http://optest.reachmedia.cn:8084/sch/fang/createCode.do
//
// 请求参数
// name
// mobile
//
// 返回
// code
  handleGoClick() {
    let name = this.refs.name.value;
    let mobile = this.refs.mobile.value;
    if(name.trim() == '') {
      alert('请输入姓名');
    }else if(mobile.trim() == ''){
      alert('请输入手机号码')
    }else{
      $.ajax({
        type:'post',
        url:'http://optest.reachmedia.cn:8084/sch/fang/createCode.do',
        data:{name:name,mobile:mobile},//这里不是json，是表单参数
        success:function(data){
          console.log(data);
          putParams('38372637','/second');
        },
        complete:function(XMLHttpRequest, textStatus){
          console.log('complete');
        },
        error:function(){
          console.log('error');
        }
      });
    }
    console.log(name+":"+mobile);
  }


  render() {
    return (
      <div className="first-page">
        <Img src={back} className="back-img"/>

        <div className="first-page-inner">
          <div className="input-frame">

            <div className="input-div">
              <input type="text" ref="name" placeholder="姓名"/>
            </div>
            <div className="input-div">
              <input type="tel" ref="mobile" placeholder="手机号码"/>
            </div>

            <div className="btn-submit" onClick={this.handleGoClick}>提交</div>

          </div>

        </div>
      </div>
    )
  }
}

export default FirstPage
