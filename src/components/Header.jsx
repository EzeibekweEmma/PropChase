import { useState, useContext } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import darkLogo from "../assets/darkLogo.png";
import axios from "axios";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "./UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);

  // State for displaying the mobile menu
  const [displyMenu, setDisplyMenu] = useState(false);
  const [displyHostMenu, setDisplyHostMenu] = useState(false);

  // Styling for the navigation links
  const navStyling = "p-1 m-2 border-tc hover:border-b-4";

  // Function to determine if a navigation link is active
  const isActive = ({ isActive }) =>
    isActive ? `border-b-4 text-bgc ${navStyling}` : navStyling;

  const showMenu = () => {
    // Function to toggle the mobile menu
    setDisplyMenu((prevDisplyMenu) => !prevDisplyMenu);
  };
  const showMenu2 = () => {
    // Function to toggle the mobile menu
    setDisplyHostMenu((prevMenu) => !prevMenu);
  };

  const handleLogout = async () => {
    if (confirm("You are about to log out!")) {
      await axios.post("/logout");
      setUser(null);
      setLogoutConfirmed(true);
      setDisplyHostMenu(false);
    }
  };
  // Check if logout is confirmed
  if (logoutConfirmed) {
    return <Navigate to="/" />;
  }

  const dropDownMenu = () => {
    return (
      // dropdown menu
      // if user is logged in navigate to account
      <div className="flex flex-col md:absolute bg-lbgc rounded-b-lg pb-2">
        <Link to={user ? "/host" : "/login"} className={navStyling}>
          View Profile
        </Link>
        <Link to={user ? "/host/bookings" : "/login"} className={navStyling}>
          Bookings
        </Link>
        <Link
          to={user ? "/host/accommodations" : "/login"}
          className={navStyling}
        >
          Accommodations
        </Link>
        <button
          className="flex m-auto w-fit items-center bg-tc text-bgc px-2
              py-1 hover:bg-opacity-80 rounded-lg space-x-1"
          onClick={handleLogout}
        >
          <ArrowRightCircleIcon className="w-6 h-6" />
          <span>logOut</span>
        </button>
      </div>
    );
  };

  const navbar = () => {
    // Function to render the navigation links
    return (
      <div
        className="items-center space-x-0 text-center
              md:flex-row md:space-x-10 md:flex"
      >
        <nav className="flex flex-col md:flex-row">
          <NavLink to="/" className={isActive}>
            Home
          </NavLink>
          <NavLink to="services" className={isActive}>
            Services
          </NavLink>
          <NavLink to={user ? "/host" : "/login"} className={isActive}>
            Host
          </NavLink>
        </nav>
        <div>
          {user ? (
            <button
              className={`m-auto mb-2 border-tc flex items-center
            border rounded-lg p-1`}
              onClick={showMenu2}
            >
              {/* User icon */}
              <UserCircleIcon className="h-9 w-9" />
              <span className="pl-1">{user ? user.userName : "logIn"}</span>
            </button>
          ) : (
            <Link
              className={`justify-center mb-2 border-tc flex items-center
            border rounded-lg p-1`}
              to="/login"
            >
              {/* User icon */}
              <UserCircleIcon className="h-9 w-9" />
              <span className="pl-1">{user ? user.userName : "logIn"}</span>
            </Link>
          )}
          {displyHostMenu ? dropDownMenu() : null}
        </div>
      </div>
    );
  };

  return (
    <header
      className="flex sticky top-0 justify-center border-tc border-b
    z-50 text-tc bg-lbgc"
    >
      <div>
        <div className="flex justify-between w-[80vw] my-2 items-center font-semibold md:">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center p-0.5">
            <img src={darkLogo} width={40} alt="logo" />
            <span className="text-lg pl-1">PropChase</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:block">{navbar()}</div>

          {/* Mobile menu button */}
          <button onClick={showMenu} className="block md:hidden">
            {displyMenu ? (
              <XMarkIcon className="h-6 w-6" strokeWidth="2" />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth="2" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${displyMenu ? "block" : "hidden"} block md:hidden`}>
          {navbar()}
        </div>
      </div>
    </header>
  );
}

export default Header;
