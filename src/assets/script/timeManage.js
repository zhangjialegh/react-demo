
import getJsonp from './getJsonp.js';

const dataUpdate=function () {
  console.log('数据更新');
  const time=60*1000*60;
  if(JSON.parse(localStorage.getItem('savecity'))){
    
  
    // setInterval(() => {
    //   const city=JSON.parse(localStorage.getItem('savecity'));
    //   console.log(city);
    //   getJsonp(city).then((data) => {
    //     localStorage.setItem('mainData',JSON.stringify(data));
    //     getJsonp(city,true).then((data) => {
    //       localStorage.setItem('anotherData',JSON.stringify(data))
    //     });
    //   });
    //   
    // }, 5000);
  }
};

export default dataUpdate;