import { useState } from "react";
import darkLogo from "../assets/darkLogo.png";
import Banner4 from "../assets/banner4.jpg";
import { Link } from "react-router-dom";
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: type === "checkbox" ? checked : value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      //checking if password match
      formData.password === formData.comfrimPassword
        ? "Successfully signed up"
        : "Passwords do not match"
    );
    console.log(formData);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputTenplates = (type, name, value, placeholder, icon) => {
    return (
      <label className="relative block mb-3">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          {icon}
        </span>
        <input
          className="min-w-full rounded-full bg-slate-100 focus:outline-none
                  placeholder:italic focus:shadow-md py-2 pl-11 pr-3"
          type={showPassword ? "text" : type}
          onChange={handleChange}
          name={name}
          value={value}
          required
          placeholder={placeholder}
        />

        {type === "password" ? (
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
        ) : (
          ""
        )}
      </label>
    );
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
              text-center shadow-xl shadow-slate-200 hover:skew-x-1"
            >
              <section className="flex-col">
                <span className="flex justify-center my-5">
                  <img src={darkLogo} alt="logo" className="h-24" />
                </span>
                <h2 className="text-3xl font-semibold mb-5">Welcome Back!</h2>
              </section>
              <form onSubmit={handleSubmit}>
                {inputTenplates(
                  "email",
                  "email",
                  `${formData.email}`,
                  "name@example.com",
                  <EnvelopeIcon className="h-5 w-5" />
                )}
                {inputTenplates(
                  "password",
                  "password",
                  `${formData.password}`,
                  "Create password!",
                  <LockClosedIcon className="h-5 w-5" />
                )}
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
