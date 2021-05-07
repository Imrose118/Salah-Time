
let lat=0,long=0,hD=0,hM=0,hY=-0;
navigator.geolocation.getCurrentPosition(p=>{
  lat=p.coords.latitude;
  long=p.coords.longitude;
  find(lat,long);
});
let times={};
d=new Date();
fetch(`http://api.aladhan.com/v1/gToH?date=${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`)
.then(res=>res.json())
.then(data=>{
  hD=data.data.hijri.day;
  hM=data.data.hijri.month.number;
  hY=data.data.hijri.year;
});


//From weather Api
function weap(){
  const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=eb661ddaf48b416b2ce4e9e3546002da`
  fetch(url)
  .then((res)=>res.json())
  .then(data=>showData(data))
  .catch(e=>console.log(e))
}

//Find the prayer times
function find(lat,long){
  if(lat==0 && long==0){
    setTimeout(find,100,lat,long);
  }
  else{
      weap();
      fetch(`http://api.aladhan.com/v1/hijriCalendar?latitude=${lat}&longitude=${long}&method=1&midnightMode=1&month=${hM}&year=${hY}`)
      .then(res=>res.json())
      .then(data=>{
        times=data.data[hD-1].timings;
        showTimes(times);});
  }
}

//function to show times
function showTimes(times){
  for(let i in times){
    times[i]=times[i].match(/\d+/g);
    times[i]=formatAMPM(times[i]);
  }
  addtoUL(times);
}


//change the format

  function formatAMPM(date) {
    var hours = Number(date[0]);
    var minutes = Number(date[1]);
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  //addtoUL
  function addtoUL(times){
    console.log(times);
    list.innerHTML=`
      <li><div>Fajr</div><div>${times.Fajr}</div></li>
      <li><div>Dhuhr</div><div>${times.Dhuhr}</div></li>
      <li><div>Asr</div><div>${times.Asr}</div></li>
      <li><div>Maghrib</div><div>${times.Maghrib}</div></li>
      <li><div>Isha</div><div>${times.Isha}</div></li>
      <li><div>Midnight</div><div>${times.Midnight}</div></li>
    `;
    rise.innerHTML=`
      <div id="anime1"><img src='sunrise.png'></div>
      <div id="one"><span>Sunrise: ${times.Sunrise}</span></div>
    `;
    set.innerHTML=`
      <div id="anime2"><img src='sunset.png'></div>
      <div id="two"><span>Sunset: ${times.Sunset}</span></div>
    `;
  }


//left and right
function showData(data){
  console.log(data)
  const left=document.querySelector('#left');
  const right=document.querySelector('#right');
  left.innerHTML=`
      <li>Weather Status Now: ${data.current.weather[0].main.toUpperCase()}</li>
      <li>In Details: ${data.current.weather[0].description}</li>
      <li>Pressure: ${data.current.pressure} atm</li>
      <li>Clouds: ${data.current.clouds}%</li>
    `;
    right.innerHTML=`
      <li>Tempareture: ${data.current.temp} Celsius</li>
      <li>Feels Like: ${data.current.feels_like} Celsius</li>
      <li>Humidity: ${data.current.humidity}</li>
    `;

}





