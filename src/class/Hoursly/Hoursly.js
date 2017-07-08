
import { Button,Spin,Card,Input,Row,Col } from 'antd';
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
     
   }
   
   this.set=this.set.bind(this);
   this.handleChange=this.handleChange.bind(this);
   this.textChange=this.textChange.bind(this);
   this.createEcharts=this.createEcharts.bind(this);
  }

componentDidMount(){
  let {weatherDetailsInfo,city}=this.state;
  if(city!=='')  return;
  getJsonp('北京').then((data) => {
             let {weatherDetailsInfo}=data.value[0];
             this.createEcharts('北京',weatherDetailsInfo);
  });
}


set(city,weatherDetailsInfo){
this.setState({city,weatherDetailsInfo})
}

createEcharts(city,weatherDetailsInfo){
    console.log(weatherDetailsInfo,city);
    let detailsInfos,date;
    let {weather3HoursDetailsInfos}=weatherDetailsInfo;
      let time=[],tempData=[];
       detailsInfos=weather3HoursDetailsInfos.map((item,i) => {

        let {startTime,highestTemperature,weather,isRainFall,img,precipitation,wd}=item;
        
        startTime=startTime.split(' ')[1].split(':')[0]+'时';
        date=startTime.split(' ')[0].split('-')[2]+'日';
        time.push(startTime);
        tempData.push(highestTemperature);
        wd=wd===''?'微风':wd;

        let urlImage= require(`../../assets/imgs/${img}.png`);

this.dailyTemp=echarts.init(document.querySelector('.daily-temp'),{padding:20});
      let option = {
        //   backgroundColor:'#6fadbd',
    title: {
        text: '未来24小时气温变化(℃)',
        // subtext: '间隔3小时',
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
        show:false,
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
};

this.dailyTemp.setOption(option);
window.addEventListener('resize',() =>this.dailyTemp.resize())
       })

}
updateEcharts(time,tempData){
this.dailyTemp.setOption({
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
}
textChange(e){
  this.setState({
    city:e.target.value
  })
}
handleChange(value) {
  let _this=this;
  value=value.trim().toLowerCase();
  getJsonp(value).then(function(data) {
                            let {weatherDetailsInfo}=data.value[0];
                            _this.set(weatherDetailsInfo);
                          });
}
  render(){
    let {set,handleChange,textChange}=this;
    let {weatherDetailsInfo,city}=this.state;
    let detailsInfos,date;
    if(city!==''){
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
    <div style={{backgroundColor:'#fff'}}>
     <div className="daily-temp" ref="dailytemp">

     </div>
    </div>
    );
  }
};

export default Hoursly;


