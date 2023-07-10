// Importing necessary dependencies and assets
import { Link } from "react-router-dom";
import heroBanner from "../assets/heroBanner.png";
import Banner1 from "../assets/banner.jpg";
import Banner5 from "../assets/banner5.jpg";
import insurance from "../assets/insurance.png";
import reduction from "../assets/reduction.png";
import tax from "../assets/tax.png";
import support from "../assets/support.png";
import Gmail from "../assets/Gmail";
import linkedin from "../assets/linkedin";
import twitter from "../assets/twitter";
import Github from "../assets/Github";

export default function Home() {
  // Defining the Home component
  return (
    <main className="text-tc">
      {/* Hero section */}
      <section
        className="flex justify-center bg-slate-200 h-[90vh] bg-no-repeat
        bg-cover rounded-br-[20rem]"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <section className="flex w-[80vw] items-center">
          <article className="max-w-xl">
            <h1 className="text-3xl md:text-5xl">
              Discover The Best Home For You And Your Family.
            </h1>
            <h2 className="text-xl md:text-2xl mt-10">
              Chase Your Property With Us!
            </h2>
            <div className="flex space-x-10">
              <Link
                to="properties"
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

      {/* Section highlighting reasons to choose the company */}
      <section className="flex justify-center">
        <section className=" w-[80vw]">
          <article className="my-20">
            <h1 className="text-3xl md:text-5xl text-ltc">
              Why <span className="font-semibold text-tc">Choose</span> Us?
            </h1>
            <h2 className="text-xl md:text-2xl my-5">
              PropChase is commited to help it&apos;s clients reach their goals.
            </h2>

            {/* Features section */}
            <div
              className="flex py-20 rounded-lg hover:scale-105 bg-tc flex-col 
              items-center md:flex-row hover:shadow-2xl text-center text-bgc mt-20"
            >
              <div className="flex justify-around md:space-x-0 space-x-10 flex-grow md:mb-0 mb-10">
                {/* Feature: Property Insurance */}
                <span className="flex flex-col items-center">
                  <img src={insurance} alt="insurance" width={60} />
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Property Insurance
                  </h2>
                  <p className="text-ltc text-sm">
                    Fusce sed quam sed mauris imperdiet cursus.
                  </p>
                </span>
                {/* Feature: Lowest Commission */}
                <span className="flex flex-col items-center">
                  <img src={reduction} alt="reduction" width={60} />
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Lowest Commission
                  </h2>
                  <p className="text-ltc text-sm">
                    Donec at dolor vel urna scelerisque fermentum.
                  </p>
                </span>
              </div>
              <div className="flex md:space-x-0 space-x-10 justify-around  flex-grow">
                {/* Feature: Tax Advantage */}
                <span className="flex flex-col items-center">
                  <img src={tax} alt="tax" width={60} />
                  <h2 className="text-xl font-semibold md:text-2xl ">
                    Tax Adavantage
                  </h2>
                  <p className="text-ltc text-sm">
                    Cras pulvinar mollis erat vitae consectetur.
                  </p>
                </span>
                {/* Feature: 24 Hour Consultation */}
                <span className="flex flex-col items-center">
                  <img src={support} alt="support" width={60} />
                  <h2 className="text-xl font-semibold md:text-2xl">
                    24 hour Consuitation
                  </h2>
                  <p className="text-ltc text-sm">
                    Sed vehicula pretium congue.
                  </p>
                </span>
              </div>
            </div>
          </article>

          {/* Section highlighting company's services */}
          <section className="mb-20 ">
            <article className="mt-10 md:mt-0">
              <span className="font-semibold">What We Do</span>
              <h2 className="text-3xl text-ltc mb-5 lg:text-5xl">
                We Help Clients{" "}
                <span className="text-tc font-semibold">Reach</span> their Dream
                Property.
              </h2>
              <p className="mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                suscipit tellus in risus tincidunt accumsan. Integer interdum,
                enim non suscipit feugiat, leo mi pulvinar metus, a lacinia arcu
                enim eget mauris. Maecenas magna erat, sagittis et nibh eu,
                vestibulum maximus massa. Ut ornare magna sit amet ante
                accumsan, vel tincidunt augue placerat. Maecenas magna erat,
                sagittis et nibh eu, vestibulum maximus massa. Ut ornare magna
                sit amet ante accumsan, vel tincidunt augue placerat. Maecenas
                magna erat, sagittis et nibh eu, vestibulum maximus massa. Ut
                ornare magna sit amet ante accumsan, vel tincidunt augue
                placerat.
              </p>
              <p className="mb-2">
                Maecenas magna erat, sagittis et nibh eu, vestibulum maximus
                massa. Ut ornare magna sit amet ante accumsan, vel tincidunt
                augue placerat. Maecenas magna erat, sagittis et nibh eu,
                vestibulum maximus massa. Ut ornare magna sit amet ante
                accumsan, vel tincidunt augue placerat. Maecenas magna erat,
                sagittis et nibh eu, vestibulum maximus massa. Ut ornare magna
                sit amet ante accumsan, vel tincidunt augue placerat. Maecenas
                magna erat, sagittis et nibh eu, vestibulum maximus massa. Ut
                ornare magna sit amet ante accumsan, vel tincidunt augue
                placerat.
              </p>
              <p className="mb-4">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Integer interdum, enim non suscipit feugiat, leo mi pulvinar
                metus, a lacinia arcu enim eget mauris. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Integer interdum, enim
                non suscipit feugiat, leo mi pulvinar metus, a lacinia arcu enim
                eget mauris.
              </p>
              <br />
              <Link
                to="properties"
                className="py-4 px-8 mt-10 hover:rounded-3xl
                 bg-tc text-bgc font-semibold border-white"
              >
                Explore More!
              </Link>
            </article>

            {/* Section with property statistics */}
            <div
              className="flex py-20 rounded-lg hover:scale-105 bg-tc flex-col 
              items-center md:flex-row hover:shadow-2xl
              text-center text-bgc mt-20"
            >
              <div className="flex justify-around md:space-x-0 space-x-10 flex-grow md:mb-0 mb-10">
                <span className="">
                  <h2 className="text-xl font-semibold md:text-3xl">5,489+</h2>
                  <p className="text-ltc">Available Property</p>
                </span>
                <span className="">
                  <h2 className="text-xl font-semibold md:text-3xl">2,230+</h2>
                  <p className="text-ltc">Recently Sold Property</p>
                </span>
              </div>
              <div className="flex md:space-x-0 space-x-10 justify-around  flex-grow">
                <span className="-ml-5 mr-7 md:m-0">
                  <h2 className="text-xl font-semibold md:text-3xl ">3,600+</h2>
                  <p className="text-ltc">Happy Costumers</p>
                </span>
                <span className="">
                  <h2 className="text-xl font-semibold md:text-3xl">1,450+</h2>
                  <p className="text-ltc">Property for sale</p>
                </span>
              </div>
            </div>
          </section>
        </section>
      </section>
      {/* About Author section */}
      <section
        className="h-[65vh] bg-no-repeat bg-cover bg-center mb-20 text-bgc"
        style={{ backgroundImage: `url(${Banner5})` }}
      >
        <section
          className="flex justify-center h-full w-full bg-tc items-center
        bg-opacity-50"
        >
          <section className="flex md:space-x-10 items-center flex-col md:flex-row mx-10">
            <img
              src="https://prop-chase.s3.amazonaws.com/PropChase-1688482681109.jpg"
              alt="author photo"
              className="h-52 lg:h-72 rounded-2xl"
            />
            <section>
              <article className="max-w-lg font-medium">
                <span className="font-semibold ">Author:</span>
                <h2 className="md:text-2xl text-xl text-lbgc lg:text-4xl font-semibold">
                  Ezeibekwe Emmanuel
                </h2>
                <p className="md:mb-4 font-normal md:font-semibold">
                  Software Engineer(Full-stack - Frontend heavy)
                </p>
                <span className="font-semibold hidden md:block">Role:</span>
                <p className="md:mb-4 hidden md:block">
                  Designing, developing, maintaining both the client-side and
                  server-side components of this web application, managing
                  database, ensuring the smooth integration of all components
                  and a seamless user experience.
                </p>
                <br />
                {/*  social buttons */}
                <div className="flex space-x-5 h-6 items-center">
                  <a
                    href="https://linkedin.com/in/ezeibekweemma"
                    target="_blank"
                    className="p-2 rounded-xl hover:bg-bgc"
                    rel="noreferrer"
                  >
                    {linkedin()}
                  </a>
                  <a
                    href="https://github.com/EzeibekweEmma"
                    target="_blank"
                    className="p-1 rounded-xl hover:bg-bgc"
                    rel="noreferrer"
                  >
                    {Github()}
                  </a>
                  <a
                    href="https://twitter.com/EzeibekweEmma"
                    target="_blank"
                    className="p-2 rounded-xl hover:bg-bgc"
                    rel="noreferrer"
                  >
                    {twitter()}
                  </a>
                  <a
                    href="mailto:ezeibekweemma@gmail.com"
                    className="p-2 rounded-xl hover:bg-bgc"
                  >
                    {Gmail()}
                  </a>
                </div>
              </article>
            </section>
          </section>
        </section>
      </section>

      <section className="flex justify-center">
        <section className="w-[80vw]">
          {/* About Section */}
          <section className="flex flex-col md:flex-row items-center justify-between mb-10">
            <img
              src={Banner1}
              className="h-[50vh] w-[80vw] rounded-xl md:h-[70vh] md:min-w-[40vw] md:mr-10"
              alt=""
            />
            <article className="mt-10 md:mt-0">
              <span className="font-semibold">About Us</span>
              <h2 className="text-3xl text-ltc mb-5 lg:text-5xl">
                We Provide The Best{" "}
                <span className="text-tc font-semibold">Property</span> For You.
              </h2>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                suscipit tellus in risus tincidunt accumsan.
              </p>
              <p className="mb-4">
                Maecenas magna erat, sagittis et nibh eu, vestibulum maximus
                massa. Ut ornare magna sit amet ante accumsan, vel tincidunt
                augue placerat.
              </p>
              <p className="mb-4">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Integer interdum, enim non suscipit feugiat, leo mi pulvinar
                metus, a lacinia arcu enim eget mauris.
              </p>
              <br />
              <Link
                to="about"
                className="py-3 px-6 mt-10 hover:rounded-3xl
                 bg-tc text-bgc font-semibold border-white"
              >
                About Us
              </Link>
            </article>
          </section>
        </section>
      </section>
    </main>
  );
}
