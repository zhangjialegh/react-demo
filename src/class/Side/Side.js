import React from 'react';
import ReactDOM from 'react-dom';
import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const {Sider}=Layout;
const SubMenu=Menu.SubMenu;
import './Side.css';
// let propTypes = {
//   // collapsed: PT.bool,
//   mode: PT.string,
//   onCollapse: PT.func,
// }


class Side extends React.Component{
  constructor(props) {
    super(props)
    
    this.state={
      collapsed:true,
    }
    this.onCollapse=this.onCollapse.bind(this);
    
  }
  onCollapse(collapsed){
    this.setState({
      collapsed
    });
  }
    render(){
        let {collapsed}=this.state;
        let {onCollapse}=this;
        return (
             <Sider
               collapsible
               collapsed={collapsed}
              onCollapse={onCollapse}
        >
          <div className="logo" style={{backgroundColor:'#d62020'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/* <SubMenu key="sub1" title={<span><Icon type="user"/><span className="nav-text">User</span></span>}
            onClick={click}
            > */}
            <Menu.Item key='1' ><Link to="/layout/main"><Icon type='home'/><span>首页</span></Link></Menu.Item>
            <Menu.Item key='2' ><Link to="/layout/forecast"><Icon type='cloud-o'/><span>预报天气</span></Link></Menu.Item>
            <Menu.Item key='3' ><Link to="/layout/hoursly"><Icon type='calendar'/><span>24小时天气</span></Link></Menu.Item>
            <Menu.Item key='4' ><Link to="/layout/lifenote"><Icon type='heart-o'/><span>生活小贴士</span></Link></Menu.Item>
            {/* </SubMenu> */}

            {/* <SubMenu key="sub2" title={<span><Icon type="team"/><span className="nav-text">Team</span></span>}
            > */}
  
            {/* </SubMenu> */}
            {/* <Menu.Item key='7'>
              <span>
                <Icon type="file"/>
                <span className="nav-text">File</span>
              </span>
            </Menu.Item> */}
          </Menu>
        </Sider>
        );
    }
};
Side.__ANT_LAYOUT_SIDER = true;
// Side.propTypes=propTypes;
export default Side;