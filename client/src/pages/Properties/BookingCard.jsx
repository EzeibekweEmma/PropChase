/* eslint-disable react/prop-types */
import {
  ArrowLeftOnRectangleIcon,
  BookmarkSquareIcon,
  EnvelopeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import {
  format,
  differenceInCalendarDays,
  addDays,
  parseISO,
  isValid,
} from "date-fns";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

export default function BookingCard({ property }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    maxGuests: 1,
    checkIn: format(new Date(), "yyyy-MM-dd"),
    checkOut: "",
  });
  const [isEmailVaild, setIsEmailVaild] = useState(true);
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    // Update form data with user data if available
    if (user) {
      setFormData((prevFormData) => {
        return { ...prevFormData, email: user.email, fullName: user.userName };
      });
    }
  }, [user]);

  let numberOfNights = 0;

  if (formData.checkIn && formData.checkOut) {
    // Calculate the number of nights between check-in and check-out dates
    const difference = differenceInCalendarDays(
      new Date(formData.checkOut),
      new Date(formData.checkIn)
    );
    // checking for negative values
    numberOfNights = difference < 1 ? 0 : difference;
  }

  const priceOfNights = property.price * numberOfNights;
  const serviceFee = Math.round(priceOfNights * 0.15);
  const totalPrice = serviceFee + priceOfNights;

  const handleChange = (event) => {
    // Event handler for form inputs
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });

    // RegExp here is used validate an email address
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // ^ = asserts the start of the string.
      // [^\s@]+ = matches one or more characters that are not whitespace or @.
      // @ = matches the @ symbol.
      // \. = matches a literal dot.
      // $ = asserts the end of the string.

      setIsEmailVaild(emailRegex.test(value));
    }
  };

  const makeBooking = async (event) => {
    event.preventDefault();

    // Check if number of nigth is greater than 0
    if (numberOfNights < 1)
      return alert(
        "Unable to make booking, number of nigth should be 1 or above!"
      );

    // Check if the password meets the requirements
    if (!isEmailVaild)
      return alert("Unable to sign up, please Enter a vaild email address!");

    try {
      const data = {
        ...formData,
        property: property._id,
        price: totalPrice,
      };

      const response = await axios.post("/booking", data);

      const bookingId = response.data._id;

      // Displaying a success message to the user
      alert(`Booking successfully`);

      setRedirect(`/host/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error creating user:", error);
      error.response && error.response.data && error.response.data.message
        ? // Displaying an error message to the user
          alert(error.response.data.message)
        : alert("An error occurred, please try again later");
    }
  };

  if (redirect) {
    // if user is not logged in redirect to login page
    return <Navigate to={redirect} />;
  }

  return (
    <div className="md:sticky md:top-28 border h-fit p-5 rounded-xl shadow-md hover:shadow-xl">
      <form onSubmit={makeBooking}>
        <h2 className="mb-4 text-center text-lg font-semibold">
          Price: ${property.price} per night
        </h2>
        <div className="border border-lbgc py-2 rounded-2xl ">
          <div className="flex divide-x-2 px-2 pt-1 divide-lbgc">
            {/* Check-in Time */}
            <label className="text-xs w-1/2">
              <p className="text-[0.6rem] ml-2 font-bold">CHECK-IN TIME</p>
              <input
                className="min-w-full py-1 pr-1 cursor-pointer bg-bgc
                focus:outline-none placeholder:italic indent-1"
                type="date"
                onChange={handleChange}
                name="checkIn"
                value={formData.checkIn}
                min={format(new Date(), "yyyy-MM-dd")}
                required
              />
            </label>

            {/* Check-out Time */}
            <label className="text-xs w-1/2">
              <p className="text-[0.6rem] ml-2 font-bold">CHECK-OUT TIME</p>
              <input
                className="min-w-full py-1 pr-1 cursor-pointer bg-bgc
                focus:outline-none placeholder:italic indent-1"
                type="date"
                onChange={handleChange}
                name="checkOut"
                value={formData.checkOut}
                min={format(
                  isValid(new Date(formData.checkIn))
                    ? parseISO(formData.checkIn)
                    : new Date(),
                  "yyyy-MM-dd"
                )}
                max={format(
                  addDays(
                    isValid(new Date(formData.checkIn))
                      ? parseISO(formData.checkIn)
                      : new Date(),
                    7
                  ),
                  "yyyy-MM-dd"
                )}
                required
              />
            </label>
          </div>

          {/* Max Number of Guests */}
          <label className="text-xs relative block border-t-2 px-2 border-lbgc mt-2 pt-2">
            <p className="text-[0.6rem] ml-2 font-bold">
              NUMBER OF GUESTS 1 - {property.maxGuests}
            </p>
            <span className="absolute inset-y-7 left-2 pl-2">
              <UserGroupIcon className="h-4 w-4" />
            </span>
            <input
              className="min-w-full py-1 pr-1 focus:outline-none bg-bgc
              placeholder:italic indent-9"
              type="number"
              step="1"
              min="1"
              inputMode="numeric"
              max={property.maxGuests}
              onChange={handleChange}
              name="maxGuests"
              value={formData.maxGuests}
              required
            />
          </label>
        </div>

        {numberOfNights > 0 && (
          <div className="mt-4">
            <label className="relative block mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <UserIcon className="h-5 w-5" />
              </span>
              <input
                className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
                type="text"
                onChange={handleChange}
                name="fullName"
                value={formData.fullName}
                required
                placeholder="Enter your name!"
              />
            </label>
            <label className="relative block mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <EnvelopeIcon className="h-5 w-5" />
              </span>
              <input
                className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
                type="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
                placeholder="name@example.com"
              />
            </label>
            {!isEmailVaild && (
              <p className="text-xs text-red-600 text-left -mt-3 ml-2 mb-3">
                Enter a vaild email address
              </p>
            )}
          </div>
        )}
        {user ? (
          // if user is logged in display make booking else login first
          <button
            className="bg-tc text-bgc space-x-1 w-full items-center flex
          my-3 font-medium py-3 rounded-xl justify-center"
          >
            <BookmarkSquareIcon className="h-5 w-5" />
            <span>Make Booking</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-tc text-bgc space-x-1 flex justify-center 
            items-center my-3 font-medium py-3 rounded-xl"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span>Login first</span>
          </Link>
        )}
      </form>

      <div className="text-center text-sm">You won&apos;t be charged yet</div>
      <div className="flex justify-between my-4">
        <span>${`${property.price} x ${numberOfNights} nights`}</span>
        <span>${priceOfNights} </span>
      </div>
      <div className="flex justify-between my-4 border-b pb-4 border-lbgc">
        <span>PropChase service fee</span>
        <span>${serviceFee} </span>
      </div>

      <div className="flex justify-between font-semibold">
        <span>Total before taxes</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
}
