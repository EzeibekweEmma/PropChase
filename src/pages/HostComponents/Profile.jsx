import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserContext";
import { Navigate, Link } from "react-router-dom";
import {
  UserIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function Profile() {
  const { ready, user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    userName: "",
    description: "",
    avater: "",
  });
  
  useEffect(() => {
    // getting and setting userData from endpoint
    axios
      .get("/profile")
      .then((response) => {
        const { data } = response;
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  if (!ready) return "Loading...";

  // Check if the user is not logged in
  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <section className="flex justify-center text-tc">
        <section className="w-[80vw] min-h-[53vh] space-y-5">
          <section className="flex border-b py-3 text-center font-medium items-center">
            <section className="w-24 h-24 sm:w-40 sm:h-40 border rounded-full">
              {userData.avater ? (
                <img
                  src={`http://127.0.0.1:3000/uploads/${userData.avater}`}
                  className="object-cover w-full h-full border rounded-full"
                />
              ) : (
                <UserIcon className="p-5" />
              )}
            </section>
            <section className="w=1/2 ml-5 text-left">
              <h2 className="text-xl sm:text-3xl font-bold">
                {userData.userName}
              </h2>
              <h2 className="">
                {userData.email}
              </h2>
              <p className="text-ltc">{userData.description}</p>
              <Link
                to="editProfile"
                className="flex items-center space-x-1 bg-tc text-bgc px-2
              py-1 hover:bg-opacity-80 rounded-lg w-fit"
              >
                <PencilSquareIcon className="w-5 h-5" />
                <span>Edit</span>
              </Link>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}
