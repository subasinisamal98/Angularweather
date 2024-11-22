import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'weather', component: WeatherComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule{}
