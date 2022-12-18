import useAuth from "../hooks/useAuth";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { register } from "../contexts/AuthAction";

interface FormInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterInterface {
  error: string | null | boolean;
  isLoading: boolean;
  message: string | null;
}

type Visible = {
  password: boolean;
  confirmPassword: boolean;
};

const RegisterPages = () => {
  const [visible, setVisible] = useState<Visible>({
    password: false,
    confirmPassword: false,
  });
  const [form, setForm] = useState<FormInterface>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegister, setIsRegister] = useState<RegisterInterface>({
    error: null,
    isLoading: false,
    message: null,
  });
  const { dispatch } = useAuth();
  const dispatchRedux = useDispatch();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await register({
      dispatch,
      dispatchRedux,
      data: form,
      callback: (data) => {
        setIsRegister({
          error: data.error,
          isLoading: data.loading,
          message: data.message,
        })
      }
    })
  };

  return (
    <div>
      <div
        className="min-h-screen flex bg-gray-900"
        style={{
          backgroundImage:
            "url('/assets/images/light-green.png'), url('/assets/images/light-blue.png')",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "saturation",
          opacity: "80",
        }}
      >
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="/assets/images/icons.png"
                alt="Pokechain"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-white">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <div className="mt-1 grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                    >
                      <svg
                        className="mr-2 -ml-1 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Sign up with Google
                    </button>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#0C1831] text-slate-300">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleRegister}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="email"
                        required
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        className="bg-slate-700/20 appearance-none block w-full px-3 text-white py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="bg-slate-700/20 appearance-none block w-full px-3 text-white py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 right-0 flex items-center px-2">
                        <input
                          className="hidden js-password-toggle"
                          id="toggle"
                          type="checkbox"
                        />
                        <label
                          onClick={() =>
                            setVisible({
                              ...visible,
                              password: !visible.password,
                            })
                          }
                          className="bg-transparent text-slate-300 rounded px-2 py-1 text-sm font-mono cursor-pointer js-password-label"
                          htmlFor="toggle"
                        >
                          {visible.password ? (
                            <EyeIcon className="w-5 h-5" />
                          ) : (
                            <EyeOffIcon className="w-5 h-5" />
                          )}
                        </label>
                      </div>
                      <input
                        type={visible.password ? "text" : "password"}
                        required
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        className="bg-slate-700/20 appearance-none block w-full px-3 text-white py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password Confirmation
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 right-0 flex items-center px-2">
                        <input
                          className="hidden js-password-toggle"
                          id="toggle"
                          type="checkbox"
                        />
                        <label
                          onClick={() =>
                            setVisible({
                              ...visible,
                              confirmPassword: !visible.confirmPassword,
                            })
                          }
                          className="bg-transparent text-slate-300 rounded px-2 py-1 text-sm font-mono cursor-pointer js-password-label"
                          htmlFor="toggle"
                        >
                          {visible.confirmPassword ? (
                            <EyeIcon className="w-5 h-5" />
                          ) : (
                            <EyeOffIcon className="w-5 h-5" />
                          )}
                        </label>
                      </div>
                      <input
                        type={visible.confirmPassword ? "text" : "password"}
                        required
                        value={form.confirmPassword}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="bg-slate-700/20 appearance-none block w-full px-3 text-white py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between ">
                    <div className="text-xs sm:text-sm">
                      <Link to={"/auth/login"}>
                        <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                          Already Have Account?
                        </div>
                      </Link>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot Password?
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-[#3D00B7] hover:bg-[#3d00b7a1] focus:outline-none"
                    >
                      {isRegister.isLoading ? (
                        <Spinner
                          color="gray"
                          aria-label="Purple spinner example"
                        />
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/images/bg-pokemon.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPages;
