import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function checkInAndOut({ headerText, handleChange, formData }) {
  // Check In and Check Out Time
  return (
    <div>
      {headerText(
        "Check In and Check Out Time",
        "Add your check-in and check-out time, remember to have some time window for cleaning the room between guests."
      )}
      <div className="grid gap-2 sm:grid-cols-3 mt-2">
        {/* Check-in Time */}
        <label className="text-sm relative block">
          <p className="">Check-in time</p>
          <span className="absolute inset-y-6 left-0 pl-2">
            <ClockIcon className="h-5 w-5" />
          </span>
          <input
            className="min-w-full rounded-xl bg-slate-100 py-1 pr-3
                focus:outline-none placeholder:italic focus:shadow-md indent-8"
            type="time"
            onChange={handleChange}
            name="checkIn"
            value={formData.checkIn}
            required
            placeholder="14:00:00"
          />
        </label>

        {/* Check-out Time */}
        <label className="text-sm relative block">
          <p className="">Check-out time</p>
          <span className="absolute inset-y-6 left-0 pl-2">
            <ClockIcon className="h-5 w-5" />
          </span>
          <input
            className="min-w-full rounded-xl bg-slate-100 py-1 pr-3
                focus:outline-none placeholder:italic focus:shadow-md indent-8"
            type="time"
            onChange={handleChange}
            name="checkOut"
            value={formData.checkOut}
            required
            placeholder="1:00:00"
          />
        </label>

        {/* Max Number of Guests */}
        <label className="text-sm relative block">
          <p className="">Max number of guests</p>
          <span className="absolute inset-y-6 left-0 pl-2">
            <UserGroupIcon className="h-5 w-5" />
          </span>
          <input
            className="min-w-full rounded-xl bg-slate-100 py-1 pr-3 mb-4
                focus:outline-none placeholder:italic focus:shadow-md indent-8"
            type="number"
            onChange={handleChange}
            name="maxGuests"
            value={formData.maxGuests}
            required
            placeholder="1"
          />
        </label>
      </div>
    </div>
  );
}
