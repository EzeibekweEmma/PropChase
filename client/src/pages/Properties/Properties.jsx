import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function Services() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    // getting properties from properties endpoint
    axios.get("/properties").then((response) => {
      setProperties(response.data);
    });
  }, []);
  // while fetching data display loading indicator
  if (properties.length < 1) {
    return <Loading />;
  }
  // This code sets up a page to display a list of properties, fetches the property data from an API endpoint, and renders the properties along with their details
  return (
    <main>
      <section className="flex justify-center text-tc">
        <section className="w-[80vw] min-h-[60vh]">
          <section
            className="grid grid-cols-3 border mt-2 border-tc
          rounded-full py-2 divide-x-2 divide-tc text-center
          shadow-md shadow-slate-400 items-center"
          >
            <div className="">Anywhere</div>
            <div>Any week</div>
            <div className="flex justify-center space-x-2 items-center">
              <span>Add guests</span>
              <button className="bg-tc text-white p-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </section>
          <section
            className="grid gap-x-6 gap-y-8 grid-cols-1 xs:grid-cols-2
          sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-8"
          >
            {properties.length > 0 &&
              properties.map((property) => {
                return (
                  <Link to={property._id} key={property._id}>
                    <div className="mb-2">
                      {property.photos?.[0] && (
                        <img
                          className="rounded-3xl object-cover aspect-square"
                          src={property.photos?.[0]}
                          alt={property.title}
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-medium leading-tight">
                      {property.title}
                    </h3>
                    <h4 className="text-xs truncate text-ltc leading-tight">
                      {property.address}
                    </h4>
                    <h4 className="text-sm font-medium mt-1">
                      <span className="font-bold">${property.price}</span> per
                      night
                    </h4>
                  </Link>
                );
              })}
          </section>
        </section>
      </section>
    </main>
  );
}
