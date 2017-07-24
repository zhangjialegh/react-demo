import React from 'react';
import { Form, Input, Tooltip, Icon, Select, Button, AutoComplete,message } from 'antd';
import './Regist.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      registConfirm:false,
      autoCompleteResult: [],
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.checkPassword=this.checkPassword.bind(this);
  }
  
  handleSubmit (e)  {
    e.preventDefault();
    let history=this.props.history;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {email,nickname}=values;
        const registInfo=JSON.parse(localStorage.getItem('registInfo'))||[];
        
        for(let item of registInfo){
          if(email===item.email){
              message.warning('The email had been registed!');
              return;
          }else if(nickname===item.nickname){
              message.warning('The nickname had been used!');
              return;
          }
        }
        registInfo.push(values);
        localStorage.setItem('registInfo',JSON.stringify(registInfo));
        this.setState({
          registConfirm:true
        })
        history.replace("/login");
      }
    });
  }
  checkPassword (rule, value, callback)  {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 16,offset:4 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16,offset:4 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 4,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
            validateTrigger:'onBlur',
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
            validateTrigger:'onBlur',
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
            validateTrigger:'onBlur',
          }
        
        )(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            validateTrigger:'onBlur',
          })(
            <Input />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="small">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default WrappedRegistrationForm;