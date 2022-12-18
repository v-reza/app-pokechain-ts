import { login } from "../contexts/AuthAction";
import useAuth from "../hooks/useAuth";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface FormType {
  userOrEmail: string;
  password: string;
}

interface LoginInterface {
  error: string | null | boolean;
  isLoading: boolean;
  message: string | null;
}

const LoginPages = () => {
  const [form, setForm] = useState<FormType>({
    userOrEmail: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<LoginInterface>({
    error: null,
    isLoading: false,
    message: null,
  });
  const { dispatch } = useAuth();
  const dispatchRedux = useDispatch()

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await login({
      dispatch,
      dispatchRedux,
      data: form,
      callback: (data) => {
        setIsLogin({
          error: data.error,
          isLoading: data.loading,
          message: data.message,
        });
      },
    });
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
                Sign in to your account
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
                      Sign in with Google
                    </button>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-slate-300">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Username or Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        required
                        value={form.userOrEmail}
                        onChange={(e) =>
                          setForm({ ...form, userOrEmail: e.target.value })
                        }
                        className="appearance-none block w-full px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        className="appearance-none block w-full px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between ">
                    <div className="text-xs sm:text-sm">
                      <Link to={"/auth/register"}>
                        <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                          {"Don't Have Account?"}
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
                      {isLogin.isLoading ? (
                        <Spinner
                          color="gray"
                          aria-label="Purple spinner example"
                        />
                      ) : (
                        "Sign in"
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

export default LoginPages;
