'use strict'

import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

class Notes_loginUser extends React.Component{
  handleSubmit(event) {
    event.preventDefault();
    if(this.refs.name.value == '' || this.refs.passwd.value == '') return ;
    let userData = {
      name: this.refs.name.value,
      passwd: this.refs.passwd.value
    };
    this.refs.loginUser_form.reset();
    this.props.onLoginUser(userData);
  }
  render() {
    let style = {
      display: this.props.formUserLoginDisplayed ? 'block' : 'none'
    }
    console.log(style)
    return (
      <div className="user_login_wrap"> 
        <form ref="loginUser_form" action="#" className="user_login" style={ style } onSubmit={ this.handleSubmit.bind(this) }>
          <h5>用户登录</h5>
          <input ref="name" type="text" className="your_create" placeholder="用户名" />
          <input ref="passwd" type="password" className="your_create" placeholder="密码"/>
          <Button className="login_cancel_btn" onClick={ this.props.onUserLoginForm }>取消</Button>
          <input type="submit" value="登录" className="login_confirm_btn"/>
        </form>
      </div>
    );
  }
};

Notes_loginUser.propTypes = {
  onUserLoginForm: PropTypes.func.isRequired,
  formUserLoginDisplayed: PropTypes.bool.isRequired,
  onLoginUser: PropTypes.func.isRequired
};

export default Notes_loginUser
