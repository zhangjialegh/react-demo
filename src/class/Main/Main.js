
import { Card,Row,Col,Carousel,Input,Alert } from 'antd';
import './Main.css'
import echarts from 'echarts';
import 'echarts/lib/chart/line'
import weatherCode from '../../assets/script/weatherCode';
import windSwitch from '../../assets/script/windSwitch';
import getJsonp from '../../assets/script/getJsonp';
class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        city:'北京',
        currentData:{
                nowYmd:'',
                nowHM:'',
                nowWeatherInfo:'',
                nowWeatherImage:'',
                nowwindDire:'',
                nowSpeed:'',
                temperature:'',
         },
        yesterdayData:{
                yesWeatherInfo:'',
                yesWeatherImage:'',
                windDircEnd:'',
                windSpeedEnd:'',
                tempMax:'',
                yesTempdiff:'',
         },
         aqiData:{
             pm25:'',
             pm25Desc:'',
             so2:'',
             so2Desc:'',
             co:'',
             coDesc:'',
             o3:'',
             o3Desc:'',
             aqi:'',
             suggest:'',
            },
    }
    this.myChartTemp=null;
    this.optionTemp=null;
   this.handleChange=this.handleChange.bind(this);
   this.textChange=this.textChange.bind(this);
   this.createMoncharts=this.createMoncharts.bind(this);
  }
componentDidMount(){
    let {city}=this.state;
      getJsonp('北京').then((data) => {
          let {current,yesterday,forecastDaily,aqi}=data;
          console.log(data);
          this.createMoncharts(city,current,yesterday,forecastDaily,aqi);
      })
}
createMoncharts(city,current,yesterday,forecastDaily,aqiP){

//================Current==================

let {feelsLike,humidity,pressure,temperature,uvIndex,visibility,weather,wind}=current;
let {direction,speed}=wind;
let nowwindDire=direction.value,nowSpeed=speed.value;
let nowYmd=new Date().toDateString();
let nowHms=new Date().toTimeString().split(' ')[0].split(':');
let nowHM=nowHms[0]+':'+nowHms[1];
let nowWeatherImage=require(`../../assets/imgs/${weather}.png`);
let nowWeatherInfo=weatherCode(weather);
nowwindDire=windSwitch(nowwindDire);
temperature=temperature.value;
//--------------------yesterday------------

let {tempMax,tempMin,weatherEnd,windDircEnd,windSpeedEnd}=yesterday;

windDircEnd=windSwitch(windDircEnd);
console.log(weatherEnd);
let yesWeatherInfo=weatherCode(weatherEnd);
let yesWeatherImage=require(`../../assets/imgs/${weatherEnd}.png`);
let yesTempdiff=tempMax-tempMin;
//-------------------aqi---------------------

let {pm25,pm25Desc,so2,so2Desc,co,coDesc,o3,o3Desc,aqi,suggest}=aqiP;

//-------------------------------------------

let {currentData,yesterdayData,aqiData}=this.state;

currentData={
    nowYmd,
    nowHM,
    nowWeatherInfo,
    nowWeatherImage,
    nowwindDire,
    nowSpeed,
    temperature,
};
yesterdayData={
    yesWeatherInfo,
    yesWeatherImage,
    windDircEnd,
    windSpeedEnd,
    tempMax,
    yesTempdiff,
};
aqiData={aqi,pm25,pm25Desc,so2,so2Desc,co,coDesc,o3,o3Desc,suggest};

this.setState({aqiData,currentData,yesterdayData})
//----------------------------------------------------------

//-------------forecastDaily--------------

let foreTempData=forecastDaily.temperature.value,foreDates=forecastDaily.sunRiseSet.value,foreHtemp=[],foreLtemp=[],foreDate=[];

foreTempData.forEach((item,i) => {
    foreHtemp.push(item.from);
    foreLtemp.push(item.to);
    foreDate.push(foreDates[i].from.split('T')[0].split('-')[2]+'日');
})

//-------------------------------------
this.optionTemp = {
    backgroundColor:'#fff',
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        bottom:5,
        data:['最高气温','最低气温']
    },
    toolbox: {
        show: true,
            feature: {
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
        }
        },
    xAxis:{
        type: 'category',
        boundaryGap: false,
        data: foreDate,
    },
    yAxis: {
        type: 'value',
        min:'dataMin',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name:'最高气温',
            type:'line',
            data:foreHtemp,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'最低气温',
            type:'line',
            data:foreLtemp,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'},
                ]
            }
        }
    ]
};

this.myChartTemp=echarts.init(this.refs.temp,{width:'auto',height:'auto'});

//  myChartAir.setOption(optionAir);
  this.myChartTemp.setOption(this.optionTemp);
 window.addEventListener("resize",(e)=>{
    this.myChartTemp.resize(e);
 });
}

