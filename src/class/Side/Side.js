import React from 'react';
import { Layout,Menu,Icon } from 'antd';
import {Link} from 'react-router-dom';
const {Sider}=Layout;
const SubMenu=Menu.SubMenu;
import './Side.less';
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
      key:['0'],
    }
    this.onCollapse=this.onCollapse.bind(this);
    this.matchKey=this.matchKey.bind(this);
  }
  componentWillMount(){
    const {params:{id}}=this.props.match;
    this.matchKey(id);
  }
  componentWillReceiveProps(nextProps) {
        if (nextProps!=this.props) {
          const {match:{params}}=nextProps;
         this.matchKey(params.id);
        }
    }
  matchKey(id){
    switch (id) {
      case 'main':
        this.setState({
          key:1
        })
        break;
        case 'forecast':
          this.setState({
            key:2
          })
          break;
          case 'hoursly':
            this.setState({
              key:3
            })
            break;
            case 'lifenote':
              this.setState({
                key:4
              })
              break;   
              case 'todo':
                this.setState({
                  key:5
                })
                break;     
      default:
      this.setState({
        key:0
      })
        break;
    }
  }
  onCollapse(collapsed){
    this.setState({
      collapsed
    });
    setTimeout(() =>{ 
      
      if(typeof myChartTemp==='object'){
        myChartTemp.resize();
      }else if(typeof dailyTemp==='object'){
        window.dailyTemp.resize();
      }
    },200);
  }
    render(){
        let {collapsed,key}=this.state;
        let {onCollapse}=this;
        return (
             <Sider
               collapsible
               collapsed={collapsed}
              onCollapse={onCollapse}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" selectedKeys={[`${key}`]}>
            {/* <SubMenu key="sub1" title={<span><Icon type="user"/><span className="nav-text">User</span></span>}
            onClick={click}
            > */}
            <Menu.Item key='1' ><Link to="/main"><Icon type='home'/><span>首页</span></Link></Menu.Item>
            <Menu.Item key='2' ><Link to="/forecast"><Icon type='cloud-o'/><span>预报天气</span></Link></Menu.Item>
            <Menu.Item key='3' ><Link to="/hoursly"><Icon type='calendar'/><span>24小时天气</span></Link></Menu.Item>
            <Menu.Item key='4' ><Link to="/lifenote"><Icon type='heart-o'/><span>生活小贴士</span></Link></Menu.Item>
            <Menu.Item key='5' ><Link to="/todo"><Icon type="file-text" /><span>todos</span></Link></Menu.Item>
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