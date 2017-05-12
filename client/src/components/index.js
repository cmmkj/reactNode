'use strict'

import React , { Component, PropTypes } from 'react';
import { Button} from 'antd';
import { Link, IndexLink, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Notes_list from "../components/note_list"
import SignForm from '../modules/signup'
import LoginForm from '../modules/login'
import * as actions from '../action/user'

class Index extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      formUserCreateDisplayed: false,
      formUserLoginDisplayed: false
    }
  }

  onCreateUser(newUser) {
    this.props.actions.createUser(newUser);
  }
  
  onUserLogin(userData) {
    this.props.actions.login(userData)
  }

  onUserCreateForm() {
    this.setState({
      formUserLoginDisplayed: false,
      formUserCreateDisplayed: !this.state.formUserCreateDisplayed
    })
  } 
  
  onUserLoginForm() {
    this.setState({
      formUserCreateDisplayed: false,
      formUserLoginDisplayed: !this.state.formUserLoginDisplayed
    })
  }

  onUserLogout() {
    this.props.actions.logout();
    const path = '/';
    browserHistory.push(path);
  }

  render() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let { isLogin } = this.props.loginInfo ? this.props.loginInfo : userInfo ? userInfo : {}
    let style = {
      display: isLogin ? 'block' : 'none'
    };
    let unstyle = {
      display: !isLogin ? 'block' : 'none'
    };
    let signStyle = {
      display: this.state.formUserCreateDisplayed ? 'block' : 'none'
    }
    return (
      <div className="main"> 
        <div className="header">
          <div className="header_main">
            <h2>NodeJs 博客</h2>
            <Button className="add_user_btn" style={ unstyle } 
              onClick={ this.onUserCreateForm.bind(this) }>注册
            </Button>
            <Button className="login_user_btn" style={ unstyle } 
              onClick={ this.onUserLoginForm.bind(this) } >登录
            </Button>
            <h5 className="add_note_btn"  style={ style } ><Link to="user/note" >写文章</Link></h5>
            <Button className="logout_user_btn" style={ style } 
              onClick={ this.onUserLogout.bind(this) }>退出
            </Button>
          </div>
          <div className="navBox">
            <ul className="nav-content">
              <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
              <li style={ style } ><Link to="/user/notes" activeClassName="active">主页</Link></li>
              <li><Link to="/about" activeClassName="active">关于网站</Link></li>
            </ul>
          </div>
        </div>
        <SignForm onCreateUser={ this.onCreateUser.bind(this) } 
          style={ signStyle }
          isCreated={ this.props.isCreated }
          onUserCreateForm={ this.onUserCreateForm.bind(this) }
        />
        <LoginForm onUserLogin={this.onUserLogin.bind(this) }
          formUserLoginDisplayed={ this.state.formUserLoginDisplayed }
          onUserLoginForm={ this.onUserLoginForm.bind(this) }
        />
        {this.props.children || <Notes_list location={ this.props.location } />} 
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    loginInfo: state.loginInfo,
    isCreated: state.isCreated
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
