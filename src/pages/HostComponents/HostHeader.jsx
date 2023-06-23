import { NavLink } from "react-router-dom";
import { 
    HomeModernIcon,
    ListBulletIcon,
    UserIcon,

} from "@heroicons/react/24/outline";

function Header() {
  // Styling for the navigation links
  const navStyling =
    "flex items-center text-xs sm:text-base space-x-1 py-1 px-3 m-2 bg-slate-300 rounded-full hover:bg-tc hover:text-bgc";

  // Function to determine if a navigation link is active
  const isActive = ({ isActive }) =>
    isActive ? `bg-tc text-bgc ${navStyling}` : navStyling;

  const navbar = () => {
    // Function to render the navigation links
    return (
      <nav className="flex">
        <NavLink end to="." className={isActive}>
          <UserIcon className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
        <NavLink to="bookings" className={isActive}>
          <ListBulletIcon className="w-5 h-5" />
          <span>Bookings</span>
        </NavLink>
        <NavLink to="property" className={isActive}>
          <HomeModernIcon className="w-5 h-5" />
          <span>Property</span>
        </NavLink>
      </nav>
    );
  };

  return (
    <header
      className="flex justify-center text-tc"
    >
      <div>
        <div className="flex justify-center w-[80vw] my-1 font-semibold">
          {navbar()}
        </div>
      </div>
    </header>
  );
}

export default Header;
