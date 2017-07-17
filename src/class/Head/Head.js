import React from 'react';
import ReactDOM from 'react-dom';
import { Layout,Avatar,Menu,Dropdown,Icon} from 'antd';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const {Header}=Layout;
import './head.less';

class Head extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        let {onClick}=this;
        const {city,changeCity,outLoggedin}=this.props;
        const url=require('../../assets/imgs/photo.jpg');
        const menu = (
                        <Menu style={{width:100,textAlign:'center'}} onClick={onClick}>
                            <Menu.Item key="1">个人信息</Menu.Item>
                            <Menu.Item key="2"><Link to="/layout/citymanage">城市管理</Link></Menu.Item>
                            <Menu.Item key="3">系统设置</Menu.Item>
                            <Menu.Item key="4"><Link onClick={outLoggedin} to="/">退出</Link></Menu.Item>
                        </Menu>
                        );
        return (
           <Header>
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