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
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: type === "checkbox" ? checked : value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
                <button
                  className="flex justify-center items-center space-x-1 bg-tc 
              text-bgc px-2 py-1 hover:bg-opacity-80 rounded-full min-w-full"
                >
                  <ArrowUpOnSquareIcon
                    strokeWidth={2}
                    className="w-5 h-5"
                  />
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
