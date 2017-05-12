'use strict'
import React from 'react'
import { Button } from 'antd'

class LoginForm extends React.Component{

  handleSubmit(event) {
    event.preventDefault();
    if(this.refs.name.value == '' || this.refs.passwd.value == '') return ;
    let userData = {
      name: this.refs.name.value,
      passwd: this.refs.passwd.value
    };
    this.props.onUserLoginForm();
    this.props.onUserLogin(userData);
  }

  render() {
    let style = {
      display: this.props.formUserLoginDisplayed ? 'block' : 'none'
    }
    return (
      <form ref="loginUser_form" action="#" className="user_login" style={ style } onSubmit={ this.handleSubmit.bind(this) }>
        <h5>用户登录</h5>
        <input ref="name" type="text" className="your_create" placeholder="用户名" />
        <input ref="passwd" type="password" className="your_create" placeholder="密码"/>
        <Button className="login_cancel_btn" onClick={ this.props.onUserLoginForm }>取消</Button>
        <input type="submit" value="登录" className="login_confirm_btn"/>
      </form>
    )
  }
}

export default LoginForm
