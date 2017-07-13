/**
 * 用来请求后端数据的js脚本文件
 * 作者：
 * 日期：
 * 版本：1.0
 */

import cityIds from './cityId';
function getJsonp(city,flag,timeout) {
  let cityId='';
  city=city.trim();
  cityIds.forEach((item,i) => {
    let {countyname,areaid}=item;
    if(city===countyname){
     cityId=areaid;
    }
  })
if(cityId==='') {alert('输入的城市名有误，或者未查到该城市天气信息，请重新输入！');return;}
let url=`https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=110&longitude=112&locationKey=weathercn%3A${cityId}&days=7&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07&isGlobal=false&locale=zh_cn`;

if(flag){
  url=`http://aider.meizu.com/app/weather/listWeather?cityIds=${cityId}`;
}
// let  url=`http://aider.meizu.com/app/weather/listWeather?cityIds=${cityId}`;
            // url+='?';
            // for (var key in data) {
            //     url+=`${key}=${data[key]}&`;
            // }
            // url=url.slice(0,-1);
            url = encodeURIComponent(url);
            return fetch({
                    url: 'http://wehiking.com/jsonp.php',
                    data: {
                        'src':url,
                    },
                    cb:"cb",
                    timeout: 3000
                }).init();
        };

        
function fetch(opt){
    return new CreateJsonp(opt);
}
class CreateJsonp {
  constructor(opt){
    if(!opt.url){
      throw new Error('The argument\'s object must be include url.');
    }
    
    this.data = {};
    this.timeout = 10000;
    this.cb = 'cb';
    
    Object.assign(this, opt);
  }
  init(){
    let {url, cb, timeout, data} = this;
    
    return Promise.resolve({
      then(resolve, reject){
        const script = document.createElement('script');
        
        let callbackname = 'cb' + Date.now();
        
        data[cb] = callbackname;
        
        window[callbackname] = function (resule){
          resolve(resule);
          clearTimeout(script.timer);
          window[callbackname] = null;
          document.body.removeChild(script);
        };
        url += '?' + formatData(data);
        
        // 发送请求
        script.setAttribute('src', url);
        document.body.appendChild(script);

        script.timer = setTimeout(function() {
          window[callbackname] = null;;
          document.body.removeChild(script);
          reject(new Error(`The request is error!`));
        }, timeout);
        
      }
    });
  }
}

function formatData(data){
  let query = [];
  for(let key in data){
    query.push(key + '=' + data[key]);
  }
  return query.join('&');
}




export default getJsonp;












































