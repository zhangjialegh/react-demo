
import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Spin,Card,Input,Row,Col } from 'antd';
import './Forecast.css';
import echarts from 'echarts';
import getJsonp from '../../assets/script/getJsonp';
import windSwitch from '../../assets/script/windSwitch';
import weatherCode from '../../assets/script/weatherCode';
import QueueAnim from 'rc-queue-anim';
const Search = Input.Search;

class Forecast extends React.Component{
  constructor(props) {
    super(props);
   this.state={
       cityName:'',
       forecastDaily:'',
   }
   
   this.set=this.set.bind(this);
  //  this.handleChange=this.handleChange.bind(this);
  //  this.textChange=this.textChange.bind(this);
  }

componentDidMount(){
  let {forecastDaily}=this.state;
  const {city}=this.props;
  // if(localStorage.getItem('mainData')){
  //     const localData=JSON.parse(localStorage.getItem('mainData'));
  //       
  //       if(JSON.parse(localStorage.getItem('savecity'))){
  //         console.log('读取到本地数据了main');
  //         city=JSON.parse(localStorage.getItem('savecity'));
  //       }
  //       console.log(localData);
  //       let {forecastDaily}=localData;
  //       this.set(city,forecastDaily);
  //       
  //       return;
  //      }
       
  // if(city!=='')  return;
  getJsonp(city).then((data) => {
    let {forecastDaily}=data;
    this.set(city,forecastDaily);
  });
}


set(city,forecastDaily){
this.setState({cityName:city,forecastDaily})
}
// textChange(e){
//   this.setState({
//     cityName:e.target.value
//   })
// }
// handleChange(value) {
//   value=value.trim().toLowerCase();
//   getJsonp(value).then((data)=> {
//                             let {forecastDaily}=data;
//                             this.set(value,forecastDaily);
//                           });
//   //  this.setState({city:''})                         
// }
  render(){
    let {set,handleChange,textChange}=this;
    let {cityName,forecastDaily}=this.state;
    // let cards,code,txt,time=new Date().getHours();
    let cards,timeNow=new Date().getHours(),weatherV,windd,winds,weatherI,forecastDate;
    if(forecastDaily!==''){
      // console.log(basic,daily_forecast);
      let {aqi,sunRiseSet,temperature,weather,wind}=forecastDaily;
       cards=temperature.value.slice(1,7).map((item,i) => {
        // let {date,img,wd,weather,week,ws,temp_day_c,temp_night_c,sun_down_time,sun_rise_time}=item;
        
        let tempH=temperature.value[i].from,
            tempL=temperature.value[i].to,
            aqiV=aqi.value[i],
            weatherD=weather.value[i].from,
            weatherN=weather.value[i].to,
            winddD=wind.direction.value[i].from,
            winddN=wind.direction.value[i].to,
            windsD=wind.speed.value[i].from,
            windsN=wind.speed.value[i].to;
            
            winddD=windSwitch(winddD);
            winddN=windSwitch(winddN);
        if(timeNow>=8&&timeNow<20){
          weatherV = weatherD;
          windd=winddD;
          winds=windsD;
        }else{
          weatherV = weatherN;
          windd=winddN;
          winds=windsN;
        }    
            
        weatherI = weatherCode(weatherV);

        let urlImage= require(`../../assets/imgs/${weatherV}.png`);
        let bkColor=`rgb(${Math.round(Math.random()*75+125)},${Math.round(Math.random()*75+125)},${Math.round(Math.random()*75+125)})`;
        forecastDate=sunRiseSet.value[i].from.split('T')[0].split('-')[2];
        return (
                  <Col key={i} md={7} sm={7} xs={18} style={{margin:'0 0 10px 0'}}>
                    <Card style={{background:bkColor,borderRadius:'10px'}}
                    className="forecast-card"
                    >
                    <p className="forecast-pos"><img src={require('../../assets/imgs/pos.png')} alt=""/>{cityName}</p>

                     <p className="forecast-date">{forecastDate}<span>日</span></p>
                    <div className="forecast-weather"><p style={{backgroundImage:`url(${urlImage})`}}></p></div>
                    <p className="forecast-temp">{tempH}/{tempL}℃</p>

                    <p className="weather">{weatherI}<span>/{windd}</span></p>
                    
                    <p className="forecast-rise"><img src={require('../../assets/imgs/aqi.png')}alt=""/> {aqiV}</p>
                    <p className="forecast-down"><img src={require('../../assets/imgs/speed.png')}alt=""/> {winds}km/h</p>
  
                    </Card>
                    
                </Col>
        )
      })
    }
    return  forecastDaily===''?(
  <div style={{height:30,width:30}} className="loading">
    <Spin size="large"/>
  </div>
    ):(
    <div style={{backgroundColor:'#fff',padding:'10px'}}>
        <Row style={{paddingLeft:'10%'}}>
          <QueueAnim delay={300} className="queue-simple">
            {cards}
          </QueueAnim>
        </Row>
    </div>
    );
  }
};

export default Forecast;


