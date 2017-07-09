
import { Button,Spin,Card,Input,Row,Col,Table } from 'antd';
import './Hoursly.css';
import echarts from 'echarts';
import getJsonp from '../../assets/script/getJsonp';

const Search = Input.Search;

class Hoursly extends React.Component{
  constructor(props) {
    super(props);
   this.state={
       weatherDetailsInfo:null,
       city:'',
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
            title: '风力',
            dataIndex: 'windpower',
            }, {
            title: '风力等级',        
            dataIndex: 'windrating',
            }, {
            title: '降雨',        
            dataIndex: 'precipitation',
            }];
  }

componentDidMount(){
  let {weatherDetailsInfo,city}=this.state;
//   if(city!=='')  return;
  getJsonp('北京').then((data) => {
             let {weatherDetailsInfo}=data.value[0];
             this.createEcharts('北京',weatherDetailsInfo);
  });
}

createEcharts(city,weatherDetailsInfo){
    let detailsInfos,date;
    let {weather3HoursDetailsInfos}=weatherDetailsInfo;
    let time=[],tempData=[],tableData=[];
       detailsInfos=weather3HoursDetailsInfos.forEach((item,i) => {

        let {startTime,highestTemperature,weather,precipitation,wd,ws}=item;
        date=startTime.split(' ')[0].split('-')[2]+'日';
        
        startTime=startTime.split(' ')[1].split(':')[0]+'时';
        wd=wd===''?'微风':wd;
        ws=ws===''?'<3级':ws;


        time.push(startTime);
        tempData.push(highestTemperature);
        
        tableData.push({
            key: i,
            time: date+startTime,
            weather: weather,
            temperature: highestTemperature,
            windpower: wd,
            windrating: ws,
            precipitation: precipitation,
        });
       });
    
this.dailyTemp=echarts.init(document.querySelector('.daily-temp'),{padding:20});
  this.dailyTemp.setOption({
          backgroundColor:'#d2dbdd',
    title: {
        text: `${city}未来24小时气温变化(℃)`,
        textAlign:'center',
        left:'50%',
    },
    tooltip: {
        trigger: 'axis'
    },
    // legend: {
    //     data:['气温'],
    //     top:'8%',
    // },
    toolbox: {
        show: true,
        orient:'vertical',
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
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
    if(city.trim()==='') return;
getJsonp(city).then((data) => {
             let {weatherDetailsInfo}=data.value[0];
             let {weather3HoursDetailsInfos}=weatherDetailsInfo;
             let time=[],tempData=[],tableData=[];
weather3HoursDetailsInfos.forEach((item,i) => {
    let {startTime,highestTemperature,weather,precipitation,wd,ws}=item;
    let date;    
        date=startTime.split(' ')[0].split('-')[2]+'日';
        startTime=startTime.split(' ')[1].split(':')[0]+'时';
        wd=wd===''?'微风':wd;
        ws=ws===''?'<3级':ws;

        time.push(startTime);
        tempData.push(highestTemperature);
        tableData.push({
            key: i,
            time: date+startTime,
            weather: weather,
            temperature: highestTemperature,
            windpower: wd,
            windrating: ws,
            precipitation: precipitation,
        });
});
        this.dailyTemp.setOption({
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
    city:e.target.value
  })
}

  render(){
    let {textChange,updateEcharts}=this;
    let {weatherDetailsInfo,city,updated,tableData}=this.state;
    let detailsInfos,date;
    if(updated){
    let {weather3HoursDetailsInfos}=weatherDetailsInfo;
      let time=[],tempData=[];
       detailsInfos=weather3HoursDetailsInfos.map((item,i) => {
        let {startTime,highestTemperature,weather,isRainFall,img,precipitation,wd}=item;
        wd=wd===''?'微风':wd;

        let urlImage= require(`../../assets/imgs/${img}.png`);


        return (
      <div>
          
      </div>
        );
      })
    }
    return (
    <div style={{backgroundColor:''}}>
     <div>
        <Search
        placeholder="input search text"
        style={{ width: 200 }}
        value={city}
        onChange={textChange}
        onSearch={value => updateEcharts(value)}
        />
     </div>
     <div className="daily-temp" ref="dailytemp">

     </div>
     <div style={{backgroundColor:'#fff',borderRadius:'10px'}}>
          <h2 style={{textAlign:'center',padding:'10px 0'}}>今日天气状况一览</h2>
          <Table pagination={false} columns={this.columns} dataSource={tableData} size="middle" />
    </div>
    </div>
    );
  }
};

export default Hoursly;


