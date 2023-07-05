import {
  ArrowPathIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

export default function Property() {
  const [properties, setProperties] = useState([]);
  const { user, ready } = useContext(UserContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetching user's properties
      axios.get("/userProperty").then(({ data }) => {
        setProperties(data);
      });

      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!ready) {
    // while fetching data display loading indicator
    return (
      <section className="flex justify-center text-ltc min-h-[53vh]">
        <div className="w-[80vw] p-4 max-w-sm mx-auto">
          <ArrowPathIcon className="animate-spin stroke-1" />
          <h2 className="text-center text-5xl font-medium italic animate-pulse">
            Loading...
          </h2>
        </div>
      </section>
    );
  }

  // if the user is not logged in navigate to the login page
  if (!user && ready) return <Navigate to="/login" />;

  return (
    <main>
      <section className="flex justify-center text-tc">
        <section className="min-h-[50vh] w-[80vw] mt-5">
          <div className="flex justify-center">
            <Link
              to="new"
              className="flex items-center text-xs sm:text-base space-x-1 py-1 px-3
            mb-2 w-fit rounded-full bg-tc text-bgc"
            >
              <PlusCircleIcon className="stroke-2 w-5 h-5" />
              <span>Add New Property</span>
            </Link>
          </div>

          <div className="space-y-2 my-4">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className=" items-center bg-lbgc rounded-2xl p-3
                  gap-4 relative sm:flex"
                >
                  <img
                    src={property.photos[0]}
                    alt={""}
                    className="sm:h-32 sm:w-32 h-52 w-full md:h-52 md:w-52 shrink-0 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-base font-semibold">
                      {property.title}
                    </h2>
                    <p className="text-sm mt-1">{property.description}</p>
                  </div>
                  <Link
                    to={property._id}
                    className="flex absolute right-2 bottom-2 items-center space-x-1 bg-tc text-bgc px-2
              py-1 hover:bg-opacity-80 rounded-lg w-fit"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    <span>Edit</span>
                  </Link>
                </div>
              ))
            ) : // Render message when there are no bookings
            showMessage ? (
              <h2 className="text-center font-semibold text-2xl animate-pulse">
                No Property Yet!
              </h2>
            ) : (
              <h2 className="text-center text-3xl font-medium italic text-ltc animate-pulse">
                Loading...
              </h2>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
