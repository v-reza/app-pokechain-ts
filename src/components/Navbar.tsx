import { Fragment } from "react";
import bgToken from "../dist/assets/token.png";
import pikachu from "../dist/assets/pikachu.png";
import pokeball from "../dist/assets/pokeball.png";
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import {
  BookOpenIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import { classNames } from "../utils/constant";
import { logout } from "../contexts/AuthAction";

type UserNavigation = {
  name: string,
  href: string,
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const guides = [
  {
    name: "List Pokemon",
    description: "Get a better understanding of where your pokemon",
    href: "#",
    width: 60,
    height: 60,
    icon: pikachu,
  },
  {
    name: "List Items",
    description: "Get a better understanding of where your items function",
    href: "#",
    width: 60,
    height: 40,
    icon: pokeball,
  },
];

const user = {
  name: "Floyd Miles",
  email: "floydmiles@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const Navbar = () => {
  const { dispatch } = useAuth();
  const dispatchRedux = useDispatch();
  const { currentUser } = useUser();

  const handleLogout = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault()
    await logout({dispatch, dispatchRedux, data: {
      refreshToken: currentUser.refresh_token
    }})
  };

  const userNavigation: UserNavigation[] = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Backpack", href: "#" },
    { name: "Sign out", href: "#", handleClick: handleLogout },
  ];
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-900" aria-label="Global">
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center px-2 lg:px-0 space-x-4">
                  <div className="flex-shrink-0 flex items-center">
                    <img src={bgToken} alt="logo" className="w-8 h-8" />
                    {/* <Image src={bgToken} alt="Logo" width={40} height={40} /> */}
                  </div>
                  <span className="text-white font-extrabold">Pokechain</span>
                  <div className="hidden lg:ml-8 lg:flex lg:space-x-4"></div>
                </div>

                <div className="flex items-center lg:hidden md:space-x-8">
                  {/* Mobile menu button */}
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-white" : "text-white",
                            "group mt-1 rounded-md hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-600 inline-flex items-center text-base font-medium focus:outline-none"
                          )}
                        >
                          <BookOpenIcon className="w-5 h-5 mr-2 text-white group-hover:text-[#16A8AB]" />
                          <span className="hidden md:flex">Guides</span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 left-0 transform -translate-x-[85%] ml-2 marginPopUpGuides sm:-translate-x-full mt-3 px-2 w-screen max-w-md sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {guides.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    <img
                                      alt={item.name}
                                      src={item.icon}
                                      width={item.width}
                                      height={item.height}
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-sky-500 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-500 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 z-50 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                                onClick={item?.handleClick}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="hidden lg:ml-4 lg:flex lg:items-center space-x-7">
                  <div className="relative ml-4 flex items-center text-white hover:text-[#16A8AB] cursor-pointer space-x-2">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium text-base">Event</span>
                  </div>
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-white" : "text-white",
                            "group mt-1 rounded-md hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-600 inline-flex items-center text-base font-medium focus:outline-none"
                          )}
                        >
                          <BookOpenIcon className="w-5 h-5 mr-2 text-white group-hover:text-[#16A8AB]" />
                          <span>Guides</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-white" : "text-white",
                              "ml-1 h-5 w-5 group-hover:text-[#16A8AB]"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 left-0 transform -translate-x-[80%] mt-3 px-2 w-screen max-w-md sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {guides.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    <img
                                      alt={item.name}
                                      src={item.icon}
                                      width={item.width}
                                      height={item.height}
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 text-white rounded-full hover:text-slate-400 focus:outline-none"
                  >
                    <span className="sr-only">Notificaitons</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-sky-500 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-500 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                                onClick={item?.handleClick}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
