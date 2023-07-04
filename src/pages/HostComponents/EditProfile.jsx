import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  UserIcon,
  ArrowUpOnSquareStackIcon,
  ArrowLeftCircleIcon,
  CameraIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    avater: "",
    userName: "",
    description: "",
  });
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordRStrength, setPasswordRStrength] = useState({
    //passwordRequirementsStrength
    totalCharacters: false,
    isNumber: false,
    isSymbol: false,
    isUpper: false,
    isLower: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    // getting and setting FormData from endpoint
    axios
      .get("/getProfile")
      .then((response) => {
        const { data } = response;
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  //  Event handler for adding phones from device
  function uploadSinglePhoto(event) {
    // Get the selected files from the event
    const file = event.target.files[0];
    // Create a new FormData object to store the file
    const data = new FormData();
    // append it to the FormData object
    data.append("photo", file);

    // Make a POST request to the "/uploadSinglePhoto" endpoint using axios
    axios
      .post("/uploadSinglePhoto", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        // Extract the photoLink data from the response
        const { data: photoLink } = response;
        // Update the FormData state by appending the new photoLink
        setFormData((prevFormData) => {
          return { ...prevFormData, avater: photoLink };
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error uploading photos:", error);
        alert(error.message);
      });
  }

  const passwordRequirements = () => {
    return (
      <ul className="list-disc ml-5 -mt-3 text-left mb-3 text-xs">
        <span className="text-tc -ml-4">Password should contain at least:</span>
        <li
          className={`text-${
            passwordRStrength.totalCharacters ? "green" : "red"
          }-600`}
        >
          8 characters.
        </li>
        <li
          className={`text-${passwordRStrength.isNumber ? "green" : "red"}-600`}
        >
          A number.
        </li>
        <li
          className={`text-${passwordRStrength.isSymbol ? "green" : "red"}-600`}
        >
          A symbol.
        </li>
        <li
          className={`text-${passwordRStrength.isUpper ? "green" : "red"}-600`}
        >
          A upper case letter.
        </li>
        <li
          className={`text-${passwordRStrength.isLower ? "green" : "red"}-600`}
        >
          A lower case letter.
        </li>
      </ul>
    );
  };

  const passwordStrength =
    passwordRStrength.totalCharacters &&
    passwordRStrength.isNumber &&
    passwordRStrength.isSymbol &&
    passwordRStrength.isLower &&
    passwordRStrength.isUpper;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "oldPassword" || name === "newPassword") {
      setPasswordState((prevPasswordState) => {
        return {
          ...prevPasswordState,
          [name]: value,
        };
      });
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }

    // RegExp here is used to check the password strength
    if (name === "newPassword") {
      setPasswordRStrength((prevPasswordRStrength) => {
        return {
          ...prevPasswordRStrength,
          totalCharacters: value.length > 7,
          isUpper: /[A-Z]/.test(value),
          isLower: /[a-z]/.test(value),
          isNumber: /[0-9]/.test(value),
          isSymbol: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
        };
      });
    }
  };

  const handlePasswordField = () => {
    setUpdatePassword((prev) => !prev);
    // clear password fields if not used
    setPasswordState({
      oldPassword: "",
      newPassword: "",
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Check if the password meets the requirements
    if (!passwordStrength && updatePassword)
      return alert("Unable to sign up, password strength is weak!");

    try {
      await axios.put("/editProfile", { ...formData, ...passwordState });
      // Displaying a success message to the user
      alert(`Update was successfull!`);
      setRedirect("/host");
    } catch (error) {
      console.error("Error Updating user info:", error);
      error.response && error.response.data && error.response.data.message
        ? // Displaying an error message to the user
          alert(error.response.data.message)
        : alert("An error occurred");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const passwordPlace = () => {
    // password component
    return (
      <div>
        <label className="relative block mb-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <LockClosedIcon className="h-5 w-5" />
          </span>
          <input
            className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
            type={showPassword ? "type" : "password"}
            onChange={handleChange}
            name="oldPassword"
            value={passwordState.oldPassword}
            required
            placeholder="Enter Old Password!"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </span>
        </label>
        <label className="relative block mb-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <LockClosedIcon className="h-5 w-5" />
          </span>
          <input
            className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
            type={showCPassword ? "type" : "password"}
            onChange={handleChange}
            name="newPassword"
            value={passwordState.newPassword}
            required
            placeholder="Create New Password!"
          />
          <span
            onClick={() => setShowCPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            {showCPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </span>
        </label>
        {passwordState.newPassword && passwordRequirements()}
      </div>
    );
  };

  return (
    <section className="flex justify-center text-tc">
      <section className="flex w-[80vw] justify-center py-10 font-medium">
        <fieldset className="border-2 rounded-xl w-fit p-5">
          <Link
            to="../"
            className="flex items-center space-x-1 bg-tc text-bgc px-2
              py-1 hover:bg-opacity-80 rounded-lg w-fit"
          >
            <ArrowLeftCircleIcon strokeWidth={2} className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <legend className="text-xl">Edit Personal Info:</legend>
          <form onSubmit={handleUpdate} className="space-y-3 w-[70vw]">
            <div className="flex justify-center ">
              <section className="relative block w-40 h-40 border rounded-full">
                {formData.avater ? (
                  <img
                    src={formData.avater}
                    className="object-cover w-full h-full border rounded-full"
                  />
                ) : (
                  <UserIcon className="p-5" />
                )}
                <label>
                  <input
                    type="file"
                    hidden
                    onChange={uploadSinglePhoto}
                    name="avater"
                    accept="image/jpeg, image/png"
                  />
                  <CameraIcon
                    className="h-10 w-10 p-1.5 absolute right-2 bottom-0 border-4 border-bgc
                stroke-2 rounded-full text-bgc bg-tc cursor-pointer hover:text-tc
                hover:bg-bgc hover:border-tc"
                  />
                </label>
              </section>
            </div>
            <label className="relative block mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <UserIcon className="h-5 w-5" />
              </span>
              <input
                className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
                type="text"
                onChange={handleChange}
                name="userName"
                value={formData.userName}
                required
                placeholder="Enter your name!"
              />
            </label>
            <textarea
              className="min-w-full h-32 bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 px-2"
              onChange={handleChange}
              name="description"
              value={formData.description}
              placeholder="Description goes here!"
            />
            {updatePassword && passwordPlace()}
            <button
              className="flex justify-center items-center space-x-1 bg-tc 
              text-bgc px-2 py-1 hover:bg-opacity-80 rounded-full min-w-full"
            >
              <ArrowUpOnSquareStackIcon strokeWidth={2} className="w-5 h-5" />
              <span>Update</span>
            </button>
            <span
              onClick={handlePasswordField}
              className="text-sm float-right cursor-pointer p-0.5"
            >
              {updatePassword ? "Never mind" : "Set new password"}
            </span>
          </form>
        </fieldset>
      </section>
    </section>
  );
}
