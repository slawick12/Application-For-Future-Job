import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WeatherService } from '../_services/weather.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
lat;
lon;
weather;
  constructor(private weatherSerivice: WeatherService) {}
  ngOnInit() {
      this.getLocation()
    }
    
    getLocation(){
      if('geolocation' in navigator){
        navigator.geolocation.watchPosition((success)=>[
          this.lat = success.coords.latitude,
          this.lon = success.coords.longitude,

          this.weatherSerivice.getWeather(this.lat, this.lon).subscribe(data =>{
          this.weather = data
          })
        ])
      }
    }
    getCity(city){
      this.weatherSerivice.getWeatherDataByCityName(city).subscribe((data:any)=>{
        this.weather=data;
        this.lat = data.coord.lat;
        this.lon = data.coord.lon;
      })
    }
 getCoords(event){
   this.lat=event.coords.lat;
   this.lon = event.coords.lon
   this.weatherSerivice.getWeather(this.lat, this.lon).subscribe(data =>{
     this.weather=data
   })
 }


}
