<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    private function currentWeatherApi() {
        $url = 'https://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=57e18a91e44e14032275288571ef477f&units=metric';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }

    private function forecastWeatherApi() {
        $url = 'https://api.openweathermap.org/data/2.5/forecast?q=Bandung&appid=57e18a91e44e14032275288571ef477f&units=metric';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }

    private function date() {
        date_default_timezone_set('Asia/Jakarta');
        $time = date('H:i:s');
        return date('d M Y');
    }


    public function index() {
        $currentWeather = $this->currentWeatherApi();
        $forecastWeather = $this->forecastWeatherApi();

        $currentWeather = [
            'city' => $currentWeather['name'],
            'temp' => $currentWeather['main']['temp'],
            'humidity' => $currentWeather['main']['humidity'],
            'wind' => $currentWeather['wind']['speed'],
            'description' => $currentWeather['weather'][0]['description'],
            'icon' => $currentWeather['weather'][0]['icon'],
        ];

        $forecastWeather = [
            'city' => $forecastWeather['city']['name'],
            'date' => $this->date(),
            'forecast' => $forecastWeather['list'],
        ];

        // return $forecastWeather["forecast"][1]["weather"][0]["icon"];

        return Inertia::render('Monitoring/Index', [
            'currentTempt' => $currentWeather,
            'forecastWeather' => $forecastWeather['forecast'],
            'icon' => "http://openweathermap.org/img/wn/" . $currentWeather['icon'] . ".png",
            'date' => $this->date(),
        ]);
    }
}
