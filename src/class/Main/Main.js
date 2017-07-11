
import { Card,Row,Col,Carousel,Input,Alert,Select } from 'antd';
import './Main.css'
import echarts from 'echarts';
import 'echarts/lib/chart/line'
import weatherCode from '../../assets/script/weatherCode';
import windSwitch from '../../assets/script/windSwitch';
import getJsonp from '../../assets/script/getJsonp';

const Option = Select.Option;
class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        city:'北京',
        optionV:'aqi',
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
         indicesData:{
                uvIndex:'',
                humidity:'',
                feelsLike:'',
                pressure:'',
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
             pm10:'',
             pm10Desc:'',
             no2:'',
             no2Desc:'',
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
          let {current,yesterday,forecastDaily,aqi,indices}=data;
          console.log(data);
          this.createMoncharts(city,current,yesterday,forecastDaily,aqi,indices);
      })
}
createMoncharts(city,current,yesterday,forecastDaily,aqiP,indices){

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

let {pm25,pm25Desc,so2,so2Desc,co,coDesc,o3,o3Desc,aqi,suggest,pm10,pm10Desc,no2,no2Desc}=aqiP;

//-----------------indices-----------------------
humidity=humidity.value;
feelsLike=feelsLike.value;
pressure=pressure.value;

console.log(uvIndex,humidity,feelsLike,pressure);
//------------------------------------------
let {currentData,yesterdayData,aqiData,indicesData}=this.state;

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
aqiData={aqi,pm25,pm25Desc,so2,so2Desc,co,coDesc,o3,o3Desc,suggest,pm10,pm10Desc,no2,no2Desc};
indicesData={uvIndex,humidity,feelsLike,pressure};
this.setState({aqiData,currentData,yesterdayData,indicesData})
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
        right:10,
        top:8,
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
        left:5,
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

 window.addEventListener('resize',() =>this.myChartTemp.resize());
this.myChartTemp.resize();
}

textChange(e){
//   this.setState({
//     cityInfo:e.target.value
//   })
}

handleChange(value) {
  this.setState({optionV:value});
}

  render(){
//==================================
let {handleChange}=this;
let {city,currentData,yesterdayData,aqiData,optionV,indicesData}=this.state;
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

let {aqi,suggest,pm25,pm25Desc,so2,so2Desc,co,coDesc,o3,o3Desc,pm10,pm10Desc,no2,no2Desc}=aqiData;
let aqiRang =[[0,'优'],[50,'良'],[100,'轻度污染'],[200,'中度污染'],[300,'严重污染'],Infinity],aqiRating;
for(let i=0;i<aqiRang.length-1;i++){
if(aqi>aqiRang[i][0]&&aqi<=aqiRang[i+1][0]){
    aqiRating=aqiRang[i][1];
}
}
let {uvIndex,humidity,feelsLike,pressure}=indicesData;
let message,aqiValue;
switch (optionV) {
    case 'aqi':
        message=suggest;
        aqiValue=aqi+aqiRating;
        break;
    case 'pm25':
        message=pm25Desc;
        aqiValue=pm25+'μg/m³';
        break;
    case 'so2':
        message=so2Desc;
        aqiValue=so2+'μg/m³';
        break;
    case 'co':
        message=coDesc;
        aqiValue=co+'μg/m³';
        break;
    case 'o3':
        message=o3Desc;
        aqiValue=o3+'μg/m³';
        break;
    case 'pm10':
        message=pm10Desc;
        aqiValue=pm10+'μg/m³';
        break;
    case 'no2':
        message=no2Desc;
        aqiValue=no2+'μg/m³';
        break;
}
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
                    <h2 style={{padding:10}}>{city}</h2>
                    <Carousel autoplay dots={false} className="flash-box">
                    <div style={{backgroundImage:`url(${require('../../assets/imgs/a1.jpg')})`}}></div>
                    <div style={{backgroundImage:`url(${require('../../assets/imgs/a2.jpg')})`}}></div>
                    <div style={{backgroundImage:`url(${require('../../assets/imgs/a3.jpg')})`}}></div>
                    <div style={{backgroundImage:`url(${require('../../assets/imgs/a4.jpg')})`}}></div>
                    </Carousel>
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={handleChange}
                        defaultValue="AQI"
                        className="selecter"
                        >
                        <Option value="aqi">AQI</Option>
                        <Option value="co">CO</Option>
                        <Option value="no2">NO2</Option>
                        <Option value="o3">O3</Option>
                        <Option value="pm10">PM10</Option>
                        <Option value="pm25">PM2.5</Option>
                        <Option value="so2">SO2</Option>
                    </Select>
                    <p style={{fontSize:20,fontWeight:500,padding:10}}>{aqiValue}</p>
                    <Alert style={{padding:10}} message={message} type="info" />
                </Card>
            </Col>
           <Col md={8} sm={24} className="indices">
           <Row>
               <Col md={8} sm={12} xs={24}>
               <div className="indices-item"> 
                   <p><i style={{backgroundImage:`url(${require('../../assets/imgs/windDir.png')})`}}></i>  <span>{nowwindDire}</span></p>
                   <p>{nowSpeed}</p>
               </div>
               </Col>
               <Col md={8} sm={12} xs={24}>
               <div className="indices-item">
                   <p ><i style={{backgroundImage:`url(${require('../../assets/imgs/humi.png')})`}}></i>  <span>空气湿度</span></p>
                   <p>{humidity}%</p>
               </div>
               </Col>
               <Col md={8} sm={12} xs={24}>
               <div className="indices-item">
                   <p><i style={{backgroundImage:`url(${require('../../assets/imgs/ftemp.png')})`}}></i>  <span>体感温度</span></p>
                   <p>{feelsLike}℃</p>
               </div>
               </Col>
           </Row>
           <Row style={{paddingTop:10}}>
               <Col md={8} sm={12} xs={24}>
               <div className="indices-item"> 
                   <p><i style={{backgroundImage:`url(${require('../../assets/imgs/aqis.png')})`}}></i>  <span>空气质量</span></p>
                   <p>{aqi} {aqiRating}</p>
               </div>
               </Col>
               <Col md={8} sm={12} xs={24}>
               <div className="indices-item">
                   <p ><i style={{backgroundImage:`url(${require('../../assets/imgs/arip.png')})`}}></i>  <span>气体压强</span></p>
                   <p>{pressure}hPa</p>
               </div>
               </Col>
               <Col md={8} sm={12} xs={24}>
               <div className="indices-item">
                   <p><i style={{backgroundImage:`url(${require('../../assets/imgs/uvs.png')})`}}></i>  <span>紫外线</span></p>
                   <p>{uvIndex}</p>
               </div>
               </Col>
           </Row>
           
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


