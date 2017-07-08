
import { Button,Spin,Card,Input,Row,Col } from 'antd';
import './Forecast.css';
import echarts from 'echarts';
import  {optionAir,optionTemp} from './echarts';
import getJsonp from '../../assets/script/getJsonp';

const Search = Input.Search;

class Forecast extends React.Component{
  constructor(props) {
    super(props);
   this.state={
       cityInfo:'',
       city:'',
       weathers:'',
   }
   
   this.set=this.set.bind(this);
   this.handleChange=this.handleChange.bind(this);
   this.textChange=this.textChange.bind(this);
  }

componentDidMount(){

  let {city,weathers}=this.state;
  if(city!=='')  return;
  let _this=this;
  getJsonp('北京').then(function(data) {
    console.log(data);
                            let {city,weathers}=data.value[0];
                            _this.set(city,weathers);
                            });
}


set(city,weathers){
this.setState({cityInfo:'',city,weathers})
}
textChange(e){
  this.setState({
    cityInfo:e.target.value
  })
}
handleChange(value) {
  let _this=this;
  value=value.trim().toLowerCase();
  console.log(`selected ${value}`);
  getJsonp(value).then(function(data) {
                            let {city,weathers}=data.value[0];
                            _this.set(city,weathers);
                          });
  //  this.setState({city:''})                         
}
  render(){
    let {set,handleChange,textChange}=this;
    let {cityInfo,city,weathers}=this.state;
    // let cards,code,txt,time=new Date().getHours();
    let cards;
    if(city!==''){
      // console.log(basic,daily_forecast);
       cards=weathers.slice(0,6).map((item,i) => {
        let {date,img,wd,weather,week,ws,temp_day_c,temp_night_c,sun_down_time,sun_rise_time}=item;
        wd=wd===''?'微风':wd;
        // let {mr,ms,sr,ss}=astro,
        //     {code_d,code_n,txt_d,txt_n}=cond,
        //     {max,min}=tmp,
        //     {deg,dir,sc,spd}=wind;
    // console.log(code_d,code_n);
        // if(time>5&&time<19){
        //   txt = txt_d;
        //   code=code_d;
        // } else{
        //   txt = txt_n;
        //   code=code_n;
        // }  
        let urlImage= require(`../../assets/imgs/${img}.png`);
        date=date.split('-')[2];
        return (
                  <Col key={i} md={{span:4,offset:3}} sm={{span:6,offset:4}} xs={{span:12,offset:6}} >
                  {/*<div className="forecast-card">*/}
                    <Card style={{background:'#78cbe1',borderRadius:'10px'}}
                    className="forecast-card"
                    >
                    <p className="forecast-pos"><img src={require('../../assets/imgs/pos.png')} alt=""/>{city}</p>

                     <p className="forecast-date">{date}<span>日</span></p>
                    <div className="forecast-weather"><p style={{backgroundImage:`url(${urlImage})`}}></p></div>
                    <p className="forecast-temp">{temp_day_c}/{temp_night_c}℃</p>

                    <p className="weather">{weather}<span>/{wd}</span></p>
                    
                    <p className="forecast-rise"><img src={require('../../assets/imgs/sunrise.png')}alt=""/> {sun_rise_time}</p>
                    <p className="forecast-down"><img src={require('../../assets/imgs/sundown.png')}alt=""/> {sun_down_time}</p>
  
                    </Card>
                  {/*</div>*/}
                    
                </Col>
        )
      })
    }
    return  city===''?(
  <div>
    <Spin size="large" style={{margin:'300px auto'}}/>
  </div>
    ):(
    <div style={{backgroundColor:'#fff'}}>
        <Row type="flex" justify="center" align="center">
          <Col md={12} sm={12} xs={24}>
          <Search
          placeholder=" Please input search city"
          style={{ width: 200 ,margin:'20px'}}
          value={cityInfo}
          onChange={(e) => {
          textChange(e);
          }}
          onSearch={(value) => {
          handleChange(value);
          }}
        />
          </Col>
        </Row>
        {/*<Row type="flex" justify="center" align="center">*/}
        <Row>
          {cards}
        </Row>
    </div>
    );
  }
};

export default Forecast;


