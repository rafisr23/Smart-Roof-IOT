// NPM Modules
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/inertia-react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import NavLink from "@/Components/NavLink";
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
import "flowbite";
import { ChakraProvider } from "@chakra-ui/react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { db } from "@/utils/firebase";
import { onValue, ref } from "firebase/database";
import Paho from "paho-mqtt";
import Header from "../partials/Header";

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
  const [button, setButton] = useState(false);
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

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

  // TODO: FETCH DATA FROM MQTT - BUTTON
  useEffect(() => {
    // Fungsi callback ketika terhubung ke broker MQTT
    clientBtn.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Koneksi clientBtn ke broker MQTT terputus");
        console.log(clientBtn);
      }
    };

    // Fungsi callback ketika pesan diterima dari broker MQTT
    clientBtn.onMessageArrived = (message) => {
      console.log(
        `Pesan diterima dari topic ${message.destinationName}: ${message.payloadString}`
      );
      if (message.payloadString === "true") {
        setRain(true);
      } else {
        setRain(false);
      }
    };

    // Koneksikan ke broker MQTT
    if (!clientBtn.isConnected()) {
      clientBtn.connect({
        onSuccess: () => {
          console.log("clientBtn berhasil terhubung ke broker MQTT");
          // Subscribe ke topic 'iot-dzaki-button'
          clientBtn.subscribe("iot-dzaki-button");
        },
      });
    } else {
      console.log("clientBtn sudah terhubung ke broker MQTT");
      clientBtn.subscribe("iot-dzaki-button");
    }
  }, []);

  return (
    <>
      <ChakraProvider>
        <div className="flex flex-col min-h-screen overflow-hidden bg-primary">
          <header
            className={`fixed w-full z-30 transition duration-300 ease-in-out bg-primary backdrop-blur-xl ${
              !top && " bg-primary backdrop-blur-xl shadow-lg"
            }`}
          >
            <div className=" mx-auto px-5 sm:px-6">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Site branding */}
                <div className="flex-shrink-0 mr-4">
                  {/* Logo */}
                  <Link href="/" className="block" aria-label="Cruip">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient
                          cx="21.152%"
                          cy="86.063%"
                          fx="21.152%"
                          fy="86.063%"
                          r="79.941%"
                          id="header-logo"
                        >
                          <stop stopColor="#4FD1C5" offset="0%" />
                          <stop stopColor="#81E6D9" offset="25.871%" />
                          <stop stopColor="#338CF5" offset="100%" />
                        </radialGradient>
                      </defs>
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="url(#header-logo)"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Site navigation */}
                <nav className="flex flex-grow">
                  <ul className="flex flex-grow justify-start flex-wrap items-center">
                    <li>
                      <Link
                        href={route("home")}
                        className="font-medium text-white hover:text-slate-500 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                      >
                        Home
                      </Link>
                    </li>
                    {props.auth.user ? (
                      <li>
                        <Link
                          href={route("monitoring")}
                          className="font-medium text-white hover:text-slate-500 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                        >
                          Monitoring
                        </Link>
                      </li>
                    ) : (
                      <li></li>
                    )}
                  </ul>
                  <ul className="flex flex-grow justify-end flex-wrap items-center">
                    {props.auth.user ? (
                      <>
                        <li>
                          <Link
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="btn-sm text-white bg-red-500 hover:bg-red-900 rounded"
                          >
                            Log Out
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href={route("login")}
                            className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                          >
                            Log in
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={route("register")}
                            className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 p-2 rounded"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-grow">
            <section className="relative">
              <div className="md:grid grid-cols-2 pb-10">
                {/* LEFT SIDE */}
                <div className="grid-rows-3 ">
                  <div className="mx-10 mb-10 mt-20">
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
                  <div className="user p-10 my-10">
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
                      <h1 className="text-slate-50 text-2xl font-bold">
                        Today
                      </h1>
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
                            {Math.round(
                              props.forecastWeather[1]["main"]["temp"]
                            )}
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
                            {Math.round(
                              props.forecastWeather[2]["main"]["temp"]
                            )}
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
                            {Math.round(
                              props.forecastWeather[3]["main"]["temp"]
                            )}
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
                            {Math.round(
                              props.forecastWeather[4]["main"]["temp"]
                            )}
                            <span>&#8451;</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* <div className="">
        </div> */}
      </ChakraProvider>
    </>
  );
}