textChange(e){
//   this.setState({
//     cityInfo:e.target.value
//   })
}
handleChange(value) {
//   let _this=this;
//   value=value.trim().toLowerCase();
//   console.log(`selected ${value}`);
//   getJsonp(value).then(function(data) {
//                             let {forecastDaily}=data;
//                             _this.set(value,forecastDaily);
//                           });
  //  this.setState({city:''})                         
}












  render(){
//==================================
let {currentData,yesterdayData,aqiData}=this.state;
console.log(currentData);
let {
    nowYmd,
    nowHM,
    nowWeatherInfo,
    nowWeatherImage,
    nowwindDire,
    nowSpeed,
    temperature
}=currentData;
let {
    yesWeatherInfo,
    yesWeatherImage,
    windDircEnd,
    windSpeedEnd,
    tempMax,
    yesTempdiff
}=yesterdayData;

let {aqi,suggest,pm25,pm25Desc,so2,so2Desc,co,coDesc,o3,o3Desc}=aqiData;
console.log(suggest);
//------------------------------------------


    return (
    <div style={{backgroundColor:'rgb(213, 213, 213)',padding:'10px 5px'}}>
        <Row>
            <Col md={16} sm={24}>
            <Row type="flex" justify="space-around" align="center" style={{marginTop:10}}>
            <Col md={11} sm={11} xs={24} className="time-card">
               <div className="card-left">
                   <div className="weather-pic" style={{backgroundImage: `url(${nowWeatherImage})`}}>
                   </div>
                   <ul>
                       <li><span className="tomorrow-weather"></span><span>{nowWeatherInfo},</span><span>{temperature}℃</span></li>

                       <li><span className="wind-power"></span><span>{nowSpeed}km/h,</span><span>{nowwindDire}</span></li>
                   </ul>
               </div>
               <div className="card-right">
                   <p className="time">{nowHM}</p>
                   <p className="data">{nowYmd}</p>
               </div>
            </Col>



             <Col md={11} sm={11} xs={24} className="temp-card">
               <div className="card-left">
                   <div className="weather-pic" style={{backgroundImage:`url(${yesWeatherImage})`}}>
                   </div>
                   <ul>
                       <li><span className="tomorrow-weather"></span><span>{yesWeatherInfo},</span><span>{yesTempdiff}℃</span></li>

                       <li><span className="wind-power"></span><span>{windSpeedEnd}km/h</span><span>{windDircEnd}</span></li>
                   </ul>
               </div>
               <div className="card-right">
                   <p className="time">{tempMax}℃</p>
                   <p className="data">YESTERDAY'S MAX TEMP</p>
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
                    <Carousel autoplay dots={false} className="flash-box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    </Carousel>
                    <p>{aqi}</p>
                    <Alert message={suggest} type="info" />
                </Card>
            </Col>
           
        </Row>

           <Row type="flex" justify="space-between" align="middle">
              <Col xs={24} sm={12} md={6} style={{padding:5}}>
                  <Card title={<p><span style={{display:'inline-block',width:'26px',height:'26px',background:`url(${require('../../assets/imgs/PM2.5.png')}) no-repeat center center`,backgroundSize:'contain',verticalAlign:'middle'}} ></span>   {pm25}μg/m³</p>} bordered={true}>
                       <p>{pm25Desc}</p>
                   </Card>
              </Col>
              <Col xs={24} sm={12} md={6} style={{padding:5}}>
                  <Card title={<p><span style={{display:'inline-block',width:'26px',height:'26px',background:`url(${require('../../assets/imgs/co.png')}) no-repeat center center`,backgroundSize:'contain',verticalAlign:'middle'}} ></span>   {co}μg/m³</p>} bordered={false}>
                  <p>{coDesc}</p>
                  </Card>
              </Col>
              <Col xs={24} sm={12} md={6} style={{padding:5}}>
                    <Card title={<p><span style={{display:'inline-block',width:'26px',height:'26px',background:`url(${require('../../assets/imgs/o3.png')}) no-repeat center center`,backgroundSize:'contain',verticalAlign:'middle'}}></span>  {o3}μg/m³</p>} bordered={false}>
                    <p>{o3Desc}</p>
                    </Card>
              </Col>
              <Col xs={24} sm={12} md={6} style={{padding:5}}>
                    <Card title={<p><span style={{display:'inline-block',width:'26px',height:'26px',background:`url(${require('../../assets/imgs/so2.png')}) no-repeat center center`,backgroundSize:'contain',verticalAlign:'middle'}} ></span>   {so2}μg/m³</p>} bordered={false}>
                    <p>{so2Desc}</p>
                    </Card>
              </Col>
           </Row>

         
    </div>
    );
  }
};

export default Main;


