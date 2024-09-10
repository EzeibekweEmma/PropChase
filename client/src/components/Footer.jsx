import { Link } from 'react-router-dom';
import lightLogo from '../assets/lightLogo.png';
import Gmail from '../assets/Gmail';
import linkedin from '../assets/linkedin';
import twitter from '../assets/twitter';
import facebook from '../assets/facebook';
import Github from '../assets/Github';
export default function Footer() {
  return (
    <footer
      className="sticky flex justify-center border-bg-slate-300 border-t
     text-bgc bg-tc top-[100%] "
    >
      <section className="flex-col w-[80vw]">
        {/* Logo and description */}
        <div className="flex flex-col sm:flex-row justify-between my-5 sm:space-x-5 font-semibold">
          <div className="sm:w-1/2 space-y-3">
            {/* Logo with text */}
            <Link to="/" className="flex items-center pb-3 w-fit border-b-2">
              <img src={lightLogo} width={40} alt="logo" />
              <span className="text-lg pl-1">PropChase</span>
            </Link>
            {/* Description */}
            <article className="text-sm">
              PropChase is a property rental marketplace where users can rent
              and list properties such as apartments, houses, or commercial
              spaces…
            </article>
            {/*  social buttons */}
            <div className="flex  space-x-5 h-6 items-center">
              <a
                href="https://linkedin.com/in/ezeibekweemma"
                target="_blank"
                className="pb-1 hover:border-b-2 border-[#007EBB]"
                rel="noreferrer"
              >
                {linkedin()}
              </a>
              <a
                href="https://github.com/EzeibekweEmma/PropChase"
                target="_blank"
                className="pb-1 hover:border-b-2 border-[#000000]"
                rel="noreferrer"
              >
                {Github()}
              </a>
              <a
                href="https://twitter.com/EzeibekweEmma"
                target="_blank"
                className="pb-1 hover:border-b-2 border-[#00AAEC]"
                rel="noreferrer"
              >
                {twitter()}
              </a>
              <a
                href="mailto:ezeibekweemma@gmail.com"
                className="pb-1 hover:border-b-2 border-[#00ac47]"
              >
                {Gmail()}
              </a>
              <a
                href="https://facebook.com/ezeibekweemma"
                target="_blank"
                className="pb-1 hover:border-b-2 border-[#0063DB]"
                rel="noreferrer"
              >
                {facebook()}
              </a>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex sm:w-1/2 justify-around sm:justify-around">
            <div className="space-y-3">
              {/* Services */}
              <div className="py-2 w-fit border-b-2">Services</div>
              <div className="flex flex-col text-sm font-light space-y-1">
                <Link to="/host/properties" className="hover:font-normal w-fit">
                  Check properties
                </Link>
                <Link to="/host/bookings" className="hover:font-normal w-fit">
                  Check Booking
                </Link>
                <Link
                  to="/host/Properties/new"
                  className="hover:font-normal w-fit"
                >
                  Add Property
                </Link>
                <Link to="/properties" className="hover:font-normal w-fit">
                  Explore Properties
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {/* Useful Links */}
              <div className="py-2 w-fit border-b-2">Useful Links</div>
              <div className="flex flex-col text-sm font-light space-y-1">
                <Link className="hover:font-normal w-fit">FAQ</Link>
                <Link className="hover:font-normal w-fit">Help</Link>
                <Link to="about" className="hover:font-normal w-fit">
                  About
                </Link>
                <Link className="hover:font-normal w-fit">Privacy Policy</Link>
              </div>
            </div>
          </nav>
        </div>
        {/* Copyright */}
        <span className="flex border-t justify-center py-5">
          Copyright © {new Date().getFullYear()} PorpChase
        </span>
      </section>
    </footer>
  );
}
