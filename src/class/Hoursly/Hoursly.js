
import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Row,Col,Table,message } from 'antd';
import './Hoursly.less';
import echarts from 'echarts';
import getJsonp from '../../assets/script/getJsonp';
import windSwitch from '../../assets/script/windSwitch';
import weatherCode from '../../assets/script/weatherCode';
const Search = Input.Search;

class Hoursly extends React.Component{
  constructor(props) {
    super(props);
   this.state={
       forecastHourly:null,
       val:'',
       updated:false,
       tableData:[],
     
   }
   this.option=null;
   this.dailyTemp=null;
   this.textChange=this.textChange.bind(this);
   this.createEcharts=this.createEcharts.bind(this);
   this.updateEcharts=this.updateEcharts.bind(this);
   this.columns = [{
            title: '时刻',
            dataIndex: 'time',
            }, {
            title: '天气',        
            dataIndex: 'weather',
            } ,{
            title: '温度',
            dataIndex: 'temperature',
            }, {
            title: '风向',
            dataIndex: 'windpower',
            }, {
            title: '风力等级',        
            dataIndex: 'windrating',
            }, {
            title: '空气质量指数',        
            dataIndex: 'aqi',
            }];
  }

componentDidMount(){
  let {forecastHourly}=this.state;
  const {city}=this.props;
  // if(localStorage.getItem('mainData')){
  //     const localData=JSON.parse(localStorage.getItem('mainData'));
  //       
  //       if(JSON.parse(localStorage.getItem('savecity'))){
  //         console.log('读取到本地数据了main');
  //         city=JSON.parse(localStorage.getItem('savecity'));
  //       }
  //       let {forecastHourly}=localData
  //       this.createEcharts(city,forecastHourly);
  //       return;
  //      }
       
       
//   if(city!=='')  return;
  getJsonp(city).then((data) => {
            
             let {forecastHourly}=data
             this.createEcharts(city,forecastHourly);
  });
}

createEcharts(city,forecastHourly){
    let {aqi,temperature,weather,wind}=forecastHourly;
    let time=[],tempData=[],tableData=[];
       temperature.value.slice(0,24).forEach((item,i) => {

          let temp=temperature.value[i],
              aqiN=aqi.value[i],
              weatherN=weather.value[i],
              windd=wind.value[i].direction,
              winds=wind.value[i].speed,
              forecastTime=wind.value[i].datetime,
              forecastHour,forecastDate;
              weatherN=weatherCode(weatherN);
              windd=windSwitch(windd);
             forecastHour=forecastTime.split('T')[1].split(':')[0];
             forecastDate=forecastTime.split('T')[0].split('-')[2];
             time.push(forecastHour);
             tempData.push(temp);
        tableData.push({
            key: i,
            time: forecastDate+'日'+forecastHour+'时',
            weather: weatherN,
            temperature: temp,
            windpower: windd,
            windrating: winds,
            aqi: aqiN,
        });
       });
    
this.dailyTemp=echarts.init(document.querySelector('.daily-temp'),{padding:20});
let backColor=`rgb(${Math.round(Math.random()*75+125)},${Math.round(Math.random()*75+125)},${Math.round(Math.random()*75+125)})`;
  this.dailyTemp.setOption({
    backgroundColor:backColor,
    title: {
        text: `${city}未来24小时气温变化(℃)`,
        textAlign:'center',
        left:'50%',
        top:'2%',
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
        right:'2%',
        bottom:10,
        feature: {
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
        }
    },
    // calculable: true, 
    xAxis:  {
        type: 'category',
        boundaryGap: true,
        data: time,
        show:true,
        splitLine:{
            show:false
        }
    },
    // dataZoom:{show:true}, 
    yAxis: {
        min:'dataMin',
        max:'dataMax',
        splitNumber:'5',
        axisLabel: {
            formatter: '{value} °C'
        },
        show:false,
        splitLine:{
            show:false
        }
    },
    series: [
        
        {
            name:'气温',
            type:'line',
            data:tempData,
            // markPoint: {
            //     data: [
            //         {type: 'max', name: '最大值'},
            //         {type: 'min', name: '最小值'}
            //     ]
            // },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            },
            itemStyle:{
            normal:{
                label:{
                    show:true
                }
            }
        }
        },
    ]
});

this.setState({tableData});
window.addEventListener('resize',() =>this.dailyTemp.resize());
this.dailyTemp.resize();
}

updateEcharts(city){
    if(city.trim()==='') {
      message.warning('The city name can not be empty!');
      return;
    };
    
    this.setState({
      val:''
    })
getJsonp(city).then((data) => {
  let {forecastHourly}=data;
  let {aqi,temperature,weather,wind}=forecastHourly;
  let time=[],tempData=[],tableData=[];
     temperature.value.slice(0,24).forEach((item,i) => {

        let temp=temperature.value[i],
            aqiN=aqi.value[i],
            weatherN=weather.value[i],
            windd=wind.value[i].direction,
            winds=wind.value[i].speed,
            forecastTime=wind.value[i].datetime,
            forecastHour,forecastDate;
            weatherN=weatherCode(weatherN);
            windd=windSwitch(windd);
           forecastHour=forecastTime.split('T')[1].split(':')[0];
           forecastDate=forecastTime.split('T')[0].split('-')[2];
           time.push(forecastHour);
           tempData.push(temp);
      tableData.push({
          key: i,
          time: forecastDate+'日'+forecastHour+'时',
          weather: weatherN,
          temperature: temp,
          windpower: windd,
          windrating: winds,
          aqi: aqiN,
      });
     });
     let backColor=`rgb(${Math.round(Math.random()*75+125)},${Math.round(Math.random()*75+125)},${Math.round(Math.random()*75+125)})`;
        this.dailyTemp.setOption({
          backgroundColor:backColor,
            title: {
                   text: `${city}未来24小时气温变化(℃)`,
            },
            xAxis:{
            data: time,
            },
            series:[
                {
                    name:'气温',
                    data:tempData,
                }
            ]
        })
        this.setState({tableData});

  });
}
textChange(e){
  this.setState({
    val:e.target.value
  })
}

  render(){
    let {textChange,updateEcharts}=this;
    let {forecastHourly,updated,tableData,val}=this.state;
    const {city}=this.props;
    let detailsInfos,date;
    return (
    <div style={{backgroundColor:''}}>
     <Row>
       <Col md={{span:6,offset:4}} sm={{span:8,offset:3}} xs={{span:20,offset:2}}>
        <Search
        placeholder="input search city"
        value={val}
        onChange={textChange}
        onSearch={value => updateEcharts(value)}
        style={{height:'34px',lineHeight:'34px'}}
        />
        </Col>
     </Row>
     <Row type="flex" justify="center" align="center">
       <Col md={16} sm={18} xs={24}>
         <div className="daily-temp" ref="dailytemp">
    
         </div>
       </Col>
     </Row>
     <Row type="flex" justify="center" align="center">
       <Col md={16} sm={18} xs={24}>
           <div style={{backgroundColor:'#fff',margin:'0 5px'}}>
                <h2 style={{textAlign:'center',padding:'10px 0'}}>24小时天气状况一览</h2>
                <Table columns={this.columns} dataSource={tableData} size="middle" />
          </div>
      </Col>
    </Row>
    </div>
    );
  }
};

export default Hoursly;


