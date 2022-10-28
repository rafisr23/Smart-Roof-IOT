import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import "../../css/app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "flowbite";
import "daisyui";

export default function Monitoring(props) {
  return (
    <>
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
                <p className="text-slate-400">Bojongsoang, Kab. Bandung</p>
              </div>
              <div className="grid-rows-2 bg-kedua rounded-3xl ml-10 px-10 pt-10 pb-1">
                <div className="md:grid grid-cols-2 items-center justify-center content-center">
                  <div className="">
                    <img
                      src="/img/cloudy.png"
                      alt=""
                      width={250}
                      className=""
                    />
                  </div>
                  <div className="">
                    <p className="text-slate-50 inline text-8xl text-center">
                      28<span>&#8451;</span>
                    </p>
                  </div>
                </div>
                <div className="first bg-primary rounded-3xl my-10 p-3">
                  <div className="md:grid grid-cols-3 items-center justify-center content-center text-center">
                    <div className="jam">
                      <p className="text-slate-50 text-lg">6%</p>
                    </div>
                    <div className="img">
                      <p className="text-slate-50 text-lg">90%</p>
                    </div>
                    <div className="wind">
                      <p className="text-slate-50 text-lg">19km/h</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="control bg-kedua rounded-3xl ml-10 mt-10">
                <div className="md:grid grid-cols-2 items-center justify-center content-center p-8">
                  <h1 className="text-slate-50 text-3xl font-bold text-center">
                    STATUS
                  </h1>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary toggle-lg"
                      />
                    </label>
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
                <p className="text-slate-400">Have a nice day!</p>
                {/* <div className="profile inline">
                  <img src="/img/man.png" alt="" width={70} className="" />
                </div> */}
              </div>
              <div className="weather p-10 grid-rows-5 bg-kedua rounded-3xl mx-10">
                <div className="today mb-10">
                  <h1 className="text-slate-50 text-2xl font-bold">Today</h1>
                  <p className="text-slate-400 text-xl">24 Oct 2022</p>
                </div>
                <div className="first bg-primary rounded-3xl mb-10">
                  <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-1">
                    <div className="jam">
                      <p className="text-slate-50 text-lg">15.00</p>
                    </div>
                    <div className="img">
                      <img
                        src="/img/cloudy.png"
                        alt=""
                        width={50}
                        className=""
                      />
                    </div>
                    <div className="tempt">
                      <p className="text-slate-50 text-lg">
                        29<span>&#8451;</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="second bg-primary rounded-3xl mb-10">
                  <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-1">
                    <div className="jam">
                      <p className="text-slate-50 text-lg">15.00</p>
                    </div>
                    <div className="img">
                      <img
                        src="/img/cloudy.png"
                        alt=""
                        width={50}
                        className=""
                      />
                    </div>
                    <div className="tempt">
                      <p className="text-slate-50 text-lg">
                        29<span>&#8451;</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="third bg-primary rounded-3xl mb-10">
                  <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-1">
                    <div className="jam">
                      <p className="text-slate-50 text-lg">15.00</p>
                    </div>
                    <div className="img">
                      <img
                        src="/img/cloudy.png"
                        alt=""
                        width={50}
                        className=""
                      />
                    </div>
                    <div className="tempt">
                      <p className="text-slate-50 text-lg">
                        29<span>&#8451;</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fourth bg-primary rounded-3xl mb-10">
                  <div className="md:grid grid-cols-3 items-center justify-center content-center text-center py-1">
                    <div className="jam">
                      <p className="text-slate-50 text-lg">15.00</p>
                    </div>
                    <div className="img">
                      <img
                        src="/img/cloudy.png"
                        alt=""
                        width={50}
                        className=""
                      />
                    </div>
                    <div className="tempt">
                      <p className="text-slate-50 text-lg">
                        29<span>&#8451;</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
