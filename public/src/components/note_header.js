'use strict'

import React , { Component, PropTypes } from 'react';
import { Button} from 'antd';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import Notes_list from "../components/note_list"

class Notes_header extends React.Component{

  render() {
    let style = {
      display: this.props.isLogin ? 'block' : 'none'
    };
    let unstyle = {
      display: !this.props.isLogin ? 'block' : 'none'
    };
    return (
      <div className="main"> 
        <div className="header">
          <div className="header_main">
            <h2>React 博客</h2>
            <Button className="add_user_btn" style={ unstyle } >注册</Button>
            <Button className="login_user_btn" style={ unstyle } >登录</Button>
            <Button className="add_note_btn"  style={ style } >添加笔记</Button>
            <Button className="logout_user_btn" style={ style } >退出</Button>
          </div>
          <div className="navBox">
            <ul className="nav-content">
              <li><Link to="/" activeClassName="active">首页</Link></li>
              <li style={ style } ><Link to="/user/articles" activeClassName="active">主页</Link></li>
              <li><Link to="/about" activeClassName="active">关于网站架构</Link></li>
            </ul>
          </div>
        </div>
        <div className="signup">
          <User_signup />
        </div>
        <div>
        {this.props.children || <Notes_list location={ this.props.location } />} 
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {isLogin: state.isLogin}
}
export default connect(mapStateToProps)(Notes_header)
