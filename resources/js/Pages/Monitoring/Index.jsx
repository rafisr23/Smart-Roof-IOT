// NPM Modules
import React from "react";
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

// Local
import "../../../css/app.css";

export default function Monitoring(props) {
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
                    Bojongsoang, Kab. Bandung
                  </p>
                </div>
                <div className="grid-rows-2 bg-kedua rounded-3xl ml-10 px-10 pt-10 pb-1">
                  <div className="md:grid grid-cols-2 items-center justify-center content-center">
                    <div className="">
                      <img src={props.icon} alt="" width={250} className="" />
                    </div>
                    <div className="">
                      <p className="text-slate-50 inline text-8xl text-center">
                        {Math.round(props.currentTempt["temp"])}
                        <span>&#8451;</span>
                      </p>
                    </div>
                  </div>
                  <div className="first bg-primary rounded-3xl my-10 p-3">
                    <div className="md:grid grid-cols-3 items-center justify-center content-center text-center">
                      <div className="jam">
                        <p className="text-slate-50 text-lg">
                          {" "}
                          <FontAwesomeIcon
                            icon={faWater}
                            className="mr-2"
                          ></FontAwesomeIcon>
                          6%
                        </p>
                      </div>
                      <div className="img">
                        <p className="text-slate-50 text-lg">
                          <FontAwesomeIcon
                            icon={faTemperatureThreeQuarters}
                            className="mr-2"
                          ></FontAwesomeIcon>{" "}
                          {props.currentTempt["humidity"]} %
                        </p>
                      </div>
                      <div className="wind">
                        <p className="text-slate-50 text-lg">
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
                      <Switch id="email-alerts" size={"lg"} />
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
                      <div className="img">
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
                      <div className="img">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[2]["weather"][0]["icon"]}.png`}
                          alt=""
                          className="text-center"
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
                      <div className="img">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[3]["weather"][0]["icon"]}.png`}
                          alt=""
                          className="text-center"
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
                      <div className="img">
                        <img
                          src={`http://openweathermap.org/img/wn/${props.forecastWeather[4]["weather"][0]["icon"]}.png`}
                          alt=""
                          className="text-center"
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
