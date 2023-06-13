import { useState } from "react";
import darkLogo from "../assets/darkLogo.png";
import Banner4 from "../assets/banner4.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
   const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: type === "checkbox" ? checked : value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        await axios.post("/login", {
          formData,
        });

        // Displaying a success message to the user
        alert(`Log in successfully!`);

        setRedirect(true);
      } catch (error) {
        console.error("Error logging user:", error);
        error.response && error.response.data && error.response.data.message
          ? // Displaying an error message to the user
            alert(error.response.data.message)
          : alert("An error occurred");
      }
  };

   if (redirect) return <Navigate to={"/"} />;

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <main>
      <section className="text-tc">
        <section className="flex flex-row-reverse min-h-startingH">
          <div
            style={{ backgroundImage: `url(${Banner4})` }}
            className="hidden md:flex w-1/2 text-bgc bg-no-repeat
             bg-cover bg-center bg-tc"
          >
            <div
              className="flex flex-col bg-opacity-60 bg-tc h-full w-full items-center
            justify-center px-20 text-center space-y-4"
            >
              <h2 className="text-3xl font-bold">Hello Friend!</h2>
              <p className="font-medium">
                Connect with us, sign up your personal information and start to
                explore!
              </p>
              <Link
                to="/signUp"
                className="border-2 hover:bg-tc hover:border-none text-bgc rounded-full
               py-2 px-10 font-semibold"
              >
                SignUp
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
                <h2 className="text-3xl font-semibold mb-5">Welcome Back!</h2>
              </section>
              <form onSubmit={handleSubmit}>
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
                    placeholder="Enter password!"
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
                <div className="flex justify-between px-1 text-sm">
                  <label htmlFor="check" className=" hover:cursor-pointer">
                    <input
                      id="check"
                      type="checkbox"
                      onChange={handleChange}
                      name="rememberMe"
                      checked={formData.rememberMe}
                    />{" "}
                    Remember me
                  </label>

                  <Link to="/resetPassword" className="text-blue-600">
                    Forget Password?
                  </Link>
                </div>
                <button className="bg-tc mt-1 text-bgc rounded-full py-2 min-w-full font-semibold">
                  Submit
                </button>
                <span className="font-medium text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signUp"
                    className="text-blue-600 italic font-normal"
                  >
                    sign-up here!
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
