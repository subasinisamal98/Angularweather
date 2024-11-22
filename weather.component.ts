
import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { RouterModule, RouterOutlet, Router  } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterModule, RouterOutlet,ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent {
  city: string = '';
  weatherData: any = null;
  error: string = '';
  

  constructor(private weatherService: WeatherService) {}

  fetchWeather() {
    if (!this.city.trim()) {
      this.error = 'Please enter a city name.';
      return;
    }
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.error = '';
      },
      error: () => {
        this.error = 'City not found. Please try again.';
        this.weatherData = null;
      },
    });
  }

  fetchWeatherByLocation() {
    if (!navigator.geolocation) {
      this.error = 'Geolocation is not supported by your browser.';
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
          next: (data) => {
            this.weatherData = data;
            this.error = '';
          },
          error: () => {
            this.error = 'Failed to fetch weather data for your location.';
            this.weatherData = null;
          },
        });
      },
      () => {
        this.error = 'Failed to fetch location. Please try again.';
      }
    );
  }

  reset() {
    this.city = '';
    this.weatherData = null;
    this.error = '';
  }
  
}

