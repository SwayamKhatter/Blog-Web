import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import Account from "./Account";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex w-full bg-primaryColor text-fadeHeading items-center">
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              

              <h1 className="text-2xl font-semibold text-white">Requin</h1>
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={`${open && "navbarTogglerActive"
                  } absolute right-4  top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px]  bg-fadeHeading focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primaryColor  dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primaryColor  dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-primaryColor  dark:bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 z-30 top-full bg-primaryColor  w-full max-w-[250px] rounded-lg px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${!open && "hidden "
                  }`}
              >
                <ul className="block   lg:flex">
                  <ListItem NLink="/">Home</ListItem>
                  <ListItem NLink="/articles">Add Article</ListItem>
                  <ListItem NLink="/myarticles">My Articles</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              {!localStorage.getItem("token") ? (<>
              <Link
                to="/signin"
                className="px-7 py-3 text-base font-medium hover:text-smallTextColor"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="rounded-md px-7 py-3 text-base hover:text-smallTextColor bg-headingColor hover:bg-blue-900 font-medium"
              >
                Sign Up
              
                </Link></>) : (
                
                  <div className=" m-[-70px]">
                    <Account />
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NLink }) => {
  return (
    <li>

      <NavLink
        to={NLink}
        className={({ isActive }) =>
          `flex py-2 text-base font-medium lg:ml-12 hover:text-smallTextColor lg:inline-flex  ${isActive ? "text-smallTextColor" : "text-fadeHeading"}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
