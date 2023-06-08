import { Link } from "react-router-dom";
import heroBanner from "../assets/heroBanner.png";
import Banner2 from "../assets/banner3.jpg";


export default function Home() {
  return (
    <main>
      <section
        className="flex justify-center bg-slate-200 h-[90vh] bg-no-repeat
        bg-cover rounded-br-[20rem]"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <section className="flex w-normalW items-center">
          <article className="max-w-xl">
            <h1 className="text-5xl">
              Discover The Best Home For You And Your Family.
            </h1>
            <h2 className="text-2xl mt-10">Chase Your Property With Us!</h2>
            <div className="flex space-x-10">
              <Link
                to="services"
                className="py-3 px-6 mt-5 rounded-l-3xl hover:rounded-3xl bg-tc text-bgc font-semibold border-white border"
              >
                Explore Now!
              </Link>
              <Link
                to="about"
                className="py-3 px-6 mt-5 rounded-r-3xl hover:rounded-3xl bg-tc text-bgc font-semibold border-white border"
              >
                About Us
              </Link>
            </div>
          </article>
        </section>
      </section>
      <section className="flex justify-center">
        <div className=" w-normalW h-screen">ghghghghghghghgh</div>
      </section>
    </main>
  );
}
