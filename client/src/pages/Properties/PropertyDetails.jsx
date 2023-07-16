/* eslint-disable react/prop-types */
// imports various icons from the @heroicons/react library
import {
  TruckIcon,
  TvIcon,
  WifiIcon,
  BellAlertIcon,
  ArrowLeftOnRectangleIcon,
  BugAntIcon,
  UserCircleIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

export default function PropertyDetails({ property }) {
  const helperFunctions = (icon, perk, text) => {
    // function that takes an icon, perk, and text as parameters and returns a JSX element with the icon and text
    return (
      <div className="flex items-end space-x-3">
        {icon}
        <span className={`text-sm ${perk ? "font-medium" : "line-through"}`}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <section className="space-y-3 divide-y divide-lbgc">
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl font-semibold">
          {property.title} hosted by {property.userName}
        </h2>
        {property.avater ? (
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={property.avater}
            alt="user photo"
          />
        ) : (
          <UserCircleIcon className="h-10 w-10" />
        )}
      </div>
      <article>
        <h2 className="sm:text-lg my-2 font-medium pt-2">Description</h2>
        <p>{property.description}</p>
      </article>
      <div>
        <h2 className="sm:text-lg my-2 font-medium pt-2">
          What this place offers
        </h2>
        <div className="space-y-3">
          {helperFunctions(
            <WifiIcon className="h-6 w-6" />,
            property.perks.wifi,
            "Free wifi"
          )}
          {helperFunctions(
            <TvIcon className="h-6 w-6" />,
            property.perks.tv,
            "Tv"
          )}
          {helperFunctions(
            <TruckIcon className="h-6 w-6" />,
            property.perks.parking,
            "Free parking space"
          )}
          {helperFunctions(
            <BellAlertIcon className="h-6 w-6" />,
            property.perks.alarm,
            "Smoke alarm"
          )}
          {helperFunctions(
            <BugAntIcon className="h-6 w-6" />,
            property.perks.pets,
            "Pets allowed"
          )}
          {helperFunctions(
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />,
            property.perks.entrance,
            "Private entrance"
          )}
        </div>
      </div>
      <div>
        {/* checkIn, checkOut and Max Guests info */}
        <h2 className="sm:text-lg my-2 font-medium">Booking Info</h2>
        <div className="text-sm font-medium space-y-1">
          <div className="flex space-x-1 items-center">
            <UserGroupIcon className="h-4 w-4" />
            <h4>Max Guests - {property.maxGuests}</h4>
          </div>
          <h4>Available Check-In And Check-Out Date.</h4>
          <div className="flex space-x-1 items-center">
            <p className="flex items-center space-x-1">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>{format(new Date(property.checkIn), "yyyy-MM-dd")}</span>
            </p>
            <ArrowRightIcon className="h-3 w-3 stroke-2" />
            <p className="flex items-center space-x-1">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>{format(new Date(property.checkOut), "yyyy-MM-dd")}</span>
            </p>
          </div>
        </div>
      </div>
      <article>
        <h2 className="sm:text-lg my-2 font-medium pt-2">Extra Info</h2>
        {/* It displays the extra information about the property */}
        <p>{property.extraInfo}</p>
      </article>
    </section>
  );
}
