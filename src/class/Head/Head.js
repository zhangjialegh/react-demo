import { Layout,Avatar,Menu,Dropdown,Icon} from 'antd';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const {Header}=Layout;
import './index.less';

class Head extends React.Component{
    constructor(props) {
        super(props);
        this.onClick=this.onClick.bind(this);
    }
    onClick(e){
console.log(e.target);
    }
    render(){
        let {onClick}=this;
        const url=require('../../assets/imgs/photo.jpg');
        const menu = (
                        <Menu style={{width:100,textAlign:'center'}} onClick={onClick}>
                            <Menu.Item key="1">个人信息</Menu.Item>
                            <Menu.Item key="2"><Link to="/layout/citymanage">城市管理</Link></Menu.Item>
                            <Menu.Item key="3">系统设置</Menu.Item>
                            <Menu.Item key="4"><Link to="/">退出</Link></Menu.Item>
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