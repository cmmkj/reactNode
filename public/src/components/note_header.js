'use strict'

import React , { Component, PropTypes } from 'react';
import { Button} from 'antd';

class Notes_header extends React.Component{
  render() {
    let style = {
      display: this.props.isLogin ? 'block' : 'none'
    };
    let unstyle = {
      display: !this.props.isLogin ? 'block' : 'none'
    };
    return (
      <div className="header"> 
        <div className="header_main">
          <h2>React 笔记本</h2>
          <Button className="add_note_btn"  style={ style } onClick={ this.props.onToggleForm }>添加笔记</Button>
          <Button className="add_user_btn" style={ unstyle } onClick={ this.props.onUserCreateForm }>注册</Button>
          <Button className="login_user_btn" style={ unstyle } onClick={ this.props.onUserLoginForm }>登录</Button>
          <Button className="logout_user_btn" style={ style } onClick={ this.props.onLogoutUser }>退出</Button>
        </div>
      </div>
    )
  }
}

Notes_header.propTypes = {
  onToggleForm: PropTypes.func.isRequired,
  onUserCreateForm: PropTypes.func.isRequired,
  onUserLoginForm: PropTypes.func.isRequired
};

export default Notes_header


