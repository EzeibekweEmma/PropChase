import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisHorizontalCircleIcon,
  MapPinIcon,
  MoonIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import Loading from "../../components/Loading";

export default function Bookings() {
  // State to store bookings data and Access user context
  const [bookings, setBookings] = useState([]);
  const { user, ready } = useContext(UserContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Fetch user's bookings when user context changes
    if (user)
      axios.get("/bookings").then((response) => setBookings(response.data));

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

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
          <div className="space-y-2">
            {bookings?.length > 0 ? (
              // Render each booking data as a card
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="xs:flex gap-4 items-center bg-lbgc rounded-2xl relative"
                >
                  {/* Booking property image */}
                  <img
                    src={booking.property.photos[0]}
                    className="h-52 w-full sm:h-32 sm:w-32 xs:h-24 xs:w-24 
                    shrink-0 object-cover rounded-t-2xl xs:rounded-se-none xs:rounded-s-2xl"
                  />
                  <div className="p-3 xs:p-0">
                    {/* Property title */}
                    <h2 className="font-semibold sm:text-base text-sm">
                      {booking.property.title}
                    </h2>
                    {/* Property address */}
                    <h4
                      className="text-xs flex items-center space-x-1 text-ltc
                     leading-tight"
                    >
                      <MapPinIcon className="h-4 w-4" />
                      <span>{booking.property.address}</span>
                    </h4>
                    {/* Number of nights and guests */}
                    <div className="flex items-center text-xs my-1 text-ltc sm:text-sm space-x-2">
                      <p className="flex items-center space-x-1">
                        <MoonIcon className="h-4 w-4" />
                        <span>
                          {differenceInCalendarDays(
                            new Date(booking.checkOut),
                            new Date(booking.checkIn)
                          )}{" "}
                          Night
                        </span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>{booking.numberOfGuests} Guest</span>
                      </p>
                    </div>
                    {/* Check-in and Check-out dates */}
                    <div className="flex items-center text-xs my-1 text-ltc sm:text-sm space-x-2">
                      <p className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>
                          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                        </span>
                      </p>
                      <ArrowRightIcon className="h-3 w-3 stroke-2" />
                      <p className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4 " />
                        <span>
                          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                        </span>
                      </p>
                    </div>
                    {/* Total cost */}
                    <h2 className="font-semibold sm:text-base text-sm flex items-center space-x-1">
                      <CreditCardIcon className="h-5 w-5" />
                      <span>Total Cost: ${booking.price}</span>
                    </h2>
                    {/* Link to booking details */}
                    <Link
                      to={booking._id}
                      className="flex absolute right-2 bottom-[17rem] xs:bottom-2 items-center space-x-1 bg-tc text-bgc px-2
              py-1 hover:bg-opacity-80 rounded-lg w-fit"
                    >
                      <EllipsisHorizontalCircleIcon className="w-5 h-5" />
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : // Render message when there are no bookings
            showMessage ? (
              <h2 className="text-center font-semibold text-2xl animate-pulse">
                No Bookings Yet!
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
