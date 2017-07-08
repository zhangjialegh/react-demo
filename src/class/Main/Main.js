
import { Card,Icon,Row,Col,Carousel } from 'antd';
import './Main.css'
import echarts from 'echarts';
import '../Body/china';
import 'echarts/lib/chart/line'
import  {optionAir,optionTemp} from './echarts';

import $ from '../../assets/script/jquery';
class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        temp:'36'
    }
  }
componentDidMount(){
// const myChartAir=echarts.init(this.refs.air,{width:'auto',height:'auto'});
const myChartTemp=echarts.init(this.refs.temp,{width:'auto',height:'auto'});

//  myChartAir.setOption(optionAir);
  myChartTemp.setOption(optionTemp);
 window.addEventListener("resize",function(e){
    // myChartAir.resize(e);
    myChartTemp.resize(e);
});

}
  render(){
let {temp}=this.state;
let urlImage=require('../../assets/imgs/306.png');
    return (
    <div style={{backgroundColor:'rgb(213, 213, 213)'}}>
        <Row>
            <Col md={16} sm={24}>
            <Row type="flex" justify="space-around" align="center" style={{marginTop:10}}>
                <Col md={11} sm={11} xs={24} className="time-card">
               <div className="card-left">
                   <div className="weather-pic" style={{backgroundImage: `url(${urlImage})`}}>
                       
                   </div>
                   <ul>
                       <li><span className="tomorrow-weather"></span><span>34</span><span>34344</span></li>

                       <li><span className="wind-power"></span><span>34344</span><span>34344</span></li>
                   </ul>
               </div>
               <div className="card-right">
                   <p className="time">5455</p>
                   <p className="data">434646</p>
               </div>
            </Col>
             <Col md={11} sm={11} xs={24} className="temp-card">
               <div className="card-left">
                   <div className="weather-pic">
                       
                   </div>
                   <ul>
                       <li><span className="tomorrow-weather"></span><span>34</span><span>34344</span></li>

                       <li><span className="wind-power"></span><span>34344</span><span>34344</span></li>
                   </ul>
               </div>
               <div className="card-right">
                   <p className="time">5455</p>
                   <p className="data">434646</p>
               </div>
            </Col>
            </Row>
             <Row >
              {/*<Col sm={24} md={12} >
                  <div className="air-qua" ref="air">
                  </div>
              </Col>*/}
              <Col sm={24} md={24} >
                  <div className="temp" ref="temp">
                  </div>
              </Col>
          </Row>
            </Col>
            <Col md={8} sm={24}>
                <Card className="search-card">
                    <p>11111111111</p>
                    <Carousel autoplay className="flash-box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    </Carousel>
                    <p></p>
                </Card>
            </Col>
           
        </Row>

           <Row type="flex" justify="space-between" align="middle">
              <Col xs={24} sm={12} md={6} style={{height:150,padding:5}}>
                  <Card title={<p><Icon type="frown-o"/>  感冒指数</p>} bordered={true}>
                       <p>感冒容易发生，少去人群密集的场所有利于降低感冒的几率。</p>
                   </Card>
              </Col>
              <Col xs={24} sm={12} md={6} style={{height:150,padding:5}}>
                  <Card title={<p><Icon type="heart-o"/>穿衣指数</p>} bordered={false}>
                  <p>潮湿闷热，衣物排汗透气，手帕擦汗环保时尚，不建议在露天场所逛街。</p>
                  </Card>
              </Col>
              <Col xs={24} sm={12} md={6} style={{height:150,padding:5}}>
                    <Card title={<p><Icon type="star-o"/>  运动指数</p>} bordered={false}>
                    <p>空气轻度污染，不宜在户外运动。</p>
                    </Card>
              </Col>
              <Col xs={24} sm={12} md={6} style={{height:150,padding:5}}>
                    <Card title={<p><Icon type="woman"/>  化妆指数</p>} bordered={false}>
                    <p>"建议用露质面霜打底，水质无油粉底霜，透明粉饼，粉质胭脂。</p>
                    </Card>
              </Col>
           </Row>

         
    </div>
    );
  }
};

export default Main;


