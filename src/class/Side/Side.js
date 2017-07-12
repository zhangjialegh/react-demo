import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const {Sider}=Layout;
const SubMenu=Menu.SubMenu;
// let propTypes = {
//   // collapsed: PT.bool,
//   mode: PT.string,
//   onCollapse: PT.func,
// }


class Side extends React.Component{
  constructor(props) {
    super(props)
    this.click=this.click.bind(this);
  }
  click(e){
    console.log(e.target.href);
  }
    render(){
        let {collapsed,mode,onCollapse}=this.props;
        let {click}=this;
        return (
             <Sider
             // {/*collapsible*/}
            //  {/*collapsed={collapsed}*/}
              collapsedWidth="0"
           //   {/*onCollapse={onCollapse}*/}
              breakpoint={'lg'}
              style={{overflow:'scroll-y',zIndex:999}}
        >
        <div className="logo" />
          <Menu theme="dark" mode={mode} defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" title={<span><Icon type="user"/><span className="nav-text">User</span></span>}
            onClick={click}
            >
            <Menu.Item key='1' ><Link onClick={click} to="/"><Icon type='user'/>首页</Link></Menu.Item>
            <Menu.Item key='2' ><Link onClick={click} to="/forecast"><Icon type='video-camera'/>预报天气</Link></Menu.Item>
            <Menu.Item key='3' ><Link onClick={click} to="/hoursly"><Icon type='upload'/>24小时天气</Link></Menu.Item>
            <Menu.Item key='4' ><Link onClick={click} to="/lifenote"><Icon type='heart'/>生活小贴士</Link></Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" title={<span><Icon type="team"/><span className="nav-text">Team</span></span>}
            >
            <Menu.Item key='4'>
              <Icon type='user'/>Team 1
            </Menu.Item>
            <Menu.Item key='5'>
              <Icon type='video-camera'/>
              Team 2
            </Menu.Item>
            </SubMenu>
            <Menu.Item key='6'>
              <span>
                <Icon type="file"/>
                <span className="nav-text">File</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        );
    }
};
Side.__ANT_LAYOUT_SIDER = true;
// Side.propTypes=propTypes;
export default Side;