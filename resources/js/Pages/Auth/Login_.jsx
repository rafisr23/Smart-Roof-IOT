import React, { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

// import Header from "../partials/Header";

export default function SignIn({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      {/* <Header /> */}

      {/*  Page content */}
      <main className="flex-grow h-100">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. We exist to make entrepreneurism easier.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={submit}>
                  <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                      type="text"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full"
                      autoComplete="username"
                      isFocused={true}
                      handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                      type="password"
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full"
                      autoComplete="current-password"
                      handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div className="block mt-4">
                    <label className="flex items-center">
                      <Checkbox
                        name="remember"
                        value={data.remember}
                        handleChange={onHandleChange}
                      />

                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                      <Link
                        href={route("password.request")}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                      >
                        Forgot your password?
                      </Link>
                    )}

                    <PrimaryButton className="ml-4" processing={processing}>
                      Log in
                    </PrimaryButton>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
