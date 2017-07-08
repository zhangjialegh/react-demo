import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Index from './index';
import './App.css';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit  (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // if (!err) {
        if(values.userName==='111'&&values.password==='111'){
          ReactDOM.render(<Index />, document.getElementById('root'));
        }else if(values.userName.trim()!=''&&values.password.trim()!==''){
          alert('用户名或密码错误！');
          console.log(values);
        // }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));




if(module.hot){
  module.hot.accept();
}