'use strict'

import React from 'react';
import { Button } from 'antd'

class SignupForm extends React.Component{
   
  handleSubmit(event) {
    event.preventDefault();
    if(this.refs.name.value == '' || this.refs.passwd.value == '') return ;
    let newUser = {
      name: this.refs.name.value,
      passwd: this.refs.passwd.value,
      phonenum: this.refs.phonenum.value,
      created: new Date(),
      picture: this.refs.picture.value
    };
    this.refs.createUser_form.reset();
    this.props.onCreateUser(newUser);
  }
  
  render() {
    let isUserCreateSuccess = this.props.isCreated ? '恭喜你,注册成功!!!' : '欢迎注册'  
    console.log('fffffffffffffffffffffffffff');
    console.log(this.props)
    return (
      <form ref="createUser_form" className="inner_signup" style={ this.props.style } onSubmit={this.handleSubmit.bind(this)}>
        <h5>注册用户</h5>
        <p >{ isUserCreateSuccess } </p>
        <input ref="name" type="text" className="your_create" placeholder="用户名" />
        <input ref="passwd" type="password" className="your_create" placeholder="密码"/>
        <input ref="phonenum" type="text" className="your_create" placeholder="手机号"/>
        <input ref="picture" type="text" className="your_create" placeholder="头像"/>
        <Button className="create_cancel_btn" onClick={ this.props.onUserCreateForm }>取消</Button>
        <input type="submit" value="确认" className="create_confirm_btn"/>
      </form>
    )
  }
}

export default SignupForm
