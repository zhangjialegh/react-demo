import { Button, Modal, Form, Input, Checkbox,Icon } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
const CollectionCreateForm = Form.create()((props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <WrappedNormalLoginForm />
      </Modal>
    );
  }
);

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    visible: false,
  };
  this.showModal=this.showModal.bind(this);
  this.handleCancel=this.handleCancel.bind(this);
  this.handleCreate=this.handleCreate.bind(this);
  this.saveFormRef=this.saveFormRef.bind(this);
  }
  
  showModal  ()  {
    this.setState({ visible: true });
  }
  handleCancel  ()  {
    this.setState({ visible: false });
  }
  handleCreate  ()  {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef  (form)  {
    this.form = form;
  }
  render() {
    let {showModal}=this;
    return (
      <div>
        //<Button type="primary" onClick={showModal}>New Collection</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


export default CollectionsPage;