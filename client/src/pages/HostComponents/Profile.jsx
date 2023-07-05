import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserContext";
import { Navigate, Link } from "react-router-dom";
import {
  UserIcon,
  PencilSquareIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function Profile() {
  const { ready, user, setUser } = useContext(UserContext);
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
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [setUser]);

  if (!ready) {
    // while fetching data display loading indicator
    return (
      <section className="flex justify-center text-ltc min-h-[53vh]">
        <div className="w-[80vw] p-4 max-w-sm mx-auto">
          <ArrowPathIcon className="animate-spin stroke-1" />
          <h2 className="text-center text-5xl font-medium italic animate-pulse">
            Loading...
          </h2>
        </div>
      </section>
    );
  }

  // if the user is not logged in navigate to the login page
  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <section className="flex justify-center text-tc">
        <section className="w-[80vw] min-h-[53vh] space-y-5">
          <section className="flex flex-col sm:flex-row border-b py-3 text-center font-medium items-center">
            <section className="w-40 h-40 border rounded-full">
              {userData.avater ? (
                <img
                  src={userData.avater}
                  className="object-cover w-full h-full border rounded-full"
                />
              ) : (
                <UserIcon className="p-5" />
              )}
            </section>
            <section className="ml-5 text-left">
              <h2 className="text-xl sm:text-3xl font-bold">
                {userData.userName}
              </h2>
              <h2 className="">{userData.email}</h2>

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
          <div className="pb-5">
            <h3 className="text-xl font-semibold mb-2 border-b-2 border-tc w-fit">
              About Me:
            </h3>
            <p className="text-ltc text-justify">{userData.description}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
