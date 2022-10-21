import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import "../../css/app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Monitoring(props) {
  return (
    <>
      <AuthenticatedLayout auth={props.auth} errors={props.errors}>
        <Head title="Monitoring" />
        <div className="bg-primary h-screen">
          <div className="p-10 flex flex-row">
            <div className="basis-2/3">
              <h1 className="text-slate-50 text-5xl font-bold">
                Smart Roof Monitoring
              </h1>
              <p className="text-slate-400">Bojongsoang, Kab. Bandung</p>
            </div>
            <div className="basis-1/3">
              <h1 className="text-slate-50 text-3xl font-bold">
                Good Morning, {props.auth.user.name}
              </h1>
              <p className="text-slate-400">Have a nice day!</p>
            </div>
          </div>
          <div className="p-10 flex flex-row">
            <div className="basis-2/3 bg-secondary rounded-3xl ">
              <div className="p-10 flex flex-row">
                <div className="basis-2/3 items-center inline">
                  <img
                    src="/img/cloudy.png"
                    alt=""
                    width={250}
                    className="inline"
                  />
                </div>
                <div className="basis-1/3 inline items-center content-center justify-center">
                  <p className="text-slate-50 inline text-8xl text-center">
                    28<span>&#8451;</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-1/3 bg-secondary rounded-3xl">
              <div className="p-10">
                <h3 className="text-slate-50">Today</h3>
                <h6 className="text-slate-400">14 October 2022</h6>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
