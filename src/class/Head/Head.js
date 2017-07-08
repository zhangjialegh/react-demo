import { Layout,Avatar,Menu,Dropdown,Icon} from 'antd';
const {Header}=Layout;
import './index.less';

class Head extends React.Component{
    constructor(props) {
        super(props);
        this.onClick=this.onClick.bind(this);
    }
    onClick(){

    }
    render(){
        let {onClick}=this;
        const url=require('../../assets/imgs/photo.jpg');
        const menu = (
                        <Menu style={{width:100,textAlign:'center'}} onClick={onClick}>
                            <Menu.Item key="1">个人信息</Menu.Item>
                            <Menu.Item key="2">用户中心</Menu.Item>
                            <Menu.Item key="3">系统设置</Menu.Item>
                            <Menu.Item key="4">个人设置</Menu.Item>
                        </Menu>
                        );
        return (
           <Header style={{background:'#fff',padding:0}}>
               <Dropdown overlay={menu} style={{float:'right'}}>
                   <a className="avatar" href="javascript:;" >
                       <Avatar src={url}/><Icon type="down" className="down"/>
                   </a>
                </Dropdown>
           </Header>
        );
    }
};



export default Head;