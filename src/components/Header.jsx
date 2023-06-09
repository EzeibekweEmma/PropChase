import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import darkLogo from "../assets/darkLogo.png";

function Header() {
  // Styling for the navigation links
  const navStyling = "p-1 m-2 border-tc hover:border-b-4";

  // Function to determine if a navigation link is active
  const isActive = ({ isActive }) =>
    isActive ? `border-b-4 text-bgc ${navStyling}` : navStyling;

  // State for displaying the mobile men
  const [displyMenu, setDisplyMenu] = useState(false);

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
          <NavLink to="about" className={isActive}>
            About
          </NavLink>
          <NavLink to="host" className={isActive}>
            Host
          </NavLink>
        </nav>
        <Link
          to="login"
          className={`m-2 justify-center border-tc flex items-center border rounded-lg p-1`}
        >
          {/* User icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span className="pl-1">login</span>
        </Link>
      </div>
    );
  };

  const showMenu = () => {
    // Function to toggle the mobile menu
    setDisplyMenu((prevDisplyMenu) => !prevDisplyMenu);
  };

  const closeIcon = () => {
    // cancel icon
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  };
  const menuIcon = () => {
    // Menu icon
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    );
  };
  return (
    <header className="flex sticky top-0 justify-center border-tc border-b text-tc bg-slate-300">
      <div>
        <div className="flex justify-between w-normalW my-2 items-center font-semibold md:">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center p-0.5">
            <img src={darkLogo} width={40} alt="logo" />
            <span className="text-lg pl-1">PropChase</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:block">{navbar()}</div>

          {/* Mobile menu button */}
          <button onClick={showMenu} className="block md:hidden">
            {displyMenu ? closeIcon() : menuIcon()}
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
