import { Link } from "react-router-dom";
import lightLogo from "../assets/lightLogo.png";
import youtube from "../assets/youtube";
import linkedin from "../assets/linkedin";
import twitter from "../assets/twitter";
import instagram from "../assets/instagram";
import facebook from "../assets/facebook";
export default function Footer() {
  return (
    <footer className="flex justify-center border-bg-slate-300 border-t text-bgc bg-tc">
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
              <Link className="pb-1 hover:border-b-2 border-[#007EBB]">
                {linkedin()}
              </Link>
              <Link className="pb-1 hover:border-b-2 border-[#ff8000]">
                {instagram()}
              </Link>
              <Link className="pb-1 hover:border-b-2 border-[#00AAEC]">
                {twitter()}
              </Link>
              <Link className="pb-1 hover:border-b-2 border-[#ff0000]">
                {youtube()}
              </Link>
              <Link className="pb-1 hover:border-b-2 border-[#0063DB]">
                {facebook()}
              </Link>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex sm:w-1/2 justify-around sm:justify-around">
            <div className="space-y-3">
              {/* Services */}
              <div className="py-2 w-fit border-b-2">Services</div>
              <div className="flex flex-col text-sm font-light space-y-1">
                <Link className="hover:font-normal w-fit">Make Booking</Link>
                <Link className="hover:font-normal w-fit">Add Property</Link>
                <Link to="/host" className="hover:font-normal w-fit">
                  Host
                </Link>
                <Link to="/about" className="hover:font-normal w-fit">
                  About
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {/* Useful Links */}
              <div className="py-2 w-fit border-b-2">Useful Links</div>
              <div className="flex flex-col text-sm font-light space-y-1">
                <Link className="hover:font-normal w-fit">FAQ</Link>
                <Link className="hover:font-normal w-fit">Help</Link>
                <Link to="/account" className="hover:font-normal w-fit">
                  Your Account
                </Link>
                <Link className="hover:font-normal w-fit">Privacy Policy</Link>
              </div>
            </div>
          </nav>
        </div>
        {/* Copyright */}
        <span className="flex border-t justify-center py-5">
          Copyright © 2023 PorpChase
        </span>
      </section>
    </footer>
  );
}
