let input=document.querySelector(".input-value").addEventListener("keyup",(event)=>{
    if(event.key=="Enter"){
        dzienna.download(document.querySelector(".input-value").value);
    }
})
let uwu
let dzienna = {
    "apiKey":"RZV8VDLHMYBKX5PE67L7W53DP",
    download: function (select){
        d=new Date()
        godziny=d.getHours()
        time= new Date(86400000 + +new Date())
        response = fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+select+"/?key="+this.apiKey +"&unitGroup=metric&include=hours&contentType=json"
        ).then((response)=>response.json()).then((data)=>this.show(data))
       },
       show: function (data){
        let { temp,tempmin,tempmax,pressure,humidity,sunrise,sunset,windspeed,cloudcover,feelslike,description, icon} = data.days[0]
        let {address} = data
        uwu=data
        document.querySelector(".sunrise-hour").innerHTML=sunrise
        document.querySelector(".sunset-hour").innerHTML=sunset
        console.log(data.days)
        document.querySelector(".daily").innerHTML=""
        for(i=0;i<15;i++){
            let { datetime,temp,windspeed,icon,precipprob} = data.days[i]
            document.querySelector(".daily").innerHTML+=`<div class="daily-box" onclick="dzienna.hourly(${i})">
            <div class="first">
                <p class="date-day">${datetime}</p>
                <p class="icon-day"><img src="img/${icon}.png"></p>
            </div>
            <div class="second">
                <p class="temp-day">${temp}℃</p>
            </div>
            <div class="third">
                <p class="precip-day"><img src="img/rain.png">${precipprob}%</p>
                <p class="wind-day"><img src="img/wind.png">${windspeed}km/h</p>
            </div>
            </div>`
            }
        this.hour(data,godziny)
    },
        hour: function (data,godziny){
            document.querySelector(".hourly").innerHTML=""
            let time=0
            for(i=godziny;i<24+godziny;i++){
            if(i>23){
                let { datetime,temp,windspeed,icon,precipprob} = data.days[1].hours[time]
                document.querySelector(".hourly").innerHTML+=`<div class="hourly-box">
                <p class="date">${datetime}</p>
                <p class="icon"><img src="img/${icon}.png"></p>
                <p class="temp">${temp}℃</p>
                <p class="precip-hourly center"><img src="img/rain.png">${precipprob}%</p>
                <p class="wind-hourly center"><img src="img/wind.png">${windspeed}km/h</p>
                </div>`
                time+=1
            }
            else{
                let { datetime,temp,windspeed,icon,precipprob} = data.days[0].hours[i]
                document.querySelector(".hourly").innerHTML+=`<div class="hourly-box">
                <p class="date">${datetime}</p>
                <p class="icon"><img src="img/${icon}.png"></p>
                <p class="temp">${temp}℃</p>
                <p class="precip-hourly center"><img src="img/rain.png">${precipprob}%</p>
                <p class="wind-hourly center"><img src="img/wind.png">${windspeed}km/h</p>
                </div>`
                if(i==godziny){
                    document.querySelector(".w-icon").innerHTML=""
                    document.querySelector(".temp-now").innerHTML = temp+"℃"
                    document.querySelector(".wind").innerHTML=`<img src="img/wind.png">${windspeed} km/h`
                    document.querySelector(".precip").innerHTML=`<img src="img/rain.png">${precipprob}%`
                    document.querySelector(".w-icon").innerHTML+="<img src='img/"+icon+".png'>"
                }
            }
        
        }
    },
    hourly : function(i){
        document.querySelector(".hourly").innerHTML=""
        for(j=0;j<24;j++){
        let { datetime,temp,windspeed,icon,precipprob} = uwu.days[i].hours[j]
        
                document.querySelector(".hourly").innerHTML+=`<div class="hourly-box">
                <p class="date">${datetime}</p>
                <p class="icon"><img src="img/${icon}.png"></p>
                <p class="temp">${temp}℃</p>
                <p class="precip-hourly center"><img src="img/rain.png">${precipprob}%</p>
                <p class="wind-hourly center"><img src="img/wind.png">${windspeed}km/h</p>
                </div>`
    }
}
}