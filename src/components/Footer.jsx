import {Link} from 'react-router-dom'
import lightLogo from "../assets/lightLogo.png"
export default function Footer() {
  return (
    <footer className="flex justify-center border-bg-slate-300 border-t text-bgc bg-tc">
      <section className="flex-col w-[80vw]">
        <div className="flex justify-between my-2 items-center font-semibold">
          <Link to="/" className="flex items-center p-0.5">
            <img src={lightLogo} width={40} alt="logo" />
            <span className="text-lg pl-1">PropChase</span>
          </Link>
          <section>
            <div>social media links goes here!</div>
          </section>
        </div>
        <span className="flex justify-center mb-3">Copyright © 2023 PorpChase</span>
      </section>
    </footer>
  );
}
