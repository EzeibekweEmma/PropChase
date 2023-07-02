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
} from "@heroicons/react/24/outline";

export default function PropertyDetails({ property }) {
  const helperFunctions = (icon, perk, text) => {
    // function that takes an icon, perk, and text as parameters and returns a JSX element with the icon and text
    return (
      <div className="flex items-end space-x-3">
        {icon}
        <span className={`text-sm ${perk ? "" : "line-through"}`}>{text}</span>
      </div>
    );
  };

  return (
    <section className="space-y-3 divide-y divide-lbgc">
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl font-semibold">
          {property.title} hosted by {property.userName}
        </h2>
        {property.owner ? (
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={`http://127.0.0.1:3000/uploads/${property.avatar}`}
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
      <article>
        <h2 className="sm:text-lg my-2 font-medium pt-2">Extra Info</h2>
        {/* It displays the extra information about the property */}
        <p>{property.extraInfo}</p>
      </article>
    </section>
  );
}
