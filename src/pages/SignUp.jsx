import { useState } from "react";
import darkLogo from "../assets/darkLogo.png";
import Banner3 from "../assets/banner3.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

export default function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordRStrength, setPasswordRStrength] = useState({
    //passwordRequirementsStrength
    totalCharacters: false,
    isNumber: false,
    isSymbol: false,
    isUpper: false,
    isLower: false,
    isEmail: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });

    // RegExp here is used to check the password strength
    if (name === "password") {
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

    // RegExp here is used validate an email address
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // ^ = asserts the start of the string.
      // [^\s@]+ = matches one or more characters that are not whitespace or @.
      // @ = matches the @ symbol.
      // \. = matches a literal dot.
      // $ = asserts the end of the string.
      setPasswordRStrength((prevPasswordRStrength) => {
        return { ...prevPasswordRStrength, isEmail: emailRegex.test(value) };
      });
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the password meets the requirements
    if (!passwordRStrength.isEmail)
      return alert("Unable to sign up, please Enter a vaild email address!");

    // Check if the password meets the requirements
    if (!passwordStrength)
      return alert("Unable to sign up, password strength is weak!");

    // Checking if password matches
    if (formData.password === formData.confirmPassword) {
      try {
        await axios.post("/signUp", {
          formData,
        });

        // Displaying a success message to the user
        alert(`${formData.userName} was successfully created!`);

        setRedirect(true);
      } catch (error) {
        console.error("Error creating user:", error);
        error.response && error.response.data && error.response.data.message
          ? // Displaying an error message to the user
            alert(error.response.data.message)
          : alert("An error occurred, please try again later");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  if (redirect) return <Navigate to={"/login"} />;

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleShowCPassword = () => {
    setShowCPassword((prevState) => !prevState);
  };

  return (
    <main>
      <section className="text-tc">
        <section className="flex min-h-startingH">
          <div
            style={{ backgroundImage: `url(${Banner3})` }}
            className="hidden md:flex w-1/2 text-bgc bg-no-repeat bg-cover bg-center bg-tc"
          >
            <div
              className="flex flex-col bg-opacity-50 bg-tc h-full w-full items-center
            justify-center px-20 text-center space-y-4"
            >
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="font-medium">
                To Stay connected with us, please login with your personal
                information.
              </p>
              <Link
                to="/login"
                className="border-2 hover:bg-tc hover:border-none text-bgc rounded-full
               py-2 px-10 font-semibold"
              >
                LogIn
              </Link>
            </div>
          </div>
          <section className="flex md:w-1/2 w-screen items-center justify-center">
            <section
              className="py-12 px-12 rounded-2xl min-w-[30vw] max-w-[30rem]
              text-center shadow-md shadow-slate-200 hover:shadow-slate-300"
            >
              <section className="flex-col">
                <span className="flex justify-center my-5">
                  <img src={darkLogo} alt="logo" className="h-24" />
                </span>
                <h2 className="text-3xl font-semibold mb-5">
                  Create an account
                </h2>
              </section>
              <form onSubmit={handleSubmit}>
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
                {!passwordRStrength.isEmail && (
                  <p className="text-xs text-red-600 text-left -mt-3 ml-2 mb-3">
                    Enter a vaild email address
                  </p>
                )}
                <label className="relative block mb-3">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <LockClosedIcon className="h-5 w-5" />
                  </span>
                  <input
                    className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
                    type={showPassword ? "type" : "password"}
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    required
                    placeholder="Create password!"
                  />
                  <span
                    onClick={handleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </span>
                </label>
                {formData.password && passwordRequirements()}
                <label className="relative block mb-3">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <LockClosedIcon className="h-5 w-5" />
                  </span>
                  <input
                    className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
                    type={showCPassword ? "type" : "password"}
                    onChange={handleChange}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    required
                    placeholder="Comfrim Password!"
                  />
                  <span
                    onClick={handleShowCPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showCPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </span>
                </label>
                {formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600 text-left -mt-3 ml-2 mb-3">
                    password doesn&apos;t match
                  </p>
                )}
                <button
                  className="flex justify-center items-center space-x-1 bg-tc 
              text-bgc px-2 py-1 hover:bg-opacity-80 rounded-full min-w-full"
                >
                  <ArrowUpOnSquareIcon strokeWidth={2} className="w-5 h-5" />
                  <span>SignUp</span>
                </button>
                <span className="font-medium text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 italic font-normal"
                  >
                    logIn here!
                  </Link>
                </span>
              </form>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}
