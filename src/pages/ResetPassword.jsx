import { useState } from "react";
import lightLogo from "../assets/lightLogo.png";
import Banner5 from "../assets/banner5.jpg";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const [formData, setFormData] = useState({ email: "" });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/resetPassword", {
        formData,
      });

      // Displaying a success message to the user
      alert(
        `Password reset was successfull! check your email for your new password`
      );

      setRedirect(true);
    } catch (error) {
      console.error("Error resetting password:", error);
      error.response && error.response.data && error.response.data.message
        ? // Displaying an error message to the user
          alert(error.response.data.message)
        : alert("An error occurred");
    }
  };

  if (redirect) return <Navigate to={"/login"} />;

  return (
    <main>
      <section className="flex flex-row-reverse min-h-startingH">
        <div
          style={{ backgroundImage: `url(${Banner5})` }}
          className="flex text-bgc bg-no-repeat bg-cover bg-center bg-tc"
        >
          <section
            className="flex w-screen items-center  bg-opacity-60 bg-tc
             justify-center"
          >
            <section
              className="py-12 px-12 hover:shadow-slate-700 rounded-2xl min-w-[30vw]
              max-w-[30rem] text-center shadow-md shadow-tc"
            >
              <section className="flex-col">
                <span className="flex justify-center my-5">
                  <img src={lightLogo} alt="logo" className="h-24" />
                </span>
                <h2 className="text-3xl font-semibold mb-5">Reset Password!</h2>
              </section>
              <form onSubmit={handleSubmit}>
                <label className="relative block mb-3">
                  <span
                    className="absolute inset-y-0 left-0 flex items-center
                  text-tc pl-4"
                  >
                    <EnvelopeIcon className="h-5 w-5" />
                  </span>
                  <input
                    className="min-w-full text-tc rounded-full bg-slate-100
                    focus:outline-none placeholder:italic focus:shadow-md py-2
                    pl-11 pr-3"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    required
                    placeholder="name@example.com"
                  />
                </label>
                <button
                  className="bg-tc mt-1 text-bgc rounded-full py-2
                min-w-full font-semibold"
                >
                  Reset
                </button>
              </form>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
