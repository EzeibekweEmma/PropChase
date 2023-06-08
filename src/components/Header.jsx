import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import darkLogo from "../assets/darkLogo.png";
import user from "../assets/user.png";
import menuIcon from "../assets/menu.png";
import closeIcon from "../assets/close.png";

function Header() {
  const navStyling = "p-1 m-2 border-tc hover:border-b-4";
  const isActive = ({ isActive }) =>
    isActive ? `border-b-4 text-bgc ${navStyling}` : navStyling;

  const [displyMenu, setDisplyMenu] = useState(false);
  const navbar = () => {
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
          <img src={user} width={25} />
          <span className="pl-1">login</span>
        </Link>
      </div>
    );
  };

  const showMenu = () => {
    setDisplyMenu((prevDisplyMenu) => !prevDisplyMenu);
  };

  return (
    <header className="flex sticky top-0 justify-center border-tc border-b text-tc bg-slate-300">
      <div>
        <div className="flex justify-between w-normalW my-2 items-center font-semibold md:">
          <Link to="/" className="flex items-center p-0.5">
            <img src={darkLogo} width={40} alt="logo" />
            <span className="text-lg pl-1">PropChase</span>
          </Link>
          <div className="hidden md:block">{navbar()}</div>
          <button onClick={showMenu} className="block md:hidden">
            <img width={20} src={displyMenu ? closeIcon : menuIcon} />
          </button>
        </div>
        <div
          className={`${displyMenu ? "block" : "hidden"} block md:hidden`}
        >
          {navbar()}
        </div>
      </div>
    </header>
  );
}

export default Header;
