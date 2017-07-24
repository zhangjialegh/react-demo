import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './Login.less';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    if(!localStorage.getItem('registInfo')){
      message.info('首次使用的用户请先注册再登陆!');
      return;
    }
    
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        let {password,userName}=values;
        const registInfo=JSON.parse(localStorage.getItem('registInfo'))||[];
        let confirm=false;
        for(let item of registInfo){
          if(password===item.password&&userName===item.nickname){
            confirm=true;
            this.props.loggedIn();
          }
        }
        if(!confirm){
          message.error('用户名或密码错误,请重新输入!');
        }
      }else{
        if(JSON.parse(localStorage.getItem('registInfo'))){
          message.warning('用户名或密码不能为空!');
          return;
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" action="/">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
    
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
      
          <div>
          Or <Link to="/regist">register</Link>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;