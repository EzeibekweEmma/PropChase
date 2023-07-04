/* eslint-disable react/prop-types */
import {
  TruckIcon,
  TvIcon,
  WifiIcon,
  BellAlertIcon,
  ArrowLeftOnRectangleIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

export default function Perks({ headerText, handleChange, formPerks }) {
  return (
    <div>
      {/* Render the header text */}
      {headerText("Perks", "Select all the perks for this property.")}

      {/* Grid container for the perks */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {/* Perk: Wifi */}
        <label
          htmlFor="wifi"
          className=" hover:cursor-pointer border p-4 
                flex rounded-2xl gap-1 items-center"
        >
          <input
            id="wifi"
            type="checkbox"
            onChange={handleChange}
            name="wifi"
            checked={formPerks.wifi}
          />
          <WifiIcon className="h-5 w-5" />
          Wifi
        </label>

        {/* Perk: Parking Spot */}
        <label
          htmlFor="parking"
          className=" hover:cursor-pointer border p-4 
                flex rounded-2xl gap-1 items-center"
        >
          <input
            id="parking"
            type="checkbox"
            onChange={handleChange}
            name="parking"
            checked={formPerks.parking}
          />
          <TruckIcon className="h-5 w-5" />
          Parking Spot
        </label>

        {/* Perk: TV */}
        <label
          htmlFor="tv"
          className=" hover:cursor-pointer border p-4 
          flex rounded-2xl gap-1 items-center"
        >
          <input
            id="tv"
            type="checkbox"
            onChange={handleChange}
            name="tv"
            checked={formPerks.tv}
          />
          <TvIcon className="h-5 w-5" />
          TV
        </label>

        {/* Perk: Private Entrance */}
        <label
          htmlFor="entrance"
          className=" hover:cursor-pointer border p-4 
                flex rounded-2xl gap-1 items-center"
        >
          <input
            id="entrance"
            type="checkbox"
            onChange={handleChange}
            name="entrance"
            checked={formPerks.entrance}
          />
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Private Entrance
        </label>

        {/* Perk: Smoke Alarm */}
        <label
          htmlFor="alarm"
          className=" hover:cursor-pointer border p-4 
                flex rounded-2xl gap-1 items-center"
        >
          <input
            id="alarm"
            type="checkbox"
            onChange={handleChange}
            name="alarm"
            checked={formPerks.alarm}
          />
          <BellAlertIcon className="h-5 w-5" />
          Smoke Alarm
        </label>

        {/* Perk: Pets */}
        <label
          htmlFor="pets"
          className=" hover:cursor-pointer border p-4 
                flex rounded-2xl gap-1 items-center"
        >
          <input
            id="pets"
            type="checkbox"
            onChange={handleChange}
            name="pets"
            checked={formPerks.pets}
          />
          <BugAntIcon className="h-5 w-5" />
          Pets
        </label>
      </div>
    </div>
  );
}
