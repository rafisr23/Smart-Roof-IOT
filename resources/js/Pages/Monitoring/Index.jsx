// NPM Modules
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faMoon } from "@fortawesome/free-regular-svg-icons";
import {
  faCoffee,
  faWind,
  faTemperatureThreeQuarters,
  faWater,
  faSun,
  faCloudSun,
  faCloudSunRain,
  faCloudRain,
  faLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
// import {
//   solid,
//   regular,
//   brands,
//   icon,
// } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import "flowbite";
import { ChakraProvider } from "@chakra-ui/react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { db } from "@/utils/firebase";
import { onValue, ref } from "firebase/database";
import Paho from "paho-mqtt";

// Local
import "../../../css/app.css";

// Inisialisasi client MQTT
const clientTemp = new Paho.Client("broker.hivemq.com", 8000, "clientId-temp");
const clientHum = new Paho.Client("broker.hivemq.com", 8000, "clientId-humi");
const clientRain = new Paho.Client("broker.hivemq.com", 8000, "clientId-rain");
const clientBtn = new Paho.Client("broker.hivemq.com", 8000, "clientId-btn");

export default function Monitoring(props) {
  const [projects, setProjects] = useState([]);
  const [temp, setTemp] = useState();
  const [hum, setHum] = useState();
  const [rain, setRain] = useState();
  const [open, setOpen] = useState(false);

  // TODO: FETCH DATA FROM MQTT - TEMP
  useEffect(() => {
    // Fungsi callback ketika terhubung ke broker MQTT
    clientTemp.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Koneksi clientTemp ke broker MQTT terputus");
      }
    };

    // Fungsi callback ketika pesan diterima dari broker MQTT
    clientTemp.onMessageArrived = (message) => {
      console.log(
        `Pesan diterima dari topic ${message.destinationName}: ${message.payloadString}`
      );
      setTemp(message.payloadString);
    };

    // Koneksikan ke broker MQTT
    if (!clientTemp.isConnected()) {
      clientTemp.connect({
        onSuccess: () => {
          console.log("clientTemp berhasil terhubung ke broker MQTT");
          // Subscribe ke topic 'iot-dzaki-temp'
          clientTemp.subscribe("iot-dzaki-temp");
        },
      });
    } else {
      console.log("clientTemp sudah terhubung ke broker MQTT");
      clientTemp.subscribe("iot-dzaki-temp");
    }
  }, []);

  // TODO: FETCH DATA FROM MQTT - HUMIDITY
  useEffect(() => {
    // Fungsi callback ketika terhubung ke broker MQTT
    clientHum.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Koneksi clientHum ke broker MQTT terputus");
        console.log(clientHum);
      }
    };

    // Fungsi callback ketika pesan diterima dari broker MQTT
    clientHum.onMessageArrived = (message) => {
      console.log(
        `Pesan diterima dari topic ${message.destinationName}: ${message.payloadString}`
      );
      setHum(message.payloadString);
    };

    // Koneksikan ke broker MQTT
    if (!clientHum.isConnected()) {
      clientHum.connect({
        onSuccess: () => {
          console.log("clientHum berhasil terhubung ke broker MQTT");
          // Subscribe ke topic 'iot-dzaki-humi'
          clientHum.subscribe("iot-dzaki-humi");
        },
      });
    } else {
      console.log("clientHum sudah terhubung ke broker MQTT");
      clientHum.subscribe("iot-dzaki-humi");
    }
  }, []);

  // TODO: FETCH DATA FROM MQTT - RAIN
  useEffect(() => {
    // Fungsi callback ketika terhubung ke broker MQTT
    clientRain.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Koneksi clientRain ke broker MQTT terputus");
        console.log(clientRain);
      }
    };

    // Fungsi callback ketika pesan diterima dari broker MQTT
    clientRain.onMessageArrived = (message) => {
      console.log(
        `Pesan diterima dari topic ${message.destinationName}: ${message.payloadString}`
      );
      if (message.payloadString === "1") {
        setRain(true);
      } else {
        setRain(false);
      }
    };

    // Koneksikan ke broker MQTT
    if (!clientRain.isConnected()) {
      clientRain.connect({
        onSuccess: () => {
          console.log("clientRain berhasil terhubung ke broker MQTT");
          // Subscribe ke topic 'iot-dzaki-humi'
          clientRain.subscribe("iot-dzaki-rds");
        },
      });
    } else {
      console.log("clientRain sudah terhubung ke broker MQTT");
      clientRain.subscribe("iot-dzaki-rds");
    }
  }, []);

  // TODO: SEND DATA BUTTON TO BROKER MQTT
  const toggleButton = () => {
    const message = rain ? new Paho.Message("false") : new Paho.Message("true");
    setRain(!rain);

    clientBtn.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Koneksi Button ke broker MQTT terputus");
      }
    };

    if (!clientBtn.isConnected()) {
      clientBtn.connect({
        onSuccess: () => {
          console.log("Button berhasil terhubung ke broker MQTT");
          message.destinationName = "iot-dzaki-button";
          clientBtn.send(message);
        },
      });
    } else {
      console.log("Button sudah terhubung ke broker MQTT");
      message.destinationName = "iot-dzaki-button";
      clientBtn.send(message);
    }
  };

  return (
    <>
      <ChakraProvider>
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
          <Head title="Monitoring" />
          <div className="bg-primary">
            <div className="md:grid grid-cols-2 pb-10">
              {/* LEFT SIDE */}
              <div className="grid-rows-3 ">
                <div className="mx-10 my-10">
                  <h1 className="text-slate-50 text-5xl font-bold">
                    Smart Roof Monitoring
                  </h1>
                  <p className="text-slate-400 mt-1">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="mr-2"
                    ></FontAwesomeIcon>
                    Bojongsoang, Kab. Bandungg
                  </p>
                </div>
                <div className="grid-rows-2 bg-kedua rounded-3xl ml-10 px-10 pt-10 pb-1">
                  <div className="md:grid grid-cols-2 items-center justify-center content-center">
                    <div className="">
                      <img src={props.icon} alt="" width={250} className="" />
                    </div>
                    <div className="">
                      <p className="text-slate-50 inline text-8xl text-center">
                        {temp}
                        <span>&#8451;</span>
                      </p>
                    </div>
                  </div>
                  <div className="first bg-primary rounded-3xl my-10 px-3 py-5">
                    <div className="md:grid grid-cols-3 items-center justify-center content-center text-center">
                      <div className="jam">
                        <p className="text-slate-50 text-xl">
                          {" "}
                          <FontAwesomeIcon
                            icon={faWater}
                            className="mr-2"
                          ></FontAwesomeIcon>
                          6%
                        </p>
                      </div>
                      <div className="img">
                        <p className="text-slate-50 text-xl">
                          <FontAwesomeIcon
                            icon={faTemperatureThreeQuarters}
                            className="mr-2"
                          ></FontAwesomeIcon>{" "}
                          {hum} %
                        </p>
                      </div>
                      <div className="wind">
                        <p className="text-slate-50 text-xl">
                          <FontAwesomeIcon
                            icon={faWind}
                            className="mr-2"
                          ></FontAwesomeIcon>{" "}
                          {props.currentTempt["wind"]} m/s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="control bg-kedua rounded-3xl ml-10 mt-10">
                  <div className="md:grid grid-cols-2 items-center justify-center content-center p-8">
                    <h1 className="text-slate-50 text-3xl font-bold text-center">
                      ROOF STATUS
                    </h1>
                    <div className="form-control items-center">
                      <Switch
                        id="email-alerts"
                        size={"lg"}
                        onChange={toggleButton}
                        value={rain}
                        isChecked={rain}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="grid-rows-2 ml-14">
                <div className="user p-10 mx-10">
                  <h1 className="text-slate-50 text-3xl font-bold">
                    Good Morning, {props.auth.user.name}
                  </h1>
                  <p className="text-slate-400 mt-1">Have a nice day!</p>
                  {/* <div className="profile inline">
                  <img src="/img/man.png" alt="" width={70} className="" />
                </div> */}
                </div>
                <div className="weather p-10 grid-rows-5 bg-kedua rounded-3xl mx-10">
                  <div className="today mb-10">
                    <h1 className="text-slate-50 text-2xl font-bold">Today</h1>
                    <p className="text-slate-400 text-xl">{props.date}</p>
                  </div>
                  <div className="first bg-primary rounded-3xl mb-10">
                    <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-2">
                      <div className="jam">
                        <p className="text-slate-50 text-lg">09.00</p>
                      </div>
                      <div className="img m-auto">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[1]["weather"][0]["icon"]}.png`}
                          alt=""
                          className="text-center"
                          title={
                            props.forecastWeather[1]["weather"][0][
                              "description"
                            ]
                          }
                        />
                      </div>
                      <div className="tempt">
                        <p className="text-slate-50 text-lg">
                          {Math.round(props.forecastWeather[1]["main"]["temp"])}
                          <span>&#8451;</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="second bg-primary rounded-3xl mb-10">
                    <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-2">
                      <div className="jam">
                        <p className="text-slate-50 text-lg">12.00</p>
                      </div>
                      <div className="img m-auto">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[2]["weather"][0]["icon"]}.png`}
                          alt=""
                          title={
                            props.forecastWeather[2]["weather"][0][
                              "description"
                            ]
                          }
                        />
                      </div>
                      <div className="tempt">
                        <p className="text-slate-50 text-lg">
                          {Math.round(props.forecastWeather[2]["main"]["temp"])}
                          <span>&#8451;</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="third bg-primary rounded-3xl mb-10">
                    <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-2">
                      <div className="jam">
                        <p className="text-slate-50 text-lg">15.00</p>
                      </div>
                      <div className="img m-auto">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[3]["weather"][0]["icon"]}.png`}
                          alt=""
                          title={
                            props.forecastWeather[3]["weather"][0][
                              "description"
                            ]
                          }
                        />
                      </div>
                      <div className="tempt">
                        <p className="text-slate-50 text-lg">
                          {Math.round(props.forecastWeather[3]["main"]["temp"])}
                          <span>&#8451;</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fourth bg-primary rounded-3xl mb-10">
                    <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-2">
                      <div className="jam">
                        <p className="text-slate-50 text-lg">18.00</p>
                      </div>
                      <div className="img m-auto">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[4]["weather"][0]["icon"]}.png`}
                          alt=""
                          title={
                            props.forecastWeather[4]["weather"][0][
                              "description"
                            ]
                          }
                        />
                      </div>
                      <div className="tempt">
                        <p className="text-slate-50 text-lg">
                          {Math.round(props.forecastWeather[4]["main"]["temp"])}
                          <span>&#8451;</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthenticatedLayout>
      </ChakraProvider>
    </>
  );
}
