import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MoonIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { differenceInCalendarDays, format } from "date-fns";
import PhotoCard from "../../components/PhotoCard";
import AllPhotos from "../../components/AllPhotos";
import Loading from "../../components/Loading";

export default function BookingID() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const { user, ready } = useContext(UserContext);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get("/bookings").then((response) => {
        const booking = response.data.find(({ _id }) => _id === id);
        if (booking) {
          setDetails(booking);
        }
        const timer = setTimeout(() => {
          setShowMessage(true);
        }, 1000);
        return () => clearTimeout(timer);
      });
    }
  }, [id, user]);
  if (showAllPhotos) {
    return (
      <AllPhotos data={details.property} setShowAllPhotos={setShowAllPhotos} />
    );
  }

  // while fetching data display loading indicator
  if (!ready) {
    return <Loading />;
  }

  // if the user is not logged in navigate to the login page
  if (!user && ready) return <Navigate to="/login" />;

  return (
    <main>
      <section className="flex justify-center">
        <section className=" w-[80vw] min-h-[48vh] my-5">
          {details ? (
            <section>
              <div>
                <h1 className="text-2xl font-semibold">
                  {details.property.title}
                </h1>
                <a
                  className="flex items-center space-x-1 w-fit text-xs font-medium underline"
                  target="_blank"
                  href={`https://maps.google.com/?q=${details.property.address}`}
                  rel="noreferrer"
                >
                  <MapPinIcon className="h-4 w-4" />
                  <span>{details.property.address}</span>
                </a>
              </div>
              <div
                className="flex flex-col sm:flex-row justify-between sm:items-center
              bg-lbgc p-4 rounded-xl my-4 space-y-3 sm:space-y-0"
              >
                <div>
                  <h3 className="text-md sm:text-xl font-medium sm:font-semibold">
                    Your booking information:
                  </h3>
                  <div>
                    {/* Number of nights and guests */}
                    <div className="flex items-center text-xs my-1 text-ltc sm:text-sm space-x-2">
                      <p className="flex items-center space-x-1">
                        <MoonIcon className="h-4 w-4" />
                        <span>
                          {differenceInCalendarDays(
                            new Date(details.checkOut),
                            new Date(details.checkIn)
                          )}{" "}
                          Night
                        </span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>{details.numberOfGuests} Guest</span>
                      </p>
                    </div>
                    {/* Check-in and Check-out dates */}
                    <div className="flex items-center text-xs my-1 text-ltc sm:text-sm space-x-2">
                      <p className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>
                          {format(new Date(details.checkIn), "yyyy-MM-dd")}
                        </span>
                      </p>
                      <ArrowRightIcon className="h-3 w-3 stroke-2" />
                      <p className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4 " />
                        <span>
                          {format(new Date(details.checkOut), "yyyy-MM-dd")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center p-3 bg-tc text-bgc rounded-xl">
                  <h3 className="text-sm sm:text-base">Total price</h3>
                  <h1 className="text-lg sm:text-2xl">${details.price}</h1>
                </div>
              </div>
              {/* Group of photos preview*/}
              <PhotoCard
                data={details.property}
                showAllPhotos={showAllPhotos}
                setShowAllPhotos={setShowAllPhotos}
              />
            </section>
          ) : // Render message when there are no bookings
          showMessage ? (
            <h2 className="text-center font-semibold text-2xl animate-pulse">
              Booking ID Not Found!
            </h2>
          ) : (
            <h2 className="text-center text-3xl font-medium italic text-ltc animate-pulse">
              Loading...
            </h2>
          )}
        </section>
      </section>
    </main>
  );
}
